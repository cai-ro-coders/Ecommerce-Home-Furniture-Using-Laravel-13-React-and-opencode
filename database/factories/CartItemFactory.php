<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CartItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'cart_id' => null,
            'product_id' => null,
            'quantity' => fake()->numberBetween(1, 5),
            'price' => fake()->randomFloat(2, 99, 1499),
        ];
    }
}