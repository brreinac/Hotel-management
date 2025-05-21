<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AccommodationFactory extends Factory
{
    protected $model = \App\Models\Accommodation::class;

    public function definition()
    {
        $accs = [
            ['SEN', 'Sencilla'],
            ['DOB', 'Doble'],
            ['TRI', 'Triple'],
            ['CUA', 'Cuádruple'],
        ];
        [$code, $name] = $this->faker->randomElement($accs);
        return compact('code', 'name');
    }
}
