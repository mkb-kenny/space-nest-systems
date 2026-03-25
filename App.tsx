import React, { useState, useEffect, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Loader from './components/Loader';
import LiveChat from './components/LiveChat';
import Contact from './components/Contact'; // Imported statically for reliable linking

// Lazy load heavy components below the fold for faster initial render
const Services = React.lazy(() => import('./components/Services'));
const Portfolio = React.lazy(() => import('./components/Portfolio'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const WhyMe = React.lazy(() => import('./components/WhyMe'));

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(true);

  // Handle Loading with smooth exit
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Keep loader in DOM briefly for exit animation
      setTimeout(() => setLoaderVisible(false), 400);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loaderVisible && (
        <div className={`transition-all duration-400 ease-out ${loading ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
          <Loader />
        </div>
      )}
      
      {/* Animated Futuristic Background */}
      <div className="fixed inset-0 -z-10 bg-background transition-colors duration-500 will-change-transform">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark bg-grid opacity-[0.4] transition-all duration-500"></div>
        
        {/* Moving Gradient Spotlights - Brand Colors (Optimized with radial-gradient for performance) */}
        <div className="hidden md:block absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full animate-float transform-gpu will-change-transform" 
          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)' }}></div>
        <div className="hidden md:block absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full animate-float transform-gpu will-change-transform" 
          style={{ background: 'radial-gradient(circle, rgba(244, 63, 94, 0.1) 0%, transparent 70%)', animationDelay: '2s' }}></div>
        <div className="hidden md:block absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full animate-float transform-gpu will-change-transform" 
          style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%)', animationDelay: '4s' }}></div>
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 dark:from-slate-950/80 via-transparent to-white/80 dark:to-slate-950/80 pointer-events-none transition-colors duration-500"></div>
      </div>

      <div className={`transition-all duration-700 ease-out min-h-screen relative ${loading ? 'opacity-0 scale-[0.99] pointer-events-none h-0 overflow-hidden' : 'opacity-100 scale-100'}`}>
        <Navbar />
        <main className="relative z-10 selection:bg-brand-blue selection:text-white">
          <Hero />
          <About />
          
          {/* Wrap lazy components in Suspense */}
          <Suspense fallback={<div className="py-20 text-center text-text-muted">Loading content...</div>}>
            <Services />
            <WhyMe />
            <Portfolio />
            <Testimonials />
          </Suspense>
          
          {/* Contact is eagerly loaded to ensure ID is present for scroll targets */}
          <Contact />
        </main>
        
        {/* Floating Live Chat Widget */}
        <LiveChat />
      </div>
    </>
  );
};

export default App;