<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHotelRoomRequest;
use App\Models\Hotel;
use App\Models\HotelRoom;

class HotelRoomController extends Controller
{
    public function store(StoreHotelRoomRequest $request, Hotel $hotel)
    {
        $data = $request->validated();

        // Validar límite de habitaciones
        $existingTotal = $hotel->rooms()->sum('quantity');
        if ($existingTotal + $data['quantity'] > $hotel->max_rooms) {
            return response()->json([
                'message' => 'La cantidad solicitada excede el límite de habitaciones del hotel'
            ], 422);
        }

        $room = $hotel->rooms()->create($data);
        return response()->json($room, 201);
    }

    public function destroy(HotelRoom $room)
    {
        $room->delete();
        return response()->noContent();
    }
}
