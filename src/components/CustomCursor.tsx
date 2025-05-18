import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = {
    damping: 25,
    stiffness: 400,
    mass: 0.3,
  };

  const cursorX = useSpring(mousePosition.x, springConfig);
  const cursorY = useSpring(mousePosition.y, springConfig);
  const scale = useSpring(isHovering ? 1.5 : 1, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        x: cursorX,
        y: cursorY,
        scale,
      }}
    />
  );
};

export default CustomCursor; 