
import { NewSidebar } from "@/components/layout/NewSidebar";
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
    <div className="min-h-screen flex w-full">
      <NewSidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 px-6 border-b bg-white">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Applications</h2>
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
      </div>
    </div>
  );
};

export default Applications;
