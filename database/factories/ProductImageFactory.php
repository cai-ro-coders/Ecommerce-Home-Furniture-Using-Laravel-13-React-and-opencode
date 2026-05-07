<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductImageFactory extends Factory
{
    private array $imagePaths = [
        'products/sofa-modular.jpg',
        'products/dining-table-oak.jpg',
        'products/bed-frame-king.jpg',
        'products/armchair-leather.jpg',
        'products/bookshelf-wooden.jpg',
        'products/coffee-table-set.jpg',
        'products/dining-chairs.jpg',
        'products/wardrobe-cabinet.jpg',
        'products/nightstand-modern.jpg',
        'products/tv-console.jpg',
    ];

    public function definition(): array
    {
        return [
            'product_id' => null,
            'image_path' => fake()->randomElement($this->imagePaths),
        ];
    }
}