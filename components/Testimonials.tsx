import React, { useMemo } from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';
import Reveal from './Reveal';

const Testimonials: React.FC = () => {
  // Memoize duplicate array to ensure smooth seamless scrolling loop
  // We duplicate it multiple times to ensure we have enough width for larger screens before the loop resets
  const duplicatedTestimonials = useMemo(() => {
    return [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
  }, []);

  return (
    <section id="feedback" className="py-14 sm:py-20 md:py-32 relative overflow-hidden bg-background transition-colors duration-500">
      
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-20 text-center">
        <Reveal width="100%">
           <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-text-main tracking-tight mb-3 sm:mb-4">
             Voices of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">Success</span>
           </h2>
           <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-7">
             Don't just take my word for it. Here is what my partners and clients say about the collaboration.
           </p>
        </Reveal>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden py-6 md:py-10">
        {/* Gradient Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent z-20 pointer-events-none transition-colors duration-500"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent z-20 pointer-events-none transition-colors duration-500"></div>

        <div className="flex animate-marquee hover:[animation-play-state:paused] w-max gap-8 pl-4">
          {duplicatedTestimonials.map((item, index) => (
            <div 
              key={index} 
              className="w-[260px] sm:w-[350px] md:w-[450px] bg-white dark:bg-slate-800 p-5 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[1.75rem] md:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-slate-700 flex-shrink-0 flex flex-col justify-between group transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-brand-blue/20"
            >
              <div className="mb-8 relative">
                 <Quote className="text-brand-blue/10 dark:text-brand-blue/20 w-16 h-16 absolute -top-6 -left-4 -z-10 transform -scale-x-100 transition-colors group-hover:text-brand-blue/20 dark:group-hover:text-brand-blue/30" />
                 <p className="text-base md:text-xl text-text-main font-medium leading-7 md:leading-relaxed">
                   "{item.content}"
                 </p>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4 mt-auto pt-5 md:pt-6 border-t border-gray-50 dark:border-slate-700">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-brand-blue to-brand-green p-[2px] shadow-lg">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-br from-brand-blue to-brand-green font-bold text-xl">
                    {item.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-text-main font-display text-lg">{item.name}</h4>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
