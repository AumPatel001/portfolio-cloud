import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Connect from './components/Connect';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="relative">
      <CustomCursor />
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Connect />
      </motion.main>
    </div>
  );
}

export default App; 