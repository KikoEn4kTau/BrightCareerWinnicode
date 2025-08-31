// resources/js/types/job.ts

export interface Job {
  id: number;
  title: string;
  judul: string;
  company: string;
  perusahaan: string;
  type: string;
  workMode: 'WFH' | 'Onsite' | 'Hybrid';
  tipe: 'WFH' | 'Onsite' | 'Hybrid';
  salary: string;
  gaji_minimum: string;
  gaji_maksimum: string;
  location: string;
  kota: string;
  deskripsi: string;
  kualifikasi: string;
  url_logo?: string;
  created_at: string;
  created_at_diff?: string;
  status: 'Aktif' | 'Nonaktif';
  tenure: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: PaginationLink[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface PaginatedJobs extends PaginatedResponse<Job> {}

export interface JobFilters {
  search?: string;
  location?: string;
  category?: string;
  sort?: string;
}

export interface JobSearchPageProps {
  jobs: PaginatedJobs | Job[];
  filters?: JobFilters;
}

export interface JobDetailProps {
  job: Job;
}

export type WorkModeType = 'WFH' | 'Onsite' | 'Hybrid';
export type JobStatusType = 'Aktif' | 'Nonaktif';
export type SortType = 'latest' | 'salary_high' | 'alphabetical';

// For form validation and creation
export interface JobFormData {
  judul: string;
  deskripsi: string;
  kualifikasi: string;
  perusahaan: string;
  kota: string;
  tipe: WorkModeType;
  tenure: string;
  gaji_minimum: string;
  gaji_maksimum: string;
  url_logo?: string;
  status: JobStatusType;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

// Inertia shared props (data yang selalu ada di setiap page)
export interface InertiaSharedProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
      role?: string;
      email_verified_at?: string;
      created_at?: string;
    } | null;
  };
  flash: {
    success?: string;
    error?: string;
    message?: string;
  };
  errors?: Record<string, string>;
}

// Specific page props
export interface JobSearchInertiaProps extends InertiaSharedProps {
  jobs: PaginatedJobs | Job[];
  filters?: JobFilters;
}

export interface JobDetailInertiaProps extends InertiaSharedProps {
  job: Job;
}

export interface CompanyJobsInertiaProps extends InertiaSharedProps {
  jobs: Job[];
}

// For search and filtering
export interface SearchParams {
  search?: string;
  location?: string;
  category?: WorkModeType;
  sort?: SortType;
  page?: number;
}

// For job cards component
export interface JobCardProps {
  job: Job;
  onApply: (jobId: number) => void;
  showActions?: boolean;
}

// For job application (if you implement apply functionality)
export interface JobApplication {
  id: number;
  job_id: number;
  user_id: number;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  cover_letter?: string;
  resume_url?: string;
  applied_at: string;
  job?: Job;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

// For company management
export interface Company {
  id: number;
  name: string;
  logo_url?: string;
  description?: string;
  website?: string;
  location?: string;
  created_at: string;
  updated_at: string;
  jobs_count?: number;
}

// Event handlers types
export type SearchHandler = () => void;
export type SortChangeHandler = (sortBy: SortType) => void;
export type JobApplyHandler = (jobId: number) => void;
export type FilterChangeHandler = (filters: Partial<JobFilters>) => void;

// Utility types
export type JobStatus = Job['status'];
export type JobWorkMode = Job['workMode'];
export type JobTenure = Job['tenure'];