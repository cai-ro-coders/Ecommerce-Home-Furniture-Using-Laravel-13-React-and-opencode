<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['user', 'items.product'])
            ->when($request->search, function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('id', 'like', "%{$search}%")
                        ->orWhereHas('user', function ($q) use ($search) {
                            $q->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        })
                        ->orWhere('shipping_address', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($q, $status) {
                $q->where('status', $status);
            })
            ->latest();

        $orders = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/Orders/Index', [
            'orders' => $orders->through(function ($order) {
                return [
                    'id' => $order->id,
                    'user' => $order->user ? ['id' => $order->user->id, 'name' => $order->user->name] : null,
                    'total_amount' => $order->total_amount,
                    'status' => $order->status,
                    'shipping_address' => $order->shipping_address,
                    'items_count' => $order->items->count(),
                    'created_at' => $order->created_at?->format('Y-m-d'),
                ];
            }),
            'search' => $request->search,
            'status' => $request->status,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/Orders/Create', [
            'users' => User::select('id', 'name', 'email')->where('role', 'customer')->get(),
            'products' => Product::select('id', 'name', 'price', 'stock')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'status' => 'required|in:pending,paid,shipped,delivered,cancelled',
            'shipping_address' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $totalAmount = 0;
        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            $totalAmount += $product->price * $item['quantity'];
        }

        $validated['total_amount'] = $totalAmount;

        $order = Order::create([
            'user_id' => $validated['user_id'],
            'status' => $validated['status'],
            'shipping_address' => $validated['shipping_address'],
            'total_amount' => $totalAmount,
        ]);

        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ]);
        }

        return redirect()->route('admin.orders.index')
            ->with('success', 'Order created successfully.');
    }

    public function edit(Order $order)
    {
        $order->load(['user', 'items.product']);

        return Inertia::render('admin/Orders/Edit', [
            'order' => [
                'id' => $order->id,
                'user_id' => $order->user_id,
                'status' => $order->status,
                'shipping_address' => $order->shipping_address,
                'total_amount' => $order->total_amount,
                'items' => $order->items->map(function ($item) {
                    return [
                        'product_id' => $item->product_id,
                        'product_name' => $item->product?->name ?? 'Unknown',
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                    ];
                }),
            ],
            'users' => User::select('id', 'name', 'email')->where('role', 'customer')->get(),
            'products' => Product::select('id', 'name', 'price', 'stock')->get(),
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'status' => 'required|in:pending,paid,shipped,delivered,cancelled',
            'shipping_address' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        $totalAmount = 0;
        foreach ($validated['items'] as $item) {
            $totalAmount += $item['price'] * $item['quantity'];
        }

        $order->update([
            'user_id' => $validated['user_id'],
            'status' => $validated['status'],
            'shipping_address' => $validated['shipping_address'],
            'total_amount' => $totalAmount,
        ]);

        $order->items()->delete();

        foreach ($validated['items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        return redirect()->route('admin.orders.index')
            ->with('success', 'Order updated successfully.');
    }

    public function destroy(Order $order)
    {
        $order->items()->delete();
        $order->delete();

        return redirect()->route('admin.orders.index')
            ->with('success', 'Order deleted successfully.');
    }

    public function print(Order $order)
    {
        $order->load(['user', 'items.product.images']);

        return Inertia::render('admin/Orders/Print', [
            'order' => [
                'id' => $order->id,
                'user' => $order->user,
                'status' => $order->status,
                'shipping_address' => $order->shipping_address,
                'total_amount' => $order->total_amount,
                'created_at' => $order->created_at?->format('Y-m-d H:i:s'),
                'items' => $order->items->map(function ($item) {
                    return [
                        'product_name' => $item->product?->name ?? 'Unknown',
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'image' => $item->product?->images?->first()?->image_path ?? null,
                    ];
                }),
            ],
        ]);
    }
}