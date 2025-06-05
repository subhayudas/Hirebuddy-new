import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDeviceType, useReducedMotion } from "@/hooks/useDeviceType";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export const Hero = () => {
  const [email, setEmail] = useState("");
  const { isMobile, isDesktop, screenSize } = useDeviceType();
  const prefersReducedMotion = useReducedMotion();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
    setEmail("");
  };

  // Responsive animation settings
  const animationSettings = {
    reduce: prefersReducedMotion || isMobile,
    duration: prefersReducedMotion ? 0.3 : isMobile ? 0.5 : 0.8,
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 relative overflow-hidden">
      {/* Background Paths */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Announcement Badge */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={animationSettings.reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animationSettings.duration }}
          >
            <Badge variant="secondary" className="bg-pink-100 text-pink-700 border-pink-200 px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              One stop solution for your career search.
            </Badge>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6 sm:mb-8 px-4 sm:px-0"
            initial={animationSettings.reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animationSettings.duration, delay: animationSettings.reduce ? 0 : 0.2 }}
          >
            Land your{" "}
            <span className="text-gradient-primary">
              next opportunity
            </span>
            <br />
            <span className="text-gray-700 dark:text-gray-300">
              without lifting a finger.
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 sm:px-0"
            initial={animationSettings.reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animationSettings.duration, delay: animationSettings.reduce ? 0 : 0.4 }}
          >
            Answer a brief set of questions, and our AI will match you with opportunities, tailor your 
            applications, and submit them — automating your whole search for the right role.
          </motion.p>

          {/* Email Signup Form */}
          <motion.form
            onSubmit={handleEmailSubmit}
            className="max-w-lg mx-auto mb-6 sm:mb-8 px-4 sm:px-0"
            initial={animationSettings.reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animationSettings.duration, delay: animationSettings.reduce ? 0 : 0.6 }}
          >
            <div className="flex flex-col sm:flex-row gap-3 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-gray-200/50 dark:border-neutral-700/50 mx-2 sm:mx-0">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border-0 text-lg h-12 bg-transparent focus:ring-0 placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-white"
                required
              />
              <motion.div 
                whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}} 
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
              >
                <Button 
                  type="submit"
                  size={isMobile ? "default" : "lg"}
                  className={`bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-0 ${isMobile ? 'h-11 px-6' : 'h-12 px-8'} rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-pink-500/25 whitespace-nowrap ${!prefersReducedMotion ? 'transform hover:scale-105' : ''}`}
                >
                  Find your next role
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.form>

          {/* Trust Indicator */}
          <motion.div
            className="flex justify-center px-4 sm:px-0"
            initial={animationSettings.reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: animationSettings.duration, delay: animationSettings.reduce ? 0 : 0.8 }}
          >
            <p className="text-pink-600 font-medium text-sm">
              Try now- first few applications free!
            </p>
          </motion.div>

          {/* Features List */}
          <motion.div
            className="mt-12 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-0"
            initial={animationSettings.reduce ? { opacity: 1 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animationSettings.duration, delay: animationSettings.reduce ? 0 : 1.0 }}
          >
            {[
              "AI-powered job matching",
              "Automated application process", 
              "Personalized career insights"
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center space-x-3 p-4 sm:p-6 bg-white/70 dark:bg-neutral-800/70 rounded-2xl backdrop-blur-md border border-white/50 dark:border-neutral-700/50 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80 dark:hover:bg-neutral-800/80"
                initial={animationSettings.reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: animationSettings.duration, delay: animationSettings.reduce ? 0 : 1.2 + index * 0.1 }}
              >
                <CheckCircle className="w-5 h-5 text-pink-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base text-center">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};