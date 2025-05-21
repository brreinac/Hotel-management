<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CityFactory extends Factory
{
    protected $model = \App\Models\City::class;

    public function definition()
    {
        return [
            'name' => $this->faker->city(),
        ];
    }
}
