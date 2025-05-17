import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="text-center md:text-left mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-display font-bold text-dark">Aum Patel</h3>
            <p className="text-neutral text-sm">Backend & Machine Learning Developer</p>
          </motion.div>
          
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-neutral hover:text-primary transition">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-neutral hover:text-primary transition">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-neutral hover:text-primary transition">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="mailto:patelaum37@gmail.com" className="text-neutral hover:text-primary transition">
              <i className="fas fa-envelope text-xl"></i>
            </a>
          </motion.div>
        </div>
        
        <div className="mt-8 border-t border-gray-300 pt-8 text-center">
          <motion.p 
            className="text-neutral text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            © {currentYear} Aum Patel. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
