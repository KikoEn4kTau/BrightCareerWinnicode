import React, { ReactElement } from 'react';
import { MapPin, Clock, Building2, DollarSign, ArrowLeft, Briefcase } from 'lucide-react';
import { router } from '@inertiajs/react';
import Header from '@/components/header';
import type { Job, JobDetailProps, WorkModeType } from '@/types/job';

const JobDetails: React.FC<JobDetailProps> = ({ job }) => {
  const handleBack = (): void => {
    router.visit('/jobs');
  };

  const handleApply = (): void => {
    // Implementasi logic apply job di sini
    // Bisa redirect ke form aplikasi atau langsung submit
    alert('Fitur apply akan segera tersedia!');
  };

  const formatWorkMode = (tipe: WorkModeType): string => {
    switch(tipe) {
      case 'WFH': return 'Remote';
      case 'Onsite': return 'On-site';
      case 'Hybrid': return 'Hybrid';
      default: return tipe;
    }
  };

  const renderDescriptionParagraphs = (description: string): ReactElement[] => {
    return description.split('\n').map((paragraph: string, index: number) => (
      <p key={index} className="mb-3">
        {paragraph}
      </p>
    ));
  };

  const renderRequirementsParagraphs = (requirements: string): ReactElement[] => {
    return requirements.split('\n').map((requirement: string, index: number) => (
      <p key={index} className="mb-3">
        {requirement}
      </p>
    ));
  };

  const handleShare = (platform: 'linkedin' | 'twitter' | 'whatsapp'): void => {
    const jobUrl = window.location.href;
    const jobTitle = encodeURIComponent(`${job.title} di ${job.company}`);
    const jobDescription = encodeURIComponent(job.deskripsi.substring(0, 100) + '...');
    
    let shareUrl = '';
    
    switch(platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${jobTitle}&url=${encodeURIComponent(jobUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${jobTitle} ${encodeURIComponent(jobUrl)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-[100px] pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Lowongan
          </button>

          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  {job.url_logo ? (
                    <img 
                      src={job.url_logo} 
                      alt={job.company} 
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <Briefcase className="w-12 h-12 text-gray-600" />
                  )}
                </div>
                
                {/* Job Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {job.title}
                  </h1>
                  <h2 className="text-xl text-blue-600 font-semibold mb-4">
                    {job.company}
                  </h2>
                  
                  {/* Job Meta */}
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span>{formatWorkMode(job.workMode)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Apply Button */}
              <button
                onClick={handleApply}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Lamar Sekarang
              </button>
            </div>
            
            {/* Job Tags */}
            <div className="flex gap-2 flex-wrap">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {job.type}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {formatWorkMode(job.workMode)}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {job.salary}
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                Diposting {job.created_at_diff || job.created_at}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Job Description */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Deskripsi Pekerjaan
                </h3>
                <div className="prose prose-sm max-w-none text-gray-600">
                  {renderDescriptionParagraphs(job.deskripsi)}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Kualifikasi & Persyaratan
                </h3>
                <div className="prose prose-sm max-w-none text-gray-600">
                  {renderRequirementsParagraphs(job.kualifikasi)}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Tentang Perusahaan
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500 block">Nama Perusahaan</span>
                    <p className="font-medium text-gray-800">{job.company}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block">Lokasi</span>
                    <p className="font-medium text-gray-800">{job.location}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block">Tipe Pekerjaan</span>
                    <p className="font-medium text-gray-800">{job.type}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block">Mode Kerja</span>
                    <p className="font-medium text-gray-800">{formatWorkMode(job.workMode)}</p>
                  </div>
                </div>
              </div>

              {/* Salary Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Informasi Gaji
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Range Gaji:</span>
                    <span className="font-semibold text-green-600">{job.salary}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-3">
                    * Gaji dapat berubah berdasarkan pengalaman dan kualifikasi
                  </div>
                </div>
              </div>

              {/* Quick Apply */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Tertarik dengan posisi ini?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Jangan lewatkan kesempatan emas ini! Lamar sekarang dan jadilah bagian dari tim yang luar biasa.
                </p>
                <button
                  onClick={handleApply}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Lamar Sekarang
                </button>
              </div>

              {/* Share Job */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Bagikan Lowongan
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleShare('linkedin')}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    LinkedIn
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="flex-1 bg-blue-400 text-white px-3 py-2 rounded text-sm hover:bg-blue-500 transition-colors"
                  >
                    Twitter
                  </button>
                  <button 
                    onClick={() => handleShare('whatsapp')}
                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Jobs Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Lowongan Serupa
            </h3>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-500 text-center">
                Fitur lowongan serupa akan segera tersedia
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;