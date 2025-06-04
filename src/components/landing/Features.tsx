
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, User, FileText, Clock, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: FileText,
    title: "AI Resume Builder",
    description: "Create professional resumes with AI assistance and real-time optimization suggestions.",
    color: "purple"
  },
  {
    icon: Search,
    title: "Smart Job Matching",
    description: "AI analyzes your skills and preferences to find perfect job matches automatically.",
    color: "blue"
  },
  {
    icon: User,
    title: "Interview Preparation",
    description: "Practice with AI-powered mock interviews tailored to your target roles and industries.",
    color: "indigo"
  },
  {
    icon: Clock,
    title: "Application Tracking",
    description: "Track all your applications, interviews, and progress in one unified dashboard.",
    color: "pink"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="features">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
            <span>POWERFUL FEATURES</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Accelerate Your Career</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform provides all the tools you need to find your dream job faster and more efficiently.
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {features.map((feature, index) => {
            const colorClasses = {
              purple: {
                bg: "bg-purple-50",
                border: "border-purple-100",
                icon: "bg-purple-100 text-purple-600",
                hover: "group-hover:bg-purple-100",
                shadow: "shadow-purple-100"
              },
              blue: {
                bg: "bg-blue-50",
                border: "border-blue-100",
                icon: "bg-blue-100 text-blue-600",
                hover: "group-hover:bg-blue-100",
                shadow: "shadow-blue-100"
              },
              indigo: {
                bg: "bg-indigo-50",
                border: "border-indigo-100",
                icon: "bg-indigo-100 text-indigo-600",
                hover: "group-hover:bg-indigo-100",
                shadow: "shadow-indigo-100"
              },
              pink: {
                bg: "bg-pink-50",
                border: "border-pink-100",
                icon: "bg-pink-100 text-pink-600",
                hover: "group-hover:bg-pink-100",
                shadow: "shadow-pink-100"
              }
            };
            
            const colorClass = colorClasses[feature.color];
            
            return (
              <motion.div 
                key={index} 
                variants={item}
                className={`group relative rounded-2xl ${colorClass.bg} p-8 border ${colorClass.border} shadow-lg ${colorClass.shadow} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 ${colorClass.icon} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                <div className="flex items-center text-sm font-medium">
                  <span className={`text-${feature.color}-600`}>Learn more</span>
                  <motion.div
                    className="ml-1"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop" }}
                  >
                    <ArrowRight className={`w-4 h-4 text-${feature.color}-600`} />
                  </motion.div>
                </div>
                
                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 overflow-hidden`}>
                  <div className={`absolute top-0 right-0 w-5 h-5 rounded-full -mt-2 -mr-2 transition-all duration-300 ${colorClass.icon} opacity-50 group-hover:opacity-100`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
