<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHotelRequest;
use App\Http\Requests\UpdateHotelRequest;
use App\Models\Hotel;

class HotelController extends Controller
{
    public function index()
    {
        return Hotel::with('city')->get();
    }

    public function store(StoreHotelRequest $request)
    {
        $hotel = Hotel::create($request->validated());
        return response()->json($hotel, 201);
    }

    public function show(Hotel $hotel)
    {
        return $hotel->load(['city', 'rooms.roomType', 'rooms.accommodation']);
    }

    public function update(UpdateHotelRequest $request, Hotel $hotel)
    {
        $hotel->update($request->validated());
        return response()->json($hotel);
    }

    public function destroy(Hotel $hotel)
    {
        $hotel->delete();
        return response()->noContent();
    }
}
