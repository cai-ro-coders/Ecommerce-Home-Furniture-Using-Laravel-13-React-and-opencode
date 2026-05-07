import { Head, Link, usePage, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Search, Filter } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: string;
    stock: number;
    description: string | null;
    category: { id: number; name: string } | null;
    images: string[];
}

interface Category {
    id: number;
    name: string;
}

interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    search: string | null;
    category_id: string | null;
    categories: Category[];
}

export default function ProductsIndex() {
    const { props } = usePage<Props>();
    const { products, search, categories, category_id } = props;
    const [searchQuery, setSearchQuery] = useState(search || '');
    const [selectedCategory, setSelectedCategory] = useState<string>(category_id || '');

    function handleSearch(e: FormEvent) {
        e.preventDefault();
        const params: Record<string, string> = {};

        if (searchQuery) {
params.search = searchQuery;
}

        if (selectedCategory) {
params.category_id = selectedCategory;
}

        router.get('/admin/products', params, { preserveState: true });
    }

    function handleClearFilters() {
        setSearchQuery('');
        setSelectedCategory('');
        router.get('/admin/products', {}, { preserveState: true });
    }

    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/admin/products/${id}`);
        }
    }

    function handlePageChange(url: string | null) {
        if (url) {
            router.get(url);
        }
    }

    const hasFilters = searchQuery || selectedCategory;

    return (
        <>
            <Head title="Products" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Products</h1>
                    <Link href="/admin/products/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="mb-4 flex flex-wrap gap-2 items-end">
                            <div className="flex-1 min-w-[200px]">
                                <label className="mb-1 block text-sm font-medium">Search</label>
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="w-[200px]">
                                <label className="mb-1 block text-sm font-medium">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" variant="outline">
                                    <Search className="mr-2 h-4 w-4" />
                                    Search
                                </Button>
                                {hasFilters && (
                                    <Button type="button" variant="ghost" onClick={handleClearFilters}>
                                        <Filter className="mr-2 h-4 w-4" />
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </form>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/50 text-xs uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Image</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Category</th>
                                        <th className="px-4 py-3 text-right">Price</th>
                                        <th className="px-4 py-3 text-right">Stock</th>
                                        <th className="px-4 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr key={product.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3">
                                                {product.images.length > 0 ? (
                                                    <img
                                                        src={`/storage/${product.images[0]}`}
                                                        alt={product.name}
                                                        className="h-12 w-12 rounded object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-12 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                                        No Image
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 font-medium">{product.name}</td>
                                            <td className="px-4 py-3">{product.category?.name ?? '-'}</td>
                                            <td className="px-4 py-3 text-right">${Number(product.price).toLocaleString()}</td>
                                            <td className="px-4 py-3 text-right">{product.stock}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link href={`/admin/products/${product.id}/edit`}>
                                                        <Button variant="ghost" size="icon">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {products.data.length === 0 && (
                                <div className="py-8 text-center text-muted-foreground">
                                    No products found
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing {products.data.length} of {products.total} products
                            </div>
                            <div className="flex gap-1">
                                {products.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(link.url)}
                                        disabled={!link.url}
                                        className={`rounded-md px-3 py-1.5 text-sm ${
                                            link.active
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted hover:bg-muted/80'
                                        } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                    >
                                        {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ProductsIndex.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: '/admin/dashboard' },
        { title: 'Products', href: '/admin/products' },
    ],
};