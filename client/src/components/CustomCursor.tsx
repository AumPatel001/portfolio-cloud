import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if we're hovering over a clickable element
      const target = e.target as HTMLElement;
      
      // Make sure we coerce the result to a boolean with !!
      const clickable = window.getComputedStyle(target).cursor === 'pointer' || 
                        target.tagName === 'A' || 
                        target.tagName === 'BUTTON' || 
                        target.closest('a') !== null || 
                        target.closest('button') !== null;
                        
      setIsPointer(clickable);
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);
  
  return (
    <motion.div 
      className={`custom-cursor mix-blend-difference pointer-events-none z-[9999] fixed`}
      animate={{
        x: position.x,
        y: position.y,
        opacity: isVisible ? 1 : 0,
        scale: isPointer ? 1.5 : 1,
        backgroundColor: isPointer ? "#3B82F6" : "#3B82F6"
      }}
      transition={{ 
        type: "spring", 
        damping: 25, 
        stiffness: 400, 
        mass: 0.3 
      }}
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
      }}
    />
  );
};

export default CustomCursor;
