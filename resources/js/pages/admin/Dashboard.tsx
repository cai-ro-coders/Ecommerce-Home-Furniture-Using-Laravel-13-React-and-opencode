import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { DollarSign, ShoppingCart, Users } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import 'chart.js/auto';

interface Stats {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
}

interface TopProduct {
    id: number;
    name: string;
    image: string | null;
    total_sold: number;
    total_revenue: number;
}

interface ChartData {
    labels: string[];
    sales: number[];
}

export default function AdminDashboard() {
    const { props } = usePage<{
        stats: Stats;
        chartData: ChartData;
        topProducts: TopProduct[];
    }>();

    const { stats, chartData, topProducts } = props;

    const salesChartData = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Monthly Sales ($)',
                data: chartData.sales,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const salesChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value: number | string) {
                        return '$' + value.toLocaleString();
                    },
                },
            },
        },
    };

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${stats.totalRevenue.toLocaleString()}
                            </div>
                        </CardContent>
                    </Card>
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
                                Total Customers
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.totalCustomers}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Sales Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <Line data={salesChartData} options={salesChartOptions} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Selling Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/50 text-xs uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Product</th>
                                        <th className="px-4 py-3">Image</th>
                                        <th className="px-4 py-3 text-right">Total Sold</th>
                                        <th className="px-4 py-3 text-right">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topProducts.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="border-b hover:bg-muted/50"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                {product.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {product.image ? (
                                                    <img
                                                        src={`/storage/${product.image}`}
                                                        alt={product.name}
                                                        className="h-10 w-10 rounded object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-xs">
                                                        N/A
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                {product.total_sold}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                ${Number(product.total_revenue).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {topProducts.length === 0 && (
                                <div className="py-8 text-center text-muted-foreground">
                                    No sales data available yet
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Admin Dashboard',
            href: '/admin/dashboard',
        },
    ],
};