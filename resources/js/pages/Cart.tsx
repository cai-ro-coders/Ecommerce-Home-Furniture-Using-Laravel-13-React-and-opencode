import { Head, Link, usePage, router } from '@inertiajs/react';
import { ShoppingCart, Trash2, Heart, Minus, Plus, ArrowRight, Truck, Shield, RefreshCw, Menu, X, User, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    slug: string;
    stock: number;
    image: string;
    category: { name: string } | null;
}

interface CartItem {
    id: number | string;
    quantity: number;
    price: number;
    product: Product;
}

interface Cart {
    items: CartItem[];
    subtotal: number;
    item_count: number;
}

interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthData {
    user: AuthUser;
    wishlist_count: number;
    cart_count: number;
}

export default function CartIndex() {
    const { props } = usePage<any>();
    const cart: Cart = props.cart || { items: [], subtotal: 0, item_count: 0 };
    const auth: AuthData | null = props.auth || null;
    const isLoggedIn = auth?.user !== null;
    const userName = auth?.user?.name || '';
    const wishlistCount = auth?.wishlist_count || 0;
    const cartCount = auth?.cart_count ?? props.cart_count ?? 0;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const updateQuantity = (itemId: string | number, newQuantity: number) => {
        if (typeof newQuantity === 'number' && newQuantity < 1) return;
        router.post(`/cart/${itemId}/update`, { quantity: newQuantity });
    };

    const removeItem = (itemId: string | number) => {
        if (confirm('Are you sure you want to remove this item?')) {
            router.delete(`/cart/${itemId}`);
        }
    };

    return (
        <>
            <Head title="Shopping Cart - Furnish" />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');
                body { font-family: 'DM Sans', sans-serif; }
                .font-display { font-family: 'Playfair Display', serif; }
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

            {/* Cart Content */}
            <div className="min-h-screen bg-gray-50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/products" className="hover:text-amber-600 transition-colors">Shop</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-900">Shopping Cart</span>
                    </div>

                    {/* Back Button */}
                    <Link href="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors mb-6">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Products
                    </Link>

                    <h1 className="font-display text-3xl lg:text-4xl font-semibold text-gray-900 mb-8">Shopping Cart</h1>

                    {cart.items.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center">
                            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
                            <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-colors">
                                Continue Shopping <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Cart Items (70%) */}
                            <div className="lg:col-span-2 space-y-4">
                                <div className="bg-white rounded-2xl p-6">
                                    <p className="text-gray-600 mb-4">{cart.item_count} items in your cart</p>
                                    
                                    {cart.items.map((item) => (
                                        <div key={item.id} className="flex gap-6 py-6 border-b border-gray-100 last:border-0">
                                            {/* Product Image */}
                                            <div className="flex-shrink-0">
                                                <Link href={`/product/${item.product.slug}`}>
                                                    <img 
                                                        src={item.product.image} 
                                                        alt={item.product.name}
                                                        className="w-28 h-28 object-cover rounded-xl hover:opacity-80 transition-opacity"
                                                    />
                                                </Link>
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <Link href={`/product/${item.product.slug}`} className="font-semibold text-gray-900 hover:text-amber-600 transition-colors block mb-1">
                                                    {item.product.name}
                                                </Link>
                                                {item.product.category && (
                                                    <p className="text-sm text-gray-500 mb-2">{item.product.category.name}</p>
                                                )}
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    {item.product.stock > 0 ? (
                                                        <span className="text-green-600 flex items-center gap-1">
                                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                            In Stock
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-600 flex items-center gap-1">
                                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                                            Out of Stock
                                                        </span>
                                                    )}
                                                    <span className="flex items-center gap-1">
                                                        <Truck className="w-4 h-4" /> Free Shipping
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                                    <RefreshCw className="w-4 h-4" /> Free 30-day returns
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-4 mt-3">
                                                    <button 
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Remove
                                                    </button>
                                                    <button className="text-sm text-gray-600 hover:text-amber-600 flex items-center gap-1">
                                                        <Heart className="w-4 h-4" /> Save for later
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Price & Quantity */}
                                            <div className="flex-shrink-0 text-right">
                                                <p className="text-lg font-bold text-gray-900 mb-3">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                                <div className="flex items-center border border-gray-200 rounded-lg">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-2 hover:bg-gray-50 rounded-l-lg transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                    <span className="w-10 text-center text-gray-900 font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-2 hover:bg-gray-50 rounded-r-lg transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    ${item.price.toFixed(2)} each
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column - Order Summary (30%) */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl p-6 sticky top-24">
                                    <h2 className="font-semibold text-xl text-gray-900 mb-6">Order Summary</h2>
                                    
                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal ({cart.item_count} items)</span>
                                            <span className="font-medium text-gray-900">${cart.subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Shipping</span>
                                            <span className="font-medium text-green-600">Free</span>
                                        </div>
                                        <div className="border-t border-gray-100 pt-4">
                                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                                <span>Total</span>
                                                <span>${cart.subtotal.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-green-600" />
                                        Secure checkout with SSL encryption
                                    </p>

                                    <button
                                        onClick={() => {
                                            if (!isLoggedIn) {
                                                router.visit('/register');
                                            } else {
                                                setProcessing(true);
                                                router.visit('/checkout', {
                                                    onFinish: () => setProcessing(false)
                                                });
                                            }
                                        }}
                                        disabled={processing}
                                        className="block w-full py-4 px-6 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/25 text-center flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {processing ? 'Processing...' : 'Proceed to Checkout'} <ArrowRight className="w-5 h-5" />
                                    </button>

                                    <Link href="/products" className="block text-center text-amber-600 font-medium mt-4 hover:underline">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
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
                                    <span className="w-5 h-5">✆</span>
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
