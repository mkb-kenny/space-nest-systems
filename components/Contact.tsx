import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight, X, ExternalLink } from 'lucide-react';
import { OWNER_NAME, CONTACT_INFO, APP_NAME } from '../constants';
import Reveal from './Reveal';

const Contact: React.FC = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Design & Development',
    details: ''
  });
  
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEmailModal(true);
  };

  // Helper to generate email links
  const getEmailLinks = () => {
    const subject = `Project Inquiry from ${formData.name}: ${formData.projectType}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nDetails:\n${formData.details}`;
    
    // Encoded versions for URLs
    const encSubject = encodeURIComponent(subject);
    const encBody = encodeURIComponent(body);
    const email = CONTACT_INFO.email;

    return {
      default: `mailto:${email}?subject=${encSubject}&body=${encBody}`,
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encSubject}&body=${encBody}`,
      outlook: `https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${encSubject}&body=${encBody}`,
      yahoo: `https://compose.mail.yahoo.com/?to=${email}&subject=${encSubject}&body=${encBody}`
    };
  };

  const links = getEmailLinks();

  return (
    <footer id="contact" className="bg-slate-900 dark:bg-black text-white py-14 sm:py-20 md:py-24 relative overflow-hidden transition-colors duration-500">
      {/* Decorative Gradients for Footer - Brand Colors */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">Let's Connect</span>
              <h2 className="text-3xl sm:text-4xl md:text-7xl font-display font-bold leading-none mb-5 md:mb-8 tracking-tight">
                LAUNCH YOUR <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-green">VISION?</span>
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="text-gray-400 text-base md:text-xl max-w-md mb-8 md:mb-12 leading-7 md:leading-relaxed">
                Ready to engineer your digital future? Tell me about your mission and I'll get back to you within 24 hours.
              </p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="space-y-4 md:space-y-6">
                <a 
                  href={`mailto:${CONTACT_INFO.email}`} 
                  className="flex items-center gap-4 sm:gap-6 group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                   <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-brand-blue transition-colors"><Mail size={20} /></div>
                   <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</div>
                      <div className="text-base sm:text-xl font-display font-bold break-all sm:break-normal">{CONTACT_INFO.email}</div>
                   </div>
                </a>
                
                <a 
                  href={`tel:${CONTACT_INFO.phone}`} 
                  className="flex items-center gap-4 sm:gap-6 group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                   <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-brand-green transition-colors"><Phone size={20} /></div>
                   <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Phone</div>
                      <div className="text-base sm:text-xl font-display font-bold">{CONTACT_INFO.phone}</div>
                   </div>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Minimalist Form */}
          <Reveal delay={0.3}>
            <div className="bg-white dark:bg-slate-800 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-3xl p-5 sm:p-6 md:p-12 shadow-2xl text-slate-900 dark:text-white transition-colors duration-500">
              <h3 className="text-2xl font-bold font-display mb-6 md:mb-8">Establish Comms</h3>
              <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl p-3.5 sm:p-4 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all font-medium dark:text-white dark:placeholder-gray-400" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl p-3.5 sm:p-4 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all font-medium dark:text-white dark:placeholder-gray-400" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Mission Type</label>
                  <select 
                    id="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl p-3.5 sm:p-4 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all font-medium appearance-none dark:text-white"
                  >
                    <option>Web System Development</option>
                    <option>Brand Identity</option>
                    <option>Motion Graphics</option>
                    <option>Consultation</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Briefing</label>
                  <textarea 
                    id="details"
                    value={formData.details}
                    onChange={handleChange}
                    required
                    rows={4} 
                    className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl p-3.5 sm:p-4 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all font-medium resize-none dark:text-white dark:placeholder-gray-400" 
                    placeholder="Describe your project goals..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full py-4 sm:py-5 bg-gradient-to-r from-brand-blue via-brand-green to-brand-orange text-white font-bold rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex justify-center items-center gap-3 text-base sm:text-lg group shadow-lg shadow-brand-blue/20">
                  Transmit Data <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </Reveal>
        </div>

        <div className="border-t border-white/10 mt-10 sm:mt-12 md:mt-20 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left text-xs sm:text-sm font-medium text-gray-400 gap-3 sm:gap-4">
          <p>Created by {OWNER_NAME} | {APP_NAME}</p>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Behance</a>
            </div>
          </div>
        </div>
      </div>

      {/* Email Selection Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowEmailModal(false)}
          ></div>
          <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl scale-100 animate-pop-in">
             <button 
               onClick={() => setShowEmailModal(false)}
               className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-slate-700 rounded-full text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
             >
               <X size={20} />
             </button>
             
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Choose Channel</h3>
             <p className="text-gray-500 dark:text-gray-400 mb-6">How would you like to transmit your inquiry?</p>
             
             <div className="space-y-3">
               <a href={links.default} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Mail size={20} />
                    </div>
                    <span className="font-bold text-slate-700 dark:text-gray-200">Default Mail App</span>
                  </div>
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-500" />
               </a>

               <a href={links.gmail} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-gray-200">Gmail</span>
                  </div>
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-red-500" />
               </a>

               <a href={links.outlook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M1 18.28L8.66 22l.22-8.54L1 10.42v7.86zm10.59-15.6l-8.31 3.2L11.59 10l8.76-4.66-8.76-2.66zM22.5 5.25L13.7 9.8l8.76 4.66.04-9.21zM22.25 16.7L12.98 21l.15-8.48 9.12-4.84v9.02zM10.84 21.62L1.87 18.9 11 11.7l-.16 9.92z"/></svg>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-gray-200">Outlook</span>
                  </div>
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-sky-500" />
               </a>
             </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Contact;
