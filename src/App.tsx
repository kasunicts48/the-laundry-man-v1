import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import Header from './components/Header';
import RouteFallback from './components/RouteFallback';
import { useOpenBooking } from './hooks/useOpenBooking';

import Home from './pages/Home';

const Footer = lazy(() => import('./components/Footer'));
const StickyBookNowBar = lazy(() => import('./components/StickyBookNowBar'));

const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Commercial = lazy(() => import('./pages/Commercial'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetails = lazy(() => import('./pages/BlogDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const AppRedirect = lazy(() => import('./pages/AppRedirect'));
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
    <div className="flex min-h-screen min-w-0 max-w-full flex-col overflow-x-clip bg-navy font-sans text-ink">
      <Header />

      <main className="min-w-0 max-w-full flex-grow overflow-x-clip">
        <Suspense fallback={<RouteFallback />}>
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
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        <StickyBookNowBar />
      </Suspense>
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
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/download-app" element={<AppRedirect />} />
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
