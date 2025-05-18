import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: 'Serverless Weather API',
      date: 'Apr 2025',
      description: 'A serverless weather API built with AWS Lambda and API Gateway, providing real-time weather data with caching and rate limiting.',
      technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'CloudWatch'],
    },
    {
      title: 'Kubernetes Blog Platform',
      date: 'Jan 2025',
      description: 'A scalable blog platform deployed on Kubernetes, featuring auto-scaling, load balancing, and container orchestration.',
      technologies: ['Kubernetes', 'Docker', 'Node.js', 'MongoDB'],
    },
    {
      title: 'DevSecOps Task Manager',
      date: 'Dec 2024',
      description: 'A secure task management application implementing DevSecOps practices, including automated security scanning and compliance checks.',
      technologies: ['React', 'Express.js', 'PostgreSQL', 'SonarQube'],
    },
  ];

  return (
    <section id="projects" className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title text-center"
        >
          Projects
        </motion.h2>
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                    <span className="text-sm text-gray-500">{project.date}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 