<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHotelRoomRequest;
use App\Models\Hotel;
use Illuminate\Http\JsonResponse;

class HotelRoomController extends Controller
{
    public function store(StoreHotelRoomRequest $request, Hotel $hotel): JsonResponse
    {
        $data  = $request->validated();
        $total = $hotel->rooms()->sum('quantity') + $data['quantity'];

        if ($total > $hotel->max_rooms) {
            return response()->json([
                'message' => 'La cantidad solicitada excede el límite de habitaciones del hotel'
            ], 422);
        }

        $room = $hotel->rooms()->create($data);
        return response()->json($room, 201);
    }

    public function destroy(HotelRoom $room): JsonResponse
    {
        $room->delete();
        return response()->noContent();
    }
}
