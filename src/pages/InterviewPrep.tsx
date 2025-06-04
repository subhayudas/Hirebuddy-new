
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { InterviewDashboard } from "@/components/interview/InterviewDashboard";
import { MockInterviews } from "@/components/interview/MockInterviews";
import { QuestionBank } from "@/components/interview/QuestionBank";
import { InterviewTips } from "@/components/interview/InterviewTips";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InterviewPrep = () => {
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
                    <BreadcrumbPage>Interview Prep</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          
          <div className="flex flex-1 flex-col gap-6 p-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Interview Preparation</h1>
              <p className="text-gray-600 mt-1">Master your interviews with AI-powered practice sessions</p>
            </div>

            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="mock-interviews">Mock Interviews</TabsTrigger>
                <TabsTrigger value="questions">Question Bank</TabsTrigger>
                <TabsTrigger value="tips">Tips & Guides</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="mt-6">
                <InterviewDashboard />
              </TabsContent>
              
              <TabsContent value="mock-interviews" className="mt-6">
                <MockInterviews />
              </TabsContent>
              
              <TabsContent value="questions" className="mt-6">
                <QuestionBank />
              </TabsContent>
              
              <TabsContent value="tips" className="mt-6">
                <InterviewTips />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InterviewPrep;
