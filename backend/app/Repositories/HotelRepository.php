<?php
namespace App\Repositories;

use App\Repositories\Contracts\HotelRepositoryInterface;
use App\Models\Hotel;
use Illuminate\Database\Eloquent\Collection;

class HotelRepository implements HotelRepositoryInterface
{
    public function all(): Collection
    {
        return Hotel::with('city')->get();
    }

    public function find(int $id): ?Hotel
    {
        return Hotel::with(['city', 'rooms.roomType', 'rooms.accommodation'])->find($id);
    }

    public function create(array $data): Hotel
    {
        return Hotel::create($data);
    }

    public function update(Hotel $hotel, array $data): Hotel
    {
        $hotel->update($data);
        return $hotel;
    }

    public function delete(Hotel $hotel): void
    {
        $hotel->delete();
    }
}
