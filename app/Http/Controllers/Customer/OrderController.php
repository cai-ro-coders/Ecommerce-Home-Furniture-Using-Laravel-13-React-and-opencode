<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = Order::with(['items.product.images'])
            ->where('user_id', $user->id)
            ->when($request->search, function ($q, $search) {
                $q->where(function ($sub) use ($search) {
                    $sub->where('id', 'like', "%{$search}%")
                        ->orWhere('shipping_address', 'like', "%{$search}%")
                        ->orWhereHas('items.product', function ($p) use ($search) {
                            $p->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->when($request->status, function ($q) use ($request) {
                $q->where('status', $request->status);
            })
            ->latest();

        $orders = $query->paginate(10)->withQueryString();

        return Inertia::render('customer/Orders/Index', [
            'orders' => $orders->through(function ($order) {
                $items = $order->items ?? collect([]);
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'total_amount' => $order->total_amount,
                    'status' => $order->status,
                    'shipping_address' => $order->shipping_address,
                    'items_count' => $items->count(),
                    'items' => $items->map(function ($item) {
                        return [
                            'name' => $item->product?->name ?? 'Unknown Product',
                            'slug' => $item->product?->slug ?? '',
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                            'image' => $item->product?->images?->first()?->image_path ?? null,
                        ];
                    }),
                    'created_at' => $order->created_at?->format('Y-m-d'),
                ];
            }),
            'search' => $request->search,
            'status' => $request->status,
        ]);
    }

    public function show(Order $order)
    {
        $user = Auth::user();

        if ($order->user_id !== $user->id) {
            abort(403, 'Unauthorized access.');
        }

        $order->load(['items.product.images', 'payment']);

        $payment = $order->payment->first();

        return Inertia::render('customer/Orders/Show', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'payment_method' => $order->payment_method,
                'shipping_address' => $order->shipping_address,
                'total_amount' => $order->total_amount,
                'created_at' => $order->created_at?->format('Y-m-d H:i'),
                'paid_at' => $payment && $payment->status === 'completed' ? $payment->created_at?->format('Y-m-d H:i') : null,
                'shipped_at' => $order->status === 'shipped' || $order->status === 'delivered' ? $order->updated_at?->format('Y-m-d H:i') : null,
                'delivered_at' => $order->status === 'delivered' ? $order->updated_at?->format('Y-m-d H:i') : null,
                'completed_at' => $order->status === 'delivered' ? $order->updated_at?->format('Y-m-d H:i') : null,
                'items' => $order->items->map(function ($item) {
                    return [
                        'name' => $item->product?->name ?? 'Unknown Product',
                        'description' => $item->product?->description ?? '',
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'image' => $item->product?->images?->first()?->image_path ?? null,
                        'images' => $item->product?->images?->map(function ($img) {
                            return asset('storage/' . $img->image_path);
                        }) ?? [],
                        'subtotal' => $item->price * $item->quantity,
                    ];
                }),
            ],
        ]);
    }
}
