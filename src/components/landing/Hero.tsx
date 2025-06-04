
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Zap, Rocket } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section ref={targetRef} className="relative overflow-hidden py-24 lg:py-36 min-h-[90vh] flex items-center">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        style={{ opacity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        style={{ opacity }}
      />
      <motion.div 
        className="absolute top-40 right-20 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        style={{ opacity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-purple-100"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Job Search Revolution</span>
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ y }}
          >
            Your
            <span className="relative inline-block mx-2">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <motion.span 
                className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full opacity-70"
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Career Companion
            </span>
          </motion.h1>
          
          <motion.p 
            className="mt-8 text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "60%"]) }}
          >
            Revolutionize your job search with Hirebuddy, we matche you to perfect opportunities, 
            creates stunning resumes, and helps you land your dream job faster.
          </motion.p>

          <motion.div 
            className="mt-12 flex flex-col sm:flex-row gap-5 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6 rounded-xl shadow-lg shadow-purple-200/50 flex items-center gap-2 font-medium"
              >
                <Zap className="h-5 w-5" />
                Build Your Resume
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 rounded-xl border-2 border-purple-600 text-purple-600 hover:bg-purple-50 flex items-center gap-2 font-medium"
              >
                <Rocket className="h-5 w-5" />
                Find Jobs
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-20 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div 
                    className="bg-purple-50 p-5 rounded-xl shadow-sm border border-purple-100"
                    whileHover={{ scale: 1.03, backgroundColor: "#f3e8ff" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <div className="h-4 bg-purple-200 rounded-full w-3/4 mb-2"></div>
                    <div className="h-3 bg-purple-100 rounded-full w-1/2 mb-3"></div>
                    <div className="h-10 bg-purple-200/50 rounded-lg w-full mt-2"></div>
                  </motion.div>
                  <motion.div 
                    className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100"
                    whileHover={{ scale: 1.03, backgroundColor: "#e0f2fe" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <div className="h-4 bg-blue-200 rounded-full w-2/3 mb-2"></div>
                    <div className="h-3 bg-blue-100 rounded-full w-3/4 mb-3"></div>
                    <div className="h-10 bg-blue-200/50 rounded-lg w-full mt-2"></div>
                  </motion.div>
                  <motion.div 
                    className="bg-indigo-50 p-5 rounded-xl shadow-sm border border-indigo-100"
                    whileHover={{ scale: 1.03, backgroundColor: "#e0e7ff" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <div className="h-4 bg-indigo-200 rounded-full w-1/2 mb-2"></div>
                    <div className="h-3 bg-indigo-100 rounded-full w-2/3 mb-3"></div>
                    <div className="h-10 bg-indigo-200/50 rounded-lg w-full mt-2"></div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-300">
                <ArrowDown className="h-5 w-5 text-purple-600" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
