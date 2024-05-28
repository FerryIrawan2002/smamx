<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassTeacher;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherClassManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teacherClassroom = ClassTeacher::with('classRoom', 'teacher.user', 'course')->get();
        return Inertia::render('Admin/TeacherClassManagement/Index', [
            'teacherClassroom' => $teacherClassroom
        ]);
    }




    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/TeacherClassManagement/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required',
            'teacher_id' => 'required',
            'course_id' => 'required',
        ]);

        $classTeacher = ClassTeacher::create([
            'class_room_id' => $request->class_room_id,
            'teacher_id' => $request->teacher_id,
            'course_id' => $request->course_id,
        ]);

        if ($classTeacher) {
            return back()->with('success', 'Data kelas berhasil ditambahkan');
        } else {
            return back()->with('error', 'Data kelas gagal ditambahkan');
        }
    }


    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'class_room_id' => 'required',
                'teacher_id' => 'required',
                'course_id' => 'required',

            ]);

            $teacherClassroom = ClassTeacher::find($id);

            if (!$teacherClassroom) {
                return back()->with('error', 'Data Jadwal tidak ditemukan');
            } else {
                $teacherClassroom->update([
                    'class_room_id' => $request->class_room_id,
                    'teacher_id' => $request->teacher_id,
                    'course_id' => $request->course_id,

                ]);
                return back()->with('success', 'Data Jadwal berhasil diupdate');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try {
            $kelas = ClassTeacher::find($id);

            if ($kelas) {
                $kelas->save();
                $kelas->delete();
                return back()->with('success', 'Data Kelas berhasil dihapus');
            } else {
                return back()->with('error', 'Data Kelas gagal dihapus');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }



    public function restore($id)
    {
        try {
            $kelas = ClassTeacher::onlyTrashed()->where('id', $id)->first();

            if ($kelas) {
                $kelas->restore();
                return back()->with('success', 'Data Jadwal berhasil direstore');
            } else {
                return back()->with('error', 'Data Jadwal tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $countRestored = ClassTeacher::onlyTrashed()->restore();

            if ($countRestored > 0) {
                return back()->with('success', 'Semua Jadwal berhasil direstore');
            } else {
                return back()->with('error', 'Tidak ada Jadwal yang dapat direstore');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $kelas = ClassTeacher::onlyTrashed()->where('id', $id)->first();

            if ($kelas) {
                $kelas->forceDelete();
                return back()->with('success', 'Data Jadwal berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data Jadwal tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
