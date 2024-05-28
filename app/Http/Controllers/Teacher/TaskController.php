<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use App\Models\ClassTeacher;
use App\Models\Student;
use App\Models\Task;
use App\Models\TaskGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function create()
    {
        return Inertia::render('Teacher/Task/Create');
    }

    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'class_teacher_id' => 'required',
            'name' => 'required',
            'desc' => 'required',
            'deadline' => 'required',
        ]);

        // Create a new task
        $task = Task::create([
            'name' => $request->name,
            'desc' => $request->desc,
            'deadline' => $request->deadline,
            'class_teacher_id' => $request->class_teacher_id
        ]);

        $student = ClassTeacher::with('classroom.students')->where('id', $request->class_teacher_id)->first();

        if ($student) {
            foreach ($student->classroom->students as $student) {
                TaskGroup::create([
                    'task_id' => $task->id,
                    'student_id' => $student->id
                ]);
            }
            return back()->with('success', 'Data Tugas berhasil ditambahkan');
        } else {
            $task->delete();
        }

        // return back()->with('error', 'Tidak ada siswa yang ditemukan dalam kelas ini');
    }


    public function show(string $id)
    {
        $classRoom = ClassTeacher::with('tasks', 'classroom.students')->findOrFail($id);

        $teacher = Auth::user()->teacher;

        if ($classRoom->teacher_id != $teacher->id) {
            return back()->with('error', 'Data Tugas tidak ditemukan');
        }
        $tasks = Task::with('taskGroup.student.user')->where('class_teacher_id', $id)->get();
        return Inertia::render('Teacher/Task/Show', [
            'classRoom' => $classRoom,
            'tasks' => $tasks
        ]);
    }


    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'name' => 'required',
                'desc' => 'required',
                'deadline' => 'required',
            ]);

            $task = Task::find($id);

            if (!$task) {
                return back()->with('error', 'Data Tugas tidak ditemukan');
            } else {
                $task->update($request->all());
                return back()->with('success', 'Data Tugas berhasil di ubah');
            }
        } catch (\Throwable $th) {
            return back()->with('error', 'Data Tugas gagal di ubah');
        }
    }

    public function destroy(string $id)
    {
        $task = Task::find($id);
        if (!$task) {
            return back()->with('error', 'Data Tugas tidak ditemukan');
        }
        $task->delete();
        return back()->with('success', 'Data Tugas berhasil di hapus');
    }
}
