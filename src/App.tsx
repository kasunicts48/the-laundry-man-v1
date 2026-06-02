import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Commercial from './pages/Commercial';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import CityLanding from './pages/CityLanding';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans text-slate bg-navy">
        <Header onBookNow={handleOpenBooking} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onBookNow={handleOpenBooking} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/commercial" element={<Commercial />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/manchester" element={<CityLanding city="Manchester" onBookNow={handleOpenBooking} />} />
            <Route path="/leeds" element={<CityLanding city="Leeds" onBookNow={handleOpenBooking} />} />
            <Route path="/birmingham" element={<CityLanding city="Birmingham" onBookNow={handleOpenBooking} />} />
            <Route path="/sheffield" element={<CityLanding city="Sheffield" onBookNow={handleOpenBooking} />} />
            <Route path="/cheshire" element={<CityLanding city="Cheshire" onBookNow={handleOpenBooking} />} />
          </Routes>
        </main>
        
        <Footer />

        <BookingForm 
          isOpen={isBookingOpen} 
          onClose={handleCloseBooking} 
        />
      </div>
    </Router>
  );
}

