<?php

namespace Database\Seeders;
use Database\Seeders\CitiesTableSeeder;
use Database\Seeders\RoomTypesTableSeeder;
use Database\Seeders\AccommodationsTableSeeder;
use Illuminate\Support\Facades\DB;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Registrar aquí los seeders en orden lógico
        $this->call([
            CitiesTableSeeder::class,
            RoomTypesTableSeeder::class,
            AccommodationsTableSeeder::class,
        ]);
    }
}
