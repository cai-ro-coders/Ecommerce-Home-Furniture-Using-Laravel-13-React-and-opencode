import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Package, CheckCircle, Truck, CreditCard, CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

interface OrderItem {
    name: string;
    description: string;
    quantity: number;
    price: number;
    subtotal: number;
    image: string | null;
    images: string[];
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    payment_method: string;
    shipping_address: string;
    total_amount: number;
    created_at: string;
    paid_at: string | null;
    shipped_at: string | null;
    delivered_at: string | null;
    completed_at: string | null;
    items: OrderItem[];
}

interface Props {
    order: Order;
}

export default function CustomerOrderShow() {
    const { props } = usePage<Props>();
    const { order } = props;
    const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    function openProductModal(item: OrderItem) {
        setSelectedItem(item);
        setCurrentImageIndex(0);
    }

    function prevImage() {
        if (selectedItem) {
            setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : selectedItem.images.length - 1));
        }
    }

    function nextImage() {
        if (selectedItem) {
            setCurrentImageIndex((prev) => (prev < selectedItem.images.length - 1 ? prev + 1 : 0));
        }
    }

    return (
        <>
            <Head title={`Order #${order.id}`} />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href="/customer/orders">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-semibold">Order #{order.order_number || order.id}</h1>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(order.status)}`}>
                        {order.status}
                    </span>
                </div>

                <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${order.status !== 'cancelled' ? 'bg-amber-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                                    <Package className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-medium mt-2">Order Placed</span>
                                <span className="text-xs text-muted-foreground">{order.created_at}</span>
                            </div>

                            <div className="flex-1 h-1 mx-2 rounded bg-gray-200">
                                <div className={`h-full rounded ${order.paid_at ? 'bg-amber-500' : 'bg-gray-200'}`} style={{ width: order.paid_at ? '100%' : '0%' }} />
                            </div>

                            <div className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${order.paid_at ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-medium mt-2">Payment</span>
                                <span className="text-xs text-muted-foreground">{order.paid_at || 'Pending'}</span>
                            </div>

                            <div className="flex-1 h-1 mx-2 rounded bg-gray-200">
                                <div className={`h-full rounded ${order.shipped_at ? 'bg-amber-500' : 'bg-gray-200'}`} style={{ width: order.shipped_at ? '100%' : '0%' }} />
                            </div>

                            <div className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${order.shipped_at ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    <Truck className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-medium mt-2">Shipped</span>
                                <span className="text-xs text-muted-foreground">{order.shipped_at || 'Pending'}</span>
                            </div>

                            <div className="flex-1 h-1 mx-2 rounded bg-gray-200">
                                <div className={`h-full rounded ${order.delivered_at ? 'bg-amber-500' : 'bg-gray-200'}`} style={{ width: order.delivered_at ? '100%' : '0%' }} />
                            </div>

                            <div className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${order.delivered_at ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    <CircleCheck className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-medium mt-2">Received</span>
                                <span className="text-xs text-muted-foreground">{order.delivered_at || 'Pending'}</span>
                            </div>

                            <div className="flex-1 h-1 mx-2 rounded bg-gray-200">
                                <div className={`h-full rounded ${order.completed_at ? 'bg-green-500' : 'bg-gray-200'}`} style={{ width: order.completed_at ? '100%' : '0%' }} />
                            </div>

                            <div className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${order.completed_at ? 'bg-green-500 text-white' : order.status === 'cancelled' ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    <CheckCircle className={`w-6 h-6 ${order.completed_at ? '' : order.status === 'cancelled' ? '' : 'text-gray-400'}`} />
                                </div>
                                <span className={`text-xs font-medium mt-2 ${order.completed_at ? 'text-green-600' : ''}`}>Complete</span>
                                <span className="text-xs text-muted-foreground">{order.completed_at || (order.status === 'cancelled' ? 'Cancelled' : 'Pending')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-sm text-muted-foreground">Order Number</div>
                                <div className="font-medium">{order.order_number || `#${order.id}`}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Status</div>
                                <div className="font-medium capitalize">{order.status}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Payment Method</div>
                                <div className="font-medium">{order.payment_method || 'N/A'}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Order Date</div>
                                <div className="font-medium">{order.created_at}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Shipping Address</div>
                                <div className="font-medium">{order.shipping_address}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Total Amount</div>
                                <div className="font-medium">${Number(order.total_amount).toLocaleString()}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/50 text-xs uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Product</th>
                                        <th className="px-4 py-3 text-right">Price</th>
                                        <th className="px-4 py-3 text-right">Quantity</th>
                                        <th className="px-4 py-3 text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item, idx) => (
                                        <tr key={idx} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    {item.image ? (
                                                        <img
                                                            src={`/storage/${item.image}`}
                                                            alt={item.name}
                                                            className="h-12 w-12 rounded object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                                            onClick={() => openProductModal(item)}
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                                            N/A
                                                        </div>
                                                    )}
                                                    <span className="font-medium">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right">${Number(item.price).toLocaleString()}</td>
                                            <td className="px-4 py-3 text-right">{item.quantity}</td>
                                            <td className="px-4 py-3 text-right font-medium">${Number(item.subtotal).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{selectedItem?.name}</DialogTitle>
                        <DialogClose className="absolute right-4 top-4">
                            <X className="h-4 w-4" />
                        </DialogClose>
                    </DialogHeader>

                    {selectedItem && selectedItem.images.length > 0 && (
                        <div className="relative mt-4">
                            <div className="overflow-hidden rounded-lg">
                                <img
                                    src={selectedItem.images[currentImageIndex]}
                                    alt={selectedItem.name}
                                    className="w-full h-80 object-cover"
                                />
                            </div>

                            {selectedItem.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>

                                    <div className="mt-2 flex justify-center gap-1.5">
                                        {selectedItem.images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`h-2 w-2 rounded-full transition-colors ${
                                                    idx === currentImageIndex ? 'bg-primary' : 'bg-muted'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <div className="mt-4 space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                            <p className="text-sm">{selectedItem?.description || 'No description available.'}</p>
                        </div>

                        <div className="flex gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Price</h3>
                                <p className="font-medium">${Number(selectedItem?.price).toLocaleString()}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Quantity Ordered</h3>
                                <p className="font-medium">{selectedItem?.quantity}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Subtotal</h3>
                                <p className="font-medium">${Number(selectedItem?.subtotal).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

CustomerOrderShow.layout = {
    breadcrumbs: [
        { title: 'Customer Dashboard', href: '/customer/dashboard' },
        { title: 'My Orders', href: '/customer/orders' },
        { title: 'Order Details', href: '#' },
    ],
};
