// resources/js/Pages/JobSearch.tsx
import React, { useState, ReactElement,useEffect } from 'react';
import { Search, MapPin, ChevronDown, Building2, Code, TrendingUp, Briefcase } from 'lucide-react';
import { router } from '@inertiajs/react';
import Header from '@/components/header';
import type { 
  Job, 
  PaginatedJobs, 
  JobFilters, 
  JobSearchPageProps, 
  PaginationLink,
  WorkModeType 
} from '@/types/job';


const JobSearchPage: React.FC<JobSearchPageProps> = ({ jobs, filters = {} }) => {
  // Debug: Log semua props yang diterima
  console.log('=== JobSearchPage Debug ===');
  console.log('jobs:', jobs);
  console.log('jobs type:', typeof jobs);
  console.log('jobs is null:', jobs === null);
  console.log('jobs is undefined:', jobs === undefined);
  console.log('jobs is array:', Array.isArray(jobs));
  console.log('filters:', filters);

  // Kondisi yang lebih spesifik untuk debugging
  if (jobs === null) {
    console.error('Jobs is null');
  } else if (jobs === undefined) {
    console.error('Jobs is undefined');
  } else if (typeof jobs !== 'object') {
    console.error('Jobs is not an object, type:', typeof jobs);
  }

  // Early return hanya jika benar-benar tidak ada data
  if (jobs === null || jobs === undefined) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Debug Mode</h2>
            <p className="text-gray-600">Jobs data: {String(jobs)}</p>
            <p className="text-gray-600">Type: {typeof jobs}</p>
            <p className="text-red-600">Data tidak tersedia dari server</p>
          </div>
        </div>
      </div>
    );
  }
  const [searchTerm, setSearchTerm] = useState<string>(filters.search || '');
  const [location, setLocation] = useState<string>(filters.location || '');
  const [category, setCategory] = useState<string>(filters.category || 'Kategori');
  const [sortBy, setSortBy] = useState<string>(filters.sort || 'latest');
  useEffect(() => {
    // Force component to re-render when jobs prop changes
    console.log('Jobs updated:', jobs);
  }, [jobs]);

  // Type guard dengan logging yang lebih detail
  const isPaginatedJobs = (jobs: PaginatedJobs | Job[]): jobs is PaginatedJobs => {
    if (!jobs || typeof jobs !== 'object') {
      console.log('isPaginatedJobs: jobs is not object');
      return false;
    }
    
    const hasData = 'data' in jobs;
    const hasTotal = 'total' in jobs;
    const hasLinks = 'links' in jobs;
    
    console.log('isPaginatedJobs checks:');
    console.log('  hasData:', hasData);
    console.log('  hasTotal:', hasTotal);
    console.log('  hasLinks:', hasLinks);
    console.log('  jobs keys:', Object.keys(jobs));
    
    return hasData && hasTotal;
  };

  // Debug: Log jobs untuk melihat struktur data
  console.log('Jobs data:', jobs);
  console.log('Is paginated:', isPaginatedJobs(jobs));
  
  // Function untuk handle search
  const handleSearch = (): void => {
    const params: Record<string, string> = {};
    
    if (searchTerm.trim()) params.search = searchTerm.trim();
    if (location.trim()) params.location = location.trim();
    if (category && category !== 'Kategori') params.category = category;
    if (sortBy) params.sort = sortBy;

    router.get('/jobs', params, {
      preserveState: false,  // Ubah ke false
      preserveScroll: false, // Ubah ke false
      replace: true,         // Tambahkan ini
    });
  };

  // Function untuk handle sort change
  const handleSortChange = (newSort: string): void => {
    setSortBy(newSort);
    
    const params: Record<string, string> = {};
    if (searchTerm.trim()) params.search = searchTerm.trim();
    if (location.trim()) params.location = location.trim();
    if (category && category !== 'Kategori') params.category = category;
    params.sort = newSort;

    router.get('/jobs', params, {
      preserveState: false,  // Ubah ke false
      preserveScroll: false, // Ubah ke false
      replace: true,         // Tambahkan ini
    });
  };

  // Function untuk handle apply button
  const handleApply = (jobId: number): void => {
    router.visit(`/jobs/${jobId}`);
  };

  // Function untuk get icon berdasarkan tipe pekerjaan
  const getJobIcon = (type: WorkModeType): ReactElement => {
    if (type === 'WFH') return <Code className="w-8 h-8 text-green-600" />;
    if (type === 'Hybrid') return <Building2 className="w-8 h-8 text-blue-600" />;
    if (type === 'Onsite') return <Briefcase className="w-8 h-8 text-purple-600" />;
    return <Building2 className="w-8 h-8 text-gray-600" />;
  };

  // Function untuk format work mode
  const formatWorkMode = (tipe: WorkModeType): string => {
    switch(tipe) {
      case 'WFH': return 'Remote';
      case 'Onsite': return 'On-site';
      case 'Hybrid': return 'Hybrid';
      default: return tipe;
    }
  };

  // Ganti function handlePagination
  const handlePagination = (url: string): void => {
    router.visit(url, {
      preserveState: false,
      replace: true,         
    });
  };

  // Function untuk clear filters
  const clearFilters = (): void => {
    setSearchTerm('');
    setLocation('');
    setCategory('Kategori');
    setSortBy('latest');
    
    router.get('/search', {}, {
      preserveState: false, 
      preserveScroll: false, 
      replace: true,         
    });
  };

  // Get jobs data and count safely with detailed logging
  let jobsData: Job[] = [];
  let jobsCount: number = 0;

  console.log('Processing jobs data...');
  console.log('Raw jobs:', jobs);
  
  try {
    // Laravel pagination structure check
    if (jobs && typeof jobs === 'object' && 'data' in jobs && 'total' in jobs) {
      console.log('Jobs detected as Laravel Pagination');
      jobsData = (jobs as any).data || [];
      jobsCount = (jobs as any).total || 0;
      console.log('  data length:', jobsData.length);
      console.log('  total count:', jobsCount);
    } else if (Array.isArray(jobs)) {
      console.log('Jobs detected as Job[] array');
      jobsData = jobs;
      jobsCount = jobs.length;
      console.log('  array length:', jobsCount);
    } else if (jobs && typeof jobs === 'object') {
      console.log('Jobs detected as object, checking properties...');
      const jobsObj = jobs as any;
      
      // Log all available properties
      console.log('Available properties:', Object.keys(jobsObj));
      
      // Try different possible structures
      if (jobsObj.data && Array.isArray(jobsObj.data)) {
        jobsData = jobsObj.data;
        jobsCount = jobsObj.total || jobsData.length;
        console.log('  found data in .data property, length:', jobsData.length);
      } else if (Array.isArray(jobsObj)) {
        jobsData = jobsObj;
        jobsCount = jobsData.length;
        console.log('  jobs is actually an array, length:', jobsCount);
      } else {
        console.error('Unknown jobs format. Keys:', Object.keys(jobsObj));
        console.error('Sample data:', jobsObj);
        jobsData = [];
        jobsCount = 0;
      }
    } else {
      console.error('Jobs is not in expected format:', typeof jobs, jobs);
      jobsData = [];
      jobsCount = 0;
    }
  } catch (error) {
    console.error('Error processing jobs data:', error);
    jobsData = [];
    jobsCount = 0;
  }

  console.log('Final jobsData:', jobsData);
  console.log('Final jobsCount:', jobsCount);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 pt-[100px]">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Find Your Dream Job
          </h1>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Kata Kunci"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Location Input */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Lokasi"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]"
                >
                  <option value="Kategori">Kategori</option>
                  <option value="WFH">Remote</option>
                  <option value="Onsite">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
              
              {/* Search Button */}
              <button 
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap"
              >
                Cari
              </button>

              {/* Clear Filters Button */}
              {(searchTerm || location || (category && category !== 'Kategori') || sortBy !== 'latest') && (
                <button 
                  onClick={clearFilters}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Job Listings Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Lowongan Pekerjaan</h2>
            <p className="text-gray-600 mt-1">
              Ditemukan {jobsCount.toLocaleString()} lowongan
              {(searchTerm || location || (category && category !== 'Kategori')) && (
                <span className="text-blue-600 ml-1">
                  dengan filter aktif
                </span>
              )}
            </p>
          </div>
          
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Urutkan:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="latest">Terbaru</option>
                <option value="salary_high">Gaji Tertinggi</option>
                <option value="alphabetical">Alfabetis</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
        
        {/* Job Cards */}
        <div className="space-y-4 mb-8">
          {jobsData.length > 0 ? (
            jobsData.map((job: Job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Company Icon */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      {job.url_logo ? (
                        <img 
                          src={job.url_logo} 
                          alt={job.company} 
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            // Fallback to icon if image fails to load
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={job.url_logo ? 'hidden' : ''}>
                        {getJobIcon(job.tipe)}
                      </div>
                    </div>
                    
                    {/* Job Details */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{job.company}</p>
                      <p className="text-sm text-gray-500 mb-3">📍 {job.location}</p>
                      
                      {/* Job Tags */}
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {job.type}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {formatWorkMode(job.tipe)}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {job.salary}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {job.created_at_diff}
                        </span>
                      </div>
                      
                      {/* Short description */}
                      {job.deskripsi && (
                        <p className="text-gray-600 mt-3 text-sm line-clamp-2">
                          {job.deskripsi.length > 100 
                            ? job.deskripsi.substring(0, 100) + '...'
                            : job.deskripsi
                          }
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Apply Button */}
                  <button 
                    onClick={() => handleApply(job.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 ml-4"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Briefcase className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tidak ada lowongan ditemukan
              </h3>
              <p className="text-gray-500 mb-4">
                Coba ubah kata kunci atau filter pencarian Anda
              </p>
              {(searchTerm || location || (category && category !== 'Kategori')) && (
                <button 
                  onClick={clearFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Reset Filter
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {jobs && typeof jobs === 'object' && 'links' in jobs && Array.isArray((jobs as any).links) && (jobs as any).links.length > 3 && (
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              {(jobs as any).links.map((link: PaginationLink, index: number) => {
                if (link.url === null) {
                  return (
                    <span 
                      key={index} 
                      className="w-10 h-10 rounded-lg bg-gray-100 text-gray-400 font-medium flex items-center justify-center"
                    >
                      <span dangerouslySetInnerHTML={{ __html: link.label }} />
                    </span>
                  );
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handlePagination(link.url!)}
                    className={`w-10 h-10 rounded-lg font-medium flex items-center justify-center transition-colors duration-200 ${
                      link.active 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pagination Info */}
        {jobs && typeof jobs === 'object' && 'from' in jobs && 'to' in jobs && 'total' in jobs && (
          <div className="text-center text-gray-500 text-sm mt-4">
            Menampilkan {(jobs as any).from} - {(jobs as any).to} dari {(jobs as any).total} lowongan
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearchPage;