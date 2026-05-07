import { Head, usePage, router } from '@inertiajs/react';
import { Search, Trash2 } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface WishlistItem {
    id: number;
    product: {
        id: number;
        name: string;
        slug: string;
        price: number;
        image: string | null;
        images: string[];
    };
    created_at: string;
}

interface Props {
    wishlists: {
        data: WishlistItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    search: string | null;
}

export default function CustomerWishlistsIndex() {
    const { props } = usePage<Props>();
    const { wishlists, search } = props;
    const [searchQuery, setSearchQuery] = useState(search || '');

    function handleSearch(e: FormEvent) {
        e.preventDefault();
        router.get('/customer/wishlists', { search: searchQuery }, { preserveState: true });
    }

    function handleDelete(id: number) {
        if (confirm('Remove this product from your wishlist?')) {
            router.delete(`/customer/wishlists/${id}`);
        }
    }

    function handlePageChange(url: string | null) {
        if (url) {
            router.get(url);
        }
    }

    function goToProduct(slug: string) {
        console.log(slug);
        router.visit(`/product/${slug}`);
    }

    return (
        <>
            <Head title="My Wishlists" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">My Wishlists</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Wishlist Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                            <Input
                                type="text"
                                placeholder="Search by product name or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="max-w-sm"
                            />
                            <Button type="submit" variant="outline">
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </form>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/50 text-xs uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Product</th>
                                        <th className="px-4 py-3 text-right">Price</th>
                                        <th className="px-4 py-3">Added Date</th>
                                        <th className="px-4 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishlists.data.map((item) => (
                                        <tr key={item.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                     {item.product.image ? (
                                                         <img
                                                             src={`/storage/${item.product.image}`}
                                                             alt={item.product.name}
                                                             className="h-12 w-12 rounded object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                                             onClick={() => goToProduct(item.product.slug)}
                                                         />
                                                     ) : (
                                                         <div className="h-12 w-12 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                                             N/A
                                                         </div>
                                                     )}
                                                     <span
                                                         className="font-medium cursor-pointer hover:underline"
                                                         onClick={() => goToProduct(item.product.slug)}
                                                     >
                                                         {item.product.name}
                                                     </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                ${Number(item.product.price).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.created_at}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center">
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {wishlists.data.length === 0 && (
                                <div className="py-8 text-center text-muted-foreground">
                                    No wishlist items found
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing {wishlists.data.length} of {wishlists.total} items
                            </div>
                            <div className="flex gap-1">
                                {wishlists.links.map((link, index) => (
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

CustomerWishlistsIndex.layout = {
    breadcrumbs: [
        { title: 'Customer Dashboard', href: '/customer/dashboard' },
        { title: 'My Wishlists', href: '/customer/wishlists' },
    ],
};
