<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\ExamGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamGroupController extends Controller
{

    public function show(string $id)
    {
        $exam = Exam::findOrFail($id);

        $examGroup = ExamGroup::with(['student.user' => function ($query) {
            $query->orderBy('name', 'ASC');
        }, 'exam'])
            ->where('exam_id', $exam->id)
            ->get();

        return Inertia::render('Teacher/Exam/DetailShow', [
            'examGroup' => $examGroup
        ]);
    }

    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'point' => 'required|integer',
            ]);

            $examGroup = ExamGroup::findOrFail($id);

            $examGroup->update([
                'point' => $request->point,
                'status' => 1,
            ]);

            if ($examGroup) {
                return back()->with('success', 'Nilai ujian diperbarui');
            } else {
                return back()->with('error', 'Nilai ujian gagal diperbarui');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try {
            $examGroup = ExamGroup::findOrFail($id);

            if ($examGroup->delete()) {
                return back()->with('success', 'Nilai ujian berhasil dihapus');
            } else {
                return back()->with('error', 'Nilai ujian gagal dihapus');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
