<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\HotelRoomController;

// Opcional: si quieres límite de llamadas, mantén throttle:api
Route::middleware(['throttle:api'])->group(function () {
    Route::apiResource('hotels', HotelController::class);

    Route::apiResource('hotels.rooms', HotelRoomController::class)
         ->shallow()
         ->only(['store', 'destroy']);
});