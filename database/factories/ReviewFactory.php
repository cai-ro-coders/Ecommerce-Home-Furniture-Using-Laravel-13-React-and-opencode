<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    private array $comments = [
        'Great quality and comfortable!',
        'Perfect fit for our living room.',
        'Assembly was a bit tricky but worth it.',
        'Better than expected, highly recommend.',
        'Exactly as pictured, very satisfied.',
        'Good value for the price.',
        'Solid construction, looks elegant.',
        'Delivery was quick and well packaged.',
        'Beautiful design, comfortable to use.',
        'Would buy again!',
        null,
        null,
    ];

    public function definition(): array
    {
        return [
            'user_id' => null,
            'product_id' => null,
            'rating' => fake()->numberBetween(1, 5),
            'comment' => fake()->randomElement($this->comments),
        ];
    }
}