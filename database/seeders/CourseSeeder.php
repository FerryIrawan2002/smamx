<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            [
                'course_name' => 'Matematika',
            ],
            [
                'course_name' => 'Bahasa Indonesia',

            ]
        ];

        foreach ($courses as $course) {
            $response = Http::get('https://api.dicebear.com/5.x/initials/svg', [
                'seed' => $course['course_name'],
            ]);
            if ($response->successful()) {
                $fileName = uniqid('course_', true) . '.svg';
                Storage::put('public/photo/' . $fileName, $response->body());
                DB::table('courses')->insert([
                    'course_name' => $course['course_name'],
                    'photo' => 'photo/' . $fileName // Save photo path to the database
                ]);
            } else {
                // Handle failed HTTP request
                // Log or throw an exception
                // For example:
                // Log::error('Failed to fetch image for course: ' . $course['course_name']);
                // throw new \Exception('Failed to fetch image for course: ' . $course['course_name']);
            }
        }
    }
}
