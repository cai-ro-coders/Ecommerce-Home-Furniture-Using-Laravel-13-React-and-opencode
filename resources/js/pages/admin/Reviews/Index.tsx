import { Head, Link, usePage, router } from '@inertiajs/react';
import { Trash2, Search, Star, Filter } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Review {
    id: number;
    rating: number;
    comment: string | null;
    user: {
        id: number;
        name: string;
        email: string;
    };
    product: {
        id: number;
        name: string;
        image: string | null;
    };
    created_at: string;
}

interface Props {
    reviews: {
        data: Review[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    search: string | null;
    rating: string | null;
}

export default function ReviewsIndex() {
    const { props } = usePage<Props>();
    const { reviews, search, rating } = props;
    const [searchQuery, setSearchQuery] = useState(search || '');
    const [selectedRating, setSelectedRating] = useState(rating || '');

    function handleFilter(e: FormEvent) {
        e.preventDefault();
        router.get('/admin/reviews', { search: searchQuery, rating: selectedRating || null }, { preserveState: true });
    }

    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this review?')) {
            router.delete(`/admin/reviews/${id}`);
        }
    }

    function handlePageChange(url: string | null) {
        if (url) {
            router.get(url);
        }
    }

    function renderStars(rating: number) {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>
        );
    }

    return (
        <>
            <Head title="Reviews" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Product Reviews</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFilter} className="mb-4 flex flex-wrap gap-2">
                            <Input
                                type="text"
                                placeholder="Search by comment, user, or product..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="max-w-sm"
                            />
                            <select
                                value={selectedRating}
                                onChange={(e) => setSelectedRating(e.target.value)}
                                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            >
                                <option value="">All Ratings</option>
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
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
                                        <th className="px-4 py-3">Rating</th>
                                        <th className="px-4 py-3">Product</th>
                                        <th className="px-4 py-3">User</th>
                                        <th className="px-4 py-3">Comment</th>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviews.data.map((review) => (
                                        <tr key={review.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3">
                                                {renderStars(review.rating)}
                                            </td>
                                            <td className="px-4 py-3 font-medium">
                                                <div className="flex items-center gap-3">
                                                    {review.product.image ? (
                                                        <img src={review.product.image} alt={review.product.name} className="h-10 w-10 rounded-md object-cover" />
                                                    ) : (
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">No img</div>
                                                    )}
                                                    <span>{review.product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div>
                                                    <div>{review.user.name}</div>
                                                    <div className="text-xs text-muted-foreground">{review.user.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 max-w-xs truncate">
                                                {review.comment || '-'}
                                            </td>
                                            <td className="px-4 py-3">{review.created_at}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center">
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(review.id)}>
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {reviews.data.length === 0 && (
                                <div className="py-8 text-center text-muted-foreground">
                                    No reviews found
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing {reviews.data.length} of {reviews.total} reviews
                            </div>
                            <div className="flex gap-1">
                                {reviews.links.map((link, index) => (
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

ReviewsIndex.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: '/admin/dashboard' },
        { title: 'Reviews', href: '/admin/reviews' },
    ],
};