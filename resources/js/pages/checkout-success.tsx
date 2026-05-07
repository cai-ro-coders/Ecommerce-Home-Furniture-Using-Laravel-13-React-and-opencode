import { Head, Link } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccess({ order }: { order: any }) {
    return (
        <>
            <Head title="Order Confirmed - Furnish" />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
                <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="font-display text-3xl font-semibold text-gray-900 mb-4">Order Confirmed!</h1>
                    <p className="text-gray-600 mb-2">Thank you for your order</p>
                    <p className="text-gray-900 font-medium mb-8">Order #{order.order_number}</p>
                    
                    <div className="bg-gray-50 rounded-xl p-4 mb-8">
                        <p className="text-gray-600 text-sm">Total Paid</p>
                        <p className="text-2xl font-bold text-gray-900">${Number(order.total).toFixed(2)}</p>
                    </div>

                    <div className="space-y-3">
                        <Link
                            href="/products"
                            className="block w-full py-3 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                        {order.user_id && (
                            <Link
                                href="/customer/orders"
                                className="block w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors"
                            >
                                View Order
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
