<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CourseManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::all();
        return Inertia::render('Admin/CourseManagement/Index', [
            'courses' => $courses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/CourseManagement/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'course_name' => 'required|string|max:255',
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:10000',
        ]);

        $photo = $request->file('photo');
        $filename = time() . '.' . $photo->getClientOriginalExtension();
        $path = 'photo-mapel/' . $filename;
        Storage::disk('public')->put($path, file_get_contents($photo));

        $mapel = Course::create([
            'course_name' => $request->course_name,
            'photo' => $path
        ]);

        if ($mapel) {
            return back()->with('success', 'Data Mapel berhasil ditambahkan');
        } else {
            return back()->with('error', 'Data Mapel gagal ditambahkan');
        }
    }


    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'course_name' => 'required|string|max:255',

            ]);

            $mapel = Course::find($id);

            if (!$mapel) {
                return back()->with('error', 'Data Mapel tidak ditemukan');
            }

            if ($request->hasFile('photo')) {
                if ($mapel->photo) {
                    Storage::disk('public')->delete($mapel->photo);
                }
                $photo = $request->file('photo');
                $filename = time() . '.' . $photo->getClientOriginalExtension();
                $path = 'photo-mapel/' . $filename;
                Storage::disk('public')->put($path, file_get_contents($photo));
                $mapel->photo = $path;
            }

            $mapel->course_name = $request->course_name;
            $mapel->save();

            return back()->with('success', 'Data Mapel berhasil diubah');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }


    public function destroy(string $id)
    {
        try {
            $course = Course::findOrFail($id);
            if ($course->hasClassTeachers()) {
                return back()->with('error', 'Gagal menghapus kursus. Kursus ini masih terkait dengan kelas.');
            }

            $course->delete();

            return back()->with('success', 'Data Mapel berhasil dihapus');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restore($id)
    {
        try {
            $mapel = Course::onlyTrashed()->where('id', $id)->first();

            if ($mapel) {
                $mapel->restore();
                return back()->with('success', 'Data Mapel berhasil direstore');
            } else {
                return back()->with('error', 'Data Mapel tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $countRestored = Course::onlyTrashed()->restore();

            if ($countRestored > 0) {
                return back()->with('success', 'Semua Data Mapel berhasil direstore');
            } else {
                return back()->with('error', 'Tidak ada Data Mapel yang dapat direstore');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $mapel = Course::onlyTrashed()->where('id', $id)->first();

            if ($mapel) {
                if ($mapel->photo) {
                    Storage::disk('public')->delete($mapel->photo);
                }
                $mapel->forceDelete();
                return back()->with('success', 'Data Mapel berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data Mapel tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
