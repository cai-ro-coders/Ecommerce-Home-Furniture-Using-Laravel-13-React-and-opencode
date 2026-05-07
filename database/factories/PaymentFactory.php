<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    private array $methods = ['stripe', 'paypal'];
    private array $paymentStatuses = ['pending', 'completed', 'failed', 'refunded'];

    public function definition(): array
    {
        return [
            'order_id' => null,
            'payment_method' => fake()->randomElement($this->methods),
            'transaction_id' => 'txn_' . fake()->unique()->uuid(),
            'amount' => fake()->randomFloat(2, 199, 4999),
            'status' => fake()->randomElement($this->paymentStatuses),
        ];
    }
}