<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Review;
use App\Models\User;
use App\Models\Wishlist;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('Seeding users...');
        $users = User::factory()
            ->count(30)
            ->create();

        if (!User::where('email', 'admin@furnitureshop.com')->exists()) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@furnitureshop.com',
                'password' => bcrypt('password'),
                'role' => 'admin',
            ]);
        }

        $this->command->info('Seeding categories...');
        $categoryData = [
            'Living Room' => ['Sofas', 'Armchairs', 'Coffee Tables', 'TV Consoles', 'Bookshelves'],
            'Bedroom' => ['Beds', 'Mattresses', 'Wardrobes', 'Nightstands', 'Dressers'],
            'Dining' => ['Dining Tables', 'Dining Chairs', 'Dining Benches', 'Bar Stools'],
            'Office' => ['Desks', 'Office Chairs', 'Filing Cabinets', 'Bookshelves'],
            'Outdoor' => ['Patio Sets', 'Garden Chairs', 'Outdoor Tables', 'Loungers'],
            'Kids Room' => ['Bunk Beds', 'Kids Chairs', 'Study Desks', 'Storage'],
            'Kitchen' => ['Kitchen Islands', 'Pot Racks', 'Bar Stools'],
            'Bathroom' => ['Vanity Cabinets', 'Storage Cabinets'],
        ];

        $categories = [];
        foreach ($categoryData as $parent => $children) {
            $parentCategory = Category::create([
                'name' => $parent,
                'slug' => \Illuminate\Support\Str::slug($parent),
            ]);
            $categories[$parent] = $parentCategory->id;

            foreach ($children as $child) {
                $categories[$child] = Category::create([
                    'name' => $child,
                    'slug' => \Illuminate\Support\Str::slug($child) . '-' . rand(1, 99),
                    'parent_id' => $parentCategory->id,
                ])->id;
            }
        }

        $this->command->info('Seeding products...');
        $products = collect(range(1, 80))->map(function () use ($categories) {
            $product = Product::factory()->create([
                'category_id' => collect($categories)->random(),
            ]);

            ProductImage::factory()
                ->count(rand(2, 5))
                ->create(['product_id' => $product->id]);

            return $product;
        });

        $this->command->info('Seeding carts and cart items...');
        $users->each(function ($user) use ($products) {
            $cart = Cart::create(['user_id' => $user->id]);

            $randomProducts = $products->random(rand(1, 4));
            foreach ($randomProducts as $product) {
                CartItem::create([
                    'cart_id' => $cart->id,
                    'product_id' => $product->id,
                    'quantity' => rand(1, 3),
                    'price' => $product->price,
                ]);
            }
        });

        $this->command->info('Seeding wishlists...');
        $users->each(function ($user) use ($products) {
            $wishlistProducts = $products->random(rand(1, 5));
            foreach ($wishlistProducts as $product) {
                Wishlist::firstOrCreate([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                ]);
            }
        });

        $this->command->info('Seeding orders and order items...');
        $statuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
        
        $users->each(function ($user) use ($products, $statuses) {
            $orderCount = rand(1, 3);
            foreach (range(1, $orderCount) as $i) {
                $order = Order::create([
                    'user_id' => $user->id,
                    'total_amount' => 0,
                    'status' => $statuses[array_rand($statuses)],
                    'shipping_address' => fake()->address(),
                ]);

                $orderProducts = $products->random(rand(1, 3));
                $total = 0;
                foreach ($orderProducts as $product) {
                    $qty = rand(1, 2);
                    $lineTotal = $product->price * $qty;
                    $total += $lineTotal;

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $qty,
                        'price' => $product->price,
                    ]);
                }

                $order->update(['total_amount' => $total]);

                if (in_array($order->status, ['paid', 'shipped', 'delivered'])) {
                    Payment::create([
                        'order_id' => $order->id,
                        'payment_method' => fake()->randomElement(['stripe', 'paypal']),
                        'transaction_id' => 'txn_' . \Illuminate\Support\Str::uuid(),
                        'amount' => $total,
                        'status' => 'completed',
                    ]);
                }
            }
        });

        $this->command->info('Seeding reviews...');
        Product::all()->each(function ($product) use ($users) {
            $reviewCount = rand(0, 5);
            $reviewUsers = $users->random(min($reviewCount, $users->count()));
            
            foreach ($reviewUsers as $user) {
                Review::create([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                    'rating' => rand(3, 5),
                    'comment' => fake()->randomElement([
                        'Great quality and comfortable!',
                        'Perfect fit for our home.',
                        'Assembly was easy.',
                        'Better than expected!',
                        'Exactly as pictured.',
                        'Good value for money.',
                        'Highly recommend.',
                        'Very satisfied.',
                        null,
                        null,
                    ]),
                ]);
            }
        });

        $this->command->info('Seeding complete!');
        
        $this->command->line('');
        $this->command->info('Summary:');
        $this->command->info('- Users: ' . User::count());
        $this->command->info('- Categories: ' . Category::count());
        $this->command->info('- Products: ' . Product::count());
        $this->command->info('- Product Images: ' . ProductImage::count());
        $this->command->info('- Carts: ' . Cart::count());
        $this->command->info('- Cart Items: ' . CartItem::count());
        $this->command->info('- Wishlists: ' . Wishlist::count());
        $this->command->info('- Orders: ' . Order::count());
        $this->command->info('- Order Items: ' . OrderItem::count());
        $this->command->info('- Payments: ' . Payment::count());
        $this->command->info('- Reviews: ' . Review::count());
    }
}