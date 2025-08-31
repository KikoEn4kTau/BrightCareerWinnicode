<?php

namespace App\Http\Controllers;

use App\Models\education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EducationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'degree' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'period' => 'required|string|max:255',
        ]);

        $profile = Auth::user()->profile;
        
        // Hitung order baru (untuk urutan pendidikan)
        $maxOrder = $profile->education()->max('order') ?? 0;
        
        Education::create([
            'profile_id' => $profile->id,
            'degree' => $request->degree,
            'institution' => $request->institution,
            'period' => $request->period,
            'order' => $maxOrder + 1,
        ]);

        return back()->with('success', 'Data pendidikan berhasil ditambahkan');
    }

    public function update(Request $request, Education $education)
    {
        // Pastikan education milik user yang sedang login
        if ($education->profile->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'degree' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'period' => 'required|string|max:255',
        ]);

        $education->update([
            'degree' => $request->degree,
            'institution' => $request->institution,
            'period' => $request->period,
        ]);

        return back()->with('success', 'Data pendidikan berhasil diperbarui');
    }

    public function destroy(Education $education)
    {
        // Pastikan education milik user yang sedang login
        if ($education->profile->user_id !== Auth::id()) {
            abort(403);
        }

        $education->delete();

        return back()->with('success', 'Data pendidikan berhasil dihapus');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'education' => 'required|array',
            'education.*.id' => 'required|exists:education,id',
            'education.*.order' => 'required|integer|min:0',
        ]);

        $profile = Auth::user()->profile;

        foreach ($request->education as $eduData) {
            $education = Education::find($eduData['id']);
            
            // Pastikan education milik user yang sedang login
            if ($education->profile->user_id !== Auth::id()) {
                continue;
            }
            
            $education->update(['order' => $eduData['order']]);
        }

        return back()->with('success', 'Urutan pendidikan berhasil diperbarui');
    }
}