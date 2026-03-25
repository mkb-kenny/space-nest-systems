import React, { useState } from 'react';
import { ASSETS } from '../constants';
import Logo from './Logo';

const Loader: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  
  // Use loaderImage if available, otherwise default to logoImage
  const assetImage = ASSETS.loaderImage || ASSETS.logoImage;
  const showImage = assetImage && !imageError;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-black transition-colors duration-500 overflow-hidden isolate">
      
      <style>{`
        @keyframes modern-progress-gpu {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.95); opacity: 0.8; }
        }
        @keyframes slide-up-fade {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes logo-glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.2)); }
          50% { filter: drop-shadow(0 0 40px rgba(59, 130, 246, 0.4)); }
        }
      `}</style>

      {ASSETS.loaderVideo ? (
        <div className="w-full h-full flex items-center justify-center bg-background">
          <video 
            src={ASSETS.loaderVideo} 
            autoPlay 
            muted 
            playsInline
            loop 
            className="w-full h-full object-cover opacity-100"
          />
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center w-full max-w-lg px-4">
          
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-blue/10 dark:bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>

          <div className="flex flex-col items-center w-full">
            {/* The Branded Logo Animation */}
            <div 
               className="relative mb-12 transform-gpu"
               style={{ animation: 'slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards, logo-glow 3s ease-in-out infinite' }}
            >
              {showImage ? (
                <div className="relative animate-pop-in">
                  <img 
                    src={assetImage} 
                    alt="Loading..." 
                    onError={() => setImageError(true)}
                    className="w-32 md:w-48 h-auto object-contain animate-float drop-shadow-2xl" 
                  />
                </div>
              ) : (
                <div className="h-24 md:h-32 w-auto relative">
                  <Logo className="h-full w-auto overflow-visible" />
                </div>
              )}
            </div>
            
            {/* Welcome Text Animation */}
            <div className="flex flex-col items-center animate-smooth-enter" style={{ animationDelay: '0.2s' }}>
              <div className="text-[10px] md:text-xs font-black tracking-[0.5em] text-brand-blue/80 dark:text-brand-blue uppercase mb-6 drop-shadow-sm">
                Welcome to Space Nest
              </div>
              
              {/* High-Performance Progress Bar */}
              <div className="w-48 h-[3px] bg-gray-100 dark:bg-zinc-900/50 rounded-full overflow-hidden relative isolate">
                 <div 
                   className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-brand-blue via-brand-green to-brand-orange rounded-full origin-left"
                   style={{ animation: 'modern-progress-gpu 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                 ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;