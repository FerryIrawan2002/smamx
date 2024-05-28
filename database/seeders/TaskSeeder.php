<?php

namespace Database\Seeders;

use Faker\Provider\Lorem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = [
            [
                'class_teacher_id' => 1,
                'name' => 'Tugas 1',
                'desc' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam possimus repellendus necessitatibus facilis vero sint fugit? Nemo dolores nostrum cum!',
                'deadline' => now(),
            ],
            [
                'class_teacher_id' => 1,
                'name' => 'Tugas 1',
                'desc' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam possimus repellendus necessitatibus facilis vero sint fugit? Nemo dolores nostrum cum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam possimus repellendus necessitatibus facilis vero sint fugit? Nemo dolores nostrum cum!',
                'deadline' => now(),
            ],
            [
                'class_teacher_id' => 1,
                'name' => 'Tugas 1',
                'desc' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam possimus repellendus necessitatibus facilis vero sint fugit? Nemo dolores nostrum cum!',
                'deadline' => now(),
            ]
        ];

        foreach ($tasks as $task) {
            \App\Models\Task::create($task);
        }
    }
}
