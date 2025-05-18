import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  mousePosition: {
    x: number;
    y: number;
  };
  color?: string;
  count?: number;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ mousePosition, color = '#93C5FD', count = 2000 }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesCount = count;
  const positions = new Float32Array(particlesCount * 3);

  // Initialize particles in a sphere
  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    const radius = 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);
  }

  useFrame(() => {
    if (particlesRef.current) {
      // Even slower base rotation
      particlesRef.current.rotation.x += 0.0002;
      particlesRef.current.rotation.y += 0.0002;
      
      // Gentler mouse interaction
      particlesRef.current.rotation.x += mousePosition.y * 0.01;
      particlesRef.current.rotation.y += mousePosition.x * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export default ParticleSystem; 