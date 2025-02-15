import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: '(555) 123-4567',
    link: 'tel:+15551234567'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@fencecraft.com',
    link: 'mailto:info@fencecraft.com'
  },
  {
    icon: MapPin,
    title: 'Location',
    content: '123 Fence Street, Austin, TX 78701',
    link: 'https://maps.google.com'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: 'Mon-Fri: 8am-6pm, Sat: 9am-3pm',
    link: null
  }
];

function ContactCard({ icon: Icon, title, content, link }: {
  icon: React.ElementType;
  title: string;
  content: string;
  link: string | null;
}) {
  const CardContent = () => (
    <div className="flex items-center p-6 bg-white rounded-lg shadow-lg">
      <Icon className="h-8 w-8 text-blue-600 mr-4" />
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} className="block hover:scale-105 transition-transform">
        <CardContent />
      </a>
    );
  }

  return <CardContent />;
}

export default function Contact() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our services? We're here to help you create the perfect fence for your property.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ContactCard {...info} />
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.8888901999727!2d-97.74271534886001!3d30.267601981571347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5a014ac8dcf%3A0xcb36b88656566e51!2sDowntown%20Austin%2C%20Austin%2C%20TX!5e0!3m2!1sen!2sus!4v1647894741513!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}