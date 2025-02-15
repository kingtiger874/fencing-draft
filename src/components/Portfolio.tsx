import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar } from 'lucide-react';
import type { Project } from '../types';

const projects: Project[] = [
  {
    id: '1',
    title: 'Modern Privacy Fence',
    description: 'Custom-designed horizontal cedar fence with black metal accents',
    imageUrl: 'https://images.unsplash.com/photo-1621274403997-37aace184f49?auto=format&fit=crop&q=80',
    material: 'Wood',
    location: 'Austin, TX',
    completionDate: '2024'
  },
  {
    id: '2',
    title: 'Classic Wrought Iron',
    description: 'Elegant wrought iron fence with decorative finials',
    imageUrl: 'https://images.unsplash.com/photo-1567364619539-a035880c0174?auto=format&fit=crop&q=80',
    material: 'Metal',
    location: 'Dallas, TX',
    completionDate: '2024'
  },
  {
    id: '3',
    title: 'Contemporary Vinyl',
    description: 'Low-maintenance white vinyl fence with modern post caps',
    imageUrl: 'https://images.unsplash.com/photo-1621274147744-cfb5307888d5?auto=format&fit=crop&q=80',
    material: 'Vinyl',
    location: 'Houston, TX',
    completionDate: '2024'
  }
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div
        className="h-64 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${project.imageUrl})` }}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1" />
            {project.material}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {project.location}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {project.completionDate}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">Our Recent Projects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our portfolio of custom fence installations and get inspired for your own project
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}