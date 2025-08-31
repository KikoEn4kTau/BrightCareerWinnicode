<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class JobController extends Controller
{
    // Method untuk halaman company (existing)
    public function index(): Response
    {
        $jobs = Job::latest()->get();
        
        Log::info('Jobs count: ' . $jobs->count());
        
        $jobsData = $jobs->map(function ($job) {
            return [
                'id' => $job->id,
                'judul' => $job->judul,
                'position' => $job->judul,
                'salary' => $job->gaji_minimum . ' - ' . $job->gaji_maksimum,
                'type' => $job->tipe,
                'tipe' => $job->tipe,
                'status' => $job->status,
                'deskripsi' => $job->deskripsi,
                'kualifikasi' => $job->kualifikasi,
                'perusahaan' => $job->perusahaan,
                'kota' => $job->kota,
                'tenure' => $job->tenure,
                'gaji_minimum' => $job->gaji_minimum,
                'gaji_maksimum' => $job->gaji_maksimum,
                'url_logo' => $job->url_logo,
                'created_at' => $job->created_at->format('d M Y'),
            ];
        });

        Log::info('Jobs data: ', $jobsData->toArray());

        return Inertia::render('company', [
            'jobs' => $jobsData,
        ]);
    }

    // Method untuk halaman publik job search dengan management capabilities
    public function publicIndex(Request $request): Response
    {
        $query = Job::where('status', 'Aktif');

        // Filter berdasarkan search term
        if ($request->has('search') && $request->search) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('judul', 'like', '%' . $searchTerm . '%')
                  ->orWhere('perusahaan', 'like', '%' . $searchTerm . '%')
                  ->orWhere('deskripsi', 'like', '%' . $searchTerm . '%');
            });
        }

        // Filter berdasarkan lokasi
        if ($request->has('location') && $request->location) {
            $query->where('kota', 'like', '%' . $request->location . '%');
        }

        // Filter berdasarkan kategori/tipe
        if ($request->has('category') && $request->category && $request->category !== 'Kategori') {
            $query->where('tipe', $request->category);
        }

        // Sorting
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'salary_high':
                $query->orderBy('gaji_maksimum', 'desc');
                break;
            case 'alphabetical':
                $query->orderBy('judul', 'asc');
                break;
            case 'latest':
            default:
                $query->latest();
                break;
        }

        $jobs = $query->paginate(10);

        $jobsData = $jobs->through(function ($job) {
            return [
                'id' => $job->id,
                'title' => $job->judul,
                'judul' => $job->judul,
                'company' => $job->perusahaan,
                'perusahaan' => $job->perusahaan,
                'type' => $job->tenure, // Full-time, Part-time, etc
                'workMode' => $job->tipe, // WFH, Onsite, Hybrid
                'tipe' => $job->tipe,
                'salary' => $job->gaji_minimum . ' - ' . $job->gaji_maksimum,
                'gaji_minimum' => $job->gaji_minimum,
                'gaji_maksimum' => $job->gaji_maksimum,
                'location' => $job->kota,
                'kota' => $job->kota,
                'deskripsi' => $job->deskripsi,
                'kualifikasi' => $job->kualifikasi,
                'url_logo' => $job->url_logo,
                'created_at' => $job->created_at->format('d M Y'),
                'created_at_diff' => $job->created_at->diffForHumans(),
                'status' => $job->status, // Tambahkan status untuk management
                'tenure' => $job->tenure, // Tambahkan tenure
            ];
        });

        return Inertia::render('search', [
            'jobs' => $jobsData,
            'filters' => [
                'search' => $request->search,
                'location' => $request->location,
                'category' => $request->category,
                'sort' => $sortBy,
            ],
            'auth' => [
                'user' => $request->user(),
            ],
            'canManageJobs' => $request->user() ? true : false, // Permission untuk manage jobs
        ]);
    }

    // Method untuk detail job
    public function show(Job $job): Response
    {
        // Pastikan job yang ditampilkan adalah job aktif
        if ($job->status !== 'Aktif') {
            abort(404);
        }

        $jobData = [
            'id' => $job->id,
            'title' => $job->judul,
            'judul' => $job->judul,
            'company' => $job->perusahaan,
            'perusahaan' => $job->perusahaan,
            'type' => $job->tenure,
            'workMode' => $job->tipe,
            'tipe' => $job->tipe,
            'salary' => $job->gaji_minimum . ' - ' . $job->gaji_maksimum,
            'gaji_minimum' => $job->gaji_minimum,
            'gaji_maksimum' => $job->gaji_maksimum,
            'location' => $job->kota,
            'kota' => $job->kota,
            'deskripsi' => $job->deskripsi,
            'kualifikasi' => $job->kualifikasi,
            'url_logo' => $job->url_logo,
            'created_at' => $job->created_at->format('d M Y'),
            'created_at_diff' => $job->created_at->diffForHumans(),
            'tenure' => $job->tenure,
            'status' => $job->status,
        ];

        return Inertia::render('JobDetail', [
            'job' => $jobData,
            'auth' => [
                'user' => request()->user(),
            ],
        ]);
    }

    // Method untuk create job (accessible via POST /search)
    public function store(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'judul' => 'required|string|max:255',
                'deskripsi' => 'required|string',
                'kualifikasi' => 'required|string',
                'perusahaan' => 'required|string|max:255',
                'kota' => 'required|string|max:255',
                'tipe' => 'required|in:WFH,Onsite,Hybrid',
                'tenure' => 'required|string|max:255',
                'gaji_minimum' => 'required|string',
                'gaji_maksimum' => 'required|string',
                'url_logo' => 'nullable|url',
                'status' => 'required|in:Aktif,Nonaktif'
            ]);

            Job::create($validated);

            Log::info('Job created successfully by user: ' . ($request->user()->id ?? 'unknown'));

            return redirect()->route('search.index')->with('success', 'Lowongan berhasil ditambahkan!');
        } catch (\Exception $e) {
            Log::error('Error creating job: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Terjadi kesalahan saat membuat lowongan: ' . $e->getMessage());
        }
    }

    // Method untuk update job (accessible via PUT /search/{job})
    public function update(Request $request, Job $job): RedirectResponse
    {
        try {
            // Log untuk debugging
            Log::info('Attempting to update job ID: ' . $job->id);
            Log::info('Request data: ', $request->all());

            $validated = $request->validate([
                'judul' => 'required|string|max:255',
                'deskripsi' => 'required|string',
                'kualifikasi' => 'required|string',
                'perusahaan' => 'required|string|max:255',
                'kota' => 'required|string|max:255',
                'tipe' => 'required|in:WFH,Onsite,Hybrid',
                'tenure' => 'required|string|max:255',
                'gaji_minimum' => 'required|string',
                'gaji_maksimum' => 'required|string',
                'url_logo' => 'nullable|url',
                'status' => 'required|in:Aktif,Nonaktif',
            ]);

            $job->update($validated);

            Log::info('Job updated successfully: ' . $job->id);

            return redirect()->route('search.index')->with('success', 'Lowongan berhasil diperbarui!');
        } catch (\Exception $e) {
            Log::error('Error updating job: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Terjadi kesalahan saat mengupdate lowongan: ' . $e->getMessage());
        }
    }

    // Method untuk delete job (accessible via DELETE /search/{job})
    public function destroy(Job $job): RedirectResponse
    {
        try {
            Log::info('Attempting to delete job ID: ' . $job->id);
            
            $job->delete();
            
            Log::info('Job deleted successfully: ' . $job->id);
            
            return redirect()->route('search.index')->with('success', 'Lowongan berhasil dihapus!');
        } catch (\Exception $e) {
            Log::error('Error deleting job: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menghapus lowongan: ' . $e->getMessage());
        }
    }
}