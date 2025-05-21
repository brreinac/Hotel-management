<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $types = [
            ['code' => 'EST', 'name' => 'EstÃ¡ndar'],
            ['code' => 'JUN', 'name' => 'Junior'],
            ['code' => 'SUI', 'name' => 'Suite'],
        ];
        foreach ($types as $type) {
            DB::table('room_types')->insert([
                'code' => $type['code'],
                'name' => $type['name'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
