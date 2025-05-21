<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\City;

class HotelFactory extends Factory
{
    protected $model = \App\Models\Hotel::class;

    public function definition()
    {
        return [
            'name'       => $this->faker->company . ' Hotel',
            'nit'        => $this->faker->numerify('########-#'),
            'address'    => $this->faker->address,
            'city_id'    => City::factory(),
            'max_rooms'  => $this->faker->numberBetween(10, 100),
        ];
    }
}
