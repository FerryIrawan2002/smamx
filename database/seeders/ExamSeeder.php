<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $exams = [
            [
                'class_teacher_id' => 1,
                'name_exam' => 'UTS',
                'exam_date' => now(),
                'url' => 'https://docs.google.com/forms/d/e/1FAIpQLSd3Z3kDlzSbUSXph0FbnpFrKZUDJ6HJD4EDbk0xnRf8sPv5mw/viewform'
            ], [
                'class_teacher_id' => 1,
                'name_exam' => 'UAS',
                'exam_date' => now(),
                'url' => 'https://docs.google.com/forms/d/e/1FAIpQLSd3Z3kDlzSbUSXph0FbnpFrKZUDJ6HJD4EDbk0xnRf8sPv5mw/viewform'
            ]
        ];

        foreach ($exams as $exam) {
            \App\Models\Exam::create($exam);
        }
    }
}
