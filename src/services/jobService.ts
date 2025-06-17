import { supabase } from '@/lib/supabase';
import { DatabaseJob, Job, JobSearchParams, CreateJobData, UpdateJobData } from '@/types/job';
import { formatDistanceToNow } from 'date-fns';

export class JobService {
  // Transform database job to frontend job interface
  private static transformDatabaseJob(dbJob: DatabaseJob): Job {
    // Handle date parsing - the database might return just a date string like "2025-06-02"
    const createdDate = dbJob.created_at.includes('T') 
      ? new Date(dbJob.created_at) 
      : new Date(dbJob.created_at + 'T00:00:00Z');
    const posted = formatDistanceToNow(createdDate, { addSuffix: true });
    
    return {
      id: dbJob.job_id,
      title: dbJob.job_title || 'Untitled Position',
      company: dbJob.company_name || 'Unknown Company',
      location: this.formatLocation(dbJob.job_location, dbJob.city, dbJob.state),
      city: dbJob.city || undefined,
      state: dbJob.state || undefined,
      description: dbJob.job_description || 'No description available',
      experienceRequired: dbJob.experience_required || undefined,
      applyLink: dbJob.apply_link || undefined,
      isRemote: dbJob.remote_flag || false,
      isProbablyRemote: dbJob.probably_remote || false,
      createdAt: dbJob.created_at,
      posted,
      logo: this.generateCompanyLogo(dbJob.company_name),
      tags: this.generateTags(dbJob),
      type: this.determineJobType(dbJob.experience_required)
    };
  }

  // Format location string from database fields
  private static formatLocation(location?: string | null, city?: string | null, state?: string | null): string {
    if (location) return location;
    if (city && state) return `${city}, ${state}`;
    if (city) return city;
    if (state) return state;
    return 'Location not specified';
  }

  // Generate tags from job data
  private static generateTags(dbJob: DatabaseJob): string[] {
    const tags: string[] = [];
    
    // Add experience level tag
    if (dbJob.experience_required) {
      if (dbJob.experience_required.toLowerCase().includes('senior')) tags.push('Senior Level');
      else if (dbJob.experience_required.toLowerCase().includes('mid')) tags.push('Mid Level');
      else if (dbJob.experience_required.toLowerCase().includes('entry')) tags.push('Entry Level');
      else if (dbJob.experience_required.toLowerCase().includes('intern')) tags.push('Internship');
    }
    
    // Add remote tag
    if (dbJob.remote_flag) tags.push('Remote');
    
    // Extract skills from job description (basic keyword matching)
    const description = (dbJob.job_description || '').toLowerCase();
    const commonSkills = ['react', 'javascript', 'typescript', 'python', 'java', 'node.js', 'sql', 'aws', 'docker', 'kubernetes'];
    commonSkills.forEach(skill => {
      if (description.includes(skill)) {
        tags.push(skill.charAt(0).toUpperCase() + skill.slice(1));
      }
    });
    
    return tags.slice(0, 4); // Limit to 4 tags for UI purposes
  }

  // Determine job type from experience required
  private static determineJobType(experienceRequired?: string | null): string {
    if (!experienceRequired) return 'Not Specified';
    
    const exp = experienceRequired.toLowerCase();
    if (exp.includes('intern')) return 'Internship';
    if (exp.includes('entry') || exp.includes('0-2')) return 'Entry Level';
    if (exp.includes('mid') || exp.includes('2-4')) return 'Mid Level';
    if (exp.includes('senior') || exp.includes('5+')) return 'Senior Level';
    if (exp.includes('lead') || exp.includes('principal') || exp.includes('8+')) return 'Lead/Principal';
    
    return 'Not Specified';
  }

  // Generate a company logo URL (placeholder service)
  private static generateCompanyLogo(companyName?: string | null): string {
    if (!companyName) return 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=60&h=60&fit=crop&crop=center';
    
    // Use a simple hash to consistently generate the same logo for the same company
    const logos = [
      'https://images.unsplash.com/photo-1549924231-f129b911e442?w=60&h=60&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=60&h=60&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=60&h=60&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=60&h=60&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=60&h=60&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=60&h=60&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=60&h=60&fit=crop&crop=center'
    ];
    
    let hash = 0;
    for (let i = 0; i < companyName.length; i++) {
      const char = companyName.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return logos[Math.abs(hash) % logos.length];
  }

  // Get all jobs with optional search and filtering
  static async getJobs(params: JobSearchParams = {}): Promise<{ jobs: Job[]; total: number }> {
    try {
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

      if (error) {
        console.error('Error fetching jobs:', error);
        throw error;
      }

      const jobs = (data || []).map(this.transformDatabaseJob);
      
      return {
        jobs,
        total: count || 0
      };
    } catch (error) {
      console.error('Error in JobService.getJobs:', error);
      throw error;
    }
  }

  // Get a single job by ID
  static async getJobById(jobId: string): Promise<Job | null> {
    try {
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
      console.error('Error fetching job by ID:', error);
      throw error;
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
    try {
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
      const weekAgoString = weekAgo.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      const { count: thisWeek } = await supabase
        .from('hirebuddy_job_board')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekAgoString);

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
      console.error('Error fetching job stats:', error);
      throw error;
    }
  }

  // Search for companies (for autocomplete)
  static async searchCompanies(query: string, limit: number = 10): Promise<string[]> {
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
      console.error('Error searching companies:', error);
      throw error;
    }
  }

  // Search for locations (for autocomplete)
  static async searchLocations(query: string, limit: number = 10): Promise<string[]> {
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
      console.error('Error searching locations:', error);
      throw error;
    }
  }
} 