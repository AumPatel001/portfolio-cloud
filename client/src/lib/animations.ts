import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize scroll reveal animation
export const initScrollReveal = () => {
  const sections = document.querySelectorAll('.reveal');
  
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  });
};

// Initialize parallax effect for background elements
export const initParallax = () => {
  const elements = document.querySelectorAll('.parallax');
  
  elements.forEach((element) => {
    gsap.to(element, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  });
};

// Animated counter
export const animateCounter = (elementId: string, startNumber: number, endNumber: number, duration: number = 2) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const counter = { value: startNumber };
  
  gsap.to(counter, {
    value: endNumber,
    duration,
    ease: "power2.out",
    onUpdate: function() {
      element.textContent = Math.round(counter.value).toString();
    }
  });
};

// Text reveal animation
export const textRevealAnimation = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const text = element.textContent || "";
  element.textContent = "";
  element.style.visibility = "visible";
  
  let html = "";
  for (let i = 0; i < text.length; i++) {
    html += `<span class="char">${text[i]}</span>`;
  }
  
  element.innerHTML = html;
  
  const chars = element.querySelectorAll('.char');
  
  gsap.from(chars, {
    opacity: 0,
    y: 20,
    stagger: 0.03,
    duration: 0.5,
    ease: "power2.out"
  });
};
