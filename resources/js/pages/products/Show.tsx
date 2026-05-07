import { Head, Link, usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    ShoppingCart,
    Heart,
    Star,
    ChevronLeft,
    ChevronRight,
    Truck,
    Shield,
    RefreshCw,
    Plus,
    Minus,
    Eye,
    Share2,
    Check,
    Menu,
    X,
    User,
    Package,
    ArrowRight
} from 'lucide-react';

interface ProductImage {
    id: number;
    url: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    old_price?: number;
    discount?: number;
    description: string;
    short_description?: string;
    sku: string;
    stock: number;
    rating: number;
    reviews_count: number;
    sold_count: number;
    images: ProductImage[];
    category: {
        id: number;
        name: string;
        slug: string;
    };
    additional_info?: {
        material?: string;
        dimensions?: string;
        weight?: string;
        color?: string;
        brand?: string;
    };
}

interface Review {
    id: number;
    user: {
        name: string;
        avatar?: string;
    };
    rating: number;
    title: string;
    comment: string;
    date: string;
    helpful: number;
}

export default function ProductShow() {
    useEffect(() => {
            document.documentElement.classList.remove('dark');
    }, []);
    
    const { props } = usePage<any>();
    const product: Product = props.product || {
        id: 1,
        name: "Modern Velvet Sofa",
        slug: "modern-velvet-sofa",
        price: 1299,
        old_price: 1599,
        discount: 20,
        description: "Experience ultimate comfort with our Modern Velvet Sofa. Crafted with premium velvet upholstery and solid wood frame, this sofa combines luxury with durability. Perfect for modern living rooms, it features deep seating and plush cushions for maximum relaxation. The elegant design complements any contemporary decor while providing exceptional comfort for you and your guests.",
        short_description: "Premium velvet upholstery with solid wood frame. Deep seating for ultimate comfort.",
        sku: "FUR-SOF-001",
        stock: 15,
        rating: 4.8,
        reviews_count: 124,
        sold_count: 350,
        images: [
            { id: 1, url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop" },
            { id: 2, url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop" },
            { id: 3, url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop" },
            { id: 4, url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop" },
            { id: 5, url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop" },
        ],
        category: { id: 1, name: "Sofas", slug: "sofas" },
        additional_info: {
            material: "Premium Velvet, Solid Wood",
            dimensions: 'W 84" x D 36" x H 32"',
            weight: "120 lbs",
            color: "Emerald Green",
            brand: "Furnish",
        }
    };

    const relatedProducts: any[] = props.related_products || [
        { id: 2, name: "Scandinavian Armchair", price: 599, old_price: 799, image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop", discount: 25, rating: 4.6, reviews: 89 },
        { id: 3, name: "Oak Dining Table", price: 899, old_price: 1199, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop", discount: 25, rating: 4.9, reviews: 156 },
        { id: 4, name: "Minimalist Bookshelf", price: 449, old_price: 599, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=400&fit=crop", discount: 25, rating: 4.7, reviews: 67 },
        { id: 5, name: "Leather Lounge Chair", price: 1499, old_price: 1899, image: "https://images.unsplash.com/photo-1506439776389-6e0eb8cfb237?w=400&h=400&fit=crop", discount: 20, rating: 4.8, reviews: 203 },
    ];

    const reviews: Review[] = props.reviews || [];
    const ratingDistribution = props.rating_distribution || {};
    const auth: any = props.auth || null;
    const isLoggedIn = auth?.user !== null;
    const userName = auth?.user?.name || '';
    const wishlistCount = auth?.wishlist_count || 0;
    const cartCount = auth?.cart_count ?? props.cart_count ?? 0;

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [isWishlisted, setIsWishlisted] = useState(product.is_wishlisted || false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZooming, setIsZooming] = useState(false);

    const discountPercentage = product.old_price
        ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
        : product.discount || 0;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };

    const renderStars = (rating: number) => {
        return [1, 2, 3, 4, 5].map(star => (
            <Star
                key={star}
                className={`w-4 h-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
            />
        ));
    };

    const renderStarsLarge = (rating: number) => {
        return [1, 2, 3, 4, 5].map(star => (
            <Star
                key={star}
                className={`w-5 h-5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <>
            <Head title={`${product.name} - Furnish`} />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');

                body { font-family: 'DM Sans', sans-serif; }
                .font-display { font-family: 'Playfair Display', serif; }

                .product-card:hover .product-actions { opacity: 1; transform: translateY(0); }
                .product-card:hover .product-image { transform: scale(1.05); }

                .tab-content { animation: fadeIn 0.3s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .zoom-image { transition: transform 0.3s ease; }
                .zoom-container:hover .zoom-image { transform: scale(1.5); }
            `}</style>

             {/* Navigation */}
             <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="flex items-center justify-between h-16 lg:h-20">
                         <div className="flex items-center gap-4">
                             <Link href="/" className="flex items-center">
                                 <span className="font-display text-2xl lg:text-3xl font-semibold text-gray-900">Furnish</span>
                             </Link>
                         </div>
                         
                         <div className="hidden lg:flex items-center gap-8">
                             <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Home</Link>
                             <Link href="/products" className="text-amber-600 font-medium">Shop</Link>
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

                 {mobileMenuOpen && (
                     <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4">
                         <div className="flex flex-col gap-4">
                             <Link href="/" className="text-gray-700 py-2 font-medium">Home</Link>
                             <Link href="/products" className="text-amber-600 py-2 font-medium">Shop</Link>
                             <Link href="#" className="text-gray-700 py-2 font-medium">Collections</Link>
                             <Link href="#" className="text-gray-700 py-2 font-medium">About</Link>
                             <Link href="#" className="text-gray-700 py-2 font-medium">Contact</Link>
                         </div>
                     </div>
                 )}
             </nav>

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/products" className="hover:text-amber-600 transition-colors">Shop</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/products?category=${product.category.slug}`} className="hover:text-amber-600 transition-colors">{product.category.name}</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900">{product.name}</span>
                </div>
            </div>

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <Link href="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    Back to Products
                </Link>
            </div>

            {/* SECTION 1: PRODUCT DETAILS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Product Images */}
                    <div className="space-y-4">
                        {/* Main Image with Zoom */}
                        <div
                            className="zoom-container relative aspect-square overflow-hidden rounded-2xl bg-gray-50 cursor-zoom-in"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsZooming(true)}
                            onMouseLeave={() => setIsZooming(false)}
                        >
                            <img
                                src={product.images[selectedImage]?.url}
                                alt={product.name}
                                className="zoom-image w-full h-full object-cover"
                                style={{
                                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                }}
                            />
                            {discountPercentage > 0 && (
                                <span className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white text-sm font-semibold rounded-full">
                                    -{discountPercentage}%
                                </span>
                            )}
                            {product.stock <= 5 && product.stock > 0 && (
                                <span className="absolute top-4 right-4 px-3 py-1.5 bg-amber-600 text-white text-sm font-semibold rounded-full">
                                    Only {product.stock} left
                                </span>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                            {product.images.map((image, index) => (
                                <button
                                    key={image.id}
                                    onClick={() => setSelectedImage(index)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                                        selectedImage === index
                                            ? 'border-amber-600 shadow-md'
                                            : 'border-gray-200 hover:border-amber-300'
                                    }`}
                                >
                                    <img src={image.url} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Product Info */}
                    <div className="space-y-6 lg:pt-4">
                        {/* Category */}
                        <Link
                            href={`/products?category=${product.category.slug}`}
                            className="inline-block text-sm text-amber-600 font-medium hover:text-amber-700 transition-colors"
                        >
                            {product.category.name}
                        </Link>

                        {/* Product Title */}
                        <h1 className="font-display text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
                            {product.name}
                        </h1>

                        {/* Rating, Reviews, Sold */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-1">
                                {renderStarsLarge(product.rating)}
                            </div>
                            <span className="font-medium text-gray-900">{product.rating}</span>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600">
                                <span className="font-medium text-gray-900">{product.reviews_count}</span> Reviews
                            </span>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600">
                                <span className="font-medium text-gray-900">{product.sold_count}+</span> Sold
                            </span>
                        </div>

                        {/* Price + Discount */}
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                            {product.old_price && (
                                <>
                                    <span className="text-xl text-gray-400 line-through">${product.old_price}</span>
                                    <span className="px-2.5 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                                        Save {discountPercentage}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Short Description */}
                        {product.short_description && (
                            <p className="text-gray-600 leading-relaxed">{product.short_description}</p>
                        )}

                        {/* Divider */}
                        <div className="border-t border-gray-100" />

                        {/* SKU & Stock */}
                        <div className="flex flex-wrap gap-6 text-sm">
                            <div>
                                <span className="text-gray-500">SKU:</span>
                                <span className="ml-2 font-medium text-gray-900">{product.sku}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Availability:</span>
                                <span className={`ml-2 font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.stock > 0 ? `In Stock (${product.stock} items)` : 'Out of Stock'}
                                </span>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-700">Quantity:</span>
                            <div className="flex items-center border border-gray-200 rounded-full">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2.5 hover:bg-gray-50 rounded-l-full transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-4 h-4 text-gray-600" />
                                </button>
                                <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="p-2.5 hover:bg-gray-50 rounded-r-full transition-colors"
                                    disabled={quantity >= product.stock}
                                >
                                    <Plus className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                                onClick={() => router.post('/cart/add', { product_id: product.id, quantity })}
                                className="flex-1 py-4 px-8 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/25 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button className="flex-1 py-4 px-8 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                                <ArrowRight className="w-5 h-5" />
                                Buy Now
                            </button>
                            <button
                                onClick={() => {
                                    if (!isLoggedIn) {
                                        window.location.href = '/login';
                                        return;
                                    }
                                    router.post('/customer/wishlists', { product_id: product.id }, {
                                        onSuccess: () => {
                                            setIsWishlisted(!isWishlisted);
                                        }
                                    });
                                }}
                                className={`p-4 rounded-full border-2 transition-all duration-300 ${
                                    isWishlisted
                                        ? 'border-red-500 bg-red-50 text-red-500'
                                        : 'border-gray-200 hover:border-amber-300 text-gray-600 hover:text-amber-600'
                                }`}
                            >
                                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <Truck className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                                    <p className="text-xs text-gray-500">On orders over $500</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <Shield className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                                    <p className="text-xs text-gray-500">100% secure checkout</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <RefreshCw className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                                    <p className="text-xs text-gray-500">30-day return policy</p>
                                </div>
                            </div>
                        </div>

                        {/* Share */}
                        <div className="flex items-center gap-3 pt-2">
                            <span className="text-sm text-gray-500">Share:</span>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Share2 className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: PRODUCT TABS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    {/* Tab Headers */}
                    <div className="flex border-b border-gray-100">
                        {[
                            { id: 'description', label: 'Description' },
                            { id: 'additional', label: 'Additional Information' },
                            { id: 'reviews', label: `Reviews (${product.reviews_count})` },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 sm:flex-none px-6 lg:px-8 py-4 font-medium text-sm transition-all duration-300 ${
                                    activeTab === tab.id
                                        ? 'text-amber-600 border-b-2 border-amber-600'
                                        : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 lg:p-8">
                        {activeTab === 'description' && (
                            <div className="tab-content prose max-w-none">
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>
                        )}

                        {activeTab === 'additional' && (
                            <div className="tab-content">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {product.additional_info && Object.entries(product.additional_info).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-500 capitalize">{key.replace('_', ' ')}</span>
                                            <span className="font-medium text-gray-900">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="tab-content space-y-6">
                                {/* Review Summary */}
                                <div className="flex flex-col sm:flex-row gap-8 p-6 bg-gray-50 rounded-xl">
                                    <div className="text-center">
                                        <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
                                        <div className="flex justify-center gap-1 mt-2">
                                            {renderStarsLarge(product.rating)}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">Based on {product.reviews_count} reviews</p>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        {[5, 4, 3, 2, 1].map(star => {
                                            const count = props.rating_distribution?.[star] || 0;
                                            const percentage = product.reviews_count > 0 ? Math.round((count / product.reviews_count) * 100) : 0;
                                            return (
                                                <div key={star} className="flex items-center gap-3">
                                                    <span className="text-sm text-gray-600 w-8">{star} star</span>
                                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-amber-400 rounded-full"
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-gray-500 w-8">
                                                        {percentage}%
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Individual Reviews */}
                                <div className="space-y-4">
                                    {reviews.map(review => (
                                        <div key={review.id} className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                                        <span className="font-semibold text-amber-600">{review.user.name.charAt(0)}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{review.user.name}</p>
                                                        <p className="text-sm text-gray-500">{review.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            <p className="text-gray-600">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* SECTION 3: RELATED PRODUCTS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-display text-2xl lg:text-3xl font-semibold text-gray-900">Related Products</h2>
                    <Link href="/products" className="hidden sm:flex items-center gap-2 text-amber-600 font-medium hover:gap-4 transition-all">
                        View All <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((product, i) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.slug || product.id}`}
                            className="product-card group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 block"
                        >
                            <div className="relative overflow-hidden aspect-square">
                                <img src={product.image} alt={product.name} className="product-image w-full h-full object-cover transition-transform duration-500" />
                                {product.discount && (
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                                        -{product.discount}%
                                    </span>
                                )}
                                <div className="product-actions absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 transform translate-y-4 transition-all duration-300 flex justify-center gap-3">
                                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors shadow-lg">
                                        <ShoppingCart className="w-5 h-5" />
                                    </button>
                                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors shadow-lg">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors shadow-lg">
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                                    </div>
                                    <span className="text-gray-400 text-sm">({product.reviews})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-amber-600">${product.price}</span>
                                    {product.old_price && (
                                        <span className="text-gray-400 line-through">${product.old_price}</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Link href="/products" className="inline-flex items-center gap-2 text-amber-600 font-medium">
                        View All Products <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                        <div>
                            <h3 className="font-display text-2xl font-semibold mb-4">Furnish</h3>
                            <p className="text-gray-400 mb-6">Premium modern furniture for your home.</p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                                    <Star className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                                    <span className="text-sm font-bold">ig</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                                    <span className="text-sm font-bold">X</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-400 hover:text-amber-600">Home</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-amber-600">Shop</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-amber-600">About</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-amber-600">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-400 hover:text-amber-600">Shipping Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-amber-600">Returns</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-amber-600">FAQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-amber-600">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
                            <p className="text-gray-400 mb-4">Subscribe for updates.</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:border-amber-600"
                                />
                                <button className="px-6 py-3 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700">
                                    →
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
                        © 2024 Furnish. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    );
}
