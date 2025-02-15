import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Settings2, Save, Send } from 'lucide-react';
import type { FenceDesign } from '../types';

function FenceModel({ material, color, height, style }: Partial<FenceDesign>) {
  return (
    <mesh>
      <boxGeometry args={[1, height || 1, 0.1]} />
      <meshStandardMaterial color={color || '#8B4513'} />
    </mesh>
  );
}

interface ControlPanelProps {
  design: Partial<FenceDesign>;
  onChange: (design: Partial<FenceDesign>) => void;
}

function ControlPanel({ design, onChange }: ControlPanelProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Customize Your Fence</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Material
          </label>
          <select
            value={design.material}
            onChange={(e) => onChange({ ...design, material: e.target.value as FenceDesign['material'] })}
            className="input"
          >
            <option value="wood">Wood</option>
            <option value="metal">Metal</option>
            <option value="vinyl">Vinyl</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <input
            type="color"
            value={design.color}
            onChange={(e) => onChange({ ...design, color: e.target.value })}
            className="w-full h-10 p-1 rounded border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height (ft)
          </label>
          <input
            type="range"
            min="3"
            max="8"
            step="0.5"
            value={design.height}
            onChange={(e) => onChange({ ...design, height: Number(e.target.value) })}
            className="w-full"
          />
          <span className="text-sm text-gray-600">{design.height} ft</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Length (ft)
          </label>
          <input
            type="number"
            value={design.length}
            onChange={(e) => onChange({ ...design, length: Number(e.target.value) })}
            className="input"
            min="1"
          />
        </div>

        <div className="pt-4 flex gap-4">
          <button className="btn btn-primary flex-1">
            <Save className="mr-2 h-4 w-4" />
            Save Design
          </button>
          <button className="btn btn-primary flex-1">
            <Send className="mr-2 h-4 w-4" />
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FenceDesigner() {
  const [design, setDesign] = useState<Partial<FenceDesign>>({
    material: 'wood',
    color: '#8B4513',
    height: 6,
    length: 20,
    style: 'classic',
    customizations: []
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">Interactive Fence Designer</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Customize every aspect of your fence and see it come to life in real-time
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-[600px] relative">
              <Canvas camera={{ position: [3, 3, 3] }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <FenceModel {...design} />
                  <OrbitControls />
                  <Environment preset="sunset" />
                </Suspense>
              </Canvas>
              <div className="absolute bottom-4 right-4">
                <button className="btn btn-secondary">
                  <Settings2 className="mr-2 h-4 w-4" />
                  Reset View
                </button>
              </div>
            </div>
          </div>

          <div>
            <ControlPanel design={design} onChange={setDesign} />
          </div>
        </div>
      </div>
    </div>
  );
}