<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Review;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $totalOrders = Order::where('user_id', $user->id)->count();
        $totalWishlists = Wishlist::where('user_id', $user->id)->count();
        $totalReviews = Review::where('user_id', $user->id)->count();

        $monthlyOrders = Order::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->where('user_id', $user->id)
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $ordersData = array_fill(0, 12, 0);
        foreach ($monthlyOrders as $order) {
            $ordersData[$order->month - 1] = $order->total;
        }

        $latestOrders = Order::with('items.product.images')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('customer/Dashboard', [
            'userName' => $user->name,
            'stats' => [
                'totalOrders' => $totalOrders,
                'totalWishlists' => $totalWishlists,
                'totalReviews' => $totalReviews,
            ],
            'chartData' => [
                'labels' => $monthlyLabels,
                'orders' => $ordersData,
            ],
            'latestOrders' => $latestOrders->map(function ($order) {
                $products = $order->items->map(function ($item) {
                    return [
                        'name' => $item->product?->name ?? 'Unknown Product',
                        'image' => $item->product?->images?->first()?->image_path ?? null,
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                    ];
                });

                return [
                    'id' => $order->id,
                    'status' => $order->status,
                    'total_amount' => $order->total_amount,
                    'created_at' => $order->created_at?->format('Y-m-d'),
                    'items' => $products,
                ];
            }),
        ]);
    }
}