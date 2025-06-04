
import { motion } from "framer-motion";

export const AICapabilities = () => {
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

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600"></div>
      <motion.div 
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-100 opacity-30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-100 opacity-30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 7.5 }}
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
              AI-Powered Career Acceleration
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hirebuddy leverages cutting-edge artificial intelligence to streamline your job search and maximize your chances of success.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Resume Analysis & Optimization</h3>
            <p className="text-gray-600">
              Our AI analyzes your resume against job descriptions, identifies missing keywords, and suggests improvements to increase your interview chances by up to 70%.
            </p>
            <motion.div 
              className="mt-6 text-purple-600 font-medium flex items-center cursor-pointer"
              whileHover={{ x: 5 }}
            >
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Intelligent Job Matching</h3>
            <p className="text-gray-600">
              Our proprietary algorithm matches your skills and experience with job requirements, surfacing opportunities that align with your career goals and potential.
            </p>
            <motion.div 
              className="mt-6 text-purple-600 font-medium flex items-center cursor-pointer"
              whileHover={{ x: 5 }}
            >
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Interview Preparation Assistant</h3>
            <p className="text-gray-600">
              Practice with our AI interviewer that simulates real interviews, provides feedback on your responses, and helps you prepare for tough questions specific to your industry.
            </p>
            <motion.div 
              className="mt-6 text-purple-600 font-medium flex items-center cursor-pointer"
              whileHover={{ x: 5 }}
            >
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Career Path Insights</h3>
            <p className="text-gray-600">
              Get personalized recommendations for skill development based on your career goals and current market trends, helping you stay competitive in your industry.
            </p>
            <motion.div 
              className="mt-6 text-purple-600 font-medium flex items-center cursor-pointer"
              whileHover={{ x: 5 }}
            >
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium text-sm">
            Powered by advanced machine learning and natural language processing
          </span>
        </motion.div>
      </div>
    </section>
  );
};
