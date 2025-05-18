import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Octahedron } from '@react-three/drei';

const RotatingOctahedron = () => {
  const octahedronRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (octahedronRef.current) {
      // Slow continuous rotation
      octahedronRef.current.rotation.x += 0.002;
      octahedronRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Octahedron ref={octahedronRef} args={[1, 0]}>
      <meshStandardMaterial color="#93C5FD" wireframe />
    </Octahedron>
  );
};

const About = () => {
  const skills = [
    'Backend Development',
    'Machine Learning',
    'Data Engineering',
    'Cloud Infrastructure',
  ];

  return (
    <section id="about" className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title text-center text-black"
        >
          About Me
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-black max-w-3xl mx-auto">
            I am a passionate backend developer with expertise in building scalable systems and implementing
            machine learning solutions. My focus is on creating efficient, maintainable, and robust applications
            that solve real-world problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="h-[400px] relative"
          >
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <RotatingOctahedron />
            </Canvas>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-black">Education</h3>
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-2 text-black">Algonquin College</h4>
              <p className="text-black">Computer Science Program</p>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-black">Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-4 rounded-lg shadow-sm border border-[#93C5FD] text-black"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 