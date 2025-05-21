<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Hotel;
use App\Models\RoomType;
use App\Models\Accommodation;

class HotelRoomFactory extends Factory
{
    protected $model = \App\Models\HotelRoom::class;

    public function definition()
    {
        return [
            'hotel_id'         => Hotel::factory(),
            'room_type_id'     => RoomType::factory(),
            'accommodation_id' => Accommodation::factory(),
            'quantity'         => $this->faker->numberBetween(1, 5),
        ];
    }
}
