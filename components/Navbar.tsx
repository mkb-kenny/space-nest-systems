import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { NAV_ITEMS, ASSETS } from '../constants';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize Theme - Default to LIGHT mode as requested
  useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      // Default behavior: Light mode
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showLogoImage = ASSETS.logoImage && !logoError;

  return (
    <>
      <nav className={`fixed top-3 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] sm:w-[95%] max-w-7xl z-50 transition-all duration-500 ${
        scrolled ? 'py-0' : 'py-1 sm:py-2 sm:mt-2'
      }`}>
        <div className="w-full">
          <div className={`
            flex justify-between items-center px-3 sm:px-6 py-2.5 sm:py-3 rounded-[1.5rem] sm:rounded-[2rem] transition-all duration-500
            ${scrolled 
              ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-white/10' 
              : 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-lg border border-white/20 dark:border-white/5'}
          `}>
            
            {/* Logo Section */}
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center group select-none py-1 min-w-0 max-w-[70%] sm:max-w-none flex-shrink"
            >
              {showLogoImage ? (
                <img 
                  src={ASSETS.logoImage} 
                  alt="Space Nest Systems" 
                  onError={() => setLogoError(true)}
                  className="h-9 sm:h-10 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                />
              ) : (
                /* Fallback: Custom Recreated SVG Logo - Space Nest Design */
                <div className="h-10 sm:h-12 md:h-16 w-auto relative group-hover:scale-105 transition-transform duration-300">
                  <Logo className="h-full w-auto overflow-visible" />
                </div>
              )}
            </a>

            {/* Desktop Nav - Switched to lg:flex to ensure space for logo on tablets */}
            <div className="hidden lg:flex items-center gap-1 bg-gray-100/50 dark:bg-slate-800/50 p-1 rounded-full backdrop-blur-sm border border-transparent dark:border-white/5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-5 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-full transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-brand-green hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <a 
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-green text-white text-sm font-bold rounded-full hover:shadow-lg hover:shadow-brand-green/20 transition-all duration-300 transform hover:scale-105"
              >
                Let's Talk
              </a>
            </div>

            {/* Mobile Menu Button - Visible on md and below */}
            <div className="lg:hidden flex items-center gap-2">
               <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-brand-green"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm px-4 pt-24 lg:hidden" style={{ animation: 'fadeIn 0.25s ease-out' }}>
           <div className="mx-auto flex h-[calc(100vh-7rem)] w-full max-w-xl flex-col rounded-[2rem] border border-white/15 bg-white/92 p-5 shadow-2xl dark:bg-slate-950/92">
            <div className="mb-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-gray-400 dark:text-slate-500">Navigate</p>
            </div>
            <div className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-4 text-xl font-bold font-display text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:text-brand-blue dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                style={{ 
                  animation: `smoothFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s both` 
                }}
              >
                <span>{item.label}</span>
                <span className="text-sm text-gray-400 dark:text-slate-500">0{index + 1}</span>
              </a>
            ))}
            <div className="mt-auto rounded-[1.75rem] bg-slate-900 px-5 py-5 text-white dark:bg-white dark:text-slate-900" style={{ animation: 'smoothFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' }}>
              <p className="mb-4 max-w-[16rem] text-sm text-white/70 dark:text-slate-600">Ready to talk through the build? Jump straight to the project form.</p>
              <a 
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="block w-full rounded-2xl bg-gradient-to-r from-brand-blue via-brand-green to-brand-orange py-4 text-center text-base font-bold text-white shadow-xl transition-opacity hover:opacity-90"
              >
                Start Project
              </a>
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
