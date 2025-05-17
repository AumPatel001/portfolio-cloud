import { useEffect, useRef, useState } from 'react';
import ThreeScene from './ThreeScene';
import { motion } from 'framer-motion';
import profilePic from '@assets/PHOTO-2025-05-06-12-14-23.jpg';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Backend & ML Developer";
  const textRef = useRef(0);
  
  // Typing animation effect
  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (textRef.current < fullText.length) {
        setTypedText(prev => prev + fullText.charAt(textRef.current));
        textRef.current += 1;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => {
      clearInterval(typingInterval);
    };
  }, []);
  
  // Animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <ThreeScene isHero={true} />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <motion.div className="flex items-center justify-center mb-4" variants={itemAnimation}>
            <img 
              src={profilePic} 
              alt="Aum Patel" 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-primary object-cover shadow-lg mr-4" 
            />
            <motion.h1 
              className="font-display font-bold text-5xl sm:text-6xl md:text-7xl tracking-tight text-left"
              variants={itemAnimation}
            >
              <span className="block text-dark">Aum Patel</span>
              <span className="text-primary">{typedText}</span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="mt-6 max-w-2xl mx-auto text-lg text-neutral"
            variants={itemAnimation}
          >
            Building innovative applications with modern technologies and a passion for problem-solving.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex justify-center space-x-4"
            variants={itemAnimation}
          >
            <a 
              href="#projects" 
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-white shadow-md hover:bg-blue-600 transition"
            >
              View My Work
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
            <a 
              href="#connect" 
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-neutral shadow-sm hover:bg-gray-50 transition"
            >
              Get In Touch
            </a>
          </motion.div>
          
          <motion.div 
            className="mt-20 animate-bounce"
            variants={itemAnimation}
          >
            <a href="#about" className="text-neutral hover:text-primary transition">
              <i className="fas fa-chevron-down text-2xl"></i>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
