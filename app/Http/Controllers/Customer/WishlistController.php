<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = Wishlist::with(['product.images'])
            ->where('user_id', $user->id)
            ->when($request->search, function ($q, $search) {
                $q->whereHas('product', function ($p) use ($search) {
                    $p->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->latest();

        $wishlists = $query->paginate(10)->withQueryString();

        return Inertia::render('customer/Wishlists/Index', [
            'wishlists' => $wishlists->through(function ($wishlist) {
                return [
                    'id' => $wishlist->id,
                    'product' => [
                        'id' => $wishlist->product->id,
                        'name' => $wishlist->product->name,
                        'slug' => $wishlist->product->slug,
                        'price' => $wishlist->product->price,
                        'image' => $wishlist->product->images->first()?->image_path ?? null,
                        'images' => $wishlist->product->images->map(function ($img) {
                            return asset('storage/' . $img->image_path);
                        }),
                    ],
                    'created_at' => $wishlist->created_at?->format('Y-m-d'),
                ];
            }),
            'search' => $request->search,
        ]);
    }

    public function destroy(Wishlist $wishlist)
    {
        $user = Auth::user();

        if ($wishlist->user_id !== $user->id) {
            abort(403, 'Unauthorized access.');
        }

        $wishlist->delete();

        return redirect()->route('customer.wishlists.index')
            ->with('success', 'Product removed from wishlist.');
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = Auth::user();

        $existingWishlist = Wishlist::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($existingWishlist) {
            $existingWishlist->delete();
        } else {
            Wishlist::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
            ]);
        }

        return back();
    }
}
