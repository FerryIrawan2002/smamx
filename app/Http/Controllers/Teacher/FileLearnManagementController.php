<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\LearnFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FileLearnManagementController extends Controller
{

    public function create()
    {
        return Inertia::render('Teacher/Dashboard/CreateFileLearn');
    }


    public function store(Request $request)
    {
        $request->validate([
            'files.*' => 'required|file|max:8048',
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {

                $filename = time() . '_' . $file->getClientOriginalName();
                $path = 'materi-pelajaran/' . $filename;
                $name = $file->getClientOriginalName();
                if (!Storage::putFileAs('public', $file, $path)) {
                    return back()->with('error', 'Failed to upload one or more files');
                }

                // Create a new LearnFile record
                $learnFile = LearnFile::create([
                    'file' => $path,
                    'learn_id' => $request->learn_id,
                    'name' => $name
                ]);

                if (!$learnFile) {
                    Storage::delete($path);
                    return back()->with('error', 'Failed to create LearnFile record');
                }
            }
        }

        return back()->with('success', 'Data Materi berhasil ditambahkan');
    }

    public function destroy(string $id)
    {
        try {
            $learnFile = LearnFile::find($id);

            if (!$learnFile) {
                return back()->with('error', 'File Materi tidak ditemukan');
            }
            $learnFile->delete();
            $filePath = 'public/' . $learnFile->file;
            if (Storage::exists($filePath)) {
                Storage::delete($filePath);
            }

            return back()->with('success', 'File Materi berhasil dihapus');
        } catch (\Throwable $th) {
            return back()->with('error', 'File Materi gagal dihapus');
        }
    }
}
