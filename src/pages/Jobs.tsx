
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { JobSearch } from "@/components/jobs/JobSearch";
import { JobFilters } from "@/components/jobs/JobFilters";
import { JobList } from "@/components/jobs/JobList";
import { useState } from "react";

export interface JobFilters {
  location: string;
  jobType: string;
  experience: string;
  salary: string;
  company: string;
  datePosted: string;
}

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<JobFilters>({
    location: "",
    jobType: "",
    experience: "",
    salary: "",
    company: "",
    datePosted: ""
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Find Jobs</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/30 md:min-h-min">
              {/* Hero Section */}
              <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative px-6 py-12 md:py-16">
                  <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      Find Your Dream Job
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100">
                      Discover thousands of opportunities powered by AI matching
                    </p>
                    <JobSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute top-1/3 -right-8 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-blue-300/15 rounded-full blur-3xl"></div>
                </div>
              </div>

              {/* Main Content */}
              <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Filters Sidebar */}
                  <div className="lg:col-span-1">
                    <JobFilters filters={filters} setFilters={setFilters} />
                  </div>
                  
                  {/* Job Listings */}
                  <div className="lg:col-span-3">
                    <JobList searchQuery={searchQuery} filters={filters} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Jobs;
