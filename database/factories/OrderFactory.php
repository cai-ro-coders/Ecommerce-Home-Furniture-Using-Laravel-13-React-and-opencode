<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    private array $statuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];

    private array $addresses = [
        '123 Oak Street, New York, NY 10001',
        '456 Maple Ave, Los Angeles, CA 90001',
        '789 Pine Road, Chicago, IL 60601',
        '321 Cedar Lane, Houston, TX 77001',
        '654 Birch Blvd, Phoenix, AZ 85001',
        '987 Elm Court, Philadelphia, PA 19101',
        '147 Willow Way, San Antonio, TX 78201',
        '258 Walnut Drive, San Diego, CA 92101',
        '369 Ash Street, Dallas, TX 75201',
        '741 Spruce Avenue, San Jose, CA 95101',
    ];

    public function definition(): array
    {
        return [
            'user_id' => null,
            'total_amount' => fake()->randomFloat(2, 199, 4999),
            'status' => fake()->randomElement($this->statuses),
            'shipping_address' => fake()->randomElement($this->addresses),
        ];
    }
}