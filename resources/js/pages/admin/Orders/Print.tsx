import { Head, usePage } from '@inertiajs/react';
import { Printer, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface OrderItem {
    product_name: string;
    quantity: number;
    price: string;
    image: string | null;
}

interface Order {
    id: number;
    user: { id: number; name: string; email: string } | null;
    status: string;
    shipping_address: string;
    total_amount: string;
    created_at: string;
    items: OrderItem[];
}

interface Props {
    order: Order;
}

export default function PrintOrder() {
    const { props } = usePage<Props>();
    const { order } = props;

    useEffect(() => {
        window.print();
    }, []);

    const statusColors: Record<string, string> = {
        pending: '#f3f4f6',
        paid: '#fef3c7',
        shipped: '#dbeafe',
        delivered: '#dcfce7',
        cancelled: '#fee2e2',
    };

    return (
        <>
            <Head title={`Order #${order.id} - Print`} />
            <div className="p-8">
                <div className="mb-4 flex items-center justify-between print:hidden">
                    <a href="/admin/orders">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Orders
                        </Button>
                    </a>
                    <Button onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                </div>

                <div id="print-area" className="mx-auto max-w-3xl">
                    <div className="mb-6 border-b pb-4">
                        <h1 className="text-2xl font-bold">Order Invoice</h1>
                        <p className="text-gray-500">Order #{order.id}</p>
                        <p className="text-gray-500">Date: {order.created_at}</p>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div>
                            <h2 className="mb-1 text-sm font-semibold text-gray-500">Customer</h2>
                            <p className="font-medium">{order.user?.name ?? 'N/A'}</p>
                            <p className="text-sm text-gray-600">{order.user?.email ?? ''}</p>
                        </div>
                        <div>
                            <h2 className="mb-1 text-sm font-semibold text-gray-500">Status</h2>
                            <span
                                className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                                style={{ backgroundColor: statusColors[order.status] ?? '#f3f4f6' }}
                            >
                                {order.status}
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="mb-1 text-sm font-semibold text-gray-500">Shipping Address</h2>
                        <p className="whitespace-pre-line">{order.shipping_address}</p>
                    </div>

                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 text-left text-sm font-semibold">#</th>
                                <th className="py-2 text-left text-sm font-semibold">Product</th>
                                <th className="py-2 text-right text-sm font-semibold">Qty</th>
                                <th className="py-2 text-right text-sm font-semibold">Price</th>
                                <th className="py-2 text-right text-sm font-semibold">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, index) => {
                                const lineTotal = Number(item.price) * item.quantity;

                                return (
                                    <tr key={index} className="border-b">
                                        <td className="py-3 text-sm">{index + 1}</td>
                                        <td className="py-3 text-sm font-medium">{item.product_name}</td>
                                        <td className="py-3 text-right text-sm">{item.quantity}</td>
                                        <td className="py-3 text-right text-sm">${Number(item.price).toLocaleString()}</td>
                                        <td className="py-3 text-right text-sm font-medium">${lineTotal.toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4} className="py-3 text-right font-bold">
                                    Grand Total
                                </td>
                                <td className="py-3 text-right font-bold text-lg">
                                    ${Number(order.total_amount).toLocaleString()}
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="mt-8 border-t pt-4 text-center text-xs text-gray-400">
                        <p>Thank you for your order!</p>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    .print\\:hidden {
                        display: none !important;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                    }
                }
            `}</style>
        </>
    );
}