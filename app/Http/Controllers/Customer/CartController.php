<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            return $this->indexForUser();
        } else {
            return $this->indexForGuest();
        }
    }

    public function addToCart(\Illuminate\Http\Request $request)
    {
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity', 1);

        $product = \App\Models\Product::findOrFail($productId);

        if (Auth::check()) {
            return $this->addToCartForUser($product, $quantity);
        } else {
            return $this->addToCartForGuest($product, $quantity);
        }
    }

    public function removeItem($itemId)
    {
        if (Auth::check()) {
            return $this->removeItemForUser($itemId);
        } else {
            return $this->removeItemForGuest($itemId);
        }
    }

    public function updateQuantity(\Illuminate\Http\Request $request, $itemId)
    {
        if (Auth::check()) {
            return $this->updateQuantityForUser($request, $itemId);
        } else {
            return $this->updateQuantityForGuest($request, $itemId);
        }
    }

    private function indexForUser()
    {
        $user = Auth::user();

        $cart = \App\Models\Cart::with(['items.product.images', 'items.product.category'])
            ->where('user_id', $user->id)
            ->first();

        $cartItems = [];
        $subtotal = 0;

        if ($cart && $cart->items) {
            foreach ($cart->items as $item) {
                $product = $item->product;
                $image = $product && $product->images->first()?->image_path
                    ? '/storage/' . $product->images->first()->image_path
                    : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop';

                $itemTotal = $item->price * $item->quantity;
                $subtotal += $itemTotal;

                $cartItems[] = [
                    'id' => $item->id,
                    'quantity' => $item->quantity,
                    'price' => (float) $item->price,
                    'product' => [
                        'id' => $product->id ?? 0,
                        'name' => $product->name ?? 'Unknown Product',
                        'slug' => $product->slug ?? '',
                        'stock' => $product->stock ?? 0,
                        'image' => $image,
                        'category' => $product->category ? [
                            'name' => $product->category->name,
                        ] : null,
                    ],
                ];
            }
        }

        $wishlistCount = \App\Models\Wishlist::where('user_id', $user->id)->count();
        $cartCount = $cart ? $cart->items->sum('quantity') : 0;

        return inertia('Cart', [
            'cart' => [
                'items' => $cartItems,
                'subtotal' => $subtotal,
                'item_count' => count($cartItems),
            ],
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
                'wishlist_count' => $wishlistCount,
                'cart_count' => $cartCount,
            ],
        ]);
    }

    private function indexForGuest()
    {
        $guestCart = session()->get('guest_cart', []);

        $cartItems = [];
        $subtotal = 0;

        foreach ($guestCart as $productId => $item) {
            $product = \App\Models\Product::with(['images', 'category'])->find($productId);

            if (!$product) {
                continue;
            }

            $image = $product->images->first()?->image_path
                ? '/storage/' . $product->images->first()->image_path
                : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop';

            $itemTotal = $item['price'] * $item['quantity'];
            $subtotal += $itemTotal;

            $cartItems[] = [
                'id' => 'guest_' . $productId,
                'quantity' => $item['quantity'],
                'price' => (float) $item['price'],
                'product' => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'stock' => $product->stock,
                    'image' => $image,
                    'category' => $product->category ? [
                        'name' => $product->category->name,
                    ] : null,
                ],
            ];
        }

        $guestCart = session()->get('guest_cart', []);
        $cartCount = array_sum(array_column($guestCart, 'quantity'));

        return inertia('Cart', [
            'cart' => [
                'items' => $cartItems,
                'subtotal' => $subtotal,
                'item_count' => count($cartItems),
            ],
            'auth' => null,
            'cart_count' => $cartCount,
        ]);
    }

    private function addToCartForUser($product, $quantity)
    {
        $user = Auth::user();

        $cart = \App\Models\Cart::firstOrCreate(['user_id' => $user->id]);

        $existingItem = \App\Models\CartItem::where('cart_id', $cart->id)
            ->where('product_id', $product->id)
            ->first();

        if ($existingItem) {
            $existingItem->quantity += $quantity;
            $existingItem->save();
        } else {
            \App\Models\CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
            ]);
        }

        return redirect()->route('cart')->with('success', 'Product added to cart');
    }

    private function addToCartForGuest($product, $quantity)
    {
        $guestCart = session()->get('guest_cart', []);

        if (isset($guestCart[$product->id])) {
            $guestCart[$product->id]['quantity'] += $quantity;
        } else {
            $guestCart[$product->id] = [
                'quantity' => $quantity,
                'price' => $product->price,
            ];
        }

        session()->put('guest_cart', $guestCart);

        return redirect()->route('cart')->with('success', 'Product added to cart');
    }

    private function removeItemForUser($itemId)
    {
        $user = Auth::user();

        $cart = \App\Models\Cart::where('user_id', $user->id)->first();

        if ($cart) {
            \App\Models\CartItem::where('cart_id', $cart->id)
                ->where('id', $itemId)
                ->delete();
        }

        return redirect()->route('cart');
    }

    private function removeItemForGuest($itemId)
    {
        $productId = (int) str_replace('guest_', '', $itemId);

        $guestCart = session()->get('guest_cart', []);

        if (isset($guestCart[$productId])) {
            unset($guestCart[$productId]);
            session()->put('guest_cart', $guestCart);
        }

        return redirect()->route('cart');
    }

    private function updateQuantityForUser(\Illuminate\Http\Request $request, $itemId)
    {
        $user = Auth::user();

        $cart = \App\Models\Cart::where('user_id', $user->id)->first();

        if ($cart) {
            $item = \App\Models\CartItem::where('cart_id', $cart->id)
                ->where('id', $itemId)
                ->first();

            if ($item) {
                $item->quantity = $request->input('quantity', 1);
                $item->save();
            }
        }

        return redirect()->route('cart');
    }

    private function updateQuantityForGuest(\Illuminate\Http\Request $request, $itemId)
    {
        $productId = (int) str_replace('guest_', '', $itemId);
        $quantity = $request->input('quantity', 1);

        $guestCart = session()->get('guest_cart', []);

        if (isset($guestCart[$productId])) {
            $guestCart[$productId]['quantity'] = $quantity;
            session()->put('guest_cart', $guestCart);
        }

        return redirect()->route('cart');
    }
}
