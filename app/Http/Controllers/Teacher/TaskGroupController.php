<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\TaskGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskGroupController extends Controller
{

    public function show(string $id)
    {
        $task = Task::findOrFail($id);

        $taskGroup = TaskGroup::with('student.user')->where('task_id', $task->id)->get();

        return Inertia::render('Teacher/Task/DetailShow', [
            'taskGroup' => $taskGroup
        ]);
    }

    public function edit()
    {
        return Inertia::render('Teacher/Task/EditPoint');
    }

    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'point' => 'required|integer',
            ]);

            $taskGroup = TaskGroup::findOrFail($id);

            $taskGroup->update([
                'point' => $request->point,
                'status' => 'Selesai',
            ]);

            if ($taskGroup) {
                return back()->with('success', 'Nilai tugas diperbarui');
            } else {
                return back()->with('error', 'Nilai tugas gagal diperbarui');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
