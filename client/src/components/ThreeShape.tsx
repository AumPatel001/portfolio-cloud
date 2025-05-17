import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeShape = () => {
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
    camera.position.z = 3;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Create a geometric shape
    const geometry = new THREE.OctahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x3B82F6,
      wireframe: true
    });
    const octahedron = new THREE.Mesh(geometry, material);
    scene.add(octahedron);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
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
  }, []);
  
  return (
    <div ref={containerRef} className="w-full h-full" />
  );
};

export default ThreeShape;
