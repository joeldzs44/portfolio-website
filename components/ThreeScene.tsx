'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from './theme-provider';
import { motion, AnimatePresence } from 'framer-motion';

// Easy to modify variables
const SCENE_CONFIG = {
  // Grid settings
  columns: 50,
  rows: 30,
  dotSize: 0.05,
  dotColor: '#ffffff',
  opacity: 0.4, // Reduced base opacity to 30%

  // Mouse interaction
  mouseRadius: 3, // Increased radius for better interaction across full width
  mouseStrength: 0.4, // Slightly increased strength for better visibility

  // Animation
  springStrength: 0.1,
  dampening: 0.8,

  // Theme-based colors
  darkMode: {
    dotColor: '#ffffff',
    backgroundColor: '#0F1010',
    backgroundOpacity: 0.1,
    sceneOpacity: 0.2 // Reduced to 30%
  },
  lightMode: {
    dotColor: '#8b5cf6', 
    backgroundColor: '#FFFFFF', 
    backgroundOpacity: 0.05,
    sceneOpacity: 0.4 // Reduced to 30%
  }
};

interface Dot extends THREE.Mesh {
  basePosition: THREE.Vector3;
  velocity: THREE.Vector3;
}

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && mounted) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Theme-based configuration
      const config = theme === 'dark' ? SCENE_CONFIG.darkMode : SCENE_CONFIG.lightMode;
      renderer.setClearColor(config.backgroundColor, config.backgroundOpacity);

      containerRef.current?.appendChild(renderer.domElement);
      camera.position.z = 15;

      // Materials with theme-based color
      const material = new THREE.MeshBasicMaterial({
        color: config.dotColor,
        transparent: true,
        opacity: theme === 'dark' ? SCENE_CONFIG.darkMode.sceneOpacity : SCENE_CONFIG.lightMode.sceneOpacity,
      });

      const geometry = new THREE.CircleGeometry(SCENE_CONFIG.dotSize, 32);
      const dots: Dot[] = [];

      const gridWidth = SCENE_CONFIG.columns * 0.5;
      const gridHeight = SCENE_CONFIG.rows * 0.5;

      // Create dots with consistent density
      for (let i = 0; i < SCENE_CONFIG.columns; i++) {
        for (let j = 0; j < SCENE_CONFIG.rows; j++) {
          const mesh = new THREE.Mesh(geometry, material) as unknown as Dot;

          // Calculate grid position maintaining density
          const x = (i / SCENE_CONFIG.columns) * gridWidth * 3 - gridWidth;
          const y = (j / SCENE_CONFIG.rows) * gridHeight * 3 - gridHeight;

          mesh.position.set(x, y, 0);
          mesh.basePosition = mesh.position.clone();
          mesh.velocity = new THREE.Vector3();

          dots.push(mesh);
          scene.add(mesh);
        }
      }

      const mousePosition = new THREE.Vector2();

      // Mouse movement handler for full width
      const onMouseMove = (event: MouseEvent) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        
        // Calculate mouse position relative to full window
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        mousePosition.x = x;
        mousePosition.y = y;
      };

      window.addEventListener('mousemove', onMouseMove);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Convert mouse position to world coordinates
        const vector = new THREE.Vector3(mousePosition.x, mousePosition.y, 0);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const mousePos = camera.position.clone().add(dir.multiplyScalar(distance));

        // Update dot positions with smoother interaction
        dots.forEach(dot => {
          const distanceToMouse = mousePos.distanceTo(dot.position);

          if (distanceToMouse < SCENE_CONFIG.mouseRadius) {
            const force = new THREE.Vector3()
              .subVectors(dot.position, mousePos)
              .normalize()
              .multiplyScalar(SCENE_CONFIG.mouseStrength * (1 - distanceToMouse / SCENE_CONFIG.mouseRadius));

            dot.velocity.add(force);
          }

          // Spring force back to original position
          const springForce = new THREE.Vector3()
            .subVectors(dot.basePosition, dot.position)
            .multiplyScalar(SCENE_CONFIG.springStrength);

          dot.velocity.add(springForce);
          dot.velocity.multiplyScalar(SCENE_CONFIG.dampening);
          dot.position.add(dot.velocity);
        });

        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize for full width
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', handleResize);
        containerRef.current?.removeChild(renderer.domElement);
        dots.forEach(dot => {
          dot.geometry.dispose();
        });
        material.dispose();
      };
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-0 w-full h-full -z-10
          ${theme === 'dark' ? 'opacity-30' : 'opacity-30'}
           duration-300 ease-in-out
          overflow-hidden
        `}
      />
    </AnimatePresence>
  );
};

export default ThreeScene;