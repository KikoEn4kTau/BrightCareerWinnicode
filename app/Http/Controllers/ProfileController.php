<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Skill;
use App\Models\Experience;
use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Helper method untuk mendapatkan profile user yang sedang login
     * Profile dijamin ada karena middleware ensure.profile
     */
    private function getUserProfile()
    {
        return Auth::user()->profile;
    }

    /**
     * Helper method untuk format profile data untuk frontend
     */
    private function formatProfileData($profile)
    {
        // Load relationships jika belum di-load
        if (!$profile->relationLoaded('skills')) {
            $profile->load(['skills', 'experiences', 'education']);
        }

        return [
            'id' => $profile->id,
            'name' => $profile->name,
            'role' => $profile->role,
            'location' => $profile->location,
            'about' => $profile->about,
            'profile_image' => $profile->profile_image_url,
            'contact_info' => [
                'email' => $profile->email,
                'phone' => $profile->phone,
                'linkedin' => $profile->linkedin,
                'website' => $profile->website,
                'github' => $profile->github,
            ],
            'cv_file' => $profile->cv_file ? basename($profile->cv_file) : null,
            'cv_file_url' => $profile->cv_file_url,
            'skills' => $profile->skills->map(function ($skill) {
                return [
                    'id' => $skill->id,
                    'name' => $skill->name,
                    'color' => $skill->pivot->color ?? 'bg-blue-100 text-blue-800',
                ];
            }),
            'experiences' => $profile->experiences->map(function ($exp) {
                return [
                    'id' => $exp->id,
                    'title' => $exp->title,
                    'company' => $exp->company,
                    'period' => $exp->period,
                    'current' => $exp->current ?? false,
                ];
            }),
            'education' => $profile->education->map(function ($edu) {
                return [
                    'id' => $edu->id,
                    'degree' => $edu->degree,
                    'institution' => $edu->institution,
                    'period' => $edu->period,
                ];
            }),
        ];
    }

    public function show()
    {
        $user = Auth::user();
        
        // Debug logging
        Log::info('ProfileController show method called', [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'has_profile' => $user->profile ? 'yes' : 'no'
        ]);
        
        // PENTING: Gunakan fresh() untuk memastikan data terbaru dari database
        $user = $user->fresh(['profile.skills', 'profile.experiences', 'profile.education']);
        $profile = $user->profile;
        
        if (!$profile) {
            Log::error('Profile not found even after middleware', [
                'user_id' => $user->id
            ]);
            
            // Fallback: create profile manually
            $profile = Profile::create([
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ]);
            $profile->load(['skills', 'experiences', 'education']);
            
            Log::info('Profile created as fallback', [
                'profile_id' => $profile->id
            ]);
        }

        // Format data untuk frontend
        $profileData = $this->formatProfileData($profile);

        Log::info('Profile data prepared for frontend', [
            'profile_data' => $profileData
        ]);

        return Inertia::render('Profile', [
            'profile' => $profileData,
            'availableSkills' => Skill::pluck('name')->toArray(),
        ]);
    }

    public function updateBasicInfo(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'about' => 'nullable|string',
        ]);

        try {
            $user = Auth::user();
            
            // Update profile yang sudah ada (dijamin ada karena middleware)
            $profile = $user->profile;
            $profile->update($validated);

            // PERBAIKAN: Refresh profile dengan relationships
            $profile = $profile->fresh(['skills', 'experiences', 'education']);

            // Log untuk debugging
            Log::info('Profile basic info updated', [
                'user_id' => $user->id,
                'profile_id' => $profile->id,
                'data' => $validated,
                'updated_profile' => $profile->toArray()
            ]);

            // PERBAIKAN: Gunakan back() dengan data terbaru, bukan redirect()
            return back()->with([
                'success' => 'Profil berhasil diperbarui',
                'profile' => $this->formatProfileData($profile)
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to update basic info', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui profil']);
        }
    }

    public function updateContactInfo(Request $request)
    {
        $validated = $request->validate([
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'linkedin' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'github' => 'nullable|string|max:255',
        ]);

        try {
            $user = Auth::user();
            
            // Update profile yang sudah ada (dijamin ada karena middleware)
            $profile = $user->profile;
            $profile->update($validated);

            // PERBAIKAN: Refresh profile dengan relationships
            $profile = $profile->fresh(['skills', 'experiences', 'education']);

            Log::info('Profile contact info updated', [
                'user_id' => $user->id,
                'profile_id' => $profile->id,
                'data' => $validated,
                'updated_profile' => $profile->toArray()
            ]);

            // PERBAIKAN: Gunakan back() dengan data terbaru, bukan redirect()
            return back()->with([
                'success' => 'Informasi kontak berhasil diperbarui',
                'profile' => $this->formatProfileData($profile)
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to update contact info', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui informasi kontak']);
        }
    }

    public function uploadProfileImage(Request $request)
    {
        $request->validate([
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            $profile = $this->getUserProfile();
            
            // Hapus gambar lama jika ada
            if ($profile->profile_image) {
                Storage::disk('public')->delete($profile->profile_image);
            }

            // Upload gambar baru
            $path = $request->file('profile_image')->store('profile-images', 'public');
            
            $profile->update([
                'profile_image' => $path
            ]);

            // PERBAIKAN: Refresh profile dengan relationships
            $profile = $profile->fresh(['skills', 'experiences', 'education']);

            Log::info('Profile image uploaded', [
                'user_id' => Auth::id(),
                'profile_id' => $profile->id,
                'image_path' => $path
            ]);

            return back()->with([
                'success' => 'Foto profil berhasil diupload',
                'profile' => $this->formatProfileData($profile)
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to upload profile image', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id()
            ]);

            return back()->withErrors(['error' => 'Terjadi kesalahan saat mengupload foto profil']);
        }
    }

    public function uploadCv(Request $request)
    {
        $request->validate([
            'cv_file' => 'required|file|mimes:pdf,doc,docx|max:5120', // 5MB max
        ]);

        try {
            $profile = $this->getUserProfile();
            
            // Hapus CV lama jika ada
            if ($profile->cv_file) {
                Storage::disk('public')->delete($profile->cv_file);
            }

            // Upload CV baru
            $file = $request->file('cv_file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('cv-files', $filename, 'public');
            
            $profile->update([
                'cv_file' => $path
            ]);

            // PERBAIKAN: Refresh profile dengan relationships
            $profile = $profile->fresh(['skills', 'experiences', 'education']);

            Log::info('CV uploaded', [
                'user_id' => Auth::id(),
                'profile_id' => $profile->id,
                'cv_path' => $path
            ]);

            return back()->with([
                'success' => 'CV berhasil diupload',
                'profile' => $this->formatProfileData($profile)
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to upload CV', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id()
            ]);

            return back()->withErrors(['error' => 'Terjadi kesalahan saat mengupload CV']);
        }
    }

    /**
     * Method untuk edit profile (jika diperlukan)
     */
    public function edit()
    {
        $profile = $this->getUserProfile();
        
        return Inertia::render('Profile/Edit', [
            'profile' => $this->formatProfileData($profile)
        ]);
    }

    /**
     * Method untuk delete profile image
     */
    public function deleteProfileImage()
    {
        try {
            $profile = $this->getUserProfile();
            
            if ($profile->profile_image) {
                Storage::disk('public')->delete($profile->profile_image);
                $profile->update(['profile_image' => null]);
            }

            // PERBAIKAN: Refresh profile dengan relationships
            $profile = $profile->fresh(['skills', 'experiences', 'education']);

            return back()->with([
                'success' => 'Foto profil berhasil dihapus',
                'profile' => $this->formatProfileData($profile)
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to delete profile image', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id()
            ]);

            return back()->withErrors(['error' => 'Terjadi kesalahan saat menghapus foto profil']);
        }
    }

    /**
     * Method untuk delete CV
     */
    public function deleteCv()
    {
        try {
            $profile = $this->getUserProfile();
            
            if ($profile->cv_file) {
                Storage::disk('public')->delete($profile->cv_file);
                $profile->update(['cv_file' => null]);
            }

            // PERBAIKAN: Refresh profile dengan relationships
            $profile = $profile->fresh(['skills', 'experiences', 'education']);

            return back()->with([
                'success' => 'CV berhasil dihapus',
                'profile' => $this->formatProfileData($profile)
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to delete CV', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id()
            ]);

            return back()->withErrors(['error' => 'Terjadi kesalahan saat menghapus CV']);
        }
    }
}