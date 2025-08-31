<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CompanyDashboardController;

Route::get('/company', [CompanyDashboardController::class, 'index'])->name('company');
