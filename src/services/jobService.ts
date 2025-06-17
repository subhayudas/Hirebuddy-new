import { supabase } from '@/lib/supabase';
import { DatabaseJob, Job, JobSearchParams, CreateJobData, UpdateJobData } from '@/types/job';
import { formatDistanceToNow } from 'date-fns';

// Mock data for offline/development mode
const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    city: 'San Francisco',
    state: 'CA',
    description: 'We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for developing user-facing features using React, TypeScript, and modern web technologies. Experience with Next.js, Tailwind CSS, and state management libraries is highly preferred.',
    experienceRequired: 'Senior',
    applyLink: 'https://example.com/apply/1',
    isRemote: true,
    isProbablyRemote: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    posted: '2 days ago',
    logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=60&h=60&fit=crop&crop=center',
    tags: ['React', 'TypeScript', 'Next.js', 'Frontend'],
    type: 'Senior Level'
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateLab',
    location: 'Remote',
    description: 'Lead product strategy and development for our AI-powered solutions. Work closely with engineering, design, and business teams to deliver exceptional user experiences. Experience with agile methodologies and product analytics tools required.',
    experienceRequired: 'Mid-Level',
    applyLink: 'https://example.com/apply/2',
    isRemote: true,
    isProbablyRemote: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    posted: '1 day ago',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center',
    tags: ['Product Strategy', 'Agile', 'Analytics', 'AI'],
    type: 'Mid Level'
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Design Studio',
    location: 'New York, NY',
    city: 'New York',
    state: 'NY',
    description: 'Create beautiful and intuitive user experiences for our mobile and web applications. Collaborate with product managers and developers to bring designs to life. Proficiency in Figma, user research, and prototyping is essential.',
    experienceRequired: 'Mid-Level',
    applyLink: 'https://example.com/apply/3',
    isRemote: false,
    isProbablyRemote: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    posted: '3 days ago',
    logo: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=60&h=60&fit=crop&crop=center',
    tags: ['Figma', 'Prototyping', 'User Research', 'Design'],
    type: 'Mid Level'
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'AI Innovations',
    location: 'Austin, TX',
    city: 'Austin',
    state: 'TX',
    description: 'Analyze complex datasets and build machine learning models to drive business insights. Work with large-scale data processing systems and collaborate with engineering teams to deploy ML models in production.',
    experienceRequired: 'Senior',
    applyLink: 'https://example.com/apply/4',
    isRemote: true,
    isProbablyRemote: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    posted: '5 days ago',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=60&h=60&fit=crop&crop=center',
    tags: ['Python', 'Machine Learning', 'SQL', 'Data Science'],
    type: 'Senior Level'
  },
  {
    id: '5',
    title: 'Backend Developer',
    company: 'CloudTech Solutions',
    location: 'Seattle, WA',
    city: 'Seattle',
    state: 'WA',
    description: 'Build scalable backend systems using Node.js, Python, and cloud technologies. Design and implement RESTful APIs, work with databases, and ensure high performance and reliability of our services.',
    experienceRequired: 'Mid-Level',
    applyLink: 'https://example.com/apply/5',
    isRemote: true,
    isProbablyRemote: true,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    posted: '4 days ago',
    logo: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=60&h=60&fit=crop&crop=center',
    tags: ['Node.js', 'Python', 'AWS', 'Backend'],
    type: 'Mid Level'
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'Infrastructure Pro',
    location: 'Denver, CO',
    city: 'Denver',
    state: 'CO',
    description: 'Manage and optimize our cloud infrastructure, implement CI/CD pipelines, and ensure system reliability. Experience with Docker, Kubernetes, and major cloud platforms is required.',
    experienceRequired: 'Senior',
    applyLink: 'https://example.com/apply/6',
    isRemote: false,
    isProbablyRemote: false,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    posted: '6 days ago',
    logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=60&h=60&fit=crop&crop=center',
    tags: ['Docker', 'Kubernetes', 'AWS', 'DevOps'],
    type: 'Senior Level'
  },
  {
    id: '7',
    title: 'Mobile App Developer',
    company: 'Mobile First',
    location: 'Los Angeles, CA',
    city: 'Los Angeles',
    state: 'CA',
    description: 'Develop cross-platform mobile applications using React Native and Flutter. Work with native iOS and Android features, implement user-friendly interfaces, and ensure optimal performance.',
    experienceRequired: 'Mid-Level',
    applyLink: 'https://example.com/apply/7',
    isRemote: true,
    isProbablyRemote: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    posted: '1 day ago',
    logo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=60&h=60&fit=crop&crop=center',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    type: 'Mid Level'
  },
  {
    id: '8',
    title: 'Cybersecurity Analyst',
    company: 'SecureNet',
    location: 'Washington, DC',
    city: 'Washington',
    state: 'DC',
    description: 'Monitor and analyze security threats, implement security measures, and respond to incidents. Knowledge of security frameworks, penetration testing, and compliance requirements is essential.',
    experienceRequired: 'Senior',
    applyLink: 'https://example.com/apply/8',
    isRemote: false,
    isProbablyRemote: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    posted: '3 days ago',
    logo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=60&h=60&fit=crop&crop=center',
    tags: ['Cybersecurity', 'Penetration Testing', 'Compliance', 'Security'],
    type: 'Senior Level'
  }
];

const MOCK_STATS = {
  total: MOCK_JOBS.length,
  remote: MOCK_JOBS.filter(job => job.isRemote).length,
  thisWeek: MOCK_JOBS.filter(job => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(job.createdAt) >= weekAgo;
  }).length,
  companies: new Set(MOCK_JOBS.map(job => job.company)).size
};

// Flag to check if we're in offline/development mode
let isOfflineMode = false;

// Function to check database connectivity
const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('hirebuddy_job_board').select('job_id').limit(1);
    return !error;
  } catch (error) {
    console.warn('Database connection check failed:', error);
    return false;
  }
};

// Function to filter mock jobs based on search parameters
const filterMockJobs = (jobs: Job[], params: JobSearchParams): Job[] => {
  let filteredJobs = [...jobs];

  // Apply text search
  if (params.query) {
    const query = params.query.toLowerCase();
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Apply filters
  if (params.filters) {
    const { location, experience, remote, company } = params.filters;
    
    if (location) {
      const locationQuery = location.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(locationQuery) ||
        (job.city && job.city.toLowerCase().includes(locationQuery)) ||
        (job.state && job.state.toLowerCase().includes(locationQuery))
      );
    }
    
    if (experience) {
      const expQuery = experience.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.experienceRequired?.toLowerCase().includes(expQuery) ||
        job.type.toLowerCase().includes(expQuery)
      );
    }
    
    if (remote === 'remote') {
      filteredJobs = filteredJobs.filter(job => job.isRemote);
    } else if (remote === 'onsite') {
      filteredJobs = filteredJobs.filter(job => !job.isRemote);
    }
    
    if (company) {
      const companyQuery = company.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.company.toLowerCase().includes(companyQuery)
      );
    }
  }

  // Apply sorting
  const sortBy = params.sortBy || 'created_at';
  const sortOrder = params.sortOrder || 'desc';
  
  filteredJobs.sort((a, b) => {
    let aValue: string | Date;
    let bValue: string | Date;
    
    switch (sortBy) {
      case 'job_title':
        aValue = a.title;
        bValue = b.title;
        break;
      case 'company_name':
        aValue = a.company;
        bValue = b.company;
        break;
      case 'created_at':
      default:
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
    }
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return filteredJobs;
};

export class JobService {
  // Transform database job to frontend job interface
  private static transformDatabaseJob(dbJob: DatabaseJob): Job {
    const location = this.formatLocation(dbJob.job_location, dbJob.city, dbJob.state);
    const tags = this.generateTags(dbJob);
    const type = this.determineJobType(dbJob.experience_required);
    const posted = formatDistanceToNow(new Date(dbJob.created_at), { addSuffix: true });
    const logo = this.generateCompanyLogo(dbJob.company_name);

    return {
      id: dbJob.job_id,
      title: dbJob.job_title || 'Untitled Position',
      company: dbJob.company_name || 'Unknown Company',
      location,
      city: dbJob.city || undefined,
      state: dbJob.state || undefined,
      description: dbJob.job_description || 'No description available',
      experienceRequired: dbJob.experience_required || undefined,
      applyLink: dbJob.apply_link || undefined,
      isRemote: dbJob.remote_flag || false,
      isProbablyRemote: dbJob.probably_remote || false,
      createdAt: dbJob.created_at,
      posted,
      logo,
      tags,
      type,
    };
  }

  // Helper method to format location string
  private static formatLocation(location?: string | null, city?: string | null, state?: string | null): string {
    if (location) return location;
    if (city && state) return `${city}, ${state}`;
    if (city) return city;
    if (state) return state;
    return 'Location not specified';
  }

  // Helper method to generate tags based on job data
  private static generateTags(dbJob: DatabaseJob): string[] {
    const tags: string[] = [];
    
    if (dbJob.remote_flag) tags.push('Remote');
    if (dbJob.probably_remote) tags.push('Remote Friendly');
    if (dbJob.experience_required) {
      const exp = dbJob.experience_required.toLowerCase();
      if (exp.includes('entry') || exp.includes('junior')) tags.push('Entry Level');
      if (exp.includes('senior')) tags.push('Senior Level');
      if (exp.includes('intern')) tags.push('Internship');
      if (exp.includes('mid')) tags.push('Mid Level');
    }
    
    // Add company-based tags
    if (dbJob.company_name) {
      const company = dbJob.company_name.toLowerCase();
      if (company.includes('startup')) tags.push('Startup');
      if (company.includes('tech')) tags.push('Tech');
    }

    return tags;
  }

  // Helper method to determine job type
  private static determineJobType(experienceRequired?: string | null): string {
    if (!experienceRequired) return 'Full-time';
    
    const exp = experienceRequired.toLowerCase();
    if (exp.includes('intern')) return 'Internship';
    if (exp.includes('contract')) return 'Contract';
    if (exp.includes('part')) return 'Part-time';
    if (exp.includes('freelance')) return 'Freelance';
    
    return 'Full-time';
  }

  // Helper method to generate company logo placeholder
  private static generateCompanyLogo(companyName?: string | null): string {
    if (!companyName) return 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=60&h=60&fit=crop&crop=center';
    
    // Generate a consistent logo based on company name
    const logos = [
      'https://images.unsplash.com/photo-1549924231-f129b911e442?w=60&h=60&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=60&h=60&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=60&h=60&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=60&h=60&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=60&h=60&fit=crop&crop=center',
    ];
    
    const hash = companyName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return logos[Math.abs(hash) % logos.length];
  }

  // Get all jobs with optional search and filtering
  static async getJobs(params: JobSearchParams = {}): Promise<{ jobs: Job[]; total: number }> {
    // Check if we should use offline mode
    if (isOfflineMode) {
      console.log('Using offline mode for jobs');
      const filteredJobs = filterMockJobs(MOCK_JOBS, params);
      const startIndex = params.offset || 0;
      const limit = params.limit || 50;
      const paginatedJobs = filteredJobs.slice(startIndex, startIndex + limit);
      
      return {
        jobs: paginatedJobs,
        total: filteredJobs.length
      };
    }

    try {
      // First check database connectivity
      const isConnected = await checkDatabaseConnection();
      if (!isConnected) {
        console.log('Database not connected, switching to offline mode');
        isOfflineMode = true;
        return this.getJobs(params); // Recursive call with offline mode
      }

      let query = supabase
        .from('hirebuddy_job_board')
        .select('*', { count: 'exact' });

      // Apply text search if query provided
      if (params.query) {
        query = query.or(`job_title.ilike.%${params.query}%,company_name.ilike.%${params.query}%,job_description.ilike.%${params.query}%`);
      }

      // Apply filters
      if (params.filters) {
        const { location, experience, remote, company } = params.filters;
        
        if (location) {
          query = query.or(`job_location.ilike.%${location}%,city.ilike.%${location}%,state.ilike.%${location}%`);
        }
        
        if (experience) {
          query = query.ilike('experience_required', `%${experience}%`);
        }
        
        if (remote === 'remote') {
          query = query.eq('remote_flag', true);
        } else if (remote === 'onsite') {
          query = query.eq('remote_flag', false);
        }
        
        if (company) {
          query = query.ilike('company_name', `%${company}%`);
        }
      }

      // Apply sorting
      const sortBy = params.sortBy || 'created_at';
      const sortOrder = params.sortOrder || 'desc';
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      // Apply pagination
      if (params.limit) {
        query = query.limit(params.limit);
      }
      if (params.offset) {
        query = query.range(params.offset, params.offset + (params.limit || 50) - 1);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      const jobs = (data || []).map(this.transformDatabaseJob);
      
      return {
        jobs,
        total: count || 0
      };
    } catch (error) {
      console.error('Error fetching jobs, falling back to offline mode:', error);
      isOfflineMode = true;
      return this.getJobs(params); // Recursive call with offline mode
    }
  }

  // Get a single job by ID
  static async getJobById(jobId: string): Promise<Job | null> {
    // Use offline data if in offline mode
    if (isOfflineMode) {
      console.log('Using offline mode for job by ID');
      return MOCK_JOBS.find(job => job.id === jobId) || null;
    }

    try {
      // First check database connectivity
      const isConnected = await checkDatabaseConnection();
      if (!isConnected) {
        console.log('Database not connected for job by ID, switching to offline mode');
        isOfflineMode = true;
        return MOCK_JOBS.find(job => job.id === jobId) || null;
      }

      const { data, error } = await supabase
        .from('hirebuddy_job_board')
        .select('*')
        .eq('job_id', jobId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Job not found
        }
        throw error;
      }

      return this.transformDatabaseJob(data);
    } catch (error) {
      console.error('Error fetching job by ID, falling back to offline mode:', error);
      isOfflineMode = true;
      return MOCK_JOBS.find(job => job.id === jobId) || null;
    }
  }

  // Create a new job
  static async createJob(jobData: CreateJobData): Promise<Job> {
    try {
      const { data, error } = await supabase
        .from('hirebuddy_job_board')
        .insert([jobData])
        .select()
        .single();

      if (error) throw error;

      return this.transformDatabaseJob(data);
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  }

  // Update an existing job
  static async updateJob(updateData: UpdateJobData): Promise<Job> {
    try {
      const { job_id, ...updates } = updateData;
      
      const { data, error } = await supabase
        .from('hirebuddy_job_board')
        .update(updates)
        .eq('job_id', job_id)
        .select()
        .single();

      if (error) throw error;

      return this.transformDatabaseJob(data);
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  }

  // Delete a job
  static async deleteJob(jobId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('hirebuddy_job_board')
        .delete()
        .eq('job_id', jobId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }

  // Get jobs count by various criteria
  static async getJobsStats(): Promise<{
    total: number;
    remote: number;
    thisWeek: number;
    companies: number;
  }> {
    // Use offline stats if in offline mode
    if (isOfflineMode) {
      console.log('Using offline mode for job stats');
      return MOCK_STATS;
    }

    try {
      // First check database connectivity
      const isConnected = await checkDatabaseConnection();
      if (!isConnected) {
        console.log('Database not connected for stats, switching to offline mode');
        isOfflineMode = true;
        return MOCK_STATS;
      }

      // Get total jobs
      const { count: total } = await supabase
        .from('hirebuddy_job_board')
        .select('*', { count: 'exact', head: true });

      // Get remote jobs
      const { count: remote } = await supabase
        .from('hirebuddy_job_board')
        .select('*', { count: 'exact', head: true })
        .eq('remote_flag', true);

      // Get jobs from this week
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const { count: thisWeek } = await supabase
        .from('hirebuddy_job_board')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekAgo.toISOString());

      // Get unique companies count
      const { data: companiesData } = await supabase
        .from('hirebuddy_job_board')
        .select('company_name')
        .not('company_name', 'is', null);

      const uniqueCompanies = new Set(companiesData?.map(job => job.company_name)).size;

      return {
        total: total || 0,
        remote: remote || 0,
        thisWeek: thisWeek || 0,
        companies: uniqueCompanies || 0
      };
    } catch (error) {
      console.error('Error fetching job stats, falling back to offline mode:', error);
      isOfflineMode = true;
      return MOCK_STATS;
    }
  }

  // Search for companies (for autocomplete)
  static async searchCompanies(query: string, limit: number = 10): Promise<string[]> {
    // Use offline data if in offline mode
    if (isOfflineMode) {
      console.log('Using offline mode for company search');
      const companies = MOCK_JOBS
        .map(job => job.company)
        .filter(company => company.toLowerCase().includes(query.toLowerCase()));
      
      return Array.from(new Set(companies)).slice(0, limit);
    }

    try {
      const { data } = await supabase
        .from('hirebuddy_job_board')
        .select('company_name')
        .ilike('company_name', `%${query}%`)
        .not('company_name', 'is', null)
        .limit(limit);

      const companies = Array.from(new Set(data?.map(job => job.company_name) || []));
      return companies.filter(Boolean) as string[];
    } catch (error) {
      console.error('Error searching companies, falling back to offline mode:', error);
      isOfflineMode = true;
      return this.searchCompanies(query, limit);
    }
  }

  // Search for locations (for autocomplete)
  static async searchLocations(query: string, limit: number = 10): Promise<string[]> {
    // Use offline data if in offline mode
    if (isOfflineMode) {
      console.log('Using offline mode for location search');
      const locations = new Set<string>();
      
      MOCK_JOBS.forEach(job => {
        if (job.location.toLowerCase().includes(query.toLowerCase())) {
          locations.add(job.location);
        }
        if (job.city && job.city.toLowerCase().includes(query.toLowerCase())) {
          locations.add(job.city);
        }
        if (job.state && job.state.toLowerCase().includes(query.toLowerCase())) {
          locations.add(job.state);
        }
        if (job.city && job.state) {
          const fullLocation = `${job.city}, ${job.state}`;
          if (fullLocation.toLowerCase().includes(query.toLowerCase())) {
            locations.add(fullLocation);
          }
        }
      });

      return Array.from(locations).slice(0, limit);
    }

    try {
      const { data } = await supabase
        .from('hirebuddy_job_board')
        .select('job_location, city, state')
        .or(`job_location.ilike.%${query}%,city.ilike.%${query}%,state.ilike.%${query}%`)
        .limit(limit);

      const locations = new Set<string>();
      
      data?.forEach(job => {
        if (job.job_location) locations.add(job.job_location);
        if (job.city && job.state) locations.add(`${job.city}, ${job.state}`);
        if (job.city) locations.add(job.city);
        if (job.state) locations.add(job.state);
      });

      return Array.from(locations).slice(0, limit);
    } catch (error) {
      console.error('Error searching locations, falling back to offline mode:', error);
      isOfflineMode = true;
      return this.searchLocations(query, limit);
    }
  }

  // Reset offline mode (useful for testing or when connection is restored)
  static resetOfflineMode(): void {
    isOfflineMode = false;
    console.log('Offline mode reset');
  }

  // Check if currently in offline mode
  static isOfflineMode(): boolean {
    return isOfflineMode;
  }

  // Force offline mode (useful for testing)
  static forceOfflineMode(): void {
    isOfflineMode = true;
    console.log('Forced offline mode');
  }
} 