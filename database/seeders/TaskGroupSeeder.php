<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $taskGroup = [
            [
                'task_id' => 1,
                'student_id' => 1,
                'status' => 'Belum mengumpulkan',
                'point' => null,
                'file' => null,
            ],
            [
                'task_id' => 2,
                'student_id' => 1,
                'status' => 'Belum mengumpulkan',
                'point' => null,
                'file' => null,
            ],
            [
                'task_id' => 3,
                'student_id' => 1,
                'status' => 'Belum mengumpulkan',
                'point' => null,
                'file' => null,
            ]
        ];

        foreach ($taskGroup as $group) {
            \App\Models\TaskGroup::create($group);
        }
    }
}
