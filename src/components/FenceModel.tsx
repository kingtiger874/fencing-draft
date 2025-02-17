import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FenceModelProps {
  material: 'wood' | 'metal' | 'vinyl';
  height: number;
  length: number;
  color: string;
  style: string;
}

export default function FenceModel({ material, height, length, color, style }: FenceModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  const fenceMaterial = useMemo(() => {
    const colorMapping: Record<string, string> = {
      'Natural Cedar': '#D27D2D',
      'Redwood Stain': '#8B4513',
      'Dark Walnut': '#4A3728',
      'White Paint': '#FFFFFF',
      'Black': '#000000',
      'Bronze': '#8C7853',
      'Silver': '#C0C0C0',
      'White': '#FFFFFF',
      'Tan': '#D2B48C',
      'Gray': '#808080',
      'Woodgrain': '#A67B5B',
    };
  
    const materialColor = new THREE.Color(colorMapping[color] || color);
    
    switch (material) {
      case 'metal':
        return new THREE.MeshStandardMaterial({
          color: materialColor,
          metalness: 0.8,
          roughness: 0.2,
        });
      case 'vinyl':
        return new THREE.MeshStandardMaterial({
          color: materialColor,
          metalness: 0.1,
          roughness: 0.3,
        });
      default: // wood
        return new THREE.MeshStandardMaterial({
          color: materialColor,
          metalness: 0.1,
          roughness: 0.8,
          map: createWoodTexture(),
        });
    }
  }, [material, color]);

function createWoodTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
  
    // Base wood color
    ctx.fillStyle = '#8B5A2B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Generate grain pattern
    for (let i = 0; i < 100; i++) {
      ctx.globalAlpha = 0.2;
      ctx.beginPath();
      ctx.moveTo(0, Math.random() * canvas.height);
      ctx.bezierCurveTo(
        canvas.width / 3, Math.random() * canvas.height,
        canvas.width * 2 / 3, Math.random() * canvas.height,
        canvas.width, Math.random() * canvas.height
      );
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.strokeStyle = '#5A3A1E';
      ctx.stroke();
    }
  
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    return texture;
  }

  // Create fence sections based on style
  const fenceSections = useMemo(() => {
    const sections = [];
    const postSpacing = 6; // 6 feet between posts
    const numPosts = Math.ceil(length / postSpacing) + 1;
    
    // Add posts
    for (let i = 0; i < numPosts; i++) {
      const post = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, height, 0.4),
        fenceMaterial
      );
      post.position.set(i * postSpacing - length / 2, height / 2, 0);
      sections.push(post);
    }

    // Add panels based on style
    for (let i = 0; i < numPosts - 1; i++) {
      let panel;
      
      switch (style) {
        case 'Privacy':
          panel = new THREE.Mesh(
            new THREE.BoxGeometry(postSpacing - 0.1, height - 0.5, 0.1),
            fenceMaterial
          );
          break;
          
        case 'Picket':
          const picketGroup = new THREE.Group();
          const picketWidth = 0.3;
          const picketSpacing = 0.3;
          const numPickets = Math.floor((postSpacing - 0.1) / (picketWidth + picketSpacing));
          
          for (let j = 0; j < numPickets; j++) {
            const picket = new THREE.Mesh(
              new THREE.BoxGeometry(picketWidth, height - 1, 0.1),
              fenceMaterial
            );
            picket.position.x = j * (picketWidth + picketSpacing) - (postSpacing - 0.1) / 2;
            picket.position.y = (height - 1) / 2;
            picketGroup.add(picket);
          }
          panel = picketGroup;
          break;
          
        default:
          panel = new THREE.Mesh(
            new THREE.BoxGeometry(postSpacing - 0.1, height - 0.5, 0.1),
            fenceMaterial
          );
      }
      
      panel.position.set(i * postSpacing + postSpacing / 2 - length / 2, height / 2, 0);
      sections.push(panel);
    }

    return sections;
  }, [length, height, style, fenceMaterial]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {fenceSections.map((section, index) => (
        <primitive key={index} object={section} />
      ))}
    </group>
  );
}