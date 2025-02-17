import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu, X, Fence, Phone, Mail, MapPin } from 'lucide-react';
import { ArrowRight, Shield, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import FenceDesigner from './components/FenceDesigner';
import Designer from './components/Designer';
import Portfolio from './components/Portfolio';
import QuoteForm from './components/QuoteForm';
import Contact from './components/Contact';
import Blog from './components/Blog';

function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
            <p className="mt-4 text-xl text-gray-600">We're committed to delivering excellence in every project</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Premium materials and expert craftsmanship ensure your fence will last for years to come.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Timely Service</h3>
              <p className="text-gray-600">We respect your time and complete projects according to schedule without compromising quality.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Award className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Our experienced professionals ensure perfect installation and outstanding results.</p>
            </div>
          </div>
        </div>
      </div>
      <Services />
      <Portfolio />
      <Blog />
      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Fencing Project?</h2>
          <p className="text-xl text-blue-100 mb-8">Contact us today for a free consultation and quote</p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/design" element={<Designer />} />
          <Route path="/quote" element={<QuoteForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/services" element={<Services />} />
        </Routes>
        <footer className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Premium Fencing</h3>
                <p className="text-gray-300">Quality fencing solutions for residential and commercial properties.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>(479) 339-1597</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>JaredDavis0102@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>123 Fence Street, City, State 12345</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
                <p className="text-gray-300">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-300">Saturday: 9:00 AM - 4:00 PM</p>
                <p className="text-gray-300">Sunday: Closed</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p className="text-gray-300">&copy; {new Date().getFullYear()} Premium Fencing. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;