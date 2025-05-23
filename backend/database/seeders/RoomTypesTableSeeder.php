<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomTypesTableSeeder extends Seeder
{
    public function run()
    {
        $types = [
            ['code' => 'EST', 'name' => 'Estándar'],
            ['code' => 'JUN', 'name' => 'Junior'],
            ['code' => 'SUI', 'name' => 'Suite'],
        ];
        foreach ($types as $t) {
            DB::table('room_types')->updateOrInsert(
                ['code' => $t['code']],
                ['name' => $t['name'], 'created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}
