<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\EducationController;
use Illuminate\Foundation\Application;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// Dashboard route
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// PUBLIC ROUTE - Search page untuk semua user
Route::get('/search', [JobController::class, 'publicIndex'])->name('search.index');
Route::get('/search/{job}', [JobController::class, 'show'])->name('search.detail');

Route::middleware(['auth', 'verified'])->group(function () {
    // AUTHENTICATED ROUTES - CRUD operations di /search
    Route::post('/search', [JobController::class, 'store'])->name('search.store');
    Route::put('/search/{job}', [JobController::class, 'update'])->name('search.update');
    Route::delete('/search/{job}', [JobController::class, 'destroy'])->name('search.destroy');
});

// ========================================
// PROFILE ROUTES - Dengan middleware ensure.profile
// ========================================
Route::middleware(['auth', 'ensure.profile'])->group(function () {
    // Profile Main Routes
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    
    // Profile Update Routes - SESUAIKAN DENGAN FRONTEND
    Route::patch('/profile/basic-info', [ProfileController::class, 'updateBasicInfo'])->name('profile.update-basic-info');
    Route::patch('/profile/contact-info', [ProfileController::class, 'updateContactInfo'])->name('profile.update-contact-info');
    
    // Profile Upload Routes - SESUAIKAN DENGAN FRONTEND
    Route::post('/profile/upload-image', [ProfileController::class, 'uploadProfileImage'])->name('profile.upload-image');
    Route::post('/profile/upload-cv', [ProfileController::class, 'uploadCv'])->name('profile.upload-cv');
    
    // Profile Delete Routes - PERBAIKI ROUTE PATH
    Route::delete('/profile/cv', [ProfileController::class, 'deleteCv'])->name('profile.delete-cv'); // Sesuai frontend
    Route::delete('/profile/delete-image', [ProfileController::class, 'deleteProfileImage'])->name('profile.delete-image');
    
    // Skills Routes - SESUAIKAN DENGAN FRONTEND
    Route::post('/skills', [SkillController::class, 'addSkill'])->name('skills.add'); // Frontend menggunakan /skills
    Route::delete('/skills/{skill}', [SkillController::class, 'removeSkill'])->name('skills.remove'); // Frontend menggunakan /skills/{id}
    Route::get('/skills/available', [SkillController::class, 'getAvailableSkills'])->name('skills.available');
    
    // Experience Routes - SESUAIKAN DENGAN FRONTEND
    Route::post('/experiences', [ExperienceController::class, 'store'])->name('experiences.store'); // Frontend menggunakan /experiences
    Route::patch('/experiences/{experience}', [ExperienceController::class, 'update'])->name('experiences.update');
    Route::delete('/experiences/{experience}', [ExperienceController::class, 'destroy'])->name('experiences.destroy'); // Frontend menggunakan /experiences/{id}
    Route::patch('/experiences/reorder', [ExperienceController::class, 'reorder'])->name('experiences.reorder');
    
    // Education Routes - SESUAIKAN DENGAN FRONTEND
    Route::post('/education', [EducationController::class, 'store'])->name('education.store'); // Frontend menggunakan /education
    Route::patch('/education/{education}', [EducationController::class, 'update'])->name('education.update');
    Route::delete('/education/{education}', [EducationController::class, 'destroy'])->name('education.destroy'); // Frontend menggunakan /education/{id}
    Route::patch('/education/reorder', [EducationController::class, 'reorder'])->name('education.reorder');
    
    // TAMBAHAN: Routes yang mungkin diperlukan untuk profile submodule
    Route::prefix('profile')->name('profile.')->group(function () {
        // Skills routes dengan prefix profile (backup)
        Route::prefix('skills')->name('skills.')->group(function () {
            Route::post('/', [SkillController::class, 'addSkill'])->name('add');
            Route::delete('/{skill}', [SkillController::class, 'removeSkill'])->name('remove');
            Route::get('/available', [SkillController::class, 'getAvailableSkills'])->name('available');
        });
        
        // Experience routes dengan prefix profile (backup)
        Route::prefix('experiences')->name('experiences.')->group(function () {
            Route::post('/', [ExperienceController::class, 'store'])->name('store');
            Route::patch('/{experience}', [ExperienceController::class, 'update'])->name('update');
            Route::delete('/{experience}', [ExperienceController::class, 'destroy'])->name('destroy');
            Route::patch('/reorder', [ExperienceController::class, 'reorder'])->name('reorder');
        });
        
        // Education routes dengan prefix profile (backup)
        Route::prefix('education')->name('education.')->group(function () {
            Route::post('/', [EducationController::class, 'store'])->name('store');
            Route::patch('/{education}', [EducationController::class, 'update'])->name('update');
            Route::delete('/{education}', [EducationController::class, 'destroy'])->name('destroy');
            Route::patch('/reorder', [EducationController::class, 'reorder'])->name('reorder');
        });
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/profile.php';
require __DIR__.'/community.php';
require __DIR__.'/search.php';
require __DIR__.'/dashboard.php';