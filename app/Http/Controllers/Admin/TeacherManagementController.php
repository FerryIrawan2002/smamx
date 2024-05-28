<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TeacherManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachers = User::with('teacher')->where('role', 'guru')->get();

        return Inertia::render('Admin/TeacherManagement/Index', [
            'teachers' => $teachers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
            'nip' => 'required|string|max:255|unique:teachers',
            'gender' => 'required|string|max:255',
            'phone_number' => 'required|string|max:255|unique:teachers|unique:students',
            'education' => 'required|string|max:255',
            'photo' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:10000',

        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
            'copy_password' => $request->password,
        ]);

        $foto = $request->file('photo');
        $filename = time() . '.' . $foto->getClientOriginalExtension();
        $path = 'foto-guru/' . $filename;
        Storage::disk('public')->put($path, file_get_contents($foto));

        $guru = Teacher::create([
            'nip' => $request->nip,
            'user_id' => $user->id,
            'gender' => $request->gender,
            'phone_number' => $request->phone_number,
            'education' => $request->education,
            'photo' => $path,
        ]);

        if ($user && $guru) {
            return back()->with('success', 'Data guru berhasil ditambahkan');
        } else {
            return back()->with('error', 'Data guru gagal ditambahkan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'nip' => 'required|string|max:255',
                'gender' => 'required|string|max:255',
                'phone_number' => 'required|string|max:255',
                'education' => 'required|string',
                'status' => 'integer|required',
            ]);

            $user = User::with('teacher')->where('role', 'guru')->find($id);

            if (!$user) {
                return back()->with('error', 'User tidak ditemukan');
            }

            $guru = Teacher::where('user_id', $id)->first();

            if (!$guru) {
                return back()->with('error', 'Data Guru tidak ditemukan');
            }

            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'status' => $request->status,
            ]);

            $guru->update([
                'nip' => $request->nip,
                'gender' => $request->gender,
                'phone_number' => $request->phone_number,
                'education' => $request->education,
            ]);

            if ($request->hasFile('photo')) {
                if ($guru->foto) {
                    Storage::disk('public')->delete($guru->foto);
                }

                $foto = $request->file('photo');
                $filename = time() . '.' . $foto->getClientOriginalExtension();
                $path = 'foto-guru/' . $filename;
                Storage::disk('public')->put($path, file_get_contents($foto));

                $guru->update(['photo' => $path]);
            }

            return back()->with('success', 'Data Guru berhasil diubah');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try {
            $teacher = Teacher::findOrFail($id);

            if ($teacher->hasClassTeachers()) {
                return back()->with('error', 'Data Guru tidak dapat dihapus karena terkait dengan kelas');
            }

            $teacher->delete();
            $teacher->user()->delete();

            return back()->with('success', 'Data Guru berhasil dihapus');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restore($id)
    {
        try {
            $user = User::onlyTrashed()->where('id', $id)->first();
            $teacher = Teacher::onlyTrashed()->where('user_id', $id)->first();
            if ($user && $teacher) {
                $user->restore();
                $teacher->restore();
                return back()->with('success', 'Data Guru berhasil direstore');
            } else {
                return back()->with('error', 'Data Guru tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $countRestored = User::onlyTrashed()->where('role', 'guru')->restore();
            $teacher = Teacher::onlyTrashed()->restore();
            if ($countRestored > 0 && $teacher) {
                return back()->with('success', 'Semua Data Guru berhasil direstore');
            } else {
                return back()->with('error', 'Tidak ada data yang dapat direstore');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $user = User::onlyTrashed()->where('id', $id)->first();
            $teacher = Teacher::onlyTrashed()->where('user_id', $id)->first();
            if ($user && $teacher) {
                if ($teacher->photo) {
                    Storage::disk('public')->delete($teacher->photo);
                }
                $user->forceDelete();
                $teacher->forceDelete();
                return back()->with('success', 'Data Guru berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data Guru tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
