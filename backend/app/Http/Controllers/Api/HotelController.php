<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHotelRequest;
use App\Http\Requests\UpdateHotelRequest;
use App\Repositories\Contracts\HotelRepositoryInterface;
use App\Models\Hotel;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\QueryException;

class HotelController extends Controller
{
    public function __construct(
        protected HotelRepositoryInterface $hotels
    ) {}

    public function index(): JsonResponse
    {
        return response()->json($this->hotels->all());
    }

    public function store(StoreHotelRequest $request): JsonResponse
    {
        try {
            $hotel = $this->hotels->create($request->validated());
            return response()->json($hotel, 201);
        } catch (QueryException $e) {
            if ($e->getCode() === '23505') { // unique_violation en PostgreSQL
                return response()->json([
                    'message' => 'Ya existe un hotel con ese NIT'
                ], 422);
            }
            throw $e;
        }
    }
    public function show(Hotel $hotel): JsonResponse
    {
        $found = $this->hotels->find($hotel->id);
        return response()->json($found);
    }

    public function update(UpdateHotelRequest $request, Hotel $hotel): JsonResponse
    {
        $updated = $this->hotels->update($hotel, $request->validated());
        return response()->json($updated);
    }

    public function destroy(Hotel $hotel): JsonResponse
    {
        $this->hotels->delete($hotel);
        return response()->noContent();
    }
}
