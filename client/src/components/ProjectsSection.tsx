import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemAnimation = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Project data
  const projects = [
    {
      title: "Serverless Weather API",
      icon: "fa-cloud",
      date: "Apr 2025",
      points: [
        "Architected a microservice weather API using AWS Lambda, API Gateway, DynamoDB, and S3.",
        "Built Python-based Lambda functions for real-time weather data processing.",
        "Automated deployments with AWS CodePipeline, CodeBuild, and SAM for IaC.",
        "Implemented CloudWatch and X-Ray for observability and AWS Cognito for secure authentication."
      ],
      tags: ["AWS", "Python", "Serverless", "CI/CD"]
    },
    {
      title: "Kubernetes Blog Platform",
      icon: "fa-dharmachakra",
      date: "Jan 2025",
      points: [
        "Developed a containerized blog platform on Google Kubernetes Engine (GKE) with Docker and Terraform.",
        "Deployed Node.js backend, React frontend, and MongoDB using Kubernetes manifests.",
        "Automated CI/CD with GitHub Actions and Argo CD for GitOps.",
        "Monitored with Prometheus and Grafana, achieving 90% deployment reliability."
      ],
      tags: ["Kubernetes", "Docker", "GCP", "GitOps"]
    },
    {
      title: "DevSecOps Task Manager",
      icon: "fa-shield-alt",
      date: "Dec 2024",
      points: [
        "Created a Python/Flask task management web app with a DevSecOps pipeline on GitLab CI.",
        "Integrated SonarQube, OWASP ZAP, and Trivy for SAST, DAST, and container scanning.",
        "Deployed to GCP Cloud Run using Terraform, with Prometheus/Grafana for monitoring.",
        "Used Google Cloud Anomaly Detection AI to identify log anomalies, reducing incident response time by 50%."
      ],
      tags: ["DevSecOps", "Python", "Flask", "Security"]
    }
  ];

  // Tag color mapping
  const tagColors: Record<string, string> = {
    "AWS": "bg-blue-100 text-blue-800",
    "Python": "bg-yellow-100 text-yellow-800",
    "Serverless": "bg-green-100 text-green-800",
    "CI/CD": "bg-red-100 text-red-800",
    "Kubernetes": "bg-blue-100 text-blue-800",
    "Docker": "bg-green-100 text-green-800",
    "GCP": "bg-purple-100 text-purple-800",
    "GitOps": "bg-pink-100 text-pink-800",
    "DevSecOps": "bg-blue-100 text-blue-800",
    "Flask": "bg-purple-100 text-purple-800",
    "Security": "bg-red-100 text-red-800"
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 bg-secondary"
    >
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerAnimation}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="text-center mb-16 reveal"
          variants={itemAnimation}
        >
          <h2 className="text-3xl font-display font-bold text-dark sm:text-4xl">Academic Projects</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden project-card"
              variants={itemAnimation}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <div className="text-primary">
                    <i className={`fas ${project.icon} text-xl`}></i>
                  </div>
                </div>
                <p className="text-sm text-neutral mb-4">{project.date}</p>
                <div className="space-y-2 mb-4">
                  {project.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start">
                      <div className="flex-shrink-0 text-primary mt-1 text-sm">
                        <i className="fas fa-check"></i>
                      </div>
                      <p className="ml-2 text-sm text-neutral">{point}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${tagColors[tag] || "bg-gray-100 text-gray-800"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
