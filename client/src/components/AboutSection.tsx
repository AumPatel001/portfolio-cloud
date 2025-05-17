import { useRef, useEffect } from 'react';
import ThreeShape from './ThreeShape';
import { motion, useInView } from 'framer-motion';

const AboutSection = () => {
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
      id="about" 
      ref={sectionRef}
      className="py-20 bg-secondary"
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
          <h2 className="text-3xl font-display font-bold text-dark sm:text-4xl">About Me</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal">
          <motion.div
            variants={itemAnimation}
          >
            <div className="relative h-80 rounded-lg bg-white shadow-lg overflow-hidden">
              <ThreeShape />
            </div>
          </motion.div>
          
          <motion.div
            variants={itemAnimation}
          >
            <h3 className="text-2xl font-display font-semibold mb-4">Backend & Machine Learning Developer</h3>
            <p className="text-neutral mb-6">
              I'm a Computer Engineering Technology student at Algonquin College, specializing in Application & Systems Engineering, Web & Enterprise Solutions, and Data Management & Analytics.
            </p>
            
            <motion.div 
              className="mb-6"
              variants={itemAnimation}
            >
              <h4 className="font-semibold mb-3">Education</h4>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-medium">School of Advanced Technology, Algonquin College, Canada</p>
                <p className="text-sm text-neutral">May 2023 – Aug 2025</p>
                <p className="mt-2">Advance Diploma in Computer Engineering Technology - CS</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Application & Systems Engineering</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Web & Enterprise Solutions</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Data Management & Analytics</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-6"
              variants={itemAnimation}
            >
              <div className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="text-primary text-3xl mb-2">
                  <i className="fas fa-code"></i>
                </div>
                <h4 className="font-medium">Backend Development</h4>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="text-primary text-3xl mb-2">
                  <i className="fas fa-brain"></i>
                </div>
                <h4 className="font-medium">Machine Learning</h4>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="text-primary text-3xl mb-2">
                  <i className="fas fa-database"></i>
                </div>
                <h4 className="font-medium">Data Engineering</h4>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="text-primary text-3xl mb-2">
                  <i className="fas fa-cloud"></i>
                </div>
                <h4 className="font-medium">Cloud Infrastructure</h4>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
