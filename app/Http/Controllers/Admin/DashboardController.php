<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalRevenue = Order::whereIn('status', ['paid', 'shipped', 'delivered'])->sum('total_amount');
        $totalOrders = Order::count();
        $totalCustomers = User::where('role', 'customer')->count();

        $monthlySales = Order::selectRaw('MONTH(created_at) as month, SUM(total_amount) as total')
            ->whereIn('status', ['paid', 'shipped', 'delivered'])
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $salesData = array_fill(0, 12, 0);
        foreach ($monthlySales as $sale) {
            $salesData[$sale->month - 1] = (float) $sale->total;
        }

        $topProducts = OrderItem::selectRaw('product_id, SUM(quantity) as total_sold, SUM(price * quantity) as total_revenue')
            ->groupBy('product_id')
            ->orderByDesc('total_sold')
            ->limit(10)
            ->with('product.images')
            ->get();

        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'totalRevenue' => $totalRevenue,
                'totalOrders' => $totalOrders,
                'totalCustomers' => $totalCustomers,
            ],
            'chartData' => [
                'labels' => $monthlyLabels,
                'sales' => $salesData,
            ],
            'topProducts' => $topProducts->map(function ($item) {
                return [
                    'id' => $item->product_id,
                    'name' => $item->product?->name ?? 'Unknown Product',
                    'image' => $item->product?->images?->first()?->image_path ?? null,
                    'total_sold' => $item->total_sold,
                    'total_revenue' => $item->total_revenue,
                ];
            }),
        ]);
    }
}