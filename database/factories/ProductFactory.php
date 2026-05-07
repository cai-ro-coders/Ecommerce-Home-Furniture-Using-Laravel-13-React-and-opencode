<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    private array $furnitureNames = [
        'Modern Fabric Sofa', 'Oak Dining Table', 'King Size Bed Frame', 'Leather Armchair',
        'Wooden Bookshelf', 'Coffee Table Set', 'Dining Chairs Set', 'Wardrobe Cabinet',
        'Nightstand', 'TV Console', 'Desk with Drawers', 'Office Chair Ergonomic',
        'Garden Patio Set', 'Outdoor Lounge Chair', 'Bunk Bed', 'Dresser Drawers',
        'Mirror Frame', 'Side Table', 'Recliner Chair', 'Sectional Sofa',
        'Dining Bench', 'Storage Ottoman', 'Plant Stand', 'Room Divider',
        'Console Table', 'Bar Stool', 'Adirondack Chair', 'Platform Bed',
        'Trundle Bed', 'Vanity Cabinet', 'Kitchen Island', 'Pot Rack'
    ];

    public function definition(): array
    {
        $name = fake()->randomElement($this->furnitureNames) . ' ' . fake()->randomElement([
            'Classic', 'Vintage', 'Minimalist', 'Scandinavian', 'Rustic',
            'Contemporary', 'Traditional', 'Industrial', 'Farmhouse', 'Modern'
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name) . '-' . fake()->unique()->numberBetween(1000, 9999),
            'description' => fake()->paragraphs(2, true),
            'price' => fake()->randomFloat(2, 99, 2499),
            'stock' => fake()->numberBetween(0, 100),
            'category_id' => null,
        ];
    }
}