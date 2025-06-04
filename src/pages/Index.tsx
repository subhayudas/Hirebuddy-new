
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { AICapabilities } from "@/components/landing/AICapabilities";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <Hero />
      <Features />
      <AICapabilities />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
