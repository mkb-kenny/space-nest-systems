import React, { useState } from 'react';
import { WEBSITE_PACKAGES, SYSTEM_PACKAGES, DESIGN_PACKAGES, INFRASTRUCTURE_COSTS } from '../constants';
import { Check, Server, Globe, Shield, ArrowRight, Star } from 'lucide-react';
import Reveal from './Reveal';

// Memoized Card to prevent re-renders of list items during interactions
const PricingCard = React.memo<{ pkg: any; type: 'web' | 'sys' | 'design' }>(({ pkg, type }) => {
  const isPopular = pkg.isPopular;
  
  // Color configuration
  const colorMap: Record<string, string> = {
    'brand-blue': 'from-brand-blue to-cyan-400',
    'brand-green': 'from-brand-green to-emerald-400',
    'brand-orange': 'from-brand-orange to-red-400',
  };
  
  const gradient = colorMap[pkg.color];

  return (
    <div className={`relative flex flex-col h-full rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-6 md:p-8 transition-all duration-500 hover:-translate-y-3 group
      ${isPopular 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-2xl border-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] z-10' 
        : 'bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/40 dark:border-white/10 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-slate-800/60'
      }
    `}
    style={{ borderColor: isPopular ? 'transparent' : '' }}
    >
      
      {/* Gradient Border for Popular Card - Placed behind using pseudo-element technique via parent border */}
      {isPopular && (
        <div className={`absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] p-[2px] bg-gradient-to-b ${gradient} -z-10 opacity-100`}></div>
      )}

      {/* Glow Effect for Popular Card */}
      {isPopular && (
        <div className={`absolute -inset-1 bg-gradient-to-b ${gradient} rounded-[2rem] md:rounded-[2.5rem] blur-xl opacity-20 -z-20`}></div>
      )}

      {isPopular && (
        <div className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r ${gradient} text-slate-900 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2`}>
          <Star size={12} fill="currentColor" /> Most Popular
        </div>
      )}

      <div className="mb-6 md:mb-8">
         <h3 className={`text-xl sm:text-2xl font-display font-extrabold mb-2 ${isPopular ? 'text-slate-900' : 'text-text-main'}`}>{pkg.name}</h3>
         <p className={`text-sm font-medium inline-block px-3 py-1 rounded-full border
           ${isPopular 
             ? 'text-slate-900 bg-gray-100 border-gray-200 font-bold' 
             : 'text-gray-500 dark:text-gray-400 bg-gray-100/50 dark:bg-slate-700/50 border-gray-100 dark:border-slate-600'
           }`}>
           {pkg.idealFor}
         </p>
      </div>

      <div className={`mb-6 md:mb-8 p-4 sm:p-5 md:p-6 rounded-2xl border 
        ${isPopular 
          ? 'bg-slate-50 border-slate-100' 
          : 'bg-white/50 dark:bg-slate-900/50 border-white/60 dark:border-slate-700/60'
        }`}>
         {/* Added drop-shadow-sm to text to ensure readability of lighter gradients on white */}
         <div className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r ${gradient} drop-shadow-sm filter`}>
            {pkg.price.split(' ')[0]} 
            <span className={`text-2xl font-normal shadow-none ${isPopular ? 'text-gray-400' : 'text-gray-400 dark:text-gray-500'}`}>
              {pkg.price.includes('-') ? '+' : ''}
            </span>
         </div>
         <div className={`text-sm mt-2 font-bold ${isPopular ? 'text-gray-600' : 'text-gray-600 dark:text-gray-300'}`}>
           {pkg.price.replace(pkg.price.split(' ')[0], '')} 
           {(type === 'web' || type === 'design') ? ' / project' : ''}
         </div>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6 md:mb-8">
        {pkg.specs.map((spec: any, idx: number) => (
          <div key={idx} className={`p-3 rounded-2xl border backdrop-blur-sm transition-colors
            ${isPopular
              ? 'bg-white border-gray-200 group-hover:border-gray-300'
              : 'bg-white/40 dark:bg-slate-700/30 border border-white/50 dark:border-slate-600/30'
            }`}>
             <div className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${isPopular ? 'text-slate-500' : 'text-gray-500 dark:text-gray-400'}`}>{spec.label}</div>
             <div className={`font-bold text-sm leading-tight ${isPopular ? 'text-slate-900' : 'text-gray-900 dark:text-gray-100'}`}>{spec.value}</div>
          </div>
        ))}
      </div>

      {/* Features List */}
      <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-grow">
        {pkg.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-start gap-3 text-sm font-medium">
             <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${gradient} text-white shadow-sm`}>
               <Check size={10} strokeWidth={4} />
             </div>
             {/* Enforced high contrast text colors for popular card */}
             <span className={`
               ${isPopular ? 'text-slate-900 font-bold' : 'text-gray-600 dark:text-gray-400'}
             `}>{feature}</span>
          </li>
        ))}
      </ul>

      <a href="#contact" className={`w-full py-4 md:py-5 rounded-2xl font-bold text-center transition-all duration-300 shadow-lg group hover:scale-[1.02] flex items-center justify-center gap-2 ${
        isPopular 
          ? `bg-gradient-to-r ${gradient} text-white hover:shadow-xl hover:brightness-110`
          : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
      }`}>
        Select Package <ArrowRight size={18} />
      </a>
    </div>
  );
});

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'website' | 'system' | 'design'>('website');

  return (
    <section id="services" className="py-14 sm:py-20 md:py-32 bg-background relative overflow-hidden transition-colors duration-500">
      
      {/* Section Background Decor */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <Reveal width="100%">
          <div className="text-center mb-12 md:mb-16">
             <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold font-display text-text-main leading-tight mb-4 md:mb-6">
               Pricing <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">Simplified</span>.
             </h2>
             <p className="text-text-muted text-base sm:text-xl max-w-2xl mx-auto font-light leading-7">
               Crystal clear packages. No hidden fees. Just pure value delivered.
             </p>
          </div>
        </Reveal>

        {/* Tabs */}
        <div className="mb-12 md:mb-20 -mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex justify-center">
          <div className="inline-flex min-w-max justify-center gap-2 rounded-full border border-gray-200 bg-white/80 p-2 shadow-lg backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/80">
             <button 
               onClick={() => setActiveTab('website')}
               className={`whitespace-nowrap px-4 sm:px-6 md:px-10 py-3.5 md:py-4 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
                 activeTab === 'website' 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-xl scale-105' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700'
               }`}
             >
               Websites
             </button>
             <button 
               onClick={() => setActiveTab('system')}
               className={`whitespace-nowrap px-4 sm:px-6 md:px-10 py-3.5 md:py-4 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
                 activeTab === 'system' 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-xl scale-105' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700'
               }`}
             >
               Web System / SaaS
             </button>
             <button 
               onClick={() => setActiveTab('design')}
               className={`whitespace-nowrap px-4 sm:px-6 md:px-10 py-3.5 md:py-4 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
                 activeTab === 'design' 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-xl scale-105' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700'
               }`}
             >
               Design & Creative
             </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-14 sm:mb-20 md:mb-32 items-stretch">
          {activeTab === 'website' && (
            WEBSITE_PACKAGES.map((pkg, idx) => (
              <Reveal key={idx} delay={idx * 0.1} className="h-full">
                <PricingCard pkg={pkg} type="web" />
              </Reveal>
            ))
          )}
          {activeTab === 'system' && (
             SYSTEM_PACKAGES.map((pkg, idx) => (
              <Reveal key={idx} delay={idx * 0.1} className="h-full">
                <PricingCard pkg={pkg} type="sys" />
              </Reveal>
            ))
          )}
          {activeTab === 'design' && (
             DESIGN_PACKAGES.map((pkg, idx) => (
              <Reveal key={idx} delay={idx * 0.1} className="h-full">
                <PricingCard pkg={pkg} type="design" />
              </Reveal>
            ))
          )}
        </div>

        {/* Infrastructure Section */}
        <Reveal width="100%">
          <div className="bg-slate-900/80 dark:bg-black/80 backdrop-blur-3xl text-white rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] p-5 sm:p-8 md:p-16 shadow-2xl relative overflow-hidden border border-white/10">
             
             {/* Abstract Shapes */}
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-brand-blue/30 to-transparent rounded-full blur-[80px]"></div>
             <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-brand-orange/20 to-transparent rounded-full blur-[60px]"></div>

             <div className="relative z-10">
               <div className="mb-10 md:mb-12 text-left md:text-left flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-4xl font-display font-bold mb-2 md:mb-4">Infrastructure & Maintenance</h3>
                    <p className="text-gray-400 text-base md:text-lg leading-7">Essential recurring costs to keep your digital assets live and secure.</p>
                  </div>
                  <div className="px-4 md:px-6 py-2 bg-white/10 rounded-full text-xs sm:text-sm font-bold border border-white/10 backdrop-blur-md">
                     Paid Annually
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                  {INFRASTRUCTURE_COSTS.map((item, idx) => (
                    <div key={idx} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
                       <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform border border-white/10">
                          {item.type === 'domain' && <Globe size={24} className="text-brand-blue" />}
                          {item.type === 'hosting' && <Server size={24} className="text-brand-green" />}
                          {item.type === 'amc' && <Shield size={24} className="text-brand-orange" />}
                       </div>
                       <h4 className="font-bold text-xl mb-2 font-display">{item.title}</h4>
                       <p className="text-sm text-gray-400 mb-6 min-h-[40px] leading-relaxed">{item.description}</p>
                       
                       <div className="border-t border-white/10 pt-4 mb-4">
                         <div className="font-bold text-2xl tracking-tight">{item.price}</div>
                       </div>

                       <ul className="space-y-3">
                         {item.includes.map((inc, i) => (
                           <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                             <div className="w-1.5 h-1.5 mt-1 bg-gray-500 rounded-full"></div> {inc}
                           </li>
                         ))}
                       </ul>
                    </div>
                  ))}
               </div>
             </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Services;
