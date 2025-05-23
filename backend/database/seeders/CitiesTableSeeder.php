<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitiesTableSeeder extends Seeder
{
    public function run()
    {
        $cities = ['Bogotá', 'Medellín', 'Cali', 'Cartagena'];
        foreach ($cities as $city) {
            DB::table('cities')->updateOrInsert(
                ['name' => $city],
                ['created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}
