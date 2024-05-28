<?php

namespace Database\Seeders;

use App\Models\TaskGroup;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            // StudentSeeder::class,
            // TeacherSeeder::class,
            // ClassRoomSeeder::class,
            // ClassTeacherSeeder::class,
            // CourseSeeder::class,
            // ScheduleSeeder::class,
            // LearnSeeder::class,
            // LearnFileSeeder::class,
            // TaskSeeder::class,
            // TaskGroupSeeder::class,
            // ExamSeeder::class,
            // ExamGroupSeeder::class
        ]);
    }
}
