
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Rocket } from "lucide-react";

export const CTA = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 opacity-90"></div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full opacity-10"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.2\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"], 
        }}
        transition={{ 
          duration: 50, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "linear" 
        }}
      />
      
      <motion.div 
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-purple-500 opacity-20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-blue-500 opacity-20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 7.5 }}
        style={{ y: y2 }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
            style={{ opacity, scale }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-4 text-xs font-medium rounded-full bg-white/20 text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>START YOUR JOURNEY</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to accelerate your career with AI?
                </h2>
                <p className="text-lg text-white/80 mb-8 max-w-xl">
                  Join thousands of professionals who have transformed their job search experience with Hirebuddy's intelligent tools.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button 
                    size="lg" 
                    className="bg-white text-purple-700 hover:bg-white/90 hover:text-purple-800 transition-all duration-300 group"
                  >
                    Get Started Free
                    <motion.div
                      className="ml-2 bg-purple-100 rounded-full p-1"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight className="h-4 w-4 text-purple-700" />
                    </motion.div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white/30 text-white hover:bg-white/10 transition-all duration-300"
                  >
                    Watch Demo
                  </Button>
                </div>
              </div>
              
              <motion.div 
                className="relative flex-shrink-0 w-40 h-40"
                style={{ rotate }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-70 blur-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Rocket className="h-20 w-20 text-white" />
                </div>
              </motion.div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap justify-center md:justify-between gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No credit card required</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>14-day free trial</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
