import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyBookNowBar from './components/StickyBookNowBar';
import { useOpenBooking } from './hooks/useOpenBooking';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Book from './pages/Book';
import Commercial from './pages/Commercial';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import Locations from './pages/Locations';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import { isReservedPathSegment } from './data/locations';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

interface HomeRouteProps {
  onBookNow: (serviceId?: string) => void;
}

function LocationHomeRoute({ onBookNow }: HomeRouteProps) {
  const { location } = useParams<{ location: string }>();

  if (!location || isReservedPathSegment(location)) {
    return <Navigate to="/" replace />;
  }

  return <Home onBookNow={onBookNow} />;
}

function AppLayout() {
  const openBooking = useOpenBooking();

  return (
    <div className="min-h-screen flex flex-col font-sans text-ink bg-navy">
      <Header onBookNow={() => openBooking()} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onBookNow={openBooking} />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<Book />} />
          <Route path="/services" element={<Services onBookNow={openBooking} />} />
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/:location" element={<LocationHomeRoute onBookNow={openBooking} />} />
        </Routes>
      </main>

      <Footer />

      <StickyBookNowBar onBookNow={() => openBooking()} />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'eco-professional');
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}
