<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'images'])->withCount('reviews')
            ->when($request->search, function ($q, $search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($request->category, function ($q, $categorySlug) {
                $q->whereHas('category', function ($query) use ($categorySlug) {
                    $query->where('slug', $categorySlug);
                });
            })
            ->when($request->min_price, function ($q, $minPrice) {
                $q->where('price', '>=', $minPrice);
            })
            ->when($request->max_price, function ($q, $maxPrice) {
                $q->where('price', '<=', $maxPrice);
            })
            ->when($request->sort, function ($q, $sort) {
                switch ($sort) {
                    case 'lowprice':
                        $q->orderBy('price', 'asc');
                        break;
                    case 'highprice':
                        $q->orderBy('price', 'desc');
                        break;
                    case 'newest':
                        $q->latest();
                        break;
                    default:
                        $q->latest();
                }
            }, function ($q) {
                $q->latest();
            });

        $products = $query->paginate(12)->withQueryString();

        $user = auth()->user();
        $wishlistCount = $user ? \App\Models\Wishlist::where('user_id', $user->id)->count() : 0;
        $cart = $user ? \App\Models\Cart::where('user_id', $user->id)->first() : null;
        $cartCount = $cart ? $cart->items->sum('quantity') : 0;
        $guestCartCount = $user ? 0 : (array_sum(array_column(session()->get('guest_cart', []), 'quantity')));

        return Inertia::render('products/Index', [
            'products' => $products->through(function ($product) {
                $image = $product->images->first()?->image_path;
                if (!$image) {
                    $image = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop';
                } elseif (!str_starts_with($image, 'http')) {
                    $image = '/storage/' . $image;
                }
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => (float) $product->price,
                    'image' => $image,
                    'rating' => $product->reviews->avg('rating') ?? 4.5,
                    'reviews' => $product->reviews->count() ?? 0,
                ];
            }),
            'categories' => \App\Models\Category::select('id', 'name', 'slug', 'image')
                ->with('children:id,name,slug,parent_id,image')
                ->get()
                ->map(function ($cat) {
                    $image = $cat->image;
                    if (!$image) {
                        $image = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop';
                    } elseif (!str_starts_with($image, 'http')) {
                        $image = '/storage/' . $image;
                    }
                    return [
                        'id' => $cat->id,
                        'name' => $cat->name,
                        'slug' => $cat->slug,
                        'image' => $image,
                        'children' => $cat->children->map(function ($child) {
                            return [
                                'id' => $child->id,
                                'name' => $child->name,
                                'slug' => $child->slug,
                            ];
                        }),
                    ];
                }),
            'auth' => $user ? [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
                'wishlist_count' => $wishlistCount,
                'cart_count' => $cartCount,
            ] : null,
            'cart_count' => $user ? $cartCount : $guestCartCount,
        ]);
    }

    public function show($slug)
    {
        $product = Product::with(['category', 'images', 'reviews.user'])->where('slug', $slug)->firstOrFail();

        $user = auth()->user();
        $wishlistCount = $user ? \App\Models\Wishlist::where('user_id', $user->id)->count() : 0;
        $isWishlisted = $user ? \App\Models\Wishlist::where('user_id', $user->id)->where('product_id', $product->id)->exists() : false;
        $cart = $user ? \App\Models\Cart::where('user_id', $user->id)->first() : null;
        $cartCount = $cart ? $cart->items->sum('quantity') : 0;
        $guestCartCount = $user ? 0 : (array_sum(array_column(session()->get('guest_cart', []), 'quantity')));

        $relatedProducts = Product::with(['images'])
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'name' => $p->name,
                    'slug' => $p->slug,
                    'price' => (float) $p->price,
                    'old_price' => $p->old_price ? (float) $p->old_price : null,
                    'image' => $p->images->first()?->image_path
                        ? '/storage/' . $p->images->first()->image_path
                        : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
                    'discount' => $p->old_price ? round((($p->old_price - $p->price) / $p->old_price) * 100) : 0,
                    'rating' => 4.5,
                    'reviews' => 100,
                ];
            });

        return Inertia::render('products/Show', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => (float) $product->price,
                'old_price' => $product->old_price ? (float) $product->old_price : null,
                'discount' => $product->old_price ? round((($product->old_price - $product->price) / $product->old_price) * 100) : 0,
                'description' => $product->description,
                'short_description' => $product->short_description ?? substr($product->description, 0, 150),
                'sku' => $product->sku ?? 'SKU-' . $product->id,
                'stock' => $product->stock ?? 10,
                'is_wishlisted' => $isWishlisted,
                'rating' => $product->reviews->avg('rating') ?? 4.5,
                'reviews_count' => $product->reviews->count(),
                'sold_count' => \App\Models\OrderItem::where('product_id', $product->id)->sum('quantity') ?? 0,
                'images' => $product->images->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'url' => $image->image_path ? '/storage/' . $image->image_path
                            : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop',
                    ];
                }),
                'category' => [
                    'id' => $product->category->id,
                    'name' => $product->category->name,
                    'slug' => $product->category->slug,
                ],
                'additional_info' => [
                    'material' => 'Premium Material',
                    'dimensions' => 'W 84" x D 36" x H 32"',
                    'weight' => '120 lbs',
                    'color' => 'Various',
                    'brand' => 'Furnish',
                ],
            ],
            'reviews' => $product->reviews->map(function ($review) {
                return [
                    'id' => $review->id,
                    'user' => [
                        'name' => $review->user->name,
                        'avatar' => $review->user->avatar ?? null,
                    ],
                    'rating' => (int) $review->rating,
                    'comment' => $review->comment,
                    'date' => $review->created_at->format('Y-m-d'),
                ];
            }),
            'rating_distribution' => [
                5 => $product->reviews->where('rating', 5)->count(),
                4 => $product->reviews->where('rating', 4)->count(),
                3 => $product->reviews->where('rating', 3)->count(),
                2 => $product->reviews->where('rating', 2)->count(),
                1 => $product->reviews->where('rating', 1)->count(),
            ],
            'related_products' => $relatedProducts,
            'auth' => $user ? [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
                'wishlist_count' => $wishlistCount,
                'cart_count' => $cartCount,
            ] : null,
            'cart_count' => $user ? $cartCount : $guestCartCount,
        ]);
    }
}
