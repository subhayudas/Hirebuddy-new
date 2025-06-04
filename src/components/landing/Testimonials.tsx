
import { motion } from "framer-motion";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      image: "/testimonials/sarah.jpg",
      content: "Hirebuddy completely transformed my job search. The AI resume builder helped me highlight skills I didn't even know were valuable. I received 3 interview requests within a week of updating my profile!"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "BrandWave",
      image: "/testimonials/michael.jpg",
      content: "After months of sending applications with no response, Hirebuddy's intelligent job matching connected me with my dream role. The interview preparation tool was incredibly accurate—it predicted 80% of the questions I was asked!"
    },
    {
      name: "Priya Patel",
      role: "Data Scientist",
      company: "AnalyticaAI",
      image: "/testimonials/priya.jpg",
      content: "The skill assessment feature identified gaps in my knowledge that were preventing me from landing interviews. After completing the recommended courses, I secured a position with a 40% salary increase!"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-40 -right-20 w-80 h-80 rounded-full bg-purple-50 opacity-60 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-50 opacity-60 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 10 }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how Hirebuddy has helped thousands of professionals accelerate their careers and find their dream jobs.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-8 relative border border-gray-100"
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-center mb-6">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white mr-4 overflow-hidden">
                  <span className="text-xl font-bold">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
              <div className="absolute -top-3 -left-3">
                <svg className="h-8 w-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <motion.div 
                className="absolute bottom-4 right-4 text-purple-600"
                initial={{ opacity: 0.5, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium">
            Join over 50,000 professionals who have found success with Hirebuddy
          </span>
        </motion.div>
      </div>
    </section>
  );
};
