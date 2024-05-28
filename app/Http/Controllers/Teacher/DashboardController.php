<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\ClassTeacher;
use App\Models\Learn;
use App\Models\LearnFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

use function Termwind\terminal;

class DashboardController extends Controller
{

    public function index()
    {
        $teacher = Auth::user()->teacher;
        $classrooms = ClassTeacher::with(['classRoom.students', 'teacher.user', 'course', 'schedules'])
            ->where('teacher_id', $teacher->id)
            ->get();

        return Inertia::render(
            'Teacher/Dashboard/Index',
            [
                'teacher' => $teacher,
                'classrooms' => $classrooms,
            ]
        );
    }



    public function store(Request $request)
    {
        $request->validate([
            'class_teacher_id' => 'required',
            'week' => 'required|string',
            'desc' => 'required|string',
            'files.*' => 'required|file|max:8048',
        ]);

        $learn = Learn::create([
            'class_teacher_id' => $request->class_teacher_id,
            'week' => $request->week,
            'desc' => $request->desc,
        ]);


        if (!$learn) {
            return back()->with('error', 'Failed to create Learn record');
        }
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = 'materi-pelajaran/' . $filename;
                $name = $file->getClientOriginalName();

                if (!Storage::putFileAs('public', $file, $path)) {
                    $learn->delete();
                    return back()->with('error', 'Failed to upload one or more files');
                }

                $learnFile = LearnFile::create([
                    'file' => $path,
                    'learn_id' => $learn->id,
                    'name' => $name
                ]);

                if (!$learnFile) {
                    $learn->delete();
                    return back()->with('error', 'Failed to create LearnFile record');
                }
            }
        }

        return back()->with('success', 'Data Materi berhasil ditambahkan');
    }


    public function show(string $id)
    {
        $classroom = ClassTeacher::with('classRoom', 'teacher.user', 'course', 'schedules')
            ->findOrFail($id);

        $teacher = Auth::user()->teacher;
        if ($classroom->teacher_id !== $teacher->id) {
            abort(403, 'Unauthorized');
        }
        $dataLearn = Learn::with('learnfile')->where('class_teacher_id', $classroom->id)->get();
        return Inertia::render(
            'Teacher/Dashboard/Show',
            [
                'classroom' => $classroom,
                'dataLearn' => $dataLearn
            ]
        );
    }


    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'learn_id' => 'required',
                'week' => 'required|string',
                'desc' => 'required|string',
                'status' => 'required|boolean',
            ]);

            $learn = Learn::find($id);

            if (!$learn) {
                return back()->with('error', 'Data Materi tidak ditemukan');
            } else {
                $learn->update($request->all());
                return back()->with('success', 'Data Materi berhasil di ubah');
            }
        } catch (\Throwable $th) {
            return back()->with('error', 'Data Materi gagal di ubah');
        }
    }

    public function destroy(string $id)
    {
        try {
            $learn = Learn::find($id);
            $learnFile = LearnFile::where('learn_id', $learn->id)->get();
            $learnFile->each(function ($file) {
                $path = 'public/' . $file->file;
                if (Storage::exists($path)) {
                    Storage::delete($path);
                    $file->delete();
                }
            });


            $learn->delete();
            return back()->with('success', 'Data Materi berhasil di hapus');
        } catch (\Throwable $th) {
            return back()->with('error', 'Data Materi gagal di hapus');
        }
    }
}
