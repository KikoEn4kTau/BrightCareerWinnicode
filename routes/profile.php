<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;

// PERBAIKAN: Gunakan ProfileController dengan middleware yang sesuai
Route::middleware(['auth', 'ensure.profile'])->group(function () {
    // Route profile yang benar - menggunakan ProfileController dengan data lengkap
    Route::get('/profile', [ProfileController::class, 'show'])->name('profiles');
    
    // Route tambahan jika diperlukan
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    
    // Update routes
    Route::patch('/profile/basic-info', [ProfileController::class, 'updateBasicInfo'])->name('profile.update-basic-info');
    Route::patch('/profile/contact-info', [ProfileController::class, 'updateContactInfo'])->name('profile.update-contact-info');
    
    // Upload routes
    Route::post('/profile/upload-image', [ProfileController::class, 'uploadProfileImage'])->name('profile.upload-image');
    Route::post('/profile/upload-cv', [ProfileController::class, 'uploadCv'])->name('profile.upload-cv');
    
    // Delete routes
    Route::delete('/profile/cv', [ProfileController::class, 'deleteCv'])->name('profile.delete-cv');
    Route::delete('/profile/delete-image', [ProfileController::class, 'deleteProfileImage'])->name('profile.delete-image');
});