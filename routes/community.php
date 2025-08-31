<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CommunityController;

Route::get('/community', [CommunityController::class, 'index'])->name('community');

