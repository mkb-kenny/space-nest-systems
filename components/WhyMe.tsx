import React from 'react';
import Reveal from './Reveal';
import { ShieldCheck, Monitor, Cpu, Sparkles, LayoutGrid } from 'lucide-react';

const WhyMe: React.FC = () => {
  return (
    <section id="whyme" className="py-14 sm:py-20 md:py-32 bg-background relative overflow-hidden transition-colors duration-500">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-20 text-center">
           <Reveal width="100%">
             <h2 className="text-3xl sm:text-4xl md:text-7xl font-display font-bold text-text-main tracking-tighter mb-4 md:mb-6">
               WHY SPACE <span className="text-brand-blue">NEST</span>?
             </h2>
             <p className="text-base sm:text-xl text-text-muted max-w-2xl mx-auto leading-7">
               Engineered for the future. I deliver robust digital systems wrapped in stunning cosmic design.
             </p>
           </Reveal>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[minmax(180px,auto)] md:auto-rows-[minmax(250px,auto)]">
           
           {/* Card 1: Main Value Prop - Large (Span 2 cols) */}
           <div className="md:col-span-2 md:row-span-1 group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 overflow-hidden border border-white/40 dark:border-white/10 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-brand-blue/20 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px] -mr-16 -mt-16 transition-all duration-500 group-hover:bg-brand-blue/20"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                 <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                    <LayoutGrid size={28} className="text-brand-blue" />
                 </div>
                 <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3 text-text-main">Full-Stack Ecosystem</h3>
                    <p className="text-text-muted text-base sm:text-lg leading-7 sm:leading-relaxed max-w-md">
                       Stop juggling freelancers. I build complete ecosystems: from high-performance backends to stunning frontend interfaces.
                    </p>
                 </div>
              </div>
           </div>

           {/* Card 2: Tech Focused */}
           <div className="md:col-span-1 group relative bg-slate-900/80 dark:bg-black/60 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 overflow-hidden text-white transition-all duration-500 hover:scale-[1.02] shadow-xl border border-white/10 dark:border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-slate-900"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-green/20 to-transparent"></div>
              
              <div className="relative z-10">
                 <Cpu size={32} className="text-brand-green mb-6" />
                 <h3 className="text-2xl font-display font-bold mb-3">Hyper-Speed</h3>
                 <p className="text-gray-400">
                    Built on React, Next.js, and Edge Computing for instant load times.
                 </p>
              </div>
           </div>

           {/* Card 3: Satisfaction (Span 1) */}
           <div className="md:col-span-1 group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 overflow-hidden transition-all duration-500 shadow-lg border border-white/40 dark:border-white/10 hover:border-brand-orange/40 hover:shadow-2xl hover:shadow-brand-orange/10">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <ShieldCheck size={120} className="text-brand-orange" />
              </div>
              <div className="relative z-10">
                 <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center text-brand-orange mb-6">
                    <ShieldCheck size={24} />
                 </div>
                 <h3 className="text-2xl font-display font-bold mb-2 text-text-main">Ironclad Guarantee</h3>
                 <p className="text-text-muted text-sm">
                    Rigorous testing. Secure code. 100% satisfaction or your money back.
                 </p>
              </div>
           </div>

           {/* Card 4: Motion (Span 2) */}
           <div className="md:col-span-2 group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-r from-brand-blue/90 to-brand-green/90 backdrop-blur-lg border border-white/20 p-6 sm:p-8 md:p-10 text-white transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-brand-green/30">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/10 to-transparent transform skew-x-12 translate-x-12 group-hover:translate-x-0 transition-transform duration-700"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                 <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                       <Sparkles className="text-brand-orange animate-pulse" />
                       <span className="font-bold tracking-widest uppercase text-sm text-white/80">Motion Architecture</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">Gravity-Defying UX.</h3>
                    <p className="text-white/90 text-lg">
                       Static is dead. I implement fluid physics and micro-interactions that keep users engaged in your orbit.
                    </p>
                 </div>
                 <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center animate-spin-slow">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-full"></div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

export default WhyMe;
