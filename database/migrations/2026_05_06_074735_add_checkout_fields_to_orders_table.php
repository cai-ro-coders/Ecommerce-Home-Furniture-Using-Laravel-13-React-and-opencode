<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (!Schema::hasColumn('orders', 'order_number')) {
                $table->string('order_number')->nullable()->after('id');
            }
            if (!Schema::hasColumn('orders', 'billing_data')) {
                $table->json('billing_data')->nullable()->after('user_id');
            }
            if (!Schema::hasColumn('orders', 'shipping_data')) {
                $table->json('shipping_data')->nullable()->after('billing_data');
            }
            if (!Schema::hasColumn('orders', 'payment_method')) {
                $table->string('payment_method')->nullable()->after('shipping_data');
            }
            if (!Schema::hasColumn('orders', 'subtotal')) {
                $table->decimal('subtotal', 10, 2)->nullable()->after('payment_method');
            }
            if (!Schema::hasColumn('orders', 'shipping_cost')) {
                $table->decimal('shipping_cost', 10, 2)->nullable()->after('subtotal');
            }
            if (!Schema::hasColumn('orders', 'total')) {
                $table->decimal('total', 10, 2)->nullable()->after('shipping_cost');
            }
        });
        
        // Update existing records with unique order numbers
        $orders = \Illuminate\Support\Facades\DB::table('orders')->whereNull('order_number')->get();
        foreach ($orders as $order) {
            \Illuminate\Support\Facades\DB::table('orders')
                ->where('id', $order->id)
                ->update(['order_number' => 'ORD-' . strtoupper(uniqid())]);
        }
        
        // Add unique constraint
        Schema::table('orders', function (Blueprint $table) {
            if (Schema::hasColumn('orders', 'order_number')) {
                $table->string('order_number')->nullable(false)->unique()->change();
            }
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'order_number',
                'billing_data',
                'shipping_data',
                'payment_method',
                'subtotal',
                'shipping_cost',
                'total',
            ]);
        });
    }
};
