import { Head, Link } from '@inertiajs/react';
import { 
    ShoppingCart, 
    Menu, 
    X, 
    ChevronLeft, 
    ChevronRight,
    Heart,
    Eye,
    Star,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    ArrowRight,
    Clock,
    User,
    Package
} from 'lucide-react';
import { useState, useEffect } from 'react';

const hotDeals = [
    { id: 1, name: "Wooden Console Table", slug: "wooden-console-table", price: 399, oldPrice: 599, image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&h=400&fit=crop", discount: 33 },
    { id: 2, name: "Ceramic Vase Set", slug: "ceramic-vase-set", price: 89, oldPrice: 129, image: "https://plus.unsplash.com/premium_photo-1668704252726-452ce872b349?w=400&h=400&fit=crop", discount: 30 },
    { id: 3, name: "Linen Curtain Panel", slug: "linen-curtain-panel", price: 129, oldPrice: 179, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop", discount: 28 },
    { id: 4, name: "Wool Throw Blanket", slug: "wool-throw-blanket", price: 179, oldPrice: 249, image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop", discount: 28 },
];

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

export default function Welcome({ 
    categories: propCategories, 
    products: propProducts,
    auth,
    cart_count = 0
}: { 
    canRegister?: boolean; 
    categories?: any[]; 
    products?: any[];
    auth?: AuthData | null;
    cart_count?: number;
}) {
    const isLoggedIn = auth?.user !== null;
    const userName = auth?.user?.name || '';
    const wishlistCount = auth?.wishlist_count || 0;
    const cartCount = auth?.cart_count ?? cart_count ?? 0;

    useEffect(() => {
        document.documentElement.classList.remove('dark');
        const observer = new MutationObserver(() => {
            document.documentElement.classList.remove('dark');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const categories = propCategories || [
        { name: "Sofas", slug: "sofas-68", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop" },
        { name: "Chairs", slug: "dining-chairs-46", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop" },
        { name: "Tables", slug: "dining-tables-93", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=300&fit=crop" },
        { name: "Storage", slug: "storage-80", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=300&fit=crop" },
    ];

    const products = propProducts || [
        { id: 1, name: "Modern Velvet Sofa", price: 1299, oldPrice: 1599, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop", discount: 20 },
    ];
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [countdown, setCountdown] = useState({ hours: 8, minutes: 42, seconds: 15 });
    const [, setVisibleSections] = useState<Set<string>>(new Set());

    const slides = [
        { title: "Modern Furniture", subtitle: "Crafted for Comfort & Style", cta: "Shop Now", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop" },
        { title: "Scandinavian Design", subtitle: "Minimal Elegance for Your Home", cta: "Explore", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop" },
        { title: "Premium Quality", subtitle: "Timeless Pieces, Lasting Value", cta: "Discover", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop" },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev.seconds > 0) {
return { ...prev, seconds: prev.seconds - 1 };
}

                if (prev.minutes > 0) {
return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
}

                if (prev.hours > 0) {
return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
}

                return { hours: 8, minutes: 42, seconds: 15 };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const slideTimer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(slideTimer);
    }, [slides.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setVisibleSections(prev => new Set([...prev, entry.target.id]));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

    return (
        <>
            <Head title="Modern Furniture - Premium Home Decor" />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');
                
                body { font-family: 'DM Sans', sans-serif; }
                .font-display { font-family: 'Playfair Display', serif; }
                
                .fade-up { opacity: 0; transform: translateY(30px); transition: all 0.6s ease-out; }
                .fade-up.visible { opacity: 1; transform: translateY(0); }
                
                .product-card:hover .product-actions { opacity: 1; transform: translateY(0); }
                .product-card:hover .product-image { transform: scale(1.05); }
                
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
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

            {/* Hero Section */}
            <section className="relative h-[70vh] lg:h-[85vh] mt-16 lg:mt-20 overflow-hidden">
                <div className="absolute inset-0">
                    <img src={slides[currentSlide].image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="max-w-xl">
                        <span className="inline-block px-4 py-1.5 bg-amber-600 text-white text-sm font-medium rounded-full mb-4">
                            New Collection
                        </span>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 mb-4 leading-tight">
                            {slides[currentSlide].title}
                        </h1>
                        <p className="text-lg lg:text-xl text-gray-600 mb-8">
                            {slides[currentSlide].subtitle}
                        </p>
                        <button className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-amber-600 transition-all duration-300 hover:gap-4">
                            {slides[currentSlide].cta}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Slider Controls */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                    <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110">
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <div className="flex gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-amber-600' : 'bg-gray-400'}`}
                            />
                        ))}
                    </div>
                    <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110">
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-gray-900">Shop by Category</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {categories.map((cat, i) => (
                            <Link 
                                key={cat.id || i} 
                                href={`/products?category=${cat.slug}`}
                                className="group relative overflow-hidden rounded-2xl aspect-[4/3] animate-on-scroll"
                                id={`category-${i}`}
                            >
                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-lg lg:text-xl font-semibold">{cat.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Products Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-gray-900">Best Modern Furniture</h2>
                        <Link href="/products" className="hidden lg:flex items-center gap-2 text-amber-600 font-medium hover:gap-4 transition-all">
                            View All Products <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                         {products.slice(0, 8).map((product, i) => (
                             <Link
                                 key={product.id}
                                 href={`/product/${product.slug || product.id}`}
                                 className="product-card group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 animate-on-scroll block"
                                 id={`product-${i}`}
                             >
                                 <div className="relative overflow-hidden aspect-square">
                                     <img src={product.image} alt={product.name} className="product-image w-full h-full object-cover transition-transform duration-500" />
                                     {product.discount && (
                                         <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                                             -{product.discount}%
                                         </span>
                                     )}
                                     <div className="product-actions absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 transform translate-y-4 transition-all duration-300 flex justify-center gap-3">
                                         <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors">
                                             <ShoppingCart className="w-5 h-5" />
                                         </button>
                                         <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors">
                                             <Heart className="w-5 h-5" />
                                         </button>
                                         <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors">
                                             <Eye className="w-5 h-5" />
                                         </button>
                                     </div>
                                 </div>
                                 <div className="p-4">
                                     <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                                     <div className="flex items-center gap-2">
                                         <span className="text-lg font-bold text-amber-600">${product.price}</span>
                                         {product.oldPrice && (
                                             <span className="text-gray-400 line-through">${product.oldPrice}</span>
                                         )}
                                     </div>
                                     <div className="flex items-center gap-1 mt-2">
                                         {[1,2,3,4,5].map(s => (
                                             <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                         ))}
                                         <span className="text-gray-400 text-sm ml-1">(12)</span>
                                     </div>
                                 </div>
                             </Link>
                         ))}
                     </div>

                    <div className="mt-8 text-center lg:hidden">
                        <Link href="/products" className="inline-flex items-center gap-2 text-amber-600 font-medium">
                            View All Products <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Hot Deal Section */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left - Big Promotional Banner */}
                        <div className="relative overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-auto animate-on-scroll" id="hotdeal-banner">
                            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop" alt="Hot Deal" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-center p-8 lg:p-12">
                                <span className="inline-block px-4 py-1.5 bg-amber-600 text-white text-sm font-medium rounded-full w-fit mb-4">Hot Deal</span>
                                <h3 className="font-display text-3xl lg:text-4xl font-semibold text-white mb-2">Summer Sale</h3>
                                <p className="text-white/80 text-lg mb-6">Up to 50% off on selected items</p>
                                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-amber-600 hover:text-white transition-all w-fit">
                                    Shop Now <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Right - 4 Product Cards */}
                         <div className="grid grid-cols-2 gap-4">
                             {hotDeals.map((product, i) => (
                                 <Link
                                     key={product.id}
                                     href={`/product/${product.slug || product.id}`}
                                     className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all animate-on-scroll block"
                                     id={`hotdeal-${i}`}
                                 >
                                     <div className="relative aspect-square">
                                         <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                         <span className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                                             -{product.discount}%
                                         </span>
                                     </div>
                                     <div className="p-3">
                                         <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">{product.name}</h4>
                                         <div className="flex items-center gap-2">
                                             <span className="font-bold text-amber-600">${product.price}</span>
                                             <span className="text-gray-400 text-sm line-through">${product.oldPrice}</span>
                                         </div>
                                     </div>
                                 </Link>
                             ))}
                         </div>
                    </div>
                </div>
            </section>

            {/* Big Offers Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100 animate-on-scroll" id="bigoffer">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-20">
                            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop" alt="" className="w-full h-full object-cover rounded-l-3xl" />
                        </div>
                        <div className="relative p-8 lg:p-16 max-w-xl">
                            <span className="inline-block px-4 py-1.5 bg-amber-600 text-white text-sm font-medium rounded-full mb-4">Big Sale Offer</span>
                            <h2 className="font-display text-3xl lg:text-5xl font-semibold text-gray-900 mb-4">Up to 50% Off</h2>
                            <p className="text-gray-600 text-lg mb-8">Discover premium furniture crafted for comfort and style. Transform your space with our curated collection.</p>
                            <div className="flex flex-wrap gap-4">
                                <button className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-amber-600 transition-all">
                                    Shop Now <ArrowRight className="w-5 h-5" />
                                </button>
                                <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-900 text-gray-900 font-medium rounded-full hover:bg-gray-900 hover:text-white transition-all">
                                    View Collection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Deals of the Day */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10 gap-4">
                        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-gray-900">Featured Deals of the Day</h2>
                        <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full">
                            <Clock className="w-5 h-5 text-amber-500" />
                            <span className="font-mono font-bold">{String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}</span>
                        </div>
                    </div>

                    <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
                         {products.slice(0, 6).map((product, i) => (
                             <Link
                                 key={product.id}
                                 href={`/product/${product.slug || product.id}`}
                                 className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 animate-on-scroll block"
                                 id={`deal-${i}`}
                             >
                                 <div className="relative aspect-square">
                                     <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                     <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                                         HOT
                                     </span>
                                 </div>
                                 <div className="p-4">
                                     <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                                     <div className="flex items-center gap-2 mb-3">
                                         <span className="text-xl font-bold text-amber-600">${product.price}</span>
                                         {product.oldPrice && (
                                             <span className="text-gray-400 line-through">${product.oldPrice}</span>
                                         )}
                                     </div>
                                     <button className="w-full py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-amber-600 transition-colors">
                                         Add to Cart
                                     </button>
                                 </div>
                             </Link>
                         ))}
                     </div>
                </div>
            </section>

            {/* Features/Benefits */}
            <section className="py-16 bg-white text-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🚚</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                            <p className="text-gray-400">On orders over $500</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🛡️</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                            <p className="text-gray-400">100% secure checkout</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🔄</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                            <p className="text-gray-400">30-day return policy</p>
                        </div>
                    </div>
                </div>
            </section>

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
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">Home</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">Shop</a></li>
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
                                    <Mail className="w-5 h-5" />
                                    <span>hello@furnish.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Phone className="w-5 h-5" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <MapPin className="w-5 h-5" />
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