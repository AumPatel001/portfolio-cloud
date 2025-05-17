import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect } from "react";
import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";

function Router() {
  // Handle navigation active state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll("section[id]");
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id");
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + sectionId) {
              link.classList.add("active");
            }
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CustomCursor />
          <Toaster />
          <Router />
        </motion.div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
