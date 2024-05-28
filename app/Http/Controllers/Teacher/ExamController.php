<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\ClassTeacher;
use App\Models\Exam;
use App\Models\ExamGroup;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExamController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'class_teacher_id' => 'required|exists:class_teachers,id', // Ensure the class_teacher_id exists in the database
            'name_exam' => 'required|string|max:255', // Added string type and max length
            'exam_date' => 'required|date', // Validate the exam_date as a date
            'url' => 'required|url', // Validate the url as a valid URL
        ]);

        // Create a new Exam record
        $exam = Exam::create([
            'name_exam' => $request->name_exam,
            'desc' => $request->desc, // Optional field, should handle nullable case in migration
            'exam_date' => $request->exam_date,
            'url' => $request->url,
            'class_teacher_id' => $request->class_teacher_id
        ]);


        $student = ClassTeacher::with('classroom.students')->where('id', $request->class_teacher_id)->first();

        if ($student) {
            foreach ($student->classroom->students as $student) {
                ExamGroup::create([
                    'exam_id' => $exam->id,
                    'student_id' => $student->id,
                ]);
            }
            return back()->with('success', 'Data Tugas berhasil ditambahkan');
        } else {
            $exam->delete();
            return back()->with('error', 'Data Tugas gagal ditambahkan');
        }
    }


    public function show(string $id)
    {
        $classRoom = ClassTeacher::with('tasks', 'classroom.students')->findOrFail($id);

        $teacher = Auth::user()->teacher;

        if ($classRoom->teacher_id != $teacher->id) {
            return back()->with('error', 'Data Tugas tidak ditemukan');
        }
        $exam = Exam::with('examGroup')->where('class_teacher_id', $id)->get();
        return Inertia::render('Teacher/Exam/Show', [
            'classRoom' => $classRoom,
            'exams' => $exam
        ]);
    }

    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'name_exam' => 'required',
                'exam_date' => 'required',
                'url' => 'required',
                'status' => 'required',
            ]);

            $exam = Exam::findOrFail($id);

            $exam->update([
                'name_exam' => $request->name_exam,
                'exam_date' => $request->exam_date,
                'url' => $request->url,
                'status' => $request->status
            ]);

            return redirect()->back()->with('success', 'Ujian berhasil di ubah');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update class teacher. Error: ' . $e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try {
            $exam = Exam::findOrFail($id);
            $exam->examGroup()->delete();
            $exam->delete();
            return redirect()->back()->with('success', 'Ujian berhasil dihapus beserta semua kelompok ujiannya');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus ujian. Kesalahan: ' . $e->getMessage());
        }
    }
}
