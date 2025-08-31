<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'user_type' => 'required|in:pekerja,perusahaan',
            'role' => 'required|in:pekerja,perusahaan',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = null; // Inisialisasi variabel $user

        if ($request->role === 'pekerja') {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users,email',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'user_type' => 'pekerja',
                'role' => 'pekerja',
            ]);

        } elseif ($request->role === 'perusahaan') {
            $request->validate([
                'company_name' => 'required|string|max:255',
                'company_email' => 'required|email|max:255|unique:users,company_email',
                'company_phone' => 'nullable|string|max:20', // Tambahkan validasi untuk phone jika diperlukan
            ]);

            $user = User::create([
                'name' => $request->company_name,
                'email' => $request->company_email,
                'password' => Hash::make($request->password),
                'phone' => $request->company_phone,
                'user_type' => 'perusahaan',
                'role' => 'perusahaan',
            ]);
        }

        // Pastikan $user sudah terdefinisi sebelum digunakan
        if ($user) {
            event(new Registered($user));
            Auth::login($user);
        }
        if ($user->role === 'pekerja') {
            return to_route('home');
        }
        else{
            return to_route('company');
        }
    }
}