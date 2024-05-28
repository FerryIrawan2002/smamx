<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\ClassTeacher;
use App\Models\Exam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $student = Auth::user()->student;
        $classTeacher = ClassTeacher::with(['exams.examGroup' => function ($query) use ($student) {
            $query->where('student_id', $student->id);
        }, 'course'])
            ->where('class_room_id', $student->classroom->id)
            ->findOrFail($id);
        if (!$classTeacher) {
            return redirect()->back()->with('error', 'Class teacher not found.');
        }

        return Inertia::render('Student/Exam/Show', [
            'classTeacher' => $classTeacher,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
