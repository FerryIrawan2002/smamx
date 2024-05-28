<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = User::where('role', 'admin')->get();
        return Inertia::render('Admin/AdminManagement/Index', [
            'admins' => $admins
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AdminManagement/Create');
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
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
            'copy_password' => $request->password,
        ]);

        if ($user) {
            return back()->with('success', 'Data admin berhasil ditambahkan');
        } else {
            return back()->with('error', 'User tidak ditemukan');
        }
    }

    public function destroy(string $id)
    {
        try {
            $user = User::find($id);

            if ($user) {
                $user->status = 0;
                $user->save();
                $user->delete();
                return back()->with('success', 'Data admin berhasil dihapus');
            } else {
                return back()->with('error', 'Data admin gagal dihapus');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restore($id)
    {
        try {
            $user = User::onlyTrashed()->where('id', $id)->first();
            if ($user) {
                $user->restore();
                return back()->with('success', 'Data admin berhasil direstore');
            } else {
                return back()->with('error', 'Data admin tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $countRestored = User::onlyTrashed()->where('role', 'admin')->restore();
            if ($countRestored > 0) {
                return back()->with('success', 'Semua Data admin berhasil direstore');
            } else {
                return back()->with('error', 'Semua Data admin gagal direstore');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $user = User::onlyTrashed()->where('id', $id)->first();
            if ($user) {
                $user->forceDelete();
                return back()->with('success', 'Data siswa berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data siswa tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
