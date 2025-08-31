<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Job; // TAMBAHKAN INI

class CompanyDashboardController extends Controller
{
    public function index()
    {
        // Sekarang bisa pakai Job:: langsung tanpa \App\Models\
        $jobs = Job::orderBy('created_at', 'desc')->get();
        
        \Log::info('Jobs from database:', $jobs->toArray());
        
        return inertia('company', [
            'jobs' => $jobs,
            'applicants' => [],
            'stats' => [
                'active_jobs' => Job::where('status', 'Aktif')->count(),
                'total_applicants' => 0,
                'today_applicants' => 0,
                'interviews' => 0,
            ]
        ]);
    }
}