import { Head, Link, usePage, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Search, Filter, Printer } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Order {
    id: number;
    user: { id: number; name: string } | null;
    total_amount: string;
    status: string;
    shipping_address: string;
    items_count: number;
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

const orderStatuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];

const statusColors: Record<string, string> = {
    pending: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    paid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function OrdersIndex() {
    const { props } = usePage<Props>();
    const { orders, search, status } = props;
    const [searchQuery, setSearchQuery] = useState(search || '');
    const [selectedStatus, setSelectedStatus] = useState<string>(status || '');

    function handleSearch(e: FormEvent) {
        e.preventDefault();
        const params: Record<string, string> = {};

        if (searchQuery) {
params.search = searchQuery;
}

        if (selectedStatus) {
params.status = selectedStatus;
}

        router.get('/admin/orders', params, { preserveState: true });
    }

    function handleClearFilters() {
        setSearchQuery('');
        setSelectedStatus('');
        router.get('/admin/orders', {}, { preserveState: true });
    }

    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this order?')) {
            router.delete(`/admin/orders/${id}`);
        }
    }

    function handlePageChange(url: string | null) {
        if (url) {
            router.get(url);
        }
    }

    const hasFilters = searchQuery || selectedStatus;

    return (
        <>
            <Head title="Orders" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Orders</h1>
                    <Link href="/admin/orders/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Order
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="mb-4 flex flex-wrap gap-2 items-end">
                            <div className="flex-1 min-w-[200px]">
                                <label className="mb-1 block text-sm font-medium">Search</label>
                                <Input
                                    type="text"
                                    placeholder="Search by ID, customer, or address..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="w-[180px]">
                                <label className="mb-1 block text-sm font-medium">Status</label>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                >
                                    <option value="">All Statuses</option>
                                    {orderStatuses.map((s) => (
                                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" variant="outline">
                                    <Search className="mr-2 h-4 w-4" />
                                    Search
                                </Button>
                                {hasFilters && (
                                    <Button type="button" variant="ghost" onClick={handleClearFilters}>
                                        <Filter className="mr-2 h-4 w-4" />
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </form>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/50 text-xs uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Order ID</th>
                                        <th className="px-4 py-3">Customer</th>
                                        <th className="px-4 py-3">Items</th>
                                        <th className="px-4 py-3 text-right">Total</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.data.map((order) => (
                                        <tr key={order.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3 font-medium">#{order.id}</td>
                                            <td className="px-4 py-3">{order.user?.name ?? 'N/A'}</td>
                                            <td className="px-4 py-3">{order.items_count} item(s)</td>
                                            <td className="px-4 py-3 text-right">${Number(order.total_amount).toLocaleString()}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status] ?? 'bg-gray-100 text-gray-800'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">{order.created_at}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link href={`/admin/orders/${order.id}/edit`}>
                                                        <Button variant="ghost" size="icon">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/admin/orders/${order.id}/print`} target="_blank">
                                                        <Button variant="ghost" size="icon">
                                                            <Printer className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(order.id)}>
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
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

OrdersIndex.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: '/admin/dashboard' },
        { title: 'Orders', href: '/admin/orders' },
    ],
};