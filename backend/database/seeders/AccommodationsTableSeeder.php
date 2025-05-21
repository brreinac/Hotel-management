<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AccommodationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $accommodations = [
            ['code' => 'SEN', 'name' => 'Sencilla'],
            ['code' => 'DOB', 'name' => 'Doble'],
            ['code' => 'TRI', 'name' => 'Triple'],
            ['code' => 'CUA', 'name' => 'CuÃ¡druple'],
        ];
        foreach ($accommodations as $acc) {
            DB::table('accommodations')->insert([
                'code' => $acc['code'],
                'name' => $acc['name'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
