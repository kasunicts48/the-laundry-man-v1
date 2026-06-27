import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyBookNowBar from './components/StickyBookNowBar';
import FirstTimeDiscountPopup from './components/FirstTimeDiscountPopup';
import { useOpenBooking } from './hooks/useOpenBooking';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Commercial from './pages/Commercial';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import AppRedirect from './pages/AppRedirect';
import { isReservedPathSegment } from './data/locations';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

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
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onBookNow={openBooking} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services onBookNow={openBooking} />} />
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/:location" element={<LocationHomeRoute onBookNow={openBooking} />} />
        </Routes>
      </main>

      <Footer />

      <StickyBookNowBar />
      <FirstTimeDiscountPopup />
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
      <Routes>
        <Route path="/download-app" element={<AppRedirect />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}
