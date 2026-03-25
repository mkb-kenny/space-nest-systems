import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { PORTFOLIO_ITEMS } from '../constants';
import { PortfolioItem } from '../types';
import { Play, ArrowUpRight, ExternalLink, Zap, X, Maximize2, Download } from 'lucide-react';
import Reveal from './Reveal';

const CATEGORIES = ["All", "Web", "Motion", "Branding"];

// Fallback assets for Preview Mode
const DEMO_ASSETS = {
  video: "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4",
  image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
};

/**
 * UTILITY: Extract File ID from Google Drive URL
 */
const getDriveId = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

/**
 * UTILITY: Check if URL is Google Drive
 */
const isGoogleDriveLink = (url: string | undefined): boolean => {
  return !!url && url.includes('drive.google.com');
};

/**
 * 1. RESOLVE CARD PREVIEW IMAGE
 */
const getCardPreviewUrl = (item: PortfolioItem): string => {
  // 1. Try explicit image
  if (item.imageUrl) {
    if (isGoogleDriveLink(item.imageUrl)) {
       const id = getDriveId(item.imageUrl);
       // Use drive.google.com/thumbnail endpoint which is more reliable for public files than direct lh3 links
       // sz=w2000 gets a high-res version suitable for large cards
       return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w2000` : item.imageUrl;
    }
    return item.imageUrl;
  }

  // 2. Try video thumbnail (ONLY if it's Google Drive)
  if (isGoogleDriveLink(item.videoUrl)) {
    const id = getDriveId(item.videoUrl || '');
    // For videos, the thumbnail API is also the standard way
    return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w800` : DEMO_ASSETS.image;
  }

  // 3. Fallback
  return DEMO_ASSETS.image;
};

/**
 * 3. GET VIDEO EMBED URL (For Modal Iframe)
 */
const getModalVideoUrl = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  if (isGoogleDriveLink(url)) {
    const id = getDriveId(url);
    if (id) return `https://drive.google.com/file/d/${id}/preview`;
  }
  return url;
};

// --- VIDEO MODAL COMPONENT (PORTAL) ---
interface VideoModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  // Determine if this item has a video
  const hasVideo = !!item.videoUrl && item.videoUrl.trim() !== "";
  const isDriveVideo = isGoogleDriveLink(item.videoUrl);

  // Get correct sources based on type
  const videoSrc = isDriveVideo ? getModalVideoUrl(item.videoUrl) : item.videoUrl;
  
  // Calculate image src again for the modal fallback
  const imageSrc = getCardPreviewUrl(item);

  // Link for the download/open button
  const downloadLink = item.videoUrl || item.imageUrl || item.link;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-pop-in">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-20 pointer-events-none">
           <h3 className="text-white font-display font-bold text-xl md:text-2xl drop-shadow-md">{item.title}</h3>
           <div className="flex gap-4 pointer-events-auto">
             {downloadLink && (
               <a 
                 href={downloadLink} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                 title="Open Original File"
               >
                 <Download size={24} />
               </a>
             )}
             <button 
               onClick={onClose}
               className="p-2 rounded-full bg-white/10 hover:bg-red-500/80 text-white backdrop-blur-md transition-colors"
             >
               <X size={24} />
             </button>
           </div>
        </div>

        {/* Content Player */}
        <div className="relative w-full h-full flex items-center justify-center bg-gray-900 aspect-video">
           {hasVideo ? (
             isDriveVideo ? (
               <iframe 
                 src={videoSrc}
                 className="w-full h-full border-0"
                 allow="autoplay; fullscreen; picture-in-picture"
                 allowFullScreen
                 title={item.title}
                 referrerPolicy="no-referrer"
               />
             ) : (
               <video 
                 src={videoSrc || DEMO_ASSETS.video}
                 controls
                 autoPlay
                 className="w-full h-full object-contain"
               />
             )
           ) : (
             <img 
               src={imageSrc || DEMO_ASSETS.image} 
               alt={item.title}
               className="w-full h-full object-contain"
               onError={(e) => {
                  e.currentTarget.src = DEMO_ASSETS.image;
               }}
               referrerPolicy="no-referrer"
             />
           )}
        </div>
      </div>
    </div>,
    document.body
  );
};

// --- CASE STUDY CARD ---
const CaseStudyCard = React.memo<{ item: PortfolioItem; index: number }>(({ item, index }) => {
  if (!item.caseStudy) return null;

  const isEven = index % 2 === 0;
  // Case studies usually have explicit imageUrls, but we use the robust function just in case
  const processedImage = getCardPreviewUrl(item);

  return (
    <div className="mb-14 sm:mb-32 last:mb-10 sm:last:mb-20">
      <Reveal width="100%">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
          
          {/* Visual Side */}
          <div className="w-full lg:w-1/2">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="group relative block w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all duration-500 bg-gray-200 dark:bg-slate-800 border-2 border-transparent hover:border-brand-blue/30">
              <img 
                src={processedImage} 
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0"
                onError={(e) => { e.currentTarget.src = DEMO_ASSETS.image; }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
              <div className="absolute bottom-6 right-6 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <ExternalLink size={20} />
              </div>
            </a>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <span className={`h-px w-8 ${isEven ? 'bg-brand-orange' : 'bg-brand-blue'}`}></span>
              <span className={`text-sm font-bold uppercase tracking-widest ${isEven ? 'text-brand-orange' : 'text-brand-blue'}`}>
                Project {index + 1}: {item.category}
              </span>
            </div>
            
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-text-main mb-2">{item.title}</h3>
            <p className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-6">{item.caseStudy.subtitle}</p>
            
            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">Client Overview</h4>
                <p className="text-text-muted leading-relaxed">{item.caseStudy.clientOverview}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">The Solution</h4>
                <p className="text-text-muted leading-relaxed">{item.caseStudy.solution}</p>
              </div>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-gray-100 dark:border-slate-800">
              <h4 className="text-lg font-bold font-display mb-4 flex items-center gap-2 text-text-main">
                <Zap size={20} className="text-yellow-500" /> Technical Highlights
              </h4>
              <ul className="grid grid-cols-1 gap-4">
                {item.caseStudy.techHighlights.map((tech, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-slate-900 dark:bg-white"></div>
                    <span>
                      <strong className="text-text-main">{tech.title}:</strong> {tech.content}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
               <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-text-main border-b-2 border-slate-900 dark:border-white pb-1 hover:text-brand-blue hover:border-brand-blue transition-colors">
                  Visit Live Site <ArrowUpRight size={18} />
               </a>
            </div>
          </div>

        </div>
      </Reveal>
    </div>
  );
});

// --- PORTFOLIO CARD (Grid Item) ---
const PortfolioCard = React.memo<{ item: PortfolioItem; index: number; onOpen: (item: PortfolioItem) => void }>(({ item, index, onOpen }) => {
  const hasExternalLink = !!item.link;
  const processedImage = getCardPreviewUrl(item);
  const isDriveVideo = isGoogleDriveLink(item.videoUrl);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Load video preview on hover
    if (item.videoUrl) {
      if (isDriveVideo) {
         // Enable drive video preview on hover using the download stream
         // This provides a "live" preview if the static thumbnail fails
         const id = getDriveId(item.videoUrl);
         if (id) setVideoSrc(`https://drive.google.com/uc?export=download&id=${id}`);
      } else {
         setVideoSrc(item.videoUrl);
      }
    }
  }, [item.videoUrl, isDriveVideo]);

  const handleMouseEnter = () => {
    if (videoSrc && videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoSrc && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; 
    }
  };

  const CardContent = () => (
    <>
       {/* 1. Base Image - Robust Fallback */}
       <img 
          src={processedImage} 
          alt={item.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0"
          onError={(e) => { e.currentTarget.src = DEMO_ASSETS.image; }}
        />

        {/* 2. Video Layer - Pointer events NONE to ensure click goes to button */}
        {videoSrc && (
          <video 
            ref={videoRef}
            src={videoSrc} 
            muted={true} 
            loop 
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-10 opacity-0 group-hover:opacity-100 pointer-events-none"
          />
        )}
        
        {/* 3. Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-20 pointer-events-none"></div>

        {/* 4. Center Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-30 pointer-events-none">
           {(item.videoUrl || isDriveVideo) && (
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 transition-transform duration-300 group-hover:scale-110 shadow-lg">
                 <Play size={32} fill="currentColor" className="ml-1" />
              </div>
           )}
           {hasExternalLink && !item.videoUrl && (
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100 shadow-lg">
                <ExternalLink size={24} />
              </div>
           )}
        </div>

        {/* 5. Bottom Info */}
        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-30 pointer-events-none">
           <div className="flex justify-between items-end">
             <div>
                <span className="inline-block px-2 py-1 mb-2 bg-white/20 backdrop-blur-md rounded-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                   {item.category}
                </span>
                <h3 className="text-xl font-display font-bold text-white leading-tight drop-shadow-md">{item.title}</h3>
             </div>
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg">
                {hasExternalLink ? <ArrowUpRight size={18} /> : <Maximize2 size={18} />}
             </div>
           </div>
        </div>
    </>
  );

  return (
    <Reveal key={item.id} width="100%" className={`h-full animate-fade-in`}>
      {hasExternalLink ? (
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative w-full h-full min-h-[300px] rounded-3xl overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl block cursor-pointer border border-white/40 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CardContent />
        </a>
      ) : (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onOpen(item);
          }}
          className="group relative w-full h-full min-h-[300px] rounded-3xl overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl block cursor-pointer border border-white/40 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-left appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          type="button"
        >
          <CardContent />
        </button>
      )}
    </Reveal>
  );
});

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideoItem, setSelectedVideoItem] = useState<PortfolioItem | null>(null);

  const featuredItems = PORTFOLIO_ITEMS.filter(item => item.caseStudy);
  const standardItems = PORTFOLIO_ITEMS.filter(item => !item.caseStudy);

  const filteredStandardItems = activeCategory === "All" 
    ? standardItems 
    : standardItems.filter(item => item.category === activeCategory);
    
  const handleOpenModal = useCallback((item: PortfolioItem) => {
    setSelectedVideoItem(item);
  }, []);

  return (
    <section id="portfolio" className="py-14 sm:py-24 bg-background relative transition-colors duration-500">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-24">
           <Reveal width="100%">
             <h2 className="text-3xl sm:text-5xl md:text-8xl font-display font-bold text-text-main tracking-tighter mb-4 sm:mb-6">
               SELECTED <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-green to-brand-blue">CASE STUDIES</span>
             </h2>
             <p className="text-xl text-text-muted max-w-2xl mx-auto">
               Deep dives into engineering-grade web solutions and corporate identities.
             </p>
           </Reveal>
        </div>

        {/* Featured Case Studies */}
        <div className="mb-16 sm:mb-32">
          {featuredItems.map((item, index) => (
            <CaseStudyCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* More Works Gallery */}
        <div className="mt-16 sm:mt-32">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-text-main mb-3 sm:mb-4">More Work</h3>
                <p className="text-text-muted">A collection of branding, motion, and web projects.</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                 {CATEGORIES.map((cat) => (
                   <button
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                       activeCategory === cat 
                         ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white' 
                         : 'bg-white dark:bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white hover:text-black dark:hover:text-white'
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
               </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {filteredStandardItems.map((item, index) => (
               <PortfolioCard 
                  key={item.id} 
                  item={item} 
                  index={index} 
                  onOpen={handleOpenModal}
               />
             ))}
           </div>
        </div>

        {/* Video Lightbox Modal (Portal) */}
        {selectedVideoItem && (
          <VideoModal 
            item={selectedVideoItem} 
            onClose={() => setSelectedVideoItem(null)} 
          />
        )}

      </div>
    </section>
  );
};

export default Portfolio;