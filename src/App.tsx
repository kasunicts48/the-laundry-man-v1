import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';
import StickyBookNowBar from './components/StickyBookNowBar';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Commercial from './pages/Commercial';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
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
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'eco-professional');
  }, []);

  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedServiceId(serviceId ?? null);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreselectedServiceId(null);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans text-ink bg-navy">
        <Header onBookNow={handleOpenBooking} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onBookNow={handleOpenBooking} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services onBookNow={handleOpenBooking} />} />
            <Route path="/commercial" element={<Commercial />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/manchester" element={<CityLanding city="Manchester" onBookNow={handleOpenBooking} />} />
            <Route path="/leeds" element={<CityLanding city="Leeds" onBookNow={handleOpenBooking} />} />
            <Route path="/birmingham" element={<CityLanding city="Birmingham" onBookNow={handleOpenBooking} />} />
            <Route path="/sheffield" element={<CityLanding city="Sheffield" onBookNow={handleOpenBooking} />} />
            <Route path="/cheshire" element={<CityLanding city="Cheshire" onBookNow={handleOpenBooking} />} />
          </Routes>
        </main>
        
        <Footer />

        <StickyBookNowBar onBookNow={() => handleOpenBooking()} />

        <BookingForm 
          isOpen={isBookingOpen} 
          onClose={handleCloseBooking}
          initialServiceId={preselectedServiceId}
        />
      </div>
    </Router>
  );
}

