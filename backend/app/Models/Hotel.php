<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    // <-- Agrega esta propiedad
    protected $fillable = [
        'name',
        'nit',
        'address',
        'city_id',
        'max_rooms',
    ];

    // Relaciones
    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function rooms()
    {
        return $this->hasMany(HotelRoom::class);
    }
}
