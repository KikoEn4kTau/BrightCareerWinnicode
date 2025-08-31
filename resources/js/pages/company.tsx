import React, { useState } from 'react';
import { Users, UserCheck, Calendar, Briefcase, Edit, Trash2, Eye, FileText, X } from 'lucide-react';
import { Link,usePage, router } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface Job {
  id: number;
  judul: string;
  position: string;        // untuk kompatibilitas
  salary: string;
  type: string;
  tipe: string;           // sesuai database
  status: string;
  deskripsi: string;
  kualifikasi: string;
  perusahaan: string;
  kota: string;
  tenure: string;
  gaji_minimum: string;
  gaji_maksimum: string;
  url_logo?: string;
  created_at?: string;
}

interface Applicant {
  id: number;
  name: string;
  email: string;
  position: string;
  date: string;
  stage: string;
  avatar: string;
}

interface Stat {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}

interface JobFormData {
  judul: string;
  deskripsi: string;
  kualifikasi: string;
  perusahaan: string;
  kota: string;
  tipe: string;
  tenure: string;
  gajiMinimum: string;
  gajiMaksimum: string;
  urlLogo: string;
  status: string;
}

interface PageProps extends InertiaPageProps {
  jobs: Job[];
  applicants?: Applicant[];
  stats?: {
    active_jobs: number;
    total_applicants: number;
    today_applicants: number;
    interviews: number;
  };
  flash?: {
    success?: string;
    error?: string;
  };
}

const CompanyDashboard = () => {
  const allProps = usePage<PageProps>().props;
  console.log('=== ALL PROPS FROM BACKEND ===');
  console.log('Raw props:', allProps);
  console.log('Props jobs:', allProps.jobs);
  console.log('Jobs type:', typeof allProps.jobs);
  console.log('Is jobs array?', Array.isArray(allProps.jobs));
  const { jobs =[], applicants = [], stats, flash } = usePage<PageProps>().props;

  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobFormData, setJobFormData] = useState<JobFormData>({
    judul: '',
    deskripsi: '',
    kualifikasi: '',
    perusahaan: '',
    kota: '',
    tipe: 'WFH',
    tenure: '',
    gajiMinimum: '',
    gajiMaksimum: '',
    urlLogo: '',
    status: 'Aktif'
  });

  // Default applicants if not provided from backend
  const defaultApplicants: Applicant[] = [
    {
      id: 1,
      name: 'Lisa Felicia',
      email: 'lisafelicia91@gmail.com',
      position: 'Senior Frontend Developer',
      date: 'Apr 25, 2025',
      stage: 'Interview',
      avatar: '👩‍💼'
    }
  ];

  const displayApplicants = applicants.length > 0 ? applicants : defaultApplicants;

  const defaultStats: Stat[] = [
    {
      title: 'Pekerjaan Aktif',
      value: stats?.active_jobs?.toString() || '12',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Pelamar',
      value: stats?.total_applicants?.toString() || '248',
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pelamar Hari Ini',
      value: stats?.today_applicants?.toString() || '18',
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Wawancara',
      value: stats?.interviews?.toString() || '8',
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50'
    }
  ];

  const handleCreateJob = () => {
    setEditingJobId(null);
    setJobFormData({
      judul: '',
      deskripsi: '',
      kualifikasi: '',
      perusahaan: '',
      kota: '',
      tipe: 'WFH',
      tenure: '',
      gajiMinimum: '',
      gajiMaksimum: '',
      urlLogo: '',
      status: 'Aktif'
    });
    setShowJobForm(true);
  };

  const handleCloseJobForm = () => {
    setShowJobForm(false);
    setEditingJobId(null);
    setJobFormData({
      judul: '',
      deskripsi: '',
      kualifikasi: '',
      perusahaan: '',
      kota: '',
      tipe: 'WFH',
      tenure: '',
      gajiMinimum: '',
      gajiMaksimum: '',
      urlLogo: '',
      status: 'Aktif'
    });
  };

  const handleJobFormChange = (field: keyof JobFormData, value: string) => {
    setJobFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitJob = async () => {
  console.log('=== DEBUG SUBMIT JOB ===');
  console.log('Form data saat ini:', jobFormData);
  
  setIsSubmitting(true);
  
  try {
    const jobData = {
      judul: jobFormData.judul,
      deskripsi: jobFormData.deskripsi,
      kualifikasi: jobFormData.kualifikasi,
      perusahaan: jobFormData.perusahaan,
      kota: jobFormData.kota,
      tipe: jobFormData.tipe,
      tenure: jobFormData.tenure,
      gaji_minimum: jobFormData.gajiMinimum,
      gaji_maksimum: jobFormData.gajiMaksimum,
      url_logo: jobFormData.urlLogo,
      status: jobFormData.status
    };

    console.log('Data yang akan dikirim:', jobData);
    console.log('Editing job ID:', editingJobId);

    if (editingJobId) {
      console.log('Melakukan UPDATE ke:', `/search/${editingJobId}`);
      await router.put(`/search/${editingJobId}`, jobData, {
        onSuccess: (page) => {
          console.log('UPDATE berhasil:', page);
        },
        onError: (errors) => {
          console.log('UPDATE error:', errors);
        }
      });
    } else {
      console.log('Melakukan CREATE ke:', '/search');
      await router.post('/search', jobData, {
        onSuccess: (page) => {
          console.log('CREATE berhasil:', page);
        },
        onError: (errors) => {
          console.log('CREATE error:', errors);
        }
      });
    }
    
    handleCloseJobForm();
    
  } catch (error) {
    console.error('Error submitting job:', error);
    alert('Gagal menyimpan data. Silakan coba lagi.');
  } finally {
    setIsSubmitting(false);
  }
};

  const handleEditJob = (id: number) => {
    const jobToEdit = jobs.find(job => job.id === id);
    if (jobToEdit) {
      setJobFormData({
        judul: jobToEdit.judul,                    // dari 'position' ke 'judul'
        deskripsi: jobToEdit.deskripsi || '',
        kualifikasi: jobToEdit.kualifikasi || '',
        perusahaan: jobToEdit.perusahaan || '',
        kota: jobToEdit.kota || '',
        tipe: jobToEdit.tipe,                      // dari 'type' ke 'tipe'
        tenure: jobToEdit.tenure || '',
        gajiMinimum: jobToEdit.gaji_minimum || '', // langsung ambil dari kolom gaji_minimum
        gajiMaksimum: jobToEdit.gaji_maksimum || '', // langsung ambil dari kolom gaji_maksimum
        urlLogo: jobToEdit.url_logo || '',         // dari 'urlLogo' ke 'url_logo'
        status: jobToEdit.status
      });
      setEditingJobId(id);
      setShowJobForm(true);
    }
};
  const handleDeleteJob = async (id: number) => {
    const jobToDelete = jobs.find(job => job.id === id);
    if (jobToDelete && window.confirm(`Apakah Anda yakin ingin menghapus lowongan "${jobToDelete.judul}"?`)) {
      try {
        // Sesuai dengan route DELETE /jobs/{job}
        await router.delete(`/search/${id}`);
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const handleViewApplicant = (id: number) => {
    // TODO: Implementasi setelah ApplicantController dibuat
    alert(`Fitur lihat detail pelamar akan segera tersedia. ID: ${id}`);
  };

  const handleDownloadCV = async (id: number) => {
    // TODO: Implementasi setelah ApplicantController dibuat
    alert(`Fitur download CV akan segera tersedia. ID: ${id}`);
  };

  const handleDeleteApplicant = async (id: number) => {
    // TODO: Implementasi setelah ApplicantController dibuat
    if (window.confirm('Fitur hapus pelamar akan segera tersedia. Lanjutkan?')) {
      alert(`Fitur hapus pelamar akan segera tersedia. ID: ${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Flash Messages */}
        {flash?.success && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {flash.success}
          </div>
        )}
        {flash?.error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {flash.error}
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
            <div className="w-full flex justify-end mt-4">
              <Link
                href={route('settings')}
                className="rounded-xl border-2 border-db px-3 py-1.5 md:px-5 text-sm md:text-base text-db font-semibold hover:bg-db hover:text-white transition-colors duration-200"
              >
                Profil
              </Link>
            </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Perusahaan</h1>
          <p className="text-gray-600">Temukan kandidat yang tepat bersama kami !</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {defaultStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Job Listings Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Lowongan</h2>
              <button 
                onClick={handleCreateJob}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Buat Lowongan
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posisi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gaji</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      Belum ada lowongan tersedia
                    </td>
                  </tr>
                ) : (
                  jobs.map((job, index) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{job.judul}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Rp {job.gaji_minimum} - {job.gaji_maksimum}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          job.tipe === 'WFH' 
                            ? 'bg-purple-100 text-purple-800' 
                            : job.tipe === 'Hybrid'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {job.tipe}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          job.status === 'Aktif' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditJob(job.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Applicants Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Pelamar Terbaru</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelamar</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posisi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahap</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayApplicants.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Belum ada pelamar
                    </td>
                  </tr>
                ) : (
                  displayApplicants.map((applicant) => (
                    <tr key={applicant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                              {applicant.avatar}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                            <div className="text-sm text-gray-500">{applicant.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{applicant.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{applicant.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {applicant.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewApplicant(applicant.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Lihat Detail"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDownloadCV(applicant.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Download CV"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteApplicant(applicant.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Job Form Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingJobId ? 'Edit Data' : 'Tambah Data'}
                </h2>
                <button 
                  onClick={handleCloseJobForm}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={isSubmitting}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={jobFormData.judul}
                      onChange={(e) => handleJobFormChange('judul', e.target.value)}
                      placeholder="Masukkan Judul"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kualifikasi: <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={jobFormData.kualifikasi}
                      onChange={(e) => handleJobFormChange('kualifikasi', e.target.value)}
                      placeholder="Masukkan Kualifikasi"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kota: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={jobFormData.kota}
                      onChange={(e) => handleJobFormChange('kota', e.target.value)}
                      placeholder="Masukkan Kota"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tenure: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={jobFormData.tenure}
                      onChange={(e) => handleJobFormChange('tenure', e.target.value)}
                      placeholder="Masukkan Tenure (contoh: Full Time, Part Time, Contract)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gaji Maksimum: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={jobFormData.gajiMaksimum}
                      onChange={(e) => handleJobFormChange('gajiMaksimum', e.target.value)}
                      placeholder="Masukkan Gaji Maksimum (contoh: 15000000)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deskripsi: <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={jobFormData.deskripsi}
                      onChange={(e) => handleJobFormChange('deskripsi', e.target.value)}
                      placeholder="Masukkan Deskripsi"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Perusahaan: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={jobFormData.perusahaan}
                      onChange={(e) => handleJobFormChange('perusahaan', e.target.value)}
                      placeholder="Masukkan Perusahaan"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipe: <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={jobFormData.tipe}
                      onChange={(e) => handleJobFormChange('tipe', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="WFH">WFH (Work From Home)</option>
                      <option value="Onsite">Onsite</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gaji Minimum: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={jobFormData.gajiMinimum}
                      onChange={(e) => handleJobFormChange('gajiMinimum', e.target.value)}
                      placeholder="Masukkan Gaji Minimum (contoh: 8000000)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Logo Perusahaan:
                    </label>
                    <input
                      type="url"
                      value={jobFormData.urlLogo}
                      onChange={(e) => handleJobFormChange('urlLogo', e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Status Field - Full Width */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status: <span className="text-red-500">*</span>
                </label>
                <select
                  value={jobFormData.status}
                  onChange={(e) => handleJobFormChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseJobForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSubmitJob}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Menyimpan...' : (editingJobId ? 'Perbarui' : 'Tambah')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;