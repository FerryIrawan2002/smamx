<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class ClassRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $classRooms = [
            [
                'class_name' => 'X 1',
                'major' => 'Tidak Ada Jurusan',
                'class_number' => 10
            ],
            [
                'class_name' => 'XI IPA 1',
                'major' => 'IIS',
                'class_number' => 11
            ],
            [
                'id' => 3,
                'class_name' => 'XII IPS 1',
                'major' => 'IIS',
                'class_number' => 12
            ]
        ];

        foreach ($classRooms as $classRoom) {
            DB::table('class_rooms')->insert($classRoom);
        }
    }
}
