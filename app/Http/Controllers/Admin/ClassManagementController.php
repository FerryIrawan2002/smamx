<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ClassManagementController extends Controller
{

    public function index()
    {
        $classes = ClassRoom::with('students', 'teachers')->get();
        return Inertia::render('Admin/ClassManagement/Index', [
            'classes' => $classes
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ClassManagement/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validation = $request->validate([
            'class_name' => 'required|string|max:255',
            'major' => 'required|string',
            'class_number' => 'required|numeric',
        ]);

        $kelas = ClassRoom::create([
            'class_name' => $request->class_name,
            'major' => $request->major,
            'class_number' => $request->class_number
        ]);

        if ($validation && $kelas) {
            return back()->with('success', 'Data kelas berhasil ditambahkan');
        } else {
            return back()->with('error', 'Data kelas gagal ditambahkan');
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'class_name' => 'required|string|max:255',
                'major' => 'required|string',
                'class_number' => 'required|numeric',
            ]);

            $kelas = ClassRoom::find($id);

            if (!$kelas) {
                return back()->with('error', 'Data Kelas tidak ditemukan');
            }

            $kelas->class_name = $request->class_name;
            $kelas->major = $request->major;
            $kelas->class_number = $request->class_number;
            $kelas->save();

            return back()->with('success', 'Data Kelas berhasil diubah');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }


    public function destroy(string $id)
    {
        try {
            $kelas = ClassRoom::find($id);

            if (!$kelas) {
                return back()->with('error', 'Data Kelas tidak ditemukan');
            }

            if ($kelas->students->isEmpty() && $kelas->teachers->isEmpty()) {
                $kelas->delete();
                return back()->with('success', 'Data Kelas berhasil dihapus');
            } else {
                return back()->with('error', 'Kelas tidak bisa dihapus karena terkait dengan murid atau guru');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }




    public function restore($id)
    {
        try {
            $kelas = ClassRoom::onlyTrashed()->where('id', $id)->first();

            if ($kelas) {
                $kelas->restore();
                return back()->with('success', 'Data Kelas berhasil direstore');
            } else {
                return back()->with('error', 'Data Kelas tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $countRestored = ClassRoom::onlyTrashed()->restore();

            if ($countRestored > 0) {
                return back()->with('success', 'Semua Data Kelas berhasil direstore');
            } else {
                return back()->with('error', 'Tidak ada data Kelas yang dapat direstore');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $kelas = ClassRoom::onlyTrashed()->where('id', $id)->first();

            if ($kelas) {
                $kelas->forceDelete();
                return back()->with('success', 'Data Kelas berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data Kelas tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
