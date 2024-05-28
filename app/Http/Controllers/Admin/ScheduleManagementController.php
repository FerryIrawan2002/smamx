<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $schedule =
            Schedule::with('classTeacher.course', 'classTeacher.teacher.user', 'classTeacher.classRoom')->get();
        return Inertia::render('Admin/ScheduleManagement/Index', [
            'schedule' => $schedule
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/ScheduleManagement/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'class_teacher_id' => 'required',
            'day' => 'required|string',
            'time_start' => 'required|string',
            'time_end' => 'required|string',
        ]);

        $schedule = Schedule::create([
            'class_teacher_id' => $request->class_teacher_id,
            'day' => $request->day,
            'time_start' => $request->time_start,
            'time_end' => $request->time_end,
        ]);

        if ($schedule) {
            return back()->with('success', 'Data jadwal berhasil ditambahkan');
        } else {
            return back()->with('error', 'Data jadwal gagal ditambahkan');
        }
    }
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'class_teacher_id' => 'required',
                'day' => 'required|string',
                'time_start' => 'required|string',
                'time_end' => 'required|string',

            ]);

            $schedule = Schedule::find($id);

            if (!$schedule) {
                return back()->with('error', 'Data Jadwal tidak ditemukan');
            } else {
                $schedule->update([
                    'class_teacher_id' => $request->class_teacher_id,
                    'day' => $request->day,
                    'time_start' => $request->time_start,
                    'time_end' => $request->time_end,

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
            $schedule = Schedule::find($id);

            if ($schedule) {
                $schedule->save();
                $schedule->delete();
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
            $schedule = Schedule::onlyTrashed()->where('id', $id)->first();

            if ($schedule) {
                $schedule->restore();
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
            $countRestored = Schedule::onlyTrashed()->restore();

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
            $schedule = Schedule::onlyTrashed()->where('id', $id)->first();

            if ($schedule) {
                $schedule->forceDelete();
                return back()->with('success', 'Data Jadwal berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data Jadwal tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
