import React from 'react';
import { CheckCircle } from 'lucide-react';

const services = [
  {
    title: 'Wood Fencing',
    image: 'https://images.unsplash.com/photo-1583805978118-ba9a81ac1399?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Classic and versatile wood fencing solutions that add natural beauty to your property.',
    features: [
      'Cedar and pressure-treated options',
      'Custom designs available',
      'Privacy and picket styles',
      'Professional installation',
    ]
  },
  {
    title: 'Metal Fencing',
    image: 'https://plus.unsplash.com/premium_photo-1675490807291-240d95b3ecd9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Durable and elegant metal fencing perfect for security and style.',
    features: [
      'Aluminum and steel options',
      'Ornamental designs',
      'Rust-resistant coating',
      'Low maintenance',
    ]
  },
  {
    title: 'Vinyl Fencing',
    image: 'https://plus.unsplash.com/premium_photo-1678172259118-4efa9eb49e0e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Modern, low-maintenance vinyl fencing that lasts for years.',
    features: [
      'Multiple colors available',
      'Never needs painting',
      'Weather resistant',
      'Easy to clean',
    ]
  }
];

export default function Services() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600">
            We offer a wide range of fencing solutions to meet your needs
          </p>
        </div>

        <div className="space-y-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`flex flex-col md:flex-row gap-8 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="md:w-1/2">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[400px] object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}