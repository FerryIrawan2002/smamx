<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Teacher/Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('teacher.profile.edit');
    }
}
