<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = Review::with(['product.images'])
            ->where('user_id', $user->id)
            ->when($request->search, function ($q, $search) {
                $q->where(function ($sub) use ($search) {
                    $sub->where('comment', 'like', "%{$search}%")
                        ->orWhereHas('product', function ($p) use ($search) {
                            $p->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->when($request->rating, function ($q) use ($request) {
                $q->where('rating', (int) $request->rating);
            })
            ->latest();

        $reviews = $query->paginate(10)->withQueryString();

        $paidOrders = Order::with(['items.product.images'])
            ->where('user_id', $user->id)
            ->where('status', 'paid')
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'items' => $order->items->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'product_id' => $item->product_id,
                            'name' => $item->product->name,
                            'slug' => $item->product->slug,
                            'image' => $item->product->images->first()?->image_path ?? null,
                            'price' => $item->price,
                            'quantity' => $item->quantity,
                        ];
                    }),
                ];
            });

        return Inertia::render('customer/Reviews/Index', [
            'reviews' => $reviews->through(function ($review) {
                return [
                    'id' => $review->id,
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'product' => [
                        'id' => $review->product->id,
                        'name' => $review->product->name,
                        'slug' => $review->product->slug,
                        'image' => $review->product->images->first()?->image_path ?? null,
                        'images' => $review->product->images->map(function ($img) {
                            return asset('storage/' . $img->image_path);
                        }),
                    ],
                    'created_at' => $review->created_at?->format('Y-m-d H:i'),
                ];
            }),
            'search' => $request->search,
            'rating' => $request->rating,
            'paid_orders' => $paidOrders,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $user = Auth::user();

        $existingReview = Review::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($existingReview) {
            return back()->with('error', 'You have already reviewed this product.');
        }

        Review::create([
            'user_id' => $user->id,
            'product_id' => $request->product_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return back()->with('success', 'Review added successfully.');
    }

    public function destroy(Review $review)
    {
        $user = Auth::user();

        if ($review->user_id !== $user->id) {
            abort(403, 'Unauthorized access.');
        }

        $review->delete();

        return redirect()->route('customer.reviews.index')
            ->with('success', 'Review deleted successfully.');
    }

    public function update(Request $request, Review $review)
    {
        $user = Auth::user();

        if ($review->user_id !== $user->id) {
            abort(403, 'Unauthorized access.');
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review->update([
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return back()->with('success', 'Review updated successfully.');
    }
}
