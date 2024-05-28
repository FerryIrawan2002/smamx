<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use App\Models\ClassTeacher;
use App\Models\Course;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BackupDataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $teacher = User::onlyTrashed()
            ->with(['teacher' => function ($query) {
                $query->withTrashed();
            }])
            ->where('role', 'guru')
            ->get();
        $student =
            User::onlyTrashed()->with(['student' => function ($query) {
                $query->withTrashed()->with('classroom');
            }])->where('role', 'siswa')->get();
        $course = Course::onlyTrashed()->get();
        $classroom = ClassRoom::onlyTrashed()->with('students', 'teachers')->get();
        $classroomTeacherCourse =
            ClassTeacher::onlyTrashed()->with('classRoom', 'teacher.user', 'course')->get();
        $schedule =
            Schedule::onlyTrashed()->with('classTeacher.course', 'classTeacher.teacher.user', 'classTeacher.classRoom')->get();
        $admins = User::onlyTrashed()->where('role', 'admin')->get();
        return Inertia::render('Admin/BackupData/Index', [
            'teacher' => $teacher,
            'student' => $student,
            'course' => $course,
            'classroom' => $classroom,
            'classroomTeacherCourse' => $classroomTeacherCourse,
            'admins' => $admins,
            'schedule' => $schedule
        ]);
    }
}
