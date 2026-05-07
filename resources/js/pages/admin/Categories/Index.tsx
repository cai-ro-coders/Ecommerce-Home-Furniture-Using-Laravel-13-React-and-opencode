import { Head, Link, usePage, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Search, Filter } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Category {
    id: number;
    name: string;
    slug: string;
    parent: { id: number; name: string } | null;
    products_count: number;
    created_at: string;
}

interface ParentCategory {
    id: number;
    name: string;
}

interface Props {
    categories: {
        data: Category[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    search: string | null;
    parent_id: string | null;
    parentCategories: ParentCategory[];
}

export default function CategoriesIndex() {
    const { props } = usePage<Props>();
    const { categories, search, parent_id, parentCategories } = props;
    const [searchQuery, setSearchQuery] = useState(search || '');
    const [selectedParent, setSelectedParent] = useState(parent_id || '');

    function handleFilter(e: FormEvent) {
        e.preventDefault();
        router.get('/admin/categories', { search: searchQuery, parent_id: selectedParent || null }, { preserveState: true });
    }

    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(`/admin/categories/${id}`);
        }
    }

    function handlePageChange(url: string | null) {
        if (url) {
            router.get(url);
        }
    }

    return (
        <>
            <Head title="Categories" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Categories</h1>
                    <Link href="/admin/categories/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Category
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFilter} className="mb-4 flex flex-wrap gap-2">
                            <Input
                                type="text"
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="max-w-sm"
                            />
                            <select
                                value={selectedParent}
                                onChange={(e) => setSelectedParent(e.target.value)}
                                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            >
                                <option value="">All Parents</option>
                                <option value="none">No Parent</option>
                                {parentCategories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <Button type="submit" variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </form>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/50 text-xs uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Parent</th>
                                        <th className="px-4 py-3 text-right">Products</th>
                                        <th className="px-4 py-3">Created</th>
                                        <th className="px-4 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.data.map((category) => (
                                        <tr key={category.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3 font-medium">{category.name}</td>
                                            <td className="px-4 py-3">{category.parent?.name ?? '-'}</td>
                                            <td className="px-4 py-3 text-right">{category.products_count}</td>
                                            <td className="px-4 py-3">{category.created_at}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link href={`/admin/categories/${category.id}/edit`}>
                                                        <Button variant="ghost" size="icon">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {categories.data.length === 0 && (
                                <div className="py-8 text-center text-muted-foreground">
                                    No categories found
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing {categories.data.length} of {categories.total} categories
                            </div>
                            <div className="flex gap-1">
                                {categories.links.map((link, index) => (
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

CategoriesIndex.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: '/admin/dashboard' },
        { title: 'Categories', href: '/admin/categories' },
    ],
};