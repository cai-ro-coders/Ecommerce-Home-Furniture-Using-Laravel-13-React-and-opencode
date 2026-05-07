import { Head } from '@inertiajs/react';
import { Heart } from 'lucide-react';

export default function Wishlist() {
    return (
        <>
            <Head title="My Wishlist - Furnish" />
            <div className="min-h-screen bg-gray-50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
                    <div className="bg-white rounded-2xl p-8 text-center">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Your wishlist is empty</p>
                    </div>
                </div>
            </div>
        </>
    );
}