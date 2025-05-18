import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import ParticleSystem from './ParticleSystem';
import FloatingPhoto from './FloatingPhoto';

const RotatingTorus = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.004;
      torusRef.current.rotation.y += 0.004;
      torusRef.current.rotation.x += mousePosition.y * 0.008;
      torusRef.current.rotation.y += mousePosition.x * 0.008;
    }
  });

  return (
    <Torus
      ref={torusRef}
      args={[1.5, 0.4, 16, 100]}
    >
      <meshStandardMaterial color="#3B82F6" wireframe />
    </Torus>
  );
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const roles = [
    'Backend & ML Engineer',
    'Cloud Engineer',
    'DevOps Engineer'
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [text, setText] = useState(roles[0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    setText(roles[currentRoleIndex]);
  }, [currentRoleIndex, roles]);

  return (
    <section id="home" className="h-screen relative flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <ParticleSystem mousePosition={mousePosition} color="#3B82F6" count={1000} />
          <RotatingTorus mousePosition={mousePosition} />
        </Canvas>
      </div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
        <FloatingPhoto />
        <div className="text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-black font-poppins mb-2"
          >
            Aum Patel
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-xl md:text-2xl text-black h-8"
          >
            {text}
            <span className="animate-blink">|</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-black max-w-xl mt-4 mx-auto md:mx-0"
          >
            Building innovative applications with modern technologies and a passion for problem-solving
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Hero; 