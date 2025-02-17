import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Save, Send, DollarSign } from 'lucide-react';
import FenceModel from './FenceModel';

interface FenceOptions {
  material: 'wood' | 'metal' | 'vinyl';
  height: number;
  style: string;
  color: string;
  length: number;
  extras: string[];
  fenceType: 'new' | 'demolition' | 'renovation';
}

const materialOptions = {
  wood: {
    styles: ['Privacy', 'Picket', 'Ranch Rail', 'Lattice Top'],
    colors: ['Natural Cedar', 'Redwood Stain', 'Dark Walnut', 'White Paint'],
    extras: ['Decorative Post Caps', 'Carved Posts', 'Custom Gate'],
    basePrice: 25,
  },
  metal: {
    styles: ['Classic Wrought Iron', 'Modern Aluminum', 'Security Steel', 'Ornamental'],
    colors: ['Black', 'Bronze', 'Silver', 'White'],
    extras: ['Decorative Finials', 'Custom Scrollwork', 'Powder Coating'],
    basePrice: 35,
  },
  vinyl: {
    styles: ['Privacy', 'Semi-Privacy', 'Picket', 'Ranch'],
    colors: ['White', 'Tan', 'Gray', 'Woodgrain'],
    extras: ['Lattice Top', 'Post Caps', 'Custom Gate'],
    basePrice: 30,
  },
};

export default function Designer() {
  const [options, setOptions] = useState<FenceOptions>({
    material: 'wood',
    height: 6,
    style: materialOptions.wood.styles[0],
    color: materialOptions.wood.colors[0],
    length: 20,
    extras: [],
    fenceType: 'new',
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    calculatePrice();
  }, [options]);

  const calculatePrice = () => {
    const basePrice = materialOptions[options.material].basePrice;
    const heightMultiplier = options.height / 6;
    const extrasPrice = options.extras.length * 5;

    // Adjust price based on fence type
    let fenceTypeMultiplier = 1; // Default to new fence
    if (options.fenceType === 'demolition') {
      fenceTypeMultiplier = 1.5; // 50% more for demolition
    } else if (options.fenceType === 'renovation') {
      fenceTypeMultiplier = 1.2; // 20% more for renovation
    }

    const total = basePrice * options.length * heightMultiplier * fenceTypeMultiplier + extrasPrice;
    setTotalPrice(total);
  };

  const handleMaterialChange = (material: 'wood' | 'metal' | 'vinyl') => {
    setOptions({
      ...options,
      material,
      style: materialOptions[material].styles[0],
      color: materialOptions[material].colors[0],
      extras: [],
    });
  };

  // Handle fence type change
  const handleFenceTypeChange = (fenceType: 'new' | 'demolition' | 'renovation') => {
    setOptions({ ...options, fenceType });
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Design Your Fence</h1>
          <p className="text-xl text-gray-600">
            Customize every aspect of your fence in 3D
          </p>

          {/* Fence Type Selection */}
          <div className="my-6">
            <div className="flex space-x-4">
              {['new', 'demolition', 'renovation'].map((type) => (
                <button
                  key={type}
                  onClick={() => handleFenceTypeChange(type as 'new' | 'demolition' | 'renovation')}
                  className={`w-full p-4 rounded-lg border-2 bg-white transition-colors ${
                    options.fenceType === type
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <span className="block text-center capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>       
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Preview */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="relative aspect-square mb-4">
              <Canvas shadows>
                <Suspense fallback={null}>
                  <PerspectiveCamera makeDefault position={[10, 5, 10]} />
                  <OrbitControls 
                    enableZoom={true}
                    enablePan={true}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2}
                  />
                  <ambientLight intensity={0.5} />
                  <directionalLight
                    position={[5, 5, 5]}
                    intensity={1}
                    castShadow
                  />
                  <FenceModel {...options} />
                  <Environment preset="sunset" />
                  <mesh 
                    rotation={[-Math.PI / 2, 0, 0]} 
                    position={[0, -0.1, 0]}
                    receiveShadow
                  >
                    <planeGeometry args={[50, 50]} />
                    <meshStandardMaterial color="#a3a3a3" />
                  </mesh>
                </Suspense>
              </Canvas>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-2xl font-bold text-gray-900">
                <DollarSign className="inline h-6 w-6 text-green-600" />
                {totalPrice.toFixed(2)}
              </div>
              <div className="space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Save className="inline h-5 w-5 mr-2" />
                  Save Design
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Send className="inline h-5 w-5 mr-2" />
                  Request Quote
                </button>
              </div>
            </div>
          </div>

          {/* Design Controls */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-6">
              {/* Material Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                <div className="grid grid-cols-3 gap-4">
                  {(['wood', 'metal', 'vinyl'] as const).map((material) => (
                    <button
                      key={material}
                      onClick={() => handleMaterialChange(material)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        options.material === material
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <span className="block text-center capitalize">{material}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Height Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (feet)
                </label>
                <input
                  type="range"
                  min="4"
                  max="14"
                  step="1"
                  value={options.height}
                  onChange={(e) =>
                    setOptions({ ...options, height: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
                <div className="text-center mt-2">{options.height} ft</div>
              </div>

              {/* Style Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                <select
                  value={options.style}
                  onChange={(e) => setOptions({ ...options, style: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {materialOptions[options.material].styles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <select
                  value={options.color}
                  onChange={(e) => setOptions({ ...options, color: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {materialOptions[options.material].colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Length Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length (feet)
                </label>
                <input
                  type="number"
                  value={options.length}
                  onChange={(e) =>
                    setOptions({ ...options, length: parseInt(e.target.value) })
                  }
                  min="1"
                  max="100"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Extras Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extra Features
                </label>
                <div className="space-y-2">
                  {materialOptions[options.material].extras.map((extra) => (
                    <label key={extra} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={options.extras.includes(extra)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setOptions({
                              ...options,
                              extras: [...options.extras, extra],
                            });
                          } else {
                            setOptions({
                              ...options,
                              extras: options.extras.filter((item) => item !== extra),
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      {extra}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}