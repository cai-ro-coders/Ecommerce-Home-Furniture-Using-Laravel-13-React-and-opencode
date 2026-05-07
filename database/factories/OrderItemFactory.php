<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrderItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'order_id' => null,
            'product_id' => null,
            'quantity' => fake()->numberBetween(1, 4),
            'price' => fake()->randomFloat(2, 99, 1499),
        ];
    }
}