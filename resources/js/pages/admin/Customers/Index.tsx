import { Head, Link, usePage, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Customer {
    id: number;
    name: string;
    email: string;
    created_at: string;
    orders_count: number;
}

interface Props {
    customers: {
        data: Customer[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    search: string | null;
}

export default function CustomersIndex() {
    const { props } = usePage<Props>();
    const { customers, search } = props;
    const [searchQuery, setSearchQuery] = useState(search || '');

    function handleSearch(e: FormEvent) {
        e.preventDefault();
        router.get('/admin/customers', { search: searchQuery }, { preserveState: true });
    }

    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this customer?')) {
            router.delete(`/admin/customers/${id}`);
        }
    }

    function handlePageChange(url: string | null) {
        if (url) {
            router.get(url);
        }
    }

    return (
        <>
            <Head title="Customers" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Customers</h1>
                    <Link href="/admin/customers/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Customer
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Customers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                            <Input
                                type="text"
                                placeholder="Search customers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="max-w-sm"
                            />
                            <Button type="submit" variant="outline">
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </form>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/50 text-xs uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3 text-right">Orders</th>
                                        <th className="px-4 py-3">Joined</th>
                                        <th className="px-4 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.data.map((customer) => (
                                        <tr key={customer.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3 font-medium">{customer.name}</td>
                                            <td className="px-4 py-3">{customer.email}</td>
                                            <td className="px-4 py-3 text-right">{customer.orders_count}</td>
                                            <td className="px-4 py-3">{customer.created_at}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link href={`/admin/customers/${customer.id}/edit`}>
                                                        <Button variant="ghost" size="icon">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(customer.id)}>
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {customers.data.length === 0 && (
                                <div className="py-8 text-center text-muted-foreground">
                                    No customers found
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing {customers.data.length} of {customers.total} customers
                            </div>
                            <div className="flex gap-1">
                                {customers.links.map((link, index) => (
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

CustomersIndex.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: '/admin/dashboard' },
        { title: 'Customers', href: '/admin/customers' },
    ],
};