<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $students = [
            [
                'user_id' => 2,
                'nisn' => '123456789120',
                'gender' => 'perempuan',
                'phone_number' => '081234567890',
                'entry_year' => 2022,
                'class_room_id' => 1
            ],
            [
                'user_id' => 3,
                'nisn' => '12323456789120',
                'gender' => 'laki-laki',
                'phone_number' => '08341234567890',
                'entry_year' => 2022,
                'class_room_id' => 3
            ],
            [
                'user_id' => 5,
                'nisn' => '121212121',
                'gender' => 'laki-laki',
                'phone_number' => '0854234567890',
                'entry_year' => 2022,
                'class_room_id' => 3
            ]
        ];

        foreach ($students as $teacher) {
            \App\Models\Student::create($teacher);
        }
    }
}
