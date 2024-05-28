<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use App\Models\ClassTeacher;
use App\Models\Course;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getUserCountsByRoleAndStatus()
    {
        $roles = ['siswa', 'guru'];
        $statuses = [1, 0];
        $counts = [];

        foreach ($roles as $role) {
            foreach ($statuses as $status) {
                $key = "{$role}_{$status}_count";
                $counts[$key] = User::where('role', $role)->where('status', $status)->count();
            }
        }

        return $counts;
    }

    public function getCourseCounts()
    {

        $count = Course::all()->count();


        return $count;
    }


    public function getClassCounts()
    {

        $count = ClassRoom::all()->count();

        return $count;
    }

    public function getGenderStudentsMale()
    {
        $studentMale = Student::where('gender', 'laki-laki')->count();

        return $studentMale;
    }

    public function getGenderStudentsFemale()
    {
        $studentFemale = Student::where('gender', 'perempuan')->count();

        return $studentFemale;
    }

    public function getGenderTeachersMale()
    {
        $studentFemale = Teacher::where('gender', 'laki-laki')->count();

        return $studentFemale;
    }
    public function getGenderTeachersFemale()
    {
        $studentFemale = Teacher::where('gender', 'perempuan')->count();

        return $studentFemale;
    }
    public function index()
    {
        $studentCount = $this->getUserCountsByRoleAndStatus();
        $courseCount = $this->getCourseCounts();
        $classCount = $this->getClassCounts();
        $stundetMale = $this->getGenderStudentsMale();
        $stundetFemale = $this->getGenderStudentsFemale();
        $teacherMale = $this->getGenderTeachersMale();
        $teacherFemale = $this->getGenderTeachersFemale();

        $classRoom = ClassRoom::with('students', 'teachers')->get();
        return Inertia::render('Admin/Dashboard/Index', [

            'studentCounts' => $studentCount,
            'classCounts' => $classCount,
            'courseCounts' => $courseCount,
            'studentMale' => $stundetMale,
            'studentFemale' => $stundetFemale,
            'teacherMale' => $teacherMale,
            'teacherFemale' => $teacherFemale,
            'classRoom' => $classRoom
        ]);
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
        //
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
