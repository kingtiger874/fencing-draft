import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Paintbrush, Wrench, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  index: number;
}

function ServiceCard({ title, description, image, features, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div 
        className="h-48 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center text-gray-700">
              <Shield className="h-4 w-4 mr-2 text-blue-600" />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          to="/design"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
        >
          Design Your {title}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const services = [
    {
      title: "Wood Fencing",
      description: "Classic, natural beauty that adds warmth and character to your property.",
      image: "https://images.unsplash.com/photo-1621274147744-cfb5307888d5?auto=format&fit=crop&q=80",
      features: [
        "Premium cedar and pine options",
        "Custom staining available",
        "Multiple style patterns",
        "20+ year lifespan"
      ]
    },
    {
      title: "Metal Fencing",
      description: "Durable, low-maintenance solutions for security and elegance.",
      image: "https://images.unsplash.com/photo-1567364619539-a035880c0174?auto=format&fit=crop&q=80",
      features: [
        "Wrought iron and aluminum",
        "Rust-resistant coating",
        "Decorative options",
        "50+ year lifespan"
      ]
    },
    {
      title: "Vinyl Fencing",
      description: "Modern, maintenance-free fencing that lasts a lifetime.",
      image: "https://images.unsplash.com/photo-1621274403997-37aace184f49?auto=format&fit=crop&q=80",
      features: [
        "UV-resistant materials",
        "Never needs painting",
        "Multiple colors available",
        "Lifetime warranty"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">Our Fencing Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our range of high-quality materials and customize your perfect fence
              with our interactive design tool.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/quote"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get a Free Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}