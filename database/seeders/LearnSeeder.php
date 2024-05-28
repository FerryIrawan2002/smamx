<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LearnSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $learns = [
            [
                'class_teacher_id' => 1,
                'week' => 'minggu 1',
                'desc' => 'Belajar Laravel',


            ], [
                'class_teacher_id' => 1,
                'week' => 'minggu 2',
                'desc' => 'Belajar Laravel 2',

            ]
        ];

        foreach ($learns as $learn) {
            \App\Models\Learn::create($learn);
        }
    }
}
