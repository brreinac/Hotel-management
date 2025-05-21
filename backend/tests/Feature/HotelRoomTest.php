<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\City;
use App\Models\Hotel;
use App\Models\RoomType;
use App\Models\Accommodation;

class HotelRoomTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_add_rooms_within_limit()
    {
        $city = City::factory()->create();
        $hotel = Hotel::factory()->create([
            'city_id'   => $city->id,
            'max_rooms' => 5,
        ]);

        $type = RoomType::factory()->create(['code' => 'EST']);
        $acc  = Accommodation::factory()->create(['code' => 'SEN']);

        $payload = [
            'room_type_id'     => $type->id,
            'accommodation_id' => $acc->id,
            'quantity'         => 3,
        ];

        $response = $this->postJson("/api/hotels/{$hotel->id}/rooms", $payload);

        $response->assertStatus(201);
        $this->assertDatabaseHas('hotel_rooms', [
            'hotel_id' => $hotel->id,
            'quantity' => 3,
        ]);
    }

    /** @test */
    public function cannot_exceed_max_rooms()
    {
        $city = City::factory()->create();
        $hotel = Hotel::factory()->create([
            'city_id'   => $city->id,
            'max_rooms' => 2,
        ]);

        $type = RoomType::factory()->create(['code' => 'EST']);
        $acc  = Accommodation::factory()->create(['code' => 'SEN']);

        // Primera asignación válida
        $this->postJson("/api/hotels/{$hotel->id}/rooms", [
            'room_type_id'     => $type->id,
            'accommodation_id' => $acc->id,
            'quantity'         => 2,
        ])->assertStatus(201);

        // Segunda asignación que excede
        $this->postJson("/api/hotels/{$hotel->id}/rooms", [
            'room_type_id'     => $type->id,
            'accommodation_id' => $acc->id,
            'quantity'         => 1,
        ])->assertStatus(422)
          ->assertJsonFragment([
              'message' => 'La cantidad solicitada excede el límite de habitaciones del hotel'
          ]);
    }
}
