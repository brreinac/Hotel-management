<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\City;

class HotelTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_create_hotel()
    {
        $city = City::factory()->create();

        $payload = [
            'name'      => 'Hotel Prueba',
            'nit'       => '87654321-0',
            'address'   => 'Calle Falsa 123',
            'city_id'   => $city->id,
            'max_rooms' => 20,
        ];

        $response = $this->postJson('/api/hotels', $payload);

        $response->assertStatus(201)
                 ->assertJsonFragment(['name' => 'Hotel Prueba']);

        $this->assertDatabaseHas('hotels', ['nit' => '87654321-0']);
    }

    /** @test */
    public function cannot_create_duplicate_nit()
    {
        $city = City::factory()->create();

        $data = [
            'name'      => 'Hotel Uno',
            'nit'       => '12345678-9',
            'address'   => 'Av. Siempre Viva 742',
            'city_id'   => $city->id,
            'max_rooms' => 10,
        ];

        // Primer intento: exitoso
        $this->postJson('/api/hotels', $data)->assertStatus(201);

        // Segundo intento: debería fallar validación de NIT único
        $this->postJson('/api/hotels', $data)
             ->assertStatus(422)
             ->assertJsonValidationErrors('nit');
    }
}
