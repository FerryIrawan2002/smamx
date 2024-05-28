<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassTeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classTeachers = [
            [
                'id' => 1,
                'class_room_id' => 1,
                'teacher_id' => 1,

                'course_id' => '1'
            ], [
                'id' => 2,
                'class_room_id' => 1,
                'teacher_id' => 1,

                'course_id' => 2,
            ]
        ];

        foreach ($classTeachers as $classTeacher) {
            \App\Models\ClassTeacher::create($classTeacher);
        }
    }
}
