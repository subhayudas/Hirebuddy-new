
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your AI-Powered
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}Career Companion
            </span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Revolutionize your job search with Hirebuddy's AI that matches you to perfect opportunities, 
            creates stunning resumes, and helps you land your dream job faster.
          </motion.p>

          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
            >
              Build Your Resume
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-purple-600 text-purple-600 hover:bg-purple-50">
              Find Jobs
            </Button>
          </motion.div>

          <motion.div 
            className="mt-16 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div 
                    className="bg-purple-50 p-4 rounded-lg"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="h-4 bg-purple-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-purple-100 rounded w-1/2"></div>
                  </motion.div>
                  <motion.div 
                    className="bg-blue-50 p-4 rounded-lg"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="h-4 bg-blue-200 rounded w-2/3 mb-2"></div>
                    <div className="h-3 bg-blue-100 rounded w-3/4"></div>
                  </motion.div>
                  <motion.div 
                    className="bg-indigo-50 p-4 rounded-lg"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="h-4 bg-indigo-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-indigo-100 rounded w-2/3"></div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-md">
                <ArrowDown className="h-5 w-5 text-purple-600" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />
    </section>
  );
};
