<?php
namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Hotel;

interface HotelRepositoryInterface
{
    public function all(): Collection;
    public function find(int $id): ?Hotel;
    public function create(array $data): Hotel;
    public function update(Hotel $hotel, array $data): Hotel;
    public function delete(Hotel $hotel): void;
}
