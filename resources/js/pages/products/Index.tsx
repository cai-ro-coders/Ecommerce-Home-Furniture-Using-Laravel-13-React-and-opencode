import { Head, Link, usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { 
    ShoppingCart, 
    Menu, 
    X,
    Heart,
    Eye,
    Star,
    ChevronDown,
    ChevronRight,
    Grid3X3,
    List,
    ChevronLeft,
    SlidersHorizontal,
    Package,
    User,
    ArrowLeft
} from 'lucide-react';

const priceRanges = [
    { id: 1, label: "Under $100", min: 0, max: 100 },
    { id: 2, label: "$100 - $300", min: 100, max: 300 },
    { id: 3, label: "$300 - $500", min: 300, max: 500 },
    { id: 4, label: "$500 - $1000", min: 500, max: 1000 },
    { id: 5, label: "Over $1000", min: 1000, max: null },
];

export default function ProductListing() {
    useEffect(() => {
            document.documentElement.classList.remove('dark');
    }, []);

    const { props } = usePage<any>();
    const products = props.products;
    const categories = props.categories || [];
    const auth: any = props.auth || null;
    const isLoggedIn = auth?.user !== null;
    const userName = auth?.user?.name || '';
    const wishlistCount = auth?.wishlist_count || 0;
    const cartCount = auth?.cart_count ?? props.cart_count ?? 0;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
    const [sortBy, setSortBy] = useState("popular");
    const [gridView, setGridView] = useState(3);
    const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState(props.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/products', { search: searchTerm }, { preserveState: true });
    };

    const handleCategoryClick = (categorySlug: string) => {
        router.get('/products', { category: categorySlug }, { preserveState: true });
    };

    const handlePriceFilter = (range: any) => {
        const params: any = {};
        if (range.min !== null) params.min_price = range.min;
        if (range.max !== null) params.max_price = range.max;
        router.get('/products', params, { preserveState: true });
    };

    const handleSortChange = (sort: string) => {
        setSortBy(sort);
        router.get('/products', { sort }, { preserveState: true });
    };

    const toggleCategory = (id: number) => {
        setExpandedCategories(prev => 
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const sortOptions = [
        { value: "popular", label: "Most Popular" },
        { value: "newest", label: "New Arrival" },
        { value: "bestseller", label: "Best Seller" },
        { value: "lowprice", label: "Low Price" },
        { value: "highprice", label: "High Price" },
        { value: "rating", label: "Customer Rating" },
    ];

    return (
        <>
            <Head title="Shop - Furnish" />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');
                
                body { font-family: 'DM Sans', sans-serif; }
                .font-display { font-family: 'Playfair Display', serif; }
                
                .product-card:hover .product-actions { opacity: 1; transform: translateY(0); }
                .product-card:hover .product-image { transform: scale(1.05); }
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

                {/* Mobile Menu */}
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

             {/* Search Bar */}
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
                 <form onSubmit={handleSearch} className="relative w-full">
                     <input
                         type="text"
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         placeholder="Search products..."
                         className="w-full h-14 pl-14 pr-6 text-lg text-gray-700 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                     />
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                         </svg>
                     </div>
                 </form>
             </div>

             {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Sidebar - Categories */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-semibold text-lg text-gray-900">Categories</h2>
                                <button className="lg:hidden p-1">
                                    <SlidersHorizontal className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Category List */}
                            <div className="space-y-1">
                                  {categories.map((category: any) => (
                                      <div key={category.id}>
                                          <button
                                              onClick={() => {
                                                  handleCategoryClick(category.slug);
                                                  toggleCategory(category.id);
                                              }}
                                              className="w-full flex items-center justify-between py-2 px-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
                                          >
                                              <span className="font-medium">{category.name}</span>
                                              <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategories.includes(category.id) ? 'rotate-180' : ''}`} />
                                          </button>

                                          {expandedCategories.includes(category.id) && category.children && (
                                              <div className="ml-4 mt-1 space-y-1">
                                                  {category.children.map((sub: any, idx: number) => (
                                                      <button
                                                          key={idx}
                                                          onClick={() => handleCategoryClick(sub.slug)}
                                                          className="w-full text-left py-1.5 px-3 text-sm text-gray-500 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors"
                                                      >
                                                          {sub.name}
                                                      </button>
                                                  ))}
                                              </div>
                                          )}
                                      </div>
                                  ))}
                            </div>

                            {/* Price Filter */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                                <div className="space-y-2">
                                {priceRanges.map(range => (
                                         <label key={range.id} className="flex items-center gap-3 cursor-pointer">
                                             <input
                                                 type="radio"
                                                 name="price"
                                                 checked={selectedPriceRange === range.id}
                                                 onChange={() => {
                                                     setSelectedPriceRange(range.id);
                                                     handlePriceFilter(range);
                                                 }}
                                                 className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                                             />
                                             <span className="text-sm text-gray-600">{range.label}</span>
                                         </label>
                                     ))}
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-4">Customer Rating</h3>
                                <div className="space-y-2">
                                    {[4, 3, 2, 1].map(rating => (
                                        <button key={rating} className="flex items-center gap-2 w-full py-1.5 px-2 hover:bg-gray-50 rounded-md transition-colors">
                                            <div className="flex gap-0.5">
                                                {[1,2,3,4,5].map(star => (
                                                    <Star 
                                                        key={star} 
                                                        className={`w-3.5 h-3.5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500">& Up</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Side - Product Area */}
                    <main className="flex-1 w-full min-w-0 pt-20">
                        {/* Sort & Controls Bar */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10">
                            <div className="text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{products?.from || 0}-{products?.to || 0}</span> of <span className="font-semibold text-gray-900">{products?.total || 0}</span> products
                            </div>
                            
                            <div className="flex items-center gap-4">
                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <select
                                         value={sortBy}
                                         onChange={(e) => handleSortChange(e.target.value)}
                                         className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:border-amber-500 cursor-pointer"
                                     >
                                        {sortOptions.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>

                                {/* Grid Toggle */}
                                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => setGridView(3)}
                                        className={`p-2 rounded-md transition-colors ${gridView === 3 ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                                    >
                                        <Grid3X3 className={`w-4 h-4 ${gridView === 3 ? 'text-amber-600' : 'text-gray-500'}`} />
                                    </button>
                                    <button
                                        onClick={() => setGridView(2)}
                                        className={`p-2 rounded-md transition-colors ${gridView === 2 ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                                    >
                                        <List className={`w-4 h-4 ${gridView === 2 ? 'text-amber-600' : 'text-gray-500'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        </div>

                        {/* Product Grid */}
                        <div className={`grid gap-6 ${gridView === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
                             {(products?.data || []).map((product: any) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.slug || product.id}`}
                                    className="product-card group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 block"
                                >
                                    <div className="relative overflow-hidden aspect-square">
                                        <img src={product.image} alt={product.name} className="product-image w-full h-full object-cover transition-transform duration-500" />
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
                                            <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
                                        </div>
                                         <div className="flex items-center gap-2">
                                             <span className="text-lg font-bold text-amber-600">${product.price}</span>
                                         </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                         {products && products.links && (
                         <div className="mt-12 flex items-center justify-center gap-2">
                             <Link
                                 href={products.prev_page_url || '#'}
                                 preserveState
                                 className={`w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600 transition-colors ${
                                     !products.prev_page_url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
                                 }`}
                             >
                                 <ChevronLeft className="w-5 h-5" />
                             </Link>

                             {products.links.slice(1, -1).map((link: any, i: number) => (
                                 <Link
                                     key={i}
                                     href={link.url || '#'}
                                     preserveState
                                     className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${
                                         link.active
                                             ? 'bg-amber-600 text-white'
                                             : 'border border-gray-200 text-gray-600 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600'
                                     }`}
                                     dangerouslySetInnerHTML={{ __html: link.label }}
                                 />
                             ))}

                             <Link
                                 href={products.next_page_url || '#'}
                                 preserveState
                                 className={`w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600 transition-colors ${
                                     !products.next_page_url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
                                 }`}
                             >
                                 <ChevronRight className="w-5 h-5" />
                             </Link>
                         </div>
                         )}
                    </main>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white pt-16 pb-8 mt-16">
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