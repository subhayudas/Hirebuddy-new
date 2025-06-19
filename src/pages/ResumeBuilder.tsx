import { Header } from "@/components/layout/Header";
import { EnhancedResumeBuilder } from "@/components/resume/EnhancedResumeBuilder";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResumeBuilder = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <EnhancedResumeBuilder template="perfect-fit" onBack={handleBack} />
    </div>
  );
};

export default ResumeBuilder;