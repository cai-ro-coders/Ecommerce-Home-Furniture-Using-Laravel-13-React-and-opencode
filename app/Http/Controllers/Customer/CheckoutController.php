<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Stripe\StripeClient;

class CheckoutController extends Controller
{
    protected function getStripeClient(): StripeClient
    {
        $secretKey = $this->getSetting('stripe_secret_key');
        return new StripeClient($secretKey);
    }

    protected function getSetting($key)
    {
        $setting = DB::table('settings')->where('key', $key)->first();
        return $setting?->value ?? '';
    }

    public function isStripeActive(): bool
    {
        return $this->getSetting('stripe_status') === 'active';
    }

    public function createPaymentIntent(Request $request)
    {
        if (!$this->isStripeActive()) {
            return response()->json(['error' => 'Stripe payments are not active'], 400);
        }

        $secretKey = $this->getSetting('stripe_secret_key');
        if (!$secretKey) {
            return response()->json(['error' => 'Stripe is not configured'], 400);
        }

        $total = $request->input('total', 0);
        $totalCents = (int) round($total * 100);

        $stripe = new StripeClient($secretKey);
        $paymentIntent = $stripe->paymentIntents->create([
            'amount' => $totalCents,
            'currency' => 'usd',
            'payment_method_types' => ['card'],
        ]);

        return response()->json([
            'client_secret' => $paymentIntent->client_secret,
        ]);
    }

    public function processStripePayment(Request $request)
    {
        if (!$this->isStripeActive()) {
            return response()->json(['error' => 'Stripe payments are not active'], 400);
        }

        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Please login to complete purchase'], 401);
        }

        $request->validate([
            'billing.first_name' => 'required|string|max:255',
            'billing.last_name' => 'required|string|max:255',
            'billing.email' => 'required|email',
            'billing.phone' => 'required|string',
            'shipping.address' => 'required|string',
            'shipping.city' => 'required|string',
            'shipping.postal_code' => 'required|string',
            'shipping.method' => 'required|in:delivery,pickup',
            'payment_intent_id' => 'required|string',
        ]);

        $subtotal = $request->input('subtotal', 0);
        $shippingCost = $request->input('shipping_cost', 0);
        $total = $subtotal + $shippingCost;

        $shipping_address = $request->input('shipping.address') . ', ' . $request->input('shipping.city') . ', ' . $request->input('shipping.postal_code');

        $order = \App\Models\Order::create([
            'user_id' => $user->id,
            'order_number' => 'ORD-' . strtoupper(uniqid()),
            'billing_data' => $request->input('billing'),
            'shipping_data' => $request->input('shipping'),
            'payment_method' => 'stripe',
            'subtotal' => $subtotal,
            'shipping_cost' => $shippingCost,
            'total' => $total,
            'total_amount' => $total,
            'status' => 'paid',
            'shipping_address' => $shipping_address,
        ]);

        $cart = \App\Models\Cart::where('user_id', $user->id)->first();
        if ($cart && $cart->items) {
            foreach ($cart->items as $item) {
                \App\Models\OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                ]);
            }
            $cart->items()->delete();
        }

        \App\Models\Payment::create([
            'order_id' => $order->id,
            'payment_method' => 'stripe',
            'amount' => $total,
            'status' => 'completed',
            'transaction_id' => $request->input('payment_intent_id'),
        ]);

        return response()->json(['success' => true, 'order_id' => $order->id]);
    }

    public function index()
    {
        $user = Auth::user();

        if ($user) {
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

                    $cartItems[] = [
                        'id' => $item->id,
                        'quantity' => $item->quantity,
                        'price' => (float) $item->price,
                        'product' => [
                            'id' => $product->id ?? 0,
                            'name' => $product->name ?? 'Unknown Product',
                            'slug' => $product->slug ?? '',
                            'image' => $image,
                        ],
                    ];
                    $subtotal += $item->price * $item->quantity;
                }
            }
        } else {
            $guestCart = session()->get('guest_cart', []);
            $cartItems = [];
            $subtotal = 0;

            foreach ($guestCart as $productId => $item) {
                $product = \App\Models\Product::with(['images'])->find($productId);
                if (!$product) continue;

                $image = $product->images->first()?->image_path
                    ? '/storage/' . $product->images->first()->image_path
                    : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop';

                $cartItems[] = [
                    'id' => 'guest_' . $productId,
                    'quantity' => $item['quantity'],
                    'price' => (float) $item['price'],
                    'product' => [
                        'id' => $product->id,
                        'name' => $product->name,
                        'slug' => $product->slug,
                        'image' => $image,
                    ],
                ];
                $subtotal += $item['price'] * $item['quantity'];
            }
        }

        $shipping = $subtotal >= 500 ? 0 : 50;
        $total = $subtotal + $shipping;

        $cartCount = collect($cartItems)->sum('quantity');

        return Inertia::render('checkout', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'total' => $total,
            'cart_count' => $cartCount,
            'stripe_key' => $this->getSetting('stripe_publishable_key'),
            'stripe_active' => $this->isStripeActive(),
            'auth' => $user ? [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone ?? '',
                    'address' => $user->address ?? '',
                ],
                'cart_count' => $cartCount,
            ] : null,
        ]);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $user = Auth::user();
        $userId = $user?->id;
        if (!$userId) {
            return redirect()->route('register')->with('error', 'Please register or login to proceed with checkout.');
        }

        $request->validate([
            'billing.first_name' => 'required|string|max:255',
            'billing.last_name' => 'required|string|max:255',
            'billing.email' => 'required|email',
            'billing.phone' => 'required|string',
            'shipping.address' => 'required|string',
            'shipping.city' => 'required|string',
            'shipping.postal_code' => 'required|string',
            'shipping.method' => 'required|in:delivery,pickup',
            'payment.method' => 'required|in:credit_card,paypal,cash',
        ]);

        $subtotal = $request->input('subtotal', 0);
        $shippingCost = $request->input('shipping_cost', 0);
        $total = $subtotal + $shippingCost;

        $shipping_address = $request->input('shipping.address') . ', ' . $request->input('shipping.city') . ', ' . $request->input('shipping.postal_code');

        $order = \App\Models\Order::create([
            'user_id' => $user?->id,
            'order_number' => 'ORD-' . strtoupper(uniqid()),
            'billing_data' => $request->input('billing'),
            'shipping_data' => $request->input('shipping'),
            'payment_method' => $request->input('payment.method'),
            'subtotal' => $subtotal,
            'shipping_cost' => $shippingCost,
            'total' => $total,
            'total_amount' => $total,
            'status' => $request->input('payment.method') === 'credit_card' ? 'paid' : 'pending',
            'shipping_address' => $shipping_address,
        ]);

        if ($user) {
            $cart = \App\Models\Cart::where('user_id', $user->id)->first();
            if ($cart && $cart->items) {
                foreach ($cart->items as $item) {
                    \App\Models\OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                    ]);
                }
                $cart->items()->delete();
            }
        } else {
            $guestCart = session()->get('guest_cart', []);
            foreach ($guestCart as $productId => $item) {
                \App\Models\OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $productId,
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }
            session()->forget('guest_cart');
        }

        $transactionId = $request->input('stripe_payment_intent') 
            ? $request->input('stripe_payment_intent') 
            : 'TXN-' . strtoupper(uniqid());

        \App\Models\Payment::create([
            'order_id' => $order->id,
            'payment_method' => $request->input('payment.method'),
            'amount' => $total,
            'status' => $request->input('payment.method') === 'credit_card' ? 'completed' : 'pending',
            'transaction_id' => $transactionId,
        ]);

        return redirect()->route('checkout.success', ['order' => $order->id]);
    }

    public function success($orderId)
    {
        $order = \App\Models\Order::findOrFail($orderId);
        return Inertia::render('checkout-success', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'total' => $order->total,
            ],
        ]);
    }
}