import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ConnectSection = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form to the API
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Your message has been sent successfully!",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please check your connection and try again.",
        variant: "destructive"
      });
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="connect" 
      ref={sectionRef}
      className="py-20 bg-white"
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
          <h2 className="text-3xl font-display font-bold text-dark sm:text-4xl">Let's Connect</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal">
          <motion.div
            variants={itemAnimation}
          >
            <div className="bg-secondary rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-display font-semibold mb-6">Get In Touch</h3>
              
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral">Email</p>
                    <a href="mailto:patelaum37@gmail.com" className="text-dark hover:text-primary transition">patelaum37@gmail.com</a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral">Phone</p>
                    <a href="tel:+13435588939" className="text-dark hover:text-primary transition">+1 (343)-558-8939</a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white">
                    <i className="fab fa-linkedin-in"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral">LinkedIn</p>
                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition">Aum Patel</a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white">
                    <i className="fab fa-github"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral">GitHub</p>
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition">View my repositories</a>
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-neutral hover:text-primary transition text-xl">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-neutral hover:text-primary transition text-xl">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-neutral hover:text-primary transition text-xl">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://dev.to/" target="_blank" rel="noopener noreferrer" className="text-neutral hover:text-primary transition text-xl">
                  <i className="fab fa-dev"></i>
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            variants={itemAnimation}
          >
            <form className="bg-white rounded-xl shadow-lg p-8" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-neutral mb-2">Name</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-neutral mb-2">Email</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-neutral mb-2">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your message here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Sending...
                    </>
                  ) : "Send Message"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ConnectSection;
