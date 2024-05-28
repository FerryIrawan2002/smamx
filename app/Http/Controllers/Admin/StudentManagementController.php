<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StudentManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::with('user', 'classRoom')->whereHas('user', function ($query) {
            $query->where('role', 'siswa');
        })->get();
        return Inertia::render('Admin/StudentManagement/Index', [
            'students' => $students
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/StudentManagement/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => 'required|string',
            'password' => 'required|string',
            'nisn' => 'required|string|max:255|unique:students',
            'gender' => 'required|string|max:255',
            'phone_number' => 'required|string|max:255|unique:students|unique:teachers',
            'entry_year' => 'required|integer',
            'class_room_id' => 'required',
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
            'copy_password' => $request->password,
        ]);
        $student = Student::create([
            'nisn' => $request->nisn,
            'user_id' => $user->id,
            'gender' => $request->gender,
            'phone_number' => $request->phone_number,
            'entry_year' => $request->entry_year,
            'class_room_id' => $request->class_room_id,
        ]);

        if ($user) {
            if ($student) {
                return back()->with('success', 'Data siswa berhasil ditambahkan');
            } else {
                return back()->with('error', 'Data siswa gagal ditambahkan');
            }
        } else {
            return back()->with('error', 'User tidak ditemukan');
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'nisn' => 'required|string|max:255',
                'gender' => 'required|string|max:255',
                'phone_number' => 'required|string|max:255',
                'entry_year' => 'required|integer',
                'class_room_id' => 'integer',
                'status' => 'integer|required',
            ]);

            $user = User::with('student')->where('role', 'siswa')->find($id);
            $siswa = Student::where('user_id', $id)->first();

            if ($user) {
                $user->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'status' => $request->status,
                ]);
                if ($siswa) {
                    $siswa->update([
                        'nisn' => $request->nisn,
                        'gender' => $request->gender,
                        'phone_number' => $request->phone_number,
                        'entry_year' => $request->entry_year,
                        'class_room_id' => $request->class_room_id
                    ]);
                    return back()->with('success', 'Data siswa berhasil diubah');
                } else {
                    return back()->with('error', 'Data siswa tidak ditemukan');
                }
            } else {
                return back()->with('error', 'User tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }


    public function destroy(string $id)
    {
        try {
            $user = User::find($id);

            if ($user) {

                $user->student()->delete();
                $user->status = 0;
                $user->save();
                $user->delete();
                return back()->with('success', 'Data siswa berhasil dihapus');
            } else {
                return back()->with('error', 'Data siswa gagal dihapus');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restore($id)
    {
        try {
            $user = User::onlyTrashed()->where('id', $id)->first();
            $student = Student::onlyTrashed()->where('user_id', $id)->first();
            if ($user && $student) {

                $user->restore();
                $student->restore();
                return back()->with('success', 'Data siswa berhasil direstore');
            } else {
                return back()->with('error', 'Data siswa tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $countRestored = User::onlyTrashed()->where('role', 'siswa')->restore();
            $students = Student::onlyTrashed()->restore();
            if ($countRestored > 0 && $students) {
                return back()->with('success', 'Semua Data siswa berhasil direstore');
            } else {
                return back()->with('error', 'Semua Data siswa gagal direstore');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $user = User::onlyTrashed()->where('id', $id)->first();
            $student = Student::onlyTrashed()->where('user_id', $id)->first();
            if ($user && $student) {
                $user->forceDelete();
                $student->forceDelete();
                return back()->with('success', 'Data siswa berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data siswa tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
