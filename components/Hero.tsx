import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ArrowDownRight } from 'lucide-react';
import Reveal from './Reveal';

// Lazy-load the heavy Spline component so it doesn't block initial render
const Spline = lazy(() => import('@splinetool/react-spline'));

const Hero: React.FC = () => {
  const [len1, setLen1] = useState(0); // Welcome to
  const [len2, setLen2] = useState(0); // SPACE
  const [len3, setLen3] = useState(0); // NEST
  const [len4, setLen4] = useState(0); // SYSTEMS
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);

  // Defer Spline loading until the browser is idle / page is interactive
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(() => setShouldLoadSpline(true), { timeout: 1500 });
      return () => (window as any).cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setShouldLoadSpline(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  // Orchestrate typing effect timings
  useEffect(() => {
    const t1 = "Welcome to", t2 = "SPACE", t3 = "NEST", t4 = "SYSTEMS";
    let c1 = 0, c2 = 0, c3 = 0, c4 = 0;
    
    // Delay start until the loader overlay clears
    const startTimeout = setTimeout(() => {
      const type = () => {
        if (c1 < t1.length) { setLen1(++c1); setTimeout(type, 50); }
        else if (c2 < t2.length) { setLen2(++c2); setTimeout(type, 80); }
        else if (c3 < t3.length) { setLen3(++c3); setTimeout(type, 80); }
        else if (c4 < t4.length) { setLen4(++c4); setTimeout(type, 110); }
      };
      type();
    }, 1200);

    return () => {
      clearTimeout(startTimeout);
    };
  }, []);

  const handleSplineLoad = () => {
    setIsSplineLoaded(true);
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSystems = (e: React.MouseEvent) => {
    e.preventDefault();
    const systemsSection = document.getElementById('services');
    if (systemsSection) {
      systemsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-20 pb-8 sm:pt-32 sm:pb-20 lg:pt-48">
      
      {/* Custom Styles for Modern Text Animation */}
      <style>{`
        @keyframes blur-slide {
          0% {
            opacity: 0;
            filter: blur(12px);
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-modern-reveal {
          opacity: 0; /* Start hidden */
          animation: blur-slide 1s cubic-bezier(0.2, 0.65, 0.3, 0.9) forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Decorative Background Elements - Optimized with radial-gradient for performance */}
      <div className="hidden md:block absolute top-0 right-0 w-[80vh] h-[80vh] rounded-full -z-10 animate-float transform-gpu will-change-transform opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)' }}></div>
      <div className="hidden md:block absolute bottom-0 left-0 w-[80vh] h-[80vh] rounded-full -z-10 animate-float transform-gpu will-change-transform opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(244, 63, 94, 0.1) 0%, transparent 70%)', animationDelay: '2s' }}></div>
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vh] h-[90vh] rounded-full -z-10 animate-float transform-gpu will-change-transform opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%)', animationDelay: '4s' }}></div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Content - Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-slate-600 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300">
              <span className="inline-block h-2 w-2 rounded-full bg-brand-green"></span>
              Digital Systems Studio
            </div>
            
            {/* Main Heading with Custom Sequence Typing Animation */}
            <div className="mb-4 sm:mb-8 min-h-[7.5rem] sm:min-h-[18rem] lg:min-h-[22rem] flex flex-col justify-start items-center lg:items-start">
              <h1 className="text-[2rem] sm:text-6xl lg:text-[7.5rem] font-extrabold font-display leading-[0.95] tracking-[-0.05em]">
                
                {/* Line 1 - Welcome to */}
                <span className="flex items-center justify-center lg:justify-start text-text-main font-medium text-sm sm:text-3xl lg:text-5xl mb-1 sm:mb-6 tracking-tight min-h-[1.1rem] sm:min-h-[3rem]">
                  {"Welcome to".substring(0, len1)}
                  {len1 > 0 && len1 < 10 && <span className="animate-pulse bg-brand-green/80 w-2 h-6 sm:h-8 lg:h-10 inline-block ml-2 align-middle" />}
                </span>
                
                {/* Line 2 - SPACE NEST */}
                <span className="flex items-center justify-center lg:justify-start text-text-main pb-0.5 sm:pb-4 whitespace-nowrap drop-shadow-sm min-h-[2.2rem] sm:min-h-[4rem] lg:min-h-[8rem]">
                  <span className="inline-block">{"SPACE".substring(0, len2)}</span>
                  <span className="inline-block text-brand-blue ml-2 sm:ml-4">{"NEST".substring(0, len3)}</span>
                  {len1 === 10 && len3 < 4 && <span className="animate-pulse bg-brand-blue/80 w-2.5 sm:w-3 lg:w-4 h-7 sm:h-12 lg:h-20 inline-block ml-2 align-middle shadow-[0_0_15px_rgba(59,130,246,0.4)]" />}
                </span>

                {/* Line 3 - SYSTEMS (Gradient) */}
                <span className="flex items-center justify-center lg:justify-start min-h-[2.5rem] sm:min-h-[4rem] lg:min-h-[8rem]">
                  <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-green to-brand-orange pb-0.5 sm:pb-2 text-[2.2rem] sm:text-6xl lg:text-[6.5rem] font-black tracking-tighter cursor-default drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]">
                    {"SYSTEMS".substring(0, len4)}
                  </span>
                  {len3 === 4 && len4 < 7 && <span className="animate-pulse bg-brand-orange w-2.5 sm:w-3 lg:w-4 h-7 sm:h-12 lg:h-20 inline-block ml-1 sm:ml-2 align-baseline shadow-[0_0_15px_rgba(244,63,94,0.6)]" />}
                  {len4 === 7 && <span className="animate-pulse bg-brand-orange w-2.5 sm:w-3 lg:w-4 h-7 sm:h-12 lg:h-20 inline-block ml-1 sm:ml-2 align-baseline shadow-[0_0_20px_rgba(244,63,94,0.8)]" />}
                </span>
              </h1>
            </div>

            <Reveal delay={0.6}>
              <p className="text-sm sm:text-xl md:text-2xl text-text-muted max-w-xl leading-6 sm:leading-relaxed mb-6 sm:mb-10 font-light mx-auto lg:mx-0">
                 Build your <span className="font-medium text-brand-blue">Website & ERP & Web app</span>. The reliable partner to <span className="font-medium text-brand-green">create your own website</span> and order advanced <span className="font-medium text-brand-orange">nest systems</span>.
              </p>
            </Reveal>

            <Reveal delay={0.7}>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 w-full sm:w-auto items-center sm:items-start">
                <a 
                  href="#services"
                  onClick={scrollToSystems}
                  className="px-6 sm:px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-brand-blue/20 hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Pricing <ArrowDownRight size={20} />
                </a>
                <a 
                  href="#portfolio"
                  onClick={scrollToPortfolio}
                  className="px-6 sm:px-8 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-gray-200 dark:border-slate-700 text-text-main rounded-full font-bold text-base sm:text-lg hover:bg-white dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
                >
                  Portfolio
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Content - Interactive Robot Visual */}
          <div className="flex lg:col-span-6 relative h-full min-h-[400px] lg:min-h-[600px] items-center justify-center !overflow-visible">
             <Reveal delay={0.2} width="100%">
                <div className="relative w-full h-[400px] sm:h-[600px] lg:h-[700px] group pointer-events-auto !overflow-visible">
                  {/* Background Glow - Optimized */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] pointer-events-none transform-gpu will-change-transform rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)' }}></div>
                  
                  {/* Custom Skeleton Loader - Masks Spline's native grey preloader */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 z-20 ${isSplineLoaded ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'}`}>
                    <div className="w-40 h-40 relative flex items-center justify-center">
                      <div className="absolute inset-0 border-t-2 border-brand-blue rounded-full animate-spin"></div>
                      <div className="absolute inset-2 border-r-2 border-brand-green rounded-full animate-spin-reverse"></div>
                      <div className="absolute inset-4 border-b-2 border-brand-orange rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                      <div className="text-brand-blue font-mono text-xs font-bold tracking-widest animate-pulse">INIT 3D</div>
                    </div>
                  </div>

                  {/* Native Local Spline Rendering - Deferred for Fast Page Load */}
                  <div className={`w-full h-full min-h-[220px] sm:min-h-[400px] flex items-center justify-center relative z-10 pointer-events-auto transition-opacity duration-1000 !overflow-visible ${isSplineLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute top-0 w-full h-full pointer-events-auto">
                      {shouldLoadSpline && (
                        <Suspense fallback={null}>
                          <Spline 
                            scene="/nexbot.splinecode" 
                            onLoad={handleSplineLoad}
                            style={{ width: '100%', height: '100%' }}
                          />
                        </Suspense>
                      )}
                    </div>
                  </div>
                </div>
             </Reveal>
          </div>
        </div>

      </div>

      {/* Futuristic Scroll Indicator - Interactive */}
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50 animate-bounce cursor-pointer hover:opacity-100 transition-opacity"
        aria-label="Scroll to About Section"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold dark:text-gray-400">Scroll</span>
        <div className="w-[2px] h-12 bg-gradient-to-b from-black dark:from-white to-transparent rounded-full relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-blue animate-slide-up"></div>
        </div>
      </button>
    </section>
  );
};

export default Hero;
