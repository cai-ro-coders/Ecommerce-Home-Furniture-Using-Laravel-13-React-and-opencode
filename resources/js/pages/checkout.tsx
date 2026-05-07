import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { ShoppingCart, Truck, Store, CreditCard, Wallet, Menu, X, Heart, User, ArrowRight, Lock } from 'lucide-react';

declare global {
    interface Window {
        Stripe: any;
        stripe: any;
    }
}

interface CartItem {
    id: string | number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        slug: string;
        image: string;
    };
}

export default function Checkout() {
    const { props }: any = usePage();
    const cartItems: CartItem[] = props.cartItems || [];
    const subtotal = props.subtotal || 0;
    const shipping = props.shipping || 0;
    const total = props.total || 0;
    const auth = props.auth || null;
    const stripeKey = props.stripe_key || '';
    const stripeActive = props.stripe_active || false;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [stripeLoaded, setStripeLoaded] = useState(false);
    const [cardComplete, setCardComplete] = useState(false);

    const isLoggedIn = auth?.user !== null;
    const userName = auth?.user?.name || '';
    const wishlistCount = auth?.wishlist_count || 0;
    const cartCount = auth?.cart_count ?? props.cart_count ?? cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);

    const { data, setData, post, processing } = useForm({
        billing: {
            first_name: auth?.user?.name?.split(' ')[0] || '',
            last_name: auth?.user?.name?.split(' ')[1] || '',
            email: auth?.user?.email || '',
            phone: auth?.user?.phone || '',
        },
        shipping: {
            address: auth?.user?.address || '',
            city: '',
            postal_code: '',
            method: 'delivery',
        },
        payment: {
            method: stripeActive ? 'credit_card' : 'cash',
        },
        card: {
            number: '',
            expiry: '',
            cvc: '',
            name: '',
        },
        subtotal: subtotal,
        shipping_cost: shipping,
    });

    const [elements, setElements] = useState<any>(null);
    const [cardElement, setCardElement] = useState<any>(null);

    useEffect(() => {
        if (stripeKey && !window.Stripe) {
            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            script.onload = () => {
                window.stripe = window.Stripe(stripeKey);
                setStripeLoaded(true);
            };
            document.head.appendChild(script);
        } else if (stripeKey && window.Stripe) {
            setStripeLoaded(true);
        }
    }, [stripeKey]);

    useEffect(() => {
        if (stripeLoaded && window.stripe && data.payment.method === 'credit_card') {
            const elementsInstance = window.stripe.elements();
            const card = elementsInstance.create('card', {
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#111827',
                        '::placeholder': {
                            color: '#9CA3AF',
                        },
                    },
                },
            });
            card.mount('#card-element');
            setElements(elementsInstance);
            setCardElement(card);
        }
    }, [stripeLoaded, data.payment.method]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoggedIn) {
            router.visit('/register');
            return;
        }

        if (data.payment.method === 'credit_card') {
            if (!stripeActive) {
                alert('Credit card payments are not available. Please use cash on delivery.');
                return;
            }
            if (!data.card.name) {
                alert('Please enter the name on card');
                return;
            }

            if (!window.stripe || !cardElement) {
                alert('Stripe is not loaded. Please refresh the page.');
                return;
            }

            try {
                const total = subtotal + shipping;
                const response = await fetch('/checkout/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    },
                    body: JSON.stringify({ total }),
                });

                const { client_secret } = await response.json();

                const { paymentIntent, error } = await window.stripe.confirmCardPayment(client_secret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: data.card.name,
                            email: data.billing.email,
                            phone: data.billing.phone,
                        },
                    },
                });

                if (error) {
                    alert(error.message);
                    return;
                }

                if (paymentIntent && paymentIntent.status === 'succeeded') {
                    console.log('Payment successful:', paymentIntent.id);
                    
                    const orderResponse = await fetch('/checkout/process-stripe', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                        },
                        body: JSON.stringify({
                            billing: data.billing,
                            shipping: data.shipping,
                            subtotal: subtotal,
                            shipping_cost: shipping,
                            payment_intent_id: paymentIntent.id,
                        }),
                    });

                    const orderResult = await orderResponse.json();
                    
                    if (orderResult.success) {
                        window.location.href = `/checkout/success/${orderResult.order_id}`;
                    } else {
                        alert('Order creation failed. Please try again.');
                    }
                }
            } catch (error) {
                console.error('Payment error:', error);
                alert('Payment failed. Please try again.');
                return;
            }
            return;
        }

        console.log('Submitting checkout form with data:', data);
        post('/checkout');
    };

    return (
        <>
            <Head title="Checkout - Furnish" />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');
                body { font-family: 'DM Sans', sans-serif; }
                .font-display { font-family: 'Playfair Display', serif; }
                
                .checkout-input {
                    transition: all 0.2s ease-in-out;
                    border: 2px solid #e5e7eb;
                    border-radius: 0.5rem;
                    padding: 0.625rem 1rem;
                    width: 100%;
                    font-size: 0.875rem;
                    color: #111827;
                    background-color: white;
                }
                .checkout-input:focus {
                    border-color: #d97706;
                    box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
                    outline: none;
                }
                
                .radio-option {
                    transition: all 0.2s ease-in-out;
                    border: 2px solid #e5e7eb;
                    border-radius: 0.5rem;
                    padding: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .radio-option.selected {
                    border-color: #d97706;
                    background-color: #fffbeb;
                }
                
                .place-order-btn {
                    transition: all 0.2s ease-in-out;
                    width: 100%;
                    margin-top: 1.5rem;
                    padding: 1rem;
                    background-color: #d97706;
                    color: white;
                    font-weight: 600;
                    border-radius: 9999px;
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                }
                .place-order-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);
                }
                .place-order-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .sticky-summary {
                    position: sticky;
                    top: 100px;
                }
            `}</style>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        <Link href="/" className="flex items-center">
                            <span className="font-display text-2xl lg:text-3xl font-semibold text-gray-900">Furnish</span>
                        </Link>
                        
                        <div className="hidden lg:flex items-center gap-8">
                            <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Home</Link>
                            <Link href="/products" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Shop</Link>
                            <Link href="#" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Collections</Link>
                            <Link href="#" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">About</Link>
                            <Link href="#" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Contact</Link>
                        </div>

                        <div className="flex items-center gap-2">
                            {isLoggedIn ? (
                                <>
                                    <Link href="/redirect-dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2">
                                        <User className="w-5 h-5 text-gray-700" />
                                        <span className="hidden md:inline text-gray-700 text-sm font-medium">{userName}</span>
                                    </Link>
                                    <Link href="/customer/wishlists" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-gray-700" />
                                        <span className="hidden md:inline text-gray-700 text-sm font-medium">Wishlist</span>
                                        {wishlistCount > 0 && (
                                            <span className="absolute -top-1 -right-1 md:right-auto md:left-5 w-5 h-5 bg-amber-600 text-white text-xs rounded-full flex items-center justify-center">{wishlistCount}</span>
                                        )}
                                    </Link>
                                    <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                                        <ShoppingCart className="w-5 h-5 text-gray-700" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 text-white text-xs rounded-full flex items-center justify-center">{cartCount}</span>
                                        )}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2">
                                        <User className="w-5 h-5 text-gray-700" />
                                        <span className="hidden md:inline text-gray-700 text-sm font-medium">Sign in</span>
                                    </Link>
                                    <Link href="#" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-gray-700" />
                                        <span className="hidden md:inline text-gray-700 text-sm font-medium">Wishlist</span>
                                    </Link>
                                    <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                                        <ShoppingCart className="w-5 h-5 text-gray-700" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 text-white text-xs rounded-full flex items-center justify-center">{cartCount}</span>
                                        )}
                                    </Link>
                                </>
                            )}
                            <button 
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4">
                        <div className="flex flex-col gap-4">
                            <Link href="/" className="text-gray-700 py-2 font-medium">Home</Link>
                            <Link href="/products" className="text-gray-700 py-2 font-medium">Shop</Link>
                            <Link href="#" className="text-gray-700 py-2 font-medium">Collections</Link>
                            <Link href="#" className="text-gray-700 py-2 font-medium">About</Link>
                            <Link href="#" className="text-gray-700 py-2 font-medium">Contact</Link>
                        </div>
                    </div>
                )}
            </nav>

            <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="font-display text-3xl lg:text-4xl font-semibold text-gray-900 mb-8">Checkout</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
                            {/* Left Column - 70% */}
                            <div className="lg:col-span-7 space-y-6">
                                {/* Billing Information */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">Billing Information</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                            <input
                                                type="text"
                                                className="checkout-input"
                                                value={data.billing.first_name}
                                                onChange={e => setData('billing', { ...data.billing, first_name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                            <input
                                                type="text"
                                                className="checkout-input"
                                                value={data.billing.last_name}
                                                onChange={e => setData('billing', { ...data.billing, last_name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                className="checkout-input"
                                                value={data.billing.email}
                                                onChange={e => setData('billing', { ...data.billing, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                            <input
                                                type="text"
                                                className="checkout-input"
                                                value={data.billing.phone}
                                                onChange={e => setData('billing', { ...data.billing, phone: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Information */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">Shipping Method</h2>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                        <label
                                            className={`radio-option ${data.shipping.method === 'delivery' ? 'selected' : ''}`}
                                            onClick={() => setData('shipping', { ...data.shipping, method: 'delivery' })}
                                        >
                                            <input
                                                type="radio"
                                                name="shipping.method"
                                                checked={data.shipping.method === 'delivery'}
                                                onChange={() => {}}
                                                className="text-amber-600 focus:ring-amber-500"
                                            />
                                            <Truck className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">Home Delivery</p>
                                                <p className="text-sm text-gray-500">{subtotal >= 500 ? 'Free' : '$50.00'}</p>
                                            </div>
                                        </label>
                                        
                                        <label
                                            className={`radio-option ${data.shipping.method === 'pickup' ? 'selected' : ''}`}
                                            onClick={() => setData('shipping', { ...data.shipping, method: 'pickup' })}
                                        >
                                            <input
                                                type="radio"
                                                name="shipping.method"
                                                checked={data.shipping.method === 'pickup'}
                                                onChange={() => {}}
                                                className="text-amber-600 focus:ring-amber-500"
                                            />
                                            <Store className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">Store Pickup</p>
                                                <p className="text-sm text-gray-500">Free</p>
                                            </div>
                                        </label>
                                    </div>

                                    {data.shipping.method === 'delivery' && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                                <input
                                                    type="text"
                                                    className="checkout-input"
                                                    value={data.shipping.address}
                                                    onChange={e => setData('shipping', { ...data.shipping, address: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                    <input
                                                        type="text"
                                                        className="checkout-input"
                                                        value={data.shipping.city}
                                                        onChange={e => setData('shipping', { ...data.shipping, city: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                                    <input
                                                        type="text"
                                                        className="checkout-input"
                                                        value={data.shipping.postal_code}
                                                        onChange={e => setData('shipping', { ...data.shipping, postal_code: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Payment Method */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                                    <div className="space-y-3">
                                        {stripeActive && (
                                            <label
                                                className={`radio-option ${data.payment.method === 'credit_card' ? 'selected' : ''}`}
                                                onClick={() => setData('payment', { ...data.payment, method: 'credit_card' })}
                                            >
                                                <input
                                                    type="radio"
                                                    name="payment.method"
                                                    checked={data.payment.method === 'credit_card'}
                                                    onChange={() => {}}
                                                    className="text-amber-600 focus:ring-amber-500"
                                                />
                                                <CreditCard className="w-5 h-5 text-gray-600" />
                                                <span className="font-medium text-gray-900">Credit Card</span>
                                            </label>
                                        )}
                                        
                                        <label
                                            className={`radio-option ${data.payment.method === 'cash' ? 'selected' : ''}`}
                                            onClick={() => setData('payment', { ...data.payment, method: 'cash' })}
                                        >
                                            <input
                                                type="radio"
                                                name="payment.method"
                                                checked={data.payment.method === 'cash'}
                                                onChange={() => {}}
                                                className="text-amber-600 focus:ring-amber-500"
                                            />
                                            <Wallet className="w-5 h-5 text-gray-600" />
                                            <span className="font-medium text-gray-900">Cash on Delivery</span>
                                        </label>
                                    </div>

                                    {data.payment.method === 'credit_card' && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                                                <input
                                                    type="text"
                                                    className="checkout-input"
                                                    placeholder="John Doe"
                                                    value={data.card.name}
                                                    onChange={e => setData('card', { ...data.card, name: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
                                                <div id="card-element" className="checkout-input p-3"></div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="useShippingAsBilling"
                                                    checked={useShippingAsBilling}
                                                    onChange={e => setUseShippingAsBilling(e.target.checked)}
                                                    className="w-4 h-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                                                />
                                                <label htmlFor="useShippingAsBilling" className="text-sm text-gray-600">
                                                    Use shipping address as billing address
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Lock className="w-3 h-3" />
                                                <span>Your payment is secured with SSL encryption</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column - 30% */}
                            <div className="lg:col-span-3">
                                <div className="sticky-summary bg-white rounded-2xl p-6 shadow-sm">
                                    <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                                    
                                    {/* Cart Items */}
                                    <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex items-center gap-3">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="text-sm font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Totals */}
                                    <div className="space-y-3 pt-4 border-t border-gray-100">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span className="font-medium">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Shipping</span>
                                            <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-semibold text-gray-900 pt-3 border-t border-gray-100">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Place Order Button */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="place-order-btn"
                                    >
                                        {processing ? 'Processing...' : 'Place Order'}
                                    </button>

                                    <p className="text-xs text-gray-500 text-center mt-4">
                                        By placing your order, you agree to our Terms of Service and Privacy Policy
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                        {/* Column 1 */}
                        <div>
                            <h3 className="font-display text-2xl font-semibold mb-4">Furnish</h3>
                            <p className="text-gray-400 mb-6">Premium modern furniture for your home. Crafted with care, designed for comfort.</p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                                    <span className="text-sm">f</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                                    <span className="text-sm">ig</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                                    <span className="text-sm">tw</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                                    <span className="text-sm">yt</span>
                                </a>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                            <ul className="space-y-3">
                                <li><Link href="/" className="text-gray-400 hover:text-amber-600 transition-colors">Home</Link></li>
                                <li><Link href="/products" className="text-gray-400 hover:text-amber-600 transition-colors">Shop</Link></li>
                                <li><a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">Collections</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">About Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">Shipping Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">Returns & Exchanges</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">FAQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">Terms & Conditions</a></li>
                            </ul>
                        </div>

                        {/* Column 4 */}
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
                            <p className="text-gray-400 mb-4">Subscribe for exclusive offers and updates.</p>
                            <div className="flex gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:border-amber-600"
                                />
                                <button className="px-6 py-3 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                            <div className="mt-6 space-y-2">
                                <div className="flex items-center gap-3 text-gray-400">
                                    <span className="w-5 h-5">✉</span>
                                    <span>hello@furnish.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <span className="w-5 h-5">📞</span>
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <span className="w-5 h-5">📍</span>
                                    <span>123 Furniture Ave, NY</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm">© 2024 Furnish. All rights reserved.</p>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-400 text-sm">Payment Methods:</span>
                            <div className="flex gap-2">
                                <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400">Visa</div>
                                <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400">MC</div>
                                <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400">Amex</div>
                                <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400">PayPal</div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
