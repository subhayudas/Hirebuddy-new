import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeChoice from "./pages/ResumeChoice";
import { ResumeImportPage } from "./pages/ResumeImportPage";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CoverLetterTest from "./pages/CoverLetterTest";
import EmailOutreach from "./pages/EmailOutreach";
import EmailAPITest from "./pages/EmailAPITest";
import DatabaseTest from "./pages/DatabaseTest";
import GoogleCallback from "./components/auth/GoogleCallback";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  // In development, bypass authentication
  if (import.meta.env.MODE === 'development') {
    return <>{children}</>;
  }

  // In production, enforce authentication
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
            <Route path="/resume-builder" element={<ProtectedRoute><ResumeChoice /></ProtectedRoute>} />
            <Route path="/resume-builder-form" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
            <Route path="/resume-editor" element={<Navigate to="/resume-builder" replace />} />
            <Route path="/resume-import" element={<ProtectedRoute><ResumeImportPage /></ProtectedRoute>} />
            <Route path="/cover-letter-test" element={<ProtectedRoute><CoverLetterTest /></ProtectedRoute>} />
            <Route path="/email-outreach" element={<ProtectedRoute><EmailOutreach /></ProtectedRoute>} />
            <Route path="/email-api-test" element={<ProtectedRoute><EmailAPITest /></ProtectedRoute>} />
            <Route path="/database-test" element={<DatabaseTest />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
