import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { AICapabilities } from "@/components/landing/AICapabilities";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import SignInPopup from "@/components/SignInPopup";

const Index = () => {
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if the URL has the signin parameter
    const params = new URLSearchParams(location.search);
    if (params.get("signin") === "true") {
      setIsSignInPopupOpen(true);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header openSignIn={() => setIsSignInPopupOpen(true)} />
      <Hero />
      <Features />
      <AICapabilities />
      <Testimonials />
      <CTA />
      <Footer />
      <SignInPopup
        isOpen={isSignInPopupOpen}
        onClose={() => setIsSignInPopupOpen(false)}
      />
    </div>
  );
};

export default Index;
