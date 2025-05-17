import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect on navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Animation variants
  const navAnimation = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  // Mobile menu animation
  const menuAnimation = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navAnimation}
      className={`fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 ${scrolled ? 'shadow-sm' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="#home" className="text-xl font-display font-bold text-dark hover:text-primary transition">
              AP
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="nav-link font-medium text-neutral hover:text-primary px-2 py-1">About</a>
            <a href="#experience" className="nav-link font-medium text-neutral hover:text-primary px-2 py-1">Experience</a>
            <a href="#projects" className="nav-link font-medium text-neutral hover:text-primary px-2 py-1">Projects</a>
            <a href="#connect" className="nav-link font-medium text-neutral hover:text-primary px-2 py-1">Connect</a>
          </div>
          <div className="flex md:hidden items-center">
            <button 
              onClick={toggleMenu}
              className="text-neutral hover:text-primary focus:outline-none"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <motion.div 
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={menuAnimation}
        className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-neutral hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>About</a>
          <a href="#experience" className="block px-3 py-2 rounded-md text-base font-medium text-neutral hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>Experience</a>
          <a href="#projects" className="block px-3 py-2 rounded-md text-base font-medium text-neutral hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>Projects</a>
          <a href="#connect" className="block px-3 py-2 rounded-md text-base font-medium text-neutral hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>Connect</a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
