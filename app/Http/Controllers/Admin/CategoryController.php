<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::with(['parent', 'products'])
            ->when($request->search, function ($q, $search) {
                $q->where('name', 'like', "%{$search}%");
            })
            ->when($request->parent_id === 'none', function ($q) {
                $q->whereNull('parent_id');
            })
            ->when($request->parent_id && $request->parent_id !== 'none', function ($q) use ($request) {
                $q->where('parent_id', (int) $request->parent_id);
            })
            ->latest();

        $categories = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/Categories/Index', [
            'categories' => $categories->through(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'parent' => $category->parent ? ['id' => $category->parent->id, 'name' => $category->parent->name] : null,
                    'products_count' => $category->products->count(),
                    'created_at' => $category->created_at?->format('Y-m-d'),
                ];
            }),
            'search' => $request->search,
            'parent_id' => $request->parent_id,
            'parentCategories' => Category::whereNull('parent_id')->select('id', 'name')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/Categories/Create', [
            'categories' => Category::whereNull('parent_id')->select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        Category::create($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function edit(Category $category)
    {
        return Inertia::render('admin/Categories/Edit', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'parent_id' => $category->parent_id,
            ],
            'categories' => Category::where('id', '!=', $category->id)
                ->whereNull('parent_id')
                ->select('id', 'name')
                ->get(),
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $category->update($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category)
    {
        if ($category->products()->exists()) {
            return back()->withErrors(['error' => 'Cannot delete category with existing products.']);
        }

        if ($category->children()->exists()) {
            return back()->withErrors(['error' => 'Cannot delete category with subcategories. Remove subcategories first.']);
        }

        $category->delete();

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category deleted successfully.');
    }
}