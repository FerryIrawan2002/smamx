<?php

namespace App\Http\Middleware;

use App\Models\ClassRoom;
use App\Models\ClassTeacher;
use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? $request->user()->load('student', 'teacher') : null, // Loading user with student or teacher relation
            ],
            'flash' => [
                'error' => fn () => $request->session()->get('error'),
                'success' => fn () => $request->session()->get('success'),
            ],
            'classes' => fn () => ClassRoom::all(), // Retrieving all class rooms
            'teachers' => fn () => Teacher::with('user')->get(), // Retrieving teachers with their user details
            'courses' => fn () => Course::all(), // Retrieving all courses
            'classTeacherCourses' => fn () => ClassTeacher::with('classRoom', 'teacher.user', 'course')->get(), // Retrieving class teacher courses with related data
        ]);
    }
}
