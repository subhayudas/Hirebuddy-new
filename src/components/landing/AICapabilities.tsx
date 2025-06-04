
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Zap, Brain, Bot, Cpu } from "lucide-react";

export const AICapabilities = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const capabilities = [
    {
      icon: Brain,
      title: "Smart Resume Analysis",
      description: "Our AI analyzes your resume against job descriptions to highlight strengths and suggest improvements.",
      color: "purple"
    },
    {
      icon: Bot,
      title: "Interview AI Coach",
      description: "Practice with our AI interviewer that adapts questions based on your responses and provides feedback.",
      color: "blue"
    },
    {
      icon: Cpu,
      title: "Skill Gap Detection",
      description: "Identify missing skills for your target roles and get personalized learning recommendations.",
      color: "indigo"
    },
    {
      icon: Zap,
      title: "Automated Applications",
      description: "Let our AI help you apply to multiple jobs with tailored applications in just a few clicks.",
      color: "pink"
    }
  ];

  return (
    <section ref={targetRef} className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600"></div>
      
      <motion.div 
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-purple-100 opacity-30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-blue-100 opacity-30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 7.5 }}
        style={{ y: y2 }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-4 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI-POWERED FEATURES</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Supercharge Your Job Search
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hirebuddy leverages cutting-edge artificial intelligence to streamline your job search and maximize your chances of success.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{ opacity }}
        >
          {capabilities.map((capability, index) => {
            const isEven = index % 2 === 0;
            const colorClasses = {
              purple: {
                bg: "bg-purple-50",
                border: "border-purple-100",
                icon: "bg-purple-100 text-purple-600",
                shadow: "shadow-purple-100"
              },
              blue: {
                bg: "bg-blue-50",
                border: "border-blue-100",
                icon: "bg-blue-100 text-blue-600",
                shadow: "shadow-blue-100"
              },
              indigo: {
                bg: "bg-indigo-50",
                border: "border-indigo-100",
                icon: "bg-indigo-100 text-indigo-600",
                shadow: "shadow-indigo-100"
              },
              pink: {
                bg: "bg-pink-50",
                border: "border-pink-100",
                icon: "bg-pink-100 text-pink-600",
                shadow: "shadow-pink-100"
              }
            };
            
            const colorClass = colorClasses[capability.color];
            
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`group relative rounded-2xl ${colorClass.bg} p-8 border ${colorClass.border} shadow-lg ${colorClass.shadow} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                style={{ y: isEven ? y1 : y2 }}
              >
                <div className="flex items-start gap-5">
                  <div className={`flex-shrink-0 w-14 h-14 ${colorClass.icon} rounded-xl flex items-center justify-center`}>
                    <capability.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{capability.title}</h3>
                    <p className="text-gray-600">{capability.description}</p>
                  </div>
                </div>
                
                {/* Animated particles */}
                <motion.div 
                  className={`absolute -z-10 w-3 h-3 rounded-full ${colorClass.icon} opacity-0`}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  whileHover={{ 
                    opacity: [0, 1, 0],
                    x: [0, -20, -40],
                    y: [0, -20, -10],
                    transition: { duration: 1.5, repeat: Infinity }
                  }}
                />
                <motion.div 
                  className={`absolute -z-10 w-2 h-2 rounded-full ${colorClass.icon} opacity-0`}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  whileHover={{ 
                    opacity: [0, 1, 0],
                    x: [0, 20, 40],
                    y: [0, -10, -30],
                    transition: { duration: 2, repeat: Infinity, delay: 0.3 }
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center justify-center gap-2 text-gray-600 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-gray-200">
            <Zap className="h-5 w-5 text-purple-600" />
            <span className="font-medium">Powered by advanced machine learning algorithms</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
