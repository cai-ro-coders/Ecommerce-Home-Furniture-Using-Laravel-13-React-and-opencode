<?php

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/', function () {
    $categories = \App\Models\Category::select('id', 'name', 'slug', 'image')
        ->with('children:id,name,slug,parent_id,image')
        ->limit(8)
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
                    $childImage = $child->image;
                    if (!$childImage) {
                        $childImage = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop';
                    } elseif (!str_starts_with($childImage, 'http')) {
                        $childImage = '/storage/' . $childImage;
                    }
                    return [
                        'id' => $child->id,
                        'name' => $child->name,
                        'slug' => $child->slug,
                        'image' => $childImage,
                    ];
                }),
            ];
        });

    $products = \App\Models\Product::with(['images', 'reviews'])
        ->limit(8)
        ->get()
        ->map(function ($product) {
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
                'oldPrice' => $product->old_price ? (float) $product->old_price : null,
                'image' => $image,
                'discount' => $product->old_price ? round((($product->old_price - $product->price) / $product->old_price) * 100) : 0,
            ];
        });

    $user = auth()->user();
    $wishlistCount = $user ? \App\Models\Wishlist::where('user_id', $user->id)->count() : 0;
    $cart = $user ? \App\Models\Cart::where('user_id', $user->id)->first() : null;
    $cartCount = $cart ? $cart->items->sum('quantity') : 0;

    $guestCart = session()->get('guest_cart', []);
    $guestCartCount = array_sum(array_column($guestCart, 'quantity'));

    return inertia('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'categories' => $categories,
        'products' => $products,
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
})->name('home');

Route::get('/products', [\App\Http\Controllers\ProductController::class, 'index'])->name('products');

Route::get('/product/{slug}', [\App\Http\Controllers\ProductController::class, 'show'])->name('product.show');

Route::get('/cart', [\App\Http\Controllers\Customer\CartController::class, 'index'])->name('cart');
Route::post('/cart/add', [\App\Http\Controllers\Customer\CartController::class, 'addToCart'])->name('cart.add');
Route::delete('/cart/{item}', [\App\Http\Controllers\Customer\CartController::class, 'removeItem'])->name('cart.remove');
Route::post('/cart/{item}/update', [\App\Http\Controllers\Customer\CartController::class, 'updateQuantity'])->name('cart.update');
Route::get('/checkout', [\App\Http\Controllers\Customer\CheckoutController::class, 'index'])->name('checkout');
Route::post('/checkout', [\App\Http\Controllers\Customer\CheckoutController::class, 'store'])->name('checkout.store');
Route::post('/checkout/create-payment-intent', [\App\Http\Controllers\Customer\CheckoutController::class, 'createPaymentIntent'])->name('checkout.createPaymentIntent');
Route::post('/checkout/process-stripe', [\App\Http\Controllers\Customer\CheckoutController::class, 'processStripePayment'])->name('checkout.processStripe');
Route::get('/checkout/success/{order}', [\App\Http\Controllers\Customer\CheckoutController::class, 'success'])->name('checkout.success');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/customer/wishlists', function () {
        return inertia('customer/Wishlists/Index');
    })->name('customer.wishlists');

    Route::get('/redirect-dashboard', function () {
        $user = auth()->user();
        if ($user->role === 'admin') {
            return redirect()->to('/admin/dashboard');
        }
        return redirect()->to('/customer/dashboard');
    })->name('redirect-dashboard');

    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::resource('/admin/products', \App\Http\Controllers\Admin\ProductController::class)
            ->names([
                'index' => 'admin.products.index',
                'create' => 'admin.products.create',
                'store' => 'admin.products.store',
                'edit' => 'admin.products.edit',
                'update' => 'admin.products.update',
                'destroy' => 'admin.products.destroy',
            ]);
        Route::resource('/admin/orders', \App\Http\Controllers\Admin\OrderController::class)
            ->names([
                'index' => 'admin.orders.index',
                'create' => 'admin.orders.create',
                'store' => 'admin.orders.store',
                'edit' => 'admin.orders.edit',
                'update' => 'admin.orders.update',
                'destroy' => 'admin.orders.destroy',
            ])->except(['show']);
        Route::get('/admin/orders/{order}/print', [\App\Http\Controllers\Admin\OrderController::class, 'print'])->name('admin.orders.print');
        Route::resource('/admin/customers', \App\Http\Controllers\Admin\CustomerController::class)
            ->names([
                'index' => 'admin.customers.index',
                'create' => 'admin.customers.create',
                'store' => 'admin.customers.store',
                'edit' => 'admin.customers.edit',
                'update' => 'admin.customers.update',
                'destroy' => 'admin.customers.destroy',
            ]);
        Route::resource('/admin/categories', \App\Http\Controllers\Admin\CategoryController::class)
            ->names([
                'index' => 'admin.categories.index',
                'create' => 'admin.categories.create',
                'store' => 'admin.categories.store',
                'edit' => 'admin.categories.edit',
                'update' => 'admin.categories.update',
                'destroy' => 'admin.categories.destroy',
            ]);
        Route::resource('/admin/reviews', \App\Http\Controllers\Admin\ReviewController::class)
            ->only(['index', 'destroy'])
            ->names([
                'index' => 'admin.reviews.index',
                'destroy' => 'admin.reviews.destroy',
            ]);
        Route::get('/admin/settings/payment', [\App\Http\Controllers\Admin\SettingsController::class, 'index'])->name('admin.settings.payment');
        Route::post('/admin/settings/payment', [\App\Http\Controllers\Admin\SettingsController::class, 'update'])->name('admin.settings.payment.update');
    });

    Route::middleware('role:customer')->group(function () {
        Route::get('/customer/dashboard', [\App\Http\Controllers\Customer\DashboardController::class, 'index'])->name('customer.dashboard');
        Route::resource('/customer/orders', \App\Http\Controllers\Customer\OrderController::class)
            ->only(['index', 'show'])
            ->names([
                'index' => 'customer.orders.index',
                'show' => 'customer.orders.show',
            ]);
        Route::resource('/customer/wishlists', \App\Http\Controllers\Customer\WishlistController::class)
            ->only(['index', 'store', 'destroy'])
            ->names([
                'index' => 'customer.wishlists.index',
                'store' => 'customer.wishlists.store',
                'destroy' => 'customer.wishlists.destroy',
            ]);
        Route::resource('/customer/reviews', \App\Http\Controllers\Customer\ReviewController::class)
            ->only(['index', 'store', 'update', 'destroy'])
            ->names([
                'index' => 'customer.reviews.index',
                'store' => 'customer.reviews.store',
                'update' => 'customer.reviews.update',
                'destroy' => 'customer.reviews.destroy',
            ]);
    });
});

require __DIR__.'/settings.php';
