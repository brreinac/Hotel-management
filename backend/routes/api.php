<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\HotelRoomController;
use App\Models\City;
use App\Models\RoomType;
use App\Models\Accommodation;

Route::get('cities', function() {
    return City::all();
});

Route::get('room_types', function() {
    return RoomType::all();
});

Route::get('accommodations', function() {
    return Accommodation::all();
});

// Tus rutas existentes:
Route::apiResource('hotels', HotelController::class);
Route::apiResource('hotels.rooms', HotelRoomController::class)
     ->shallow()
     ->only(['store','destroy']);

