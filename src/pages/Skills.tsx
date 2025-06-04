
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SkillOverview } from "@/components/skills/SkillOverview";
import { SkillAssessments } from "@/components/skills/SkillAssessments";
import { LearningPaths } from "@/components/skills/LearningPaths";
import { SkillCertifications } from "@/components/skills/SkillCertifications";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Skills = () => {
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
                    <BreadcrumbPage>Skill Assessment</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          
          <div className="flex flex-1 flex-col gap-6 p-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Skill Development</h1>
              <p className="text-gray-600 mt-1">Assess your skills, track progress, and discover learning opportunities</p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="assessments">Assessments</TabsTrigger>
                <TabsTrigger value="learning">Learning Paths</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <SkillOverview />
              </TabsContent>
              
              <TabsContent value="assessments" className="mt-6">
                <SkillAssessments />
              </TabsContent>
              
              <TabsContent value="learning" className="mt-6">
                <LearningPaths />
              </TabsContent>
              
              <TabsContent value="certifications" className="mt-6">
                <SkillCertifications />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Skills;
