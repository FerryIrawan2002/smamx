<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\ClassTeacher;
use App\Models\Task;
use App\Models\TaskGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function show(string $id)
    {
        $student = Auth::user()->student;

        $classTeacher = ClassTeacher::with(['tasks.taskGroup' => function ($query) use ($student) {
            $query->where('student_id', $student->id);
        }, 'course'])
            ->where('class_room_id', $student->classroom->id)
            ->findOrFail($id);

        return Inertia::render('Student/Task/Show', [
            'classTask' => $classTeacher,
        ]);
    }
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'file' => 'required|max:8048',
            ]);

            $taskGroup = TaskGroup::findOrFail($id);

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filename = uniqid() . '.' . $file->getClientOriginalName(); // Menggunakan uniqid() untuk membuat nama file unik
                $path = 'file-tugas-siswa/' . $filename;
                Storage::disk('public')->put($path, file_get_contents($file));

                $taskGroup->update([
                    'file' => $path,
                    'status' => 'Telah mengumpulkan',
                    'file_name' => $file->getClientOriginalName(),
                    'deadline_at' => now(),
                ]);

                // Return the filename in the success message
                return back()->with('success', 'Upload file tugas berhasil');
            }
        } catch (\Exception $e) {
            // Handle the exception
            return back()->with('error', 'Upload file tugas gagal');
        }
    }



    /**
     * Remove the specified resource from storage.
     */ public function destroy(string $id)
    {
        try {

            $taskGroup = TaskGroup::findOrFail($id);
            if ($taskGroup->file) {
                Storage::disk('public')->delete($taskGroup->file);
                $taskGroup->update(['file' => null]);
            }
            $taskGroup->update(['status' => 'Belum mengumpulkan']);
            return back()->with('success', 'File tugas berhasil dihapus');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menghapus file tugas');
        }
    }
}
