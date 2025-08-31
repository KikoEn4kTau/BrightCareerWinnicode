<?php
namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function index(Request $request): Response
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
            ];
        });

        return Inertia::render('search', [
            'jobs' => $jobsData,
            'filters' => [
                'search' => $request->search,
                'location' => $request->location,
                'category' => $request->category,
                'sort' => $sortBy,
            ]
        ]);
    }

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
        ];

        return Inertia::render('JobDetail', [
            'job' => $jobData
        ]);
    }
}