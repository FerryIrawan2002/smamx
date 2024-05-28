<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExamGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $exampGroups = [
            [
                'exam_id' => 1,
                'student_id' => 1,
                'point' => null,

            ],
            [
                'exam_id' => 2,
                'student_id' => 1,
                'point' => null,
            ]
        ];

        foreach ($exampGroups as $group) {
            \App\Models\ExamGroup::create($group);
        }
    }
}
