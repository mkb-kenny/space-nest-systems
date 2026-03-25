import React, { useState } from 'react';
import Reveal from './Reveal';
import { Code2, Palette, Terminal, Coffee, Award, GraduationCap } from 'lucide-react';
import { ASSETS } from '../constants';

// --- Helper Functions for Image Processing ---
const getDriveId = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

const isGoogleDriveLink = (url: string | undefined): boolean => {
  return !!url && url.includes('drive.google.com');
};

const getProfileImageUrl = (url: string | undefined) => {
    if (!url) return "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1587&auto=format&fit=crop";
    
    if (isGoogleDriveLink(url)) {
        const id = getDriveId(url);
        // Using the thumbnail API is the most reliable method for public Drive files
        // sz=w2000 requests a width of 2000px
        return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w2000` : url;
    }
    return url;
};

const About: React.FC = () => {
  const profileImageSrc = getProfileImageUrl(ASSETS.profileImage);
  
  return (
    <section id="about" className="py-14 sm:py-20 md:py-32 bg-background relative overflow-hidden transition-colors duration-500">
       {/* Background Decorative Elements */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-50 dark:bg-slate-800/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none transition-colors duration-500"></div>
       <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/5 dark:bg-brand-blue/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none transition-colors duration-500"></div>

       <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            
            {/* Visual Column - Made smaller with max-w-[320px] */}
            <div className="order-2 lg:order-1 relative max-w-[220px] sm:max-w-[320px] mx-auto mt-4 lg:mt-0">
               <Reveal width="100%">
                  <div className="relative">
                     {/* Main Image Frame */}
                     <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-gray-100 dark:bg-slate-800 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700 ease-out border-[8px] border-white dark:border-slate-800 z-10 relative group">
                        
                        <img 
                          src={profileImageSrc} 
                          onError={(e) => {
                            // Robust fallback
                            e.currentTarget.src = "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1587&auto=format&fit=crop";
                          }}
                          alt="Jerome Linsay Allan - Developer" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                        />
                     </div>
                     
                     {/* Decorative Backdrop */}
                     <div className="absolute inset-0 bg-brand-blue/10 rounded-[2.5rem] -rotate-3 scale-[1.02] -z-10"></div>
                     
                     {/* Floating Stats Card 1 */}
                     <div className="absolute -top-4 left-0 sm:-left-8 bg-white dark:bg-slate-800 p-2.5 sm:p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-float z-20 border border-gray-100 dark:border-slate-700 min-w-[120px] sm:min-w-[160px]">
                        <div className="flex items-center gap-3 mb-1">
                           <div className="w-8 h-8 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange">
                              <Code2 size={16} />
                           </div>
                           <span className="font-bold text-gray-400 text-[10px] uppercase tracking-wider">Experience</span>
                        </div>
                        <div className="font-display font-bold text-2xl text-text-main">7+ <span className="text-sm font-normal text-text-muted">Years</span></div>
                        <div className="text-[10px] text-text-muted mt-1">Full Stack Development</div>
                     </div>

                     {/* Floating Stats Card 2 */}
                     <div className="absolute -bottom-4 right-0 sm:-right-6 bg-white dark:bg-slate-800 p-2.5 sm:p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-float z-20 border border-gray-100 dark:border-slate-700" style={{ animationDelay: '2s' }}>
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green">
                              <Award size={20} />
                           </div>
                           <div>
                              <div className="font-display font-bold text-xl text-text-main">100+</div>
                              <div className="text-[10px] text-text-muted font-bold uppercase">Projects Done</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </Reveal>
            </div>

            {/* Content Column */}
            <div className="order-1 lg:order-2">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-6">
                  <Palette size={14} /> About Me
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-text-main mb-4 md:mb-6 leading-[1.1]">
                   Engineering Logic.<br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">Creative Soul.</span>
                </h2>
              </Reveal>
              
              <Reveal delay={0.1}>
                <div className="space-y-4 text-sm sm:text-lg text-text-muted leading-6 sm:leading-relaxed mb-6 md:mb-10">
                   <p>
                      Hello! I'm <strong className="text-text-main">Jerome Linsay Allan</strong>. I don't just write code; I craft digital experiences. Standing at the intersection of artistic design and robust engineering, I help visionary brands build websites that are as functional as they are beautiful.
                   </p>
                   <p>
                      My journey began in graphic design, obsessing over typography and color theory. That eye for detail naturally evolved into full-stack development, where I now build pixel-perfect interfaces backed by scalable, secure systems.
                   </p>
                </div>
              </Reveal>

              {/* Skills Grid */}
              <Reveal delay={0.2}>
                 <div className="mb-10">
                    <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-4">Tech Arsenal</h3>
                    <div className="flex flex-wrap gap-2">
                        {[
                          'Full Stack Developer', 'Website Developer', 'React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 
                          'MongoDB', 'HTML', 'HTML5', 'WordPress', 
                          'Dreamweaver', 'Photoshop', 'Illustrator', 'After Effects', 
                          'Motion', 'UI/UX'
                        ].map((skill, i) => (
                         <span 
                           key={i} 
                           className="px-3 py-2 sm:px-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-transparent transition-all duration-300 cursor-default"
                         >
                           {skill}
                         </span>
                       ))}
                    </div>
                 </div>
              </Reveal>

              <Reveal delay={0.3}>
                 <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#portfolio" className="px-6 sm:px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-center hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg shadow-primary/20">
                       View My Work
                    </a>
                 </div>
              </Reveal>
            </div>

         </div>
       </div>
    </section>
  );
};

export default About;
