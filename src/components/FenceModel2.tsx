import React, { useRef, useMemo, useEffect, useState } from 'react';
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
  const [fenceMaterial, setFenceMaterial] = useState<THREE.Material>(new THREE.MeshStandardMaterial());

  // Apply the color and material updates instantly
  useEffect(() => {
    const materialColor = new THREE.Color(color.toLowerCase());
    let newMaterial: THREE.MeshStandardMaterial;

    if (color === 'Natural Cedar') materialColor.set('#D27D2D');
    if (color === 'Redwood Stain') materialColor.set('#8B4513');
    if (color === 'Dark Walnut') materialColor.set('#4A3728');

    switch (material) {
      case 'metal':
        newMaterial = new THREE.MeshStandardMaterial({
          color: materialColor,
          metalness: 0.8,
          roughness: 0.2,
        });
        break;
      case 'vinyl':
        newMaterial = new THREE.MeshStandardMaterial({
          color: materialColor,
          metalness: 0.1,
          roughness: 0.3,
        });
        break;
      default: // wood
        newMaterial = new THREE.MeshStandardMaterial({
          color: materialColor,
          metalness: 0.1,
          roughness: 0.8,
          map: createWoodTexture(),
          bumpMap: createWoodTexture(),  // Add bumpMap for depth
          bumpScale: 0.1,
        });
    }

    setFenceMaterial(newMaterial);
  }, [color, material]);

  function createWoodTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; // Increase resolution for better texture
    canvas.height = 1024;
    const context = canvas.getContext('2d')!;
    
    // Create wood grain pattern
    context.fillStyle = '#000000';
    for (let i = 0; i < 50; i++) {
      context.globalAlpha = Math.random() * 0.1;
      context.beginPath();
      context.moveTo(0, Math.random() * canvas.height);
      context.bezierCurveTo(
        canvas.width / 3, Math.random() * canvas.height,
        canvas.width * 2 / 3, Math.random() * canvas.height,
        canvas.width, Math.random() * canvas.height
      );
      context.lineWidth = 1 + Math.random() * 3;
      context.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4); // Adjust repetition for better tiling
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
