import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  isHero?: boolean;
}

const ThreeScene = ({ isHero = true }: ThreeSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Set up scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      container.clientWidth / container.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = isHero ? 5 : 3;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Create objects based on whether it's hero or not
    if (isHero) {
      // Create particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1000;
      
      const posArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      // Materials
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x3B82F6,
        transparent: true,
        opacity: 0.8
      });
      
      // Mesh
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      
      // Create a floating torus
      const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
      const torusMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x3B82F6,
        wireframe: true
      });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      scene.add(torus);

      // Animation
      let mouseX = 0;
      let mouseY = 0;
      
      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      const animate = () => {
        const animationId = requestAnimationFrame(animate);
        
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;
        
        particlesMesh.rotation.y += 0.002;
        
        // Interactive movement based on mouse position
        particlesMesh.rotation.x = -mouseY * 0.05;
        particlesMesh.rotation.y = mouseX * 0.05;
        
        renderer.render(scene, camera);
        
        // Cleanup if component unmounts
        return () => {
          cancelAnimationFrame(animationId);
          window.removeEventListener('mousemove', handleMouseMove);
        };
      };
      
      animate();
    } else {
      // Create a geometric shape for About section
      const geometry = new THREE.OctahedronGeometry(1, 0);
      const material = new THREE.MeshBasicMaterial({ 
        color: 0x3B82F6,
        wireframe: true
      });
      const octahedron = new THREE.Mesh(geometry, material);
      scene.add(octahedron);
      
      // Animation
      const animate = () => {
        const animationId = requestAnimationFrame(animate);
        
        octahedron.rotation.x += 0.01;
        octahedron.rotation.y += 0.01;
        
        renderer.render(scene, camera);
        
        // Cleanup if component unmounts
        return () => {
          cancelAnimationFrame(animationId);
        };
      };
      
      animate();
    }
    
    // Handle window resize
    const handleResize = () => {
      if (container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up function
    return () => {
      if (container && renderer.domElement) {
        window.removeEventListener('resize', handleResize);
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [isHero]);
  
  return (
    <div 
      ref={containerRef} 
      className={isHero ? 'absolute top-0 left-0 w-full h-full z-0' : 'w-full h-full'}
    />
  );
};

export default ThreeScene;
