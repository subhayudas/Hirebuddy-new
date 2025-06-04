
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { ApplicationStats } from "@/components/applications/ApplicationStats";
import { ApplicationFilters } from "@/components/applications/ApplicationFilters";
import { ApplicationList } from "@/components/applications/ApplicationList";
import { ApplicationKanban } from "@/components/applications/ApplicationKanban";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { List, Grid3X3 } from "lucide-react";

const Applications = () => {
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [filters, setFilters] = useState({
    status: "",
    company: "",
    position: "",
    dateRange: ""
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
                    <BreadcrumbPage>Applications</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          
          <div className="flex flex-1 flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
                <p className="text-gray-600 mt-1">Track and manage your job applications</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </Button>
                <Button
                  variant={viewMode === "kanban" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("kanban")}
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Kanban
                </Button>
              </div>
            </div>

            <ApplicationStats />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <ApplicationFilters filters={filters} setFilters={setFilters} />
              </div>
              
              <div className="lg:col-span-3">
                {viewMode === "list" ? (
                  <ApplicationList filters={filters} />
                ) : (
                  <ApplicationKanban />
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Applications;
