<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AccommodationsTableSeeder extends Seeder
{
    public function run()
    {
        $accs = [
            ['code' => 'SEN', 'name' => 'Sencilla'],
            ['code' => 'DOB', 'name' => 'Doble'],
            ['code' => 'TRI', 'name' => 'Triple'],
            ['code' => 'CUA', 'name' => 'Cuádruple'],
        ];
        foreach ($accs as $a) {
            DB::table('accommodations')->updateOrInsert(
                ['code' => $a['code']],
                ['name' => $a['name'], 'created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}
