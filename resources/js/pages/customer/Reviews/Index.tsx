import { Head, usePage, router } from '@inertiajs/react';
import { Search, Star, Trash2, Filter, X, ChevronLeft, ChevronRight, Edit3, Plus } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface Review {
    id: number;
    rating: number;
    comment: string | null;
    product: {
        id: number;
        name: string;
        slug: string;
        image: string | null;
        images: string[];
    };
    created_at: string;
}

interface OrderItem {
    id: number;
    product_id: number;
    name: string;
    slug: string;
    image: string | null;
    price: number;
    quantity: number;
}

interface Order {
    id: number;
    order_number: string;
    items: OrderItem[];
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
    paid_orders: Order[];
}

export default function CustomerReviewsIndex() {
    const { props } = usePage<Props>();
    const { reviews, search, rating, paid_orders } = props;
    const [searchQuery, setSearchQuery] = useState(search || '');
    const [selectedRating, setSelectedRating] = useState(rating || '');
    const [selectedItem, setSelectedItem] = useState<Review | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [editReview, setEditReview] = useState<Review | null>(null);
    const [editRating, setEditRating] = useState(5);
    const [editComment, setEditComment] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState('');

    function handleFilter(e: FormEvent) {
        e.preventDefault();
        router.get('/customer/reviews', { search: searchQuery, rating: selectedRating || null }, { preserveState: true });
    }

    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this review?')) {
            router.delete(`/customer/reviews/${id}`);
        }
    }

    function handlePageChange(url: string | null) {
        if (url) {
            router.get(url);
        }
    }

    function goToProduct(slug: string) {
        router.visit(`/product/${slug}`);
    }

    function openProductModal(item: Review) {
        setSelectedItem(item);
        setCurrentImageIndex(0);
    }

    function closeProductModal() {
        setSelectedItem(null);
    }

    function openEditModal(review: Review) {
        setEditReview(review);
        setEditRating(review.rating);
        setEditComment(review.comment || '');
    }

    function closeEditModal() {
        setEditReview(null);
    }

    function handleUpdateReview() {
        if (editReview) {
            router.put(`/customer/reviews/${editReview.id}`, {
                rating: editRating,
                comment: editComment,
            }, {
                onSuccess: () => {
                    closeEditModal();
                }
            });
        }
    }

    function openAddModal() {
        setShowAddModal(true);
        setSelectedOrderId(null);
        setSelectedProductId(null);
        setNewRating(5);
        setNewComment('');
    }

    function closeAddModal() {
        setShowAddModal(false);
    }

    function handleAddReview() {
        if (!selectedProductId) {
            alert('Please select a product to review');
            return;
        }
        router.post('/customer/reviews', {
            product_id: selectedProductId,
            rating: newRating,
            comment: newComment,
        }, {
            onSuccess: () => {
                closeAddModal();
            }
        });
    }

    function prevImage() {
        if (selectedItem) {
            setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : selectedItem.product.images.length - 1));
        }
    }

    function nextImage() {
        if (selectedItem) {
            setCurrentImageIndex((prev) => (prev < selectedItem.product.images.length - 1 ? prev + 1 : 0));
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

    function renderEditableStars(setRating: (r: number) => void, currentRating: number) {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                    >
                        <Star
                            className={`h-8 w-8 transition-colors ${star <= currentRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-200'}`}
                        />
                    </button>
                ))}
            </div>
        );
    }

    const selectedOrder = paid_orders.find(o => o.id === selectedOrderId);

    return (
        <>
            <Head title="My Reviews" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">My Reviews</h1>
                    <Button onClick={openAddModal}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Review
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFilter} className="mb-4 flex flex-wrap gap-2">
                            <Input
                                type="text"
                                placeholder="Search by comment or product..."
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
                                        <th className="px-4 py-3">Product</th>
                                        <th className="px-4 py-3">Rating</th>
                                        <th className="px-4 py-3">Comment</th>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviews.data.map((review) => (
                                        <tr key={review.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    {review.product.image ? (
                                                        <img
                                                            src={`/storage/${review.product.image}`}
                                                            alt={review.product.name}
                                                            className="h-12 w-12 rounded object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                                            onClick={() => goToProduct(review.product.slug)}
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                                            N/A
                                                        </div>
                                                    )}
                                                    <span
                                                        className="font-medium cursor-pointer hover:underline"
                                                        onClick={() => goToProduct(review.product.slug)}
                                                    >
                                                        {review.product.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {renderStars(review.rating)}
                                            </td>
                                            <td className="px-4 py-3 max-w-xs truncate">
                                                {review.comment || '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {review.created_at}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => openEditModal(review)}>
                                                        <Edit3 className="h-4 w-4 text-amber-500" />
                                                    </Button>
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

            <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{selectedItem?.product.name}</DialogTitle>
                        <DialogClose className="absolute right-4 top-4">
                            <X className="h-4 w-4" />
                        </DialogClose>
                    </DialogHeader>

                    {selectedItem && selectedItem.product.images.length > 0 && (
                        <div className="relative mt-4">
                            <div className="overflow-hidden rounded-lg">
                                <img
                                    src={selectedItem.product.images[currentImageIndex]}
                                    alt={selectedItem.product.name}
                                    className="w-full h-80 object-cover"
                                />
                            </div>

                            {selectedItem.product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>

                                    <div className="mt-2 flex justify-center gap-1.5">
                                        {selectedItem.product.images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`h-2 w-2 rounded-full transition-colors ${
                                                    idx === currentImageIndex ? 'bg-primary' : 'bg-muted'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <div className="mt-4 space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Your Rating</h3>
                            {renderStars(selectedItem?.rating ?? 0)}
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Your Review</h3>
                            <p className="text-sm">{selectedItem?.comment || 'No comment provided.'}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={!!editReview} onOpenChange={closeEditModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Review - {editReview?.product.name}</DialogTitle>
                        <DialogClose className="absolute right-4 top-4">
                            <X className="h-4 w-4" />
                        </DialogClose>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Your Rating</label>
                            {renderEditableStars(setEditRating, editRating)}
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">Your Review</label>
                            <textarea
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                                placeholder="Write your review..."
                                rows={4}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={closeEditModal}>
                                Cancel
                            </Button>
                            <Button onClick={handleUpdateReview}>
                                Update Review
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={showAddModal} onOpenChange={closeAddModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add New Review</DialogTitle>
                        <DialogClose className="absolute right-4 top-4">
                            <X className="h-4 w-4" />
                        </DialogClose>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Select Order</label>
                            <select
                                value={selectedOrderId || ''}
                                onChange={(e) => {
                                    setSelectedOrderId(e.target.value ? Number(e.target.value) : null);
                                    setSelectedProductId(null);
                                }}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            >
                                <option value="">Select an order</option>
                                {paid_orders.map((order) => (
                                    <option key={order.id} value={order.id}>
                                        Order #{order.order_number} ({order.items.length} items)
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedOrder && (
                            <div>
                                <label className="text-sm font-medium mb-2 block">Select Product</label>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {selectedOrder.items.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => setSelectedProductId(item.product_id)}
                                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer border-2 transition-colors ${
                                                selectedProductId === item.product_id
                                                    ? 'border-amber-500 bg-amber-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            {item.image ? (
                                                <img
                                                    src={`/storage/${item.image}`}
                                                    alt={item.name}
                                                    className="h-10 w-10 rounded object-cover"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                                    N/A
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="text-sm font-medium">${Number(item.price).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedProductId && (
                            <>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Your Rating</label>
                                    {renderEditableStars(setNewRating, newRating)}
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Your Review (Optional)</label>
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Write your review..."
                                        rows={3}
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </>
                        )}

                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" onClick={closeAddModal}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddReview} disabled={!selectedProductId}>
                                Submit Review
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

CustomerReviewsIndex.layout = {
    breadcrumbs: [
        { title: 'Customer Dashboard', href: '/customer/dashboard' },
        { title: 'My Reviews', href: '/customer/reviews' },
    ],
};