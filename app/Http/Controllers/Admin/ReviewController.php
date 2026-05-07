<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $query = Review::with(['user', 'product.images'])
            ->when($request->search, function ($q, $search) {
                $q->where(function ($sub) use ($search) {
                    $sub->where('comment', 'like', "%{$search}%")
                        ->orWhereHas('user', function ($u) use ($search) {
                            $u->where('name', 'like', "%{$search}%");
                        })
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

        return Inertia::render('admin/Reviews/Index', [
            'reviews' => $reviews->through(function ($review) {
                $firstImage = $review->product->images->first();
                return [
                    'id' => $review->id,
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'user' => [
                        'id' => $review->user->id,
                        'name' => $review->user->name,
                        'email' => $review->user->email,
                    ],
                    'product' => [
                        'id' => $review->product->id,
                        'name' => $review->product->name,
                        'image' => $firstImage ? asset('storage/' . $firstImage->image_path) : null,
                    ],
                    'created_at' => $review->created_at?->format('Y-m-d H:i'),
                ];
            }),
            'search' => $request->search,
            'rating' => $request->rating,
        ]);
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return redirect()->route('admin.reviews.index')
            ->with('success', 'Review deleted successfully.');
    }
}
