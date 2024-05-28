<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schedules = [
            [
                'class_teacher_id' => 1,
                'day' => 'Senin',
                'time_start' => '07.00',
                'time_end' => '08.00',
            ]
        ];

        foreach ($schedules as $schedule) {
            \App\Models\Schedule::create($schedule);
        }
    }
}
