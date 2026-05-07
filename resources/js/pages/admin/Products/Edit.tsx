import { Head, useForm, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Upload, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string | null;
    price: string;
    stock: number;
    category_id: number | null;
    images: string[];
}

interface Props {
    product: Product;
    categories: Category[];
}

export default function ProductEdit() {
    const { props } = usePage<Props>();
    const { product, categories } = props;

    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: String(product.stock),
        category_id: String(product.category_id || ''),
        images: [] as File[],
        remove_images: [] as string[],
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/products/${product.id}`);
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setData('images', Array.from(e.target.files));
        }
    }

    function removeNewImage(index: number) {
        setData('images', data.images.filter((_, i) => i !== index));
    }

    function removeExistingImage(path: string) {
        setData('remove_images', [...data.remove_images, path]);
    }

    const currentImages = product.images.filter(
        (img) => !data.remove_images.includes(img)
    );

    return (
        <>
            <Head title="Edit Product" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-semibold">Edit Product</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Product Name</label>
                                    <Input
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter product name"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Category</label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="mt-1 text-sm text-red-500">{errors.category_id}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Enter product description"
                                    rows={4}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Price</label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        placeholder="0.00"
                                    />
                                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Stock</label>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        placeholder="0"
                                    />
                                    {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">Existing Images</label>
                                {currentImages.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                                        {currentImages.map((path) => (
                                            <div key={path} className="relative group">
                                                <img
                                                    src={`/storage/${path}`}
                                                    alt={product.name}
                                                    className="h-24 w-full rounded-md object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingImage(path)}
                                                    className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                                <p className="mt-1 truncate text-xs text-muted-foreground">{path}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No images uploaded yet</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">Add New Images</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted">
                                        <Upload className="h-4 w-4" />
                                        Upload Images
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {errors.images && <p className="mt-1 text-sm text-red-500">{Array.isArray(errors.images) ? errors.images.join(', ') : errors.images}</p>}

                                {data.images.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                                        {data.images.map((file, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="h-24 w-full rounded-md object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewImage(index)}
                                                    className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                                <p className="mt-1 truncate text-xs text-muted-foreground">{file.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link href="/admin/products">
                                    <Button variant="outline" type="button">Cancel</Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Product'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ProductEdit.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: '/admin/dashboard' },
        { title: 'Products', href: '/admin/products' },
        { title: 'Edit Product', href: `/admin/products/edit` },
    ],
};