<?php

use App\Http\Controllers\Admin\AdminManagementController;
use App\Http\Controllers\Admin\BackupDataController;
use App\Http\Controllers\Admin\ClassManagementController;
use App\Http\Controllers\Admin\CourseManagementController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ProfileAdminController;
use App\Http\Controllers\Admin\ScheduleManagementController;
use App\Http\Controllers\Admin\StudentManagementController;
use App\Http\Controllers\Admin\TeacherClassManagementController;
use App\Http\Controllers\Admin\TeacherManagementController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use App\Http\Controllers\Student\ExamController;
use App\Http\Controllers\Student\ProfileController as StudentProfileController;
use App\Http\Controllers\Student\TaskController;
use App\Http\Controllers\Teacher\ClassController;
use App\Http\Controllers\Teacher\DashboardController as TeacherDashboardController;
use App\Http\Controllers\Teacher\ExamController as TeacherExamController;
use App\Http\Controllers\Teacher\ExamGroupController;
use App\Http\Controllers\Teacher\FileLearnManagementController;
use App\Http\Controllers\Teacher\ProfileController as TeacherProfileController;
use App\Http\Controllers\Teacher\TaskController as TeacherTaskController;
use App\Http\Controllers\Teacher\TaskGroupController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });


Route::prefix('admin')->middleware(['auth', "admin"])->group(function () {
    Route::resource('dashboard', AdminDashboardController::class)->names('admin.dashboard');
    Route::resource('siswa', StudentManagementController::class)->names('admin.siswa');
    Route::resource('guru', TeacherManagementController::class)->names('admin.guru');
    Route::resource('kelas', ClassManagementController::class)->names('admin.kelas');
    Route::resource('mapel', CourseManagementController::class)->names('admin.mapel');
    Route::resource('jadwal', TeacherClassManagementController::class)->names('admin.jadwal');
    Route::resource('admin', AdminManagementController::class)->names('admin.admin');
    Route::resource('backup', BackupDataController::class)->names('admin.backup');
    Route::resource('schedule', ScheduleManagementController::class)->names('admin.schedule');
    Route::get('profile', [ProfileAdminController::class, 'edit'])->name('admin.profile.edit');
    Route::patch('profile', [ProfileAdminController::class, 'update'])->name('admin.profile.update');
});

Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    Route::get('siswa-backup/{id}', [StudentManagementController::class, 'restore'])->name('admin.siswa-backup.restore');
    Route::post('siswa-backup/restoreall', [StudentManagementController::class, 'restoreall'])->name('admin.siswa-backup.restoreall');
    Route::get('guru-backup/{id}', [TeacherManagementController::class, 'restore'])->name('admin.guru-backup.restore');
    Route::post('guru-backup/restoreall', [TeacherManagementController::class, 'restoreall'])->name('admin.guru-backup.restoreall');
    Route::get('mapel-backup/{id}', [CourseManagementController::class, 'restore'])->name('admin.mapel-backup.restore');
    Route::post('mapel-backup/restoreall', [CourseManagementController::class, 'restoreall'])->name('admin.mapel-backup.restoreall');
    Route::get('kelas-backup/{id}', [ClassManagementController::class, 'restore'])->name('admin.kelas-backup.restore');
    Route::post('kelas-backup/restoreall', [ClassManagementController::class, 'restoreall'])->name('admin.kelas-backup.restoreall');
    Route::get('jadwal-backup/{id}', [TeacherClassManagementController::class, 'restore'])->name('admin.jadwal-backup.restore');
    Route::post('jadwal-backup/restoreall', [TeacherClassManagementController::class, 'restoreall'])->name('admin.jadwal-backup.restoreall');
    Route::get('admin-backup/{id}', [AdminManagementController::class, 'restore'])->name('admin.admin-backup.restore');
    Route::post('admin-backup/restoreall', [AdminManagementController::class, 'restoreall'])->name('admin.admin-backup.restoreall');
    Route::get('schedule-backup/{id}', [ScheduleManagementController::class, 'restore'])->name('admin.schedule-backup.restore');
    Route::post('schedule-backup/restoreall', [ScheduleManagementController::class, 'restoreall'])->name('admin.schedule-backup.restoreall');
});

Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    Route::get('siswa-delete/delete/{id}', [StudentManagementController::class, 'delete'])->name('admin.siswa-delete.delete');
    Route::get('guru-delete/delete/{id}', [TeacherManagementController::class, 'delete'])->name('admin.guru-delete.delete');
    Route::get('mapel-delete/delete/{id}', [CourseManagementController::class, 'delete'])->name('admin.mapel-delete.delete');
    Route::get('kelas-delete/delete/{id}', [ClassManagementController::class, 'delete'])->name('admin.kelas-delete.delete');
    Route::get('jadwal-delete/delete/{id}', [TeacherClassManagementController::class, 'delete'])->name('admin.jadwal-delete.delete');
    Route::get('admin-delete/delete/{id}', [TeacherClassManagementController::class, 'delete'])->name('admin.admin-delete.delete');
    Route::get('schedule-delete/delete/{id}', [ScheduleManagementController::class, 'delete'])->name('admin.schedule-delete.delete');
});






// Grouping routes under 'siswa' prefix
Route::prefix('siswa')->middleware(['auth', 'student'])->group(function () {
    Route::resource('dashboard', StudentDashboardController::class)->names('student.dashboard');
    Route::resource('tugas', TaskController::class)->names('student.tugas');
    Route::resource('ujian', ExamController::class)->names('student.ujian');
    Route::get('profile', [StudentProfileController::class, 'edit'])->name('student.profile.edit');
    Route::patch('profile', [StudentProfileController::class, 'update'])->name('student.profile.update');
});

// Grouping routes under 'guru' prefix
Route::prefix('guru')->middleware(['auth', 'teacher'])->group(function () {
    Route::resource('dashboard', TeacherDashboardController::class)->names('teacher.dashboard');
    Route::resource('file', FileLearnManagementController::class)->names('teacher.file');
    Route::resource('tugas', TeacherTaskController::class)->names('teacher.tugas');
    Route::resource('ujian', TeacherExamController::class)->names('teacher.ujian');
    Route::resource('detail-ujian', ExamGroupController::class)->names('teacher.detail-ujian');
    Route::resource('detail-tugas', TaskGroupController::class)->names('teacher.detail-tugas');
    Route::get('profile', [TeacherProfileController::class, 'edit'])->name('teacher.profile.edit');
    Route::patch('profile', [TeacherProfileController::class, 'update'])->name('teacher.profile.update');
    Route::resource('kelas', ClassController::class)->names('teacher.kelas');
});


require __DIR__ . '/auth.php';
