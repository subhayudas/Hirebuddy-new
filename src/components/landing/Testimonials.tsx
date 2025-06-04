
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, Users } from "lucide-react";

export const Testimonials = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      content: "Hirebuddy transformed my job search. The AI resume analysis helped me highlight skills I didn't know were valuable, and I landed interviews at 3 top tech companies within weeks.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "BrandWave",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      content: "The interview preparation tool is incredible. It asked me questions specific to my industry that actually came up in my real interviews. I felt so prepared and confident.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Data Scientist",
      company: "AnalyticaAI",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      content: "As someone transitioning careers, Hirebuddy's skill gap analysis was invaluable. It helped me identify exactly what I needed to learn to be competitive in my new field.",
      rating: 4
    }
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section ref={targetRef} className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-40 -right-20 w-80 h-80 rounded-full bg-blue-50 opacity-40 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ y }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-50 opacity-40 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 7.5 }}
        style={{ y }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-4 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
            <Users className="h-3.5 w-3.5" />
            <span>SUCCESS STORIES</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              What Our Users Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who have accelerated their careers with Hirebuddy's AI-powered tools.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{ opacity }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-md border border-gray-100">
                <Quote className="h-6 w-6 text-purple-500" />
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-100"
                  />
                  <motion.div 
                    className="absolute -z-10 inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 blur-sm opacity-30"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 relative">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                  />
                ))}
              </div>
              
              <div className="absolute -top-3 -left-3">
                <svg className="h-8 w-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <motion.div 
                className="absolute -bottom-3 -right-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full p-1.5 opacity-80"
                whileHover={{ scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center justify-center gap-2 text-gray-600 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-gray-200">
            <span className="font-medium">Join over 50,000 professionals who have found success with Hirebuddy</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
