import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      title: 'Backend & Machine Learning Developer',
      company: 'Cloud Concierge',
      location: 'Ontario, Canada',
      period: 'May 2025 - Present',
      description: [
        'Developing and maintaining scalable backend systems',
        'Implementing machine learning solutions for data analysis',
        'Working with cloud infrastructure and microservices',
        'Collaborating with cross-functional teams',
      ],
    },
  ];

  return (
    <section id="experience" className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title text-center"
        >
          Experience
        </motion.h2>
        <div className="mt-12">
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">{exp.title}</h3>
                    <p className="text-xl font-semibold mt-2">{exp.company}</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-gray-600">{exp.location}</p>
                    <p className="text-gray-600">{exp.period}</p>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-2 mt-6">
                  {exp.description.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      viewport={{ once: true }}
                      className="text-gray-600"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 