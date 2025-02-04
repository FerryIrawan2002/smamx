<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\ClassTeacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $student = Auth::user()->student;
        $classroomStudent = $student->classroom;
        $classAndTeaher = ClassTeacher::with('teacher.user', 'course', 'schedules')->where('class_room_id', $student->classroom->id)->get();
        return Inertia::render('Student/Dashboard/Index', [
            'studentClass' => $classAndTeaher,
            'classroomStudent' => $classroomStudent
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $classTeacher = ClassTeacher::with(['teacher.user', 'course', 'schedules', 'learn' => function ($query) {
            $query->with('learnfile');
        }])->find($id);

        if (!$classTeacher) {
            return redirect()->back()->with('error', 'Class teacher not found.');
        }

        return Inertia::render('Student/Dashboard/Show', [
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
