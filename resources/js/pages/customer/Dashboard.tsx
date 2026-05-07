import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import 'chart.js/auto';

interface Stats {
    totalOrders: number;
    totalWishlists: number;
    totalReviews: number;
}

interface ChartData {
    labels: string[];
    orders: number[];
}

interface OrderItem {
    name: string;
    image: string | null;
    quantity: number;
    price: number;
}

interface LatestOrder {
    id: number;
    status: string;
    total_amount: number;
    created_at: string;
    items: OrderItem[];
}

export default function CustomerDashboard() {
    const { props } = usePage<{
        userName: string;
        stats: Stats;
        chartData: ChartData;
        latestOrders: LatestOrder[];
    }>();

    const { userName, stats, chartData, latestOrders } = props;

    const ordersChartData = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Monthly Orders',
                data: chartData.orders,
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1,
            },
        ],
    };

    const ordersChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <>
            <Head title="Customer Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                <div className="mb-2">
                    <h1 className="text-2xl font-semibold">Welcome back, {userName}!</h1>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Orders
                            </CardTitle>
                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.totalOrders}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Wishlists
                            </CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.totalWishlists}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Reviews
                            </CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.totalReviews}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <Bar data={ordersChartData} options={ordersChartOptions} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Latest Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/50 text-xs uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Order ID</th>
                                        <th className="px-4 py-3">Products</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Total</th>
                                        <th className="px-4 py-3">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {latestOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="border-b hover:bg-muted/50"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                #{order.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap gap-2">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            {item.image ? (
                                                                <img
                                                                    src={`/storage/${item.image}`}
                                                                    alt={item.name}
                                                                    className="h-8 w-8 rounded object-cover"
                                                                />
                                                            ) : (
                                                                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs">
                                                                    N/A
                                                                </div>
                                                            )}
                                                            <span>{item.name} (x{item.quantity})</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                                    order.status === 'paid' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                    order.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                                    'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                ${Number(order.total_amount).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                {order.created_at}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {latestOrders.length === 0 && (
                                <div className="py-8 text-center text-muted-foreground">
                                    No orders yet
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

CustomerDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Customer Dashboard',
            href: '/customer/dashboard',
        },
    ],
};