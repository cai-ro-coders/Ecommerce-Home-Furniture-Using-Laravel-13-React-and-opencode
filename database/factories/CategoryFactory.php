<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->randomElement([
            'Living Room', 'Bedroom', 'Dining', 'Office', 'Outdoor',
            'Kids Room', 'Kitchen', 'Bathroom', 'Garden', 'Hallway'
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name) . '-' . fake()->unique()->numberBetween(1, 999),
            'parent_id' => null,
        ];
    }

    public function withParent(int $parentId): static
    {
        return $this->state(fn (array $attributes) => [
            'parent_id' => $parentId,
        ]);
    }
}