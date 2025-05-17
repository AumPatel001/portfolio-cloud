import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemAnimation = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerAnimation}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="text-center mb-16 reveal"
          variants={itemAnimation}
        >
          <h2 className="text-3xl font-display font-bold text-dark sm:text-4xl">Work Experience</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>
        
        <div className="relative timeline-container reveal">
          <motion.div 
            className="timeline-item mb-12 md:mb-0"
            variants={itemAnimation}
          >
            <div className="md:flex md:items-center">
              <div className="md:w-1/2 md:pr-8 md:text-right mb-6 md:mb-0">
                <motion.div 
                  className="bg-white rounded-lg shadow-lg p-6 md:ml-auto md:mr-0 transform transition hover:scale-105 duration-300 hover:shadow-xl max-w-md"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-semibold text-dark">Backend & Machine Learning Developer</h3>
                  <p className="text-primary font-medium">Cloud Concierge</p>
                  <p className="text-neutral text-sm">May 2025 - Present</p>
                  <p className="text-neutral text-sm">Ontario, Canada</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 text-primary mt-1">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <p className="ml-3 text-sm text-neutral">Engineered a predictive forecasting engine using TensorFlow & Python, analyzing historical and meteorological data to project weekly restaurant metrics (sales, customers).</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 text-primary mt-1">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <p className="ml-3 text-sm text-neutral">Architected and implemented the core backend infrastructure (Node.js, Express.js) handling authentication, data processing, and database (MongoDB Atlas) interactions.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 text-primary mt-1">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <p className="ml-3 text-sm text-neutral">Seamlessly integrated the ML model into the backend, enabling automated forecast generation and delivery to the user interface.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 text-primary mt-1">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <p className="ml-3 text-sm text-neutral">Orchestrated data pipelines connecting the React frontend, Node.js backend, MongoDB, and external weather APIs for efficient information flow.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">TensorFlow</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Python</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Node.js</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">MongoDB</span>
                  </div>
                </motion.div>
              </div>
              <div className="md:w-1/2 md:pl-8 hidden md:block">
                <motion.div 
                  className="bg-secondary h-64 rounded-lg opacity-30 flex items-center justify-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 0.3, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.7 }}
                >
                  <i className="fas fa-robot text-6xl text-primary opacity-50"></i>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
