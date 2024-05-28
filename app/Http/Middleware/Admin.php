<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check() && Auth::user()->role === 'admin' && Auth::user()->status == 1) {
            return $next($request);
        }

        // Jika pengguna tidak memenuhi syarat, atur pesan error
        $errorMessage = 'Anda tidak memiliki izin untuk mengakses halaman tersebut.';

        // Jika pengguna terautentikasi, lakukan pengaturan ulang token otentikasi
        if (Auth::check()) {
            Auth::logout(); // Logout pengguna
            $request->session()->invalidate(); // Invalidate session
            $request->session()->regenerateToken(); // Regenerate token baru
            return redirect('/')->with('error', $errorMessage);
        } else {
            // Jika pengguna belum terautentikasi, arahkan mereka ke halaman login
            return redirect('/login')->with('error', $errorMessage);
        }
    }
}
