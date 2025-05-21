<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RoomTypeFactory extends Factory
{
    protected $model = \App\Models\RoomType::class;

    public function definition()
    {
        $types = [
            ['EST', 'Estándar'],
            ['JUN', 'Junior'],
            ['SUI', 'Suite'],
        ];
        [$code, $name] = $this->faker->randomElement($types);
        return compact('code', 'name');
    }
}
