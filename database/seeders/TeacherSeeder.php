<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = [
            [
                'user_id' => 4,
                'nip' => '1234567890',
                'gender' => 'perempuan',
                'phone_number' => '081234567890',
                'education' => 'S1',
            ]
        ];
        foreach ($teachers as $teacher) {
            // Get image from API
            $response = Http::get('https://api.dicebear.com/5.x/initials/svg', [
                'seed' => $teacher['nip'],
            ]);

            // Check if request is successful
            if ($response->successful()) {
                // Generate a unique file name
                $fileName = uniqid('teacher_', true) . '.svg';

                // Save image to local storage
                Storage::put('public/photo-teacher/' . $fileName, $response->body());

                // Add course record along with photo path to the database
                DB::table('teachers')->insert([
                    'user_id' => $teacher['user_id'],
                    'nip' => $teacher['nip'],
                    'gender' => $teacher['gender'],
                    'phone_number' => $teacher['phone_number'],
                    'education' => $teacher['education'],
                    'photo' => 'photo-teacher/' . $fileName // Save photo path to the database
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
