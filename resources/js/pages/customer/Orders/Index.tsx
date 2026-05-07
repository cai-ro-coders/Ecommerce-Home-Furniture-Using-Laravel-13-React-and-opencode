import { Head, Link, usePage, router } from '@inertiajs/react';
import { Search, Filter } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface OrderItem {
    name: string;
    slug: string;
    quantity: number;
    price: number;
    image: string | null;
}

interface Order {
    id: number;
    total_amount: number;
    status: string;
    shipping_address: string;
    items_count: number;
    items: OrderItem[];
    created_at: string;
}

interface Props {
    orders: {
        data: Order[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    search: string | null;
    status: string | null;
}

export default function CustomerOrdersIndex() {
    const { props } = usePage<Props>();
    const { orders, search, status } = props;
    const [searchQuery, setSearchQuery] = useState(search || '');
    const [selectedStatus, setSelectedStatus] = useState(status || '');

    function handleFilter(e: FormEvent) {
        e.preventDefault();
        router.get('/customer/orders', { search: searchQuery, status: selectedStatus || null }, { preserveState: true });
    }

    function handlePageChange(url: string | null) {
        if (url) {
            router.get(url);
        }
    }

    function getStatusBadge(status: string) {
        const styles: Record<string, string> = {
            pending: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
            paid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };

        return styles[status] || styles.pending;
    }

    return (
        <>
            <Head title="My Orders" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">My Orders</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Order History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFilter} className="mb-4 flex flex-wrap gap-2">
                            <Input
                                type="text"
                                placeholder="Search by order ID, address, or product..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="max-w-sm"
                            />
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            >
                                <option value="">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <Button type="submit" variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </form>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/50 text-xs uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Order ID</th>
                                        <th className="px-4 py-3">Products</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Total</th>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.data.map((order) => (
                                        <tr key={order.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3 font-medium">
                                                <Link href={`/customer/orders/${order.id}`} className="text-blue-600 hover:underline">
                                                    #{order.id}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap gap-2">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            {item.image ? (
                                                                <Link href={`/product/${item.slug}`}>
                                                                    <img
                                                                        src={`/storage/${item.image}`}
                                                                        alt={item.name}
                                                                        className="h-8 w-8 rounded object-cover hover:opacity-80 transition-opacity"
                                                                    />
                                                                </Link>
                                                            ) : (
                                                                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                                                    N/A
                                                                </div>
                                                            )}
                                                            <Link href={`/product/${item.slug}`} className="hover:underline">
                                                                {item.name} (x{item.quantity})
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                ${Number(order.total_amount).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                {order.created_at}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center">
                                                    <Link href={`/customer/orders/${order.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            View
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {orders.data.length === 0 && (
                                <div className="py-8 text-center text-muted-foreground">
                                    No orders found
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing {orders.data.length} of {orders.total} orders
                            </div>
                            <div className="flex gap-1">
                                {orders.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(link.url)}
                                        disabled={!link.url}
                                        className={`rounded-md px-3 py-1.5 text-sm ${
                                            link.active
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted hover:bg-muted/80'
                                        } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                    >
                                        {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

CustomerOrdersIndex.layout = {
    breadcrumbs: [
        { title: 'Customer Dashboard', href: '/customer/dashboard' },
        { title: 'My Orders', href: '/customer/orders' },
    ],
};
