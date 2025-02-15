import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import FenceDesigner from './components/FenceDesigner';
import Portfolio from './components/Portfolio';
import QuoteForm from './components/QuoteForm';
import Contact from './components/Contact';
import Blog from './components/Blog';

function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Portfolio />
      <Blog />
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
          <Route path="/design" element={<FenceDesigner />} />
          <Route path="/quote" element={<QuoteForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;