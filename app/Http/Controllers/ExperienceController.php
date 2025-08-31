<?php

namespace App\Http\Controllers;

use App\Models\experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExperienceController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'period' => 'required|string|max:255',
            'current' => 'boolean',
        ]);

        $profile = Auth::user()->profile;
        
        // Hitung order baru (untuk urutan pengalaman)
        $maxOrder = $profile->experiences()->max('order') ?? 0;
        
        Experience::create([
            'profile_id' => $profile->id,
            'title' => $request->title,
            'company' => $request->company,
            'period' => $request->period,
            'current' => $request->boolean('current'),
            'order' => $maxOrder + 1,
        ]);

        return back()->with('success', 'Pengalaman kerja berhasil ditambahkan');
    }

    public function update(Request $request, Experience $experience)
    {
        // Pastikan experience milik user yang sedang login
        if ($experience->profile->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'period' => 'required|string|max:255',
            'current' => 'boolean',
        ]);

        $experience->update([
            'title' => $request->title,
            'company' => $request->company,
            'period' => $request->period,
            'current' => $request->boolean('current'),
        ]);

        return back()->with('success', 'Pengalaman kerja berhasil diperbarui');
    }

    public function destroy(Experience $experience)
    {
        // Pastikan experience milik user yang sedang login
        if ($experience->profile->user_id !== Auth::id()) {
            abort(403);
        }

        $experience->delete();

        return back()->with('success', 'Pengalaman kerja berhasil dihapus');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'experiences' => 'required|array',
            'experiences.*.id' => 'required|exists:experiences,id',
            'experiences.*.order' => 'required|integer|min:0',
        ]);

        $profile = Auth::user()->profile;

        foreach ($request->experiences as $expData) {
            $experience = Experience::find($expData['id']);
            
            // Pastikan experience milik user yang sedang login
            if ($experience->profile->user_id !== Auth::id()) {
                continue;
            }
            
            $experience->update(['order' => $expData['order']]);
        }

        return back()->with('success', 'Urutan pengalaman kerja berhasil diperbarui');
    }
}