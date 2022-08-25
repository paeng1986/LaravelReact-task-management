<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $status = array('To do','Pending','In progress','Completed');
        return [
            //
            'name' => fake()->name(),
            'description' => Str::random(10),
            'status' => $status[array_rand($status)]
        ];
    }
}
