import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Product {
    id: number;
    name: string;
    price: string;
    stock: number;
}

interface OrderItem {
    product_id: string;
    product_name: string;
    quantity: string;
    price: string;
}

interface OrderData {
    id: number;
    user_id: number;
    status: string;
    shipping_address: string;
    total_amount: string;
    items: OrderItem[];
}

interface Props {
    order: OrderData;
    users: User[];
    products: Product[];
}

export default function OrderEdit() {
    const { props } = usePage<Props>();
    const { order, users, products } = props;

    const { data, setData, put, processing, errors } = useForm({
        user_id: String(order.user_id),
        status: order.status,
        shipping_address: order.shipping_address,
        items: order.items.map((item) => ({
            product_id: String(item.product_id),
            quantity: String(item.quantity),
            price: String(item.price),
        })),
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/orders/${order.id}`);
    }

    function addItem() {
        setData('items', [...data.items, { product_id: '', quantity: '1', price: '0' }]);
    }

    function removeItem(index: number) {
        setData('items', data.items.filter((_, i) => i !== index));
    }

    function updateItem(index: number, field: keyof OrderItem, value: string) {
        const updated = [...data.items];
        updated[index] = { ...updated[index], [field]: value };

        if (field === 'product_id' && value) {
            const product = products.find((p) => p.id === Number(value));

            if (product) {
                updated[index].price = String(product.price);
            }
        }

        setData('items', updated);
    }

    function getCalculatedTotal() {
        return data.items.reduce((total, item) => {
            return total + Number(item.price) * Number(item.quantity);
        }, 0);
    }

    return (
        <>
            <Head title="Edit Order" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/orders">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-semibold">Edit Order #{order.id}</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Order Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Customer</label>
                                    <select
                                        value={data.user_id}
                                        onChange={(e) => setData('user_id', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                    >
                                        <option value="">Select customer</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                                        ))}
                                    </select>
                                    {errors.user_id && <p className="mt-1 text-sm text-red-500">{errors.user_id}</p>}
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">Shipping Address</label>
                                <textarea
                                    value={data.shipping_address}
                                    onChange={(e) => setData('shipping_address', e.target.value)}
                                    placeholder="Enter shipping address"
                                    rows={3}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                />
                                {errors.shipping_address && <p className="mt-1 text-sm text-red-500">{errors.shipping_address}</p>}
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-sm font-medium">Order Items</label>
                                    <Button type="button" variant="outline" size="sm" onClick={addItem}>
                                        <Plus className="mr-1 h-3 w-3" />
                                        Add Item
                                    </Button>
                                </div>
                                {errors.items && <p className="mb-2 text-sm text-red-500">{Array.isArray(errors.items) ? errors.items.join(', ') : errors.items}</p>}

                                <div className="space-y-3">
                                    {data.items.map((item, index) => {
                                        const selectedProduct = products.find((p) => p.id === Number(item.product_id));
                                        const lineTotal = Number(item.price) * Number(item.quantity);

                                        return (
                                            <div key={index} className="flex flex-wrap items-end gap-3 rounded-md border p-3">
                                                <div className="flex-1 min-w-[200px]">
                                                    <label className="mb-1 block text-xs font-medium">Product</label>
                                                    <select
                                                        value={item.product_id}
                                                        onChange={(e) => updateItem(index, 'product_id', e.target.value)}
                                                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background"
                                                    >
                                                        <option value="">Select product</option>
                                                        {products.map((p) => (
                                                            <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="w-[100px]">
                                                    <label className="mb-1 block text-xs font-medium">Quantity</label>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                                        className="h-9"
                                                    />
                                                </div>
                                                <div className="w-[120px]">
                                                    <label className="mb-1 block text-xs font-medium">Line Total</label>
                                                    <div className="flex h-9 items-center rounded-md bg-muted px-3 text-sm">
                                                        ${lineTotal.toLocaleString()}
                                                    </div>
                                                </div>
                                                {data.items.length > 1 && (
                                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(index)}>
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 flex justify-end text-lg font-semibold">
                                    Total: ${getCalculatedTotal().toLocaleString()}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link href="/admin/orders">
                                    <Button variant="outline" type="button">Cancel</Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Order'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

OrderEdit.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: '/admin/dashboard' },
        { title: 'Orders', href: '/admin/orders' },
        { title: 'Edit Order', href: `/admin/orders/edit` },
    ],
};