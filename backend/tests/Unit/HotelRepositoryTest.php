<?php
namespace Tests\Unit;

use Tests\TestCase;
use App\Repositories\HotelRepository;
use App\Models\Hotel;
use App\Models\City;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HotelRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected HotelRepository $repo;
    protected City $city;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repo = new HotelRepository();
        $this->city = City::factory()->create();
    }

    public function test_create_and_find()
    {
        $data = [
            'name' => 'Test Hotel',
            'nit'  => '12345678-9',
            'address' => 'Calle Falsa 123',
            'city_id'  => $this->city->id,
            'max_rooms' => 10,
        ];
        $hotel = $this->repo->create($data);
        $this->assertDatabaseHas('hotels', ['id' => $hotel->id, 'name' => 'Test Hotel']);

        $fetched = $this->repo->find($hotel->id);
        $this->assertEquals('Test Hotel', $fetched->name);
    }

    public function test_update_and_delete()
    {
        $hotel = Hotel::factory()->create(['city_id' => $this->city->id]);
        $updated = $this->repo->update($hotel, ['name' => 'Nuevo Nombre']);
        $this->assertEquals('Nuevo Nombre', $updated->name);

        $this->repo->delete($updated);
        $this->assertNull(Hotel::find($updated->id));
    }
}
