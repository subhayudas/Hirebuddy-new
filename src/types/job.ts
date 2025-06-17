// Job types matching the Supabase database schema
export interface DatabaseJob {
  job_id: string;
  created_at: string;
  job_title: string | null;
  company_name: string | null;
  experience_required: string | null;
  job_description: string | null;
  apply_link: string | null;
  job_location: string | null;
  city: string | null;
  state: string | null;
  remote_flag: boolean | null;
  probably_remote: boolean | null;
}

// Frontend Job interface with computed fields
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  city?: string;
  state?: string;
  description: string;
  experienceRequired?: string;
  applyLink?: string;
  isRemote: boolean;
  isProbablyRemote: boolean;
  createdAt: string;
  // Computed/derived fields for UI
  posted: string; // Human readable time ago
  logo?: string; // Generated or default logo
  tags: string[];
  type: string; // Derived from experience_required
  salary?: string; // To be added later if needed
}

// Job filters interface
export interface JobFilters {
  location: string;
  experience: string;
  remote: 'all' | 'remote' | 'onsite';
  company: string;
}

// Job search parameters
export interface JobSearchParams {
  query?: string;
  filters?: Partial<JobFilters>;
  limit?: number;
  offset?: number;
  sortBy?: 'created_at' | 'job_title' | 'company_name';
  sortOrder?: 'asc' | 'desc';
}

// Job creation/update interface
export interface CreateJobData {
  job_title: string;
  company_name: string;
  job_description: string;
  experience_required?: string;
  apply_link?: string;
  job_location?: string;
  city?: string;
  state?: string;
  remote_flag?: boolean;
  probably_remote?: boolean;
}

export interface UpdateJobData extends Partial<CreateJobData> {
  job_id: string;
} 