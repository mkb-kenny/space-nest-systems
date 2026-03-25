import { ServiceItem, PortfolioItem, NavItem, PricingPackage, InfrastructureItem } from './types';
import { Layout, Video, PenTool, Image, Globe, Monitor, ShieldCheck, Database } from 'lucide-react';

export const APP_NAME = "Space Nest Systems";
export const TAGLINE = "Build your Website & ERP & Web app";
export const OWNER_NAME = "Jerome Linsay Allan";

export const CONTACT_INFO = {
  email: "hello@spacenestsystems.com",
  phone: "+94769390009",
  location: "Global (Remote)"
};

// ==========================================
// MEDIA ASSETS CONFIGURATION
// ==========================================
export const ASSETS = {
  // 1. LOADING ANIMATION
  loaderVideo: "", 
  
  // 2. WEBSITE LOGO
  logoImage: "", 
  
  // 3. ABOUT ME PROFILE
  profileImage: "/profile.webp",
  // Temporarily disabled to ensure the image shows correctly
  profileVideo: "",
  
  // Backup loader image
  loaderImage: "https://images.unsplash.com/photo-1614728853913-1e221a658a66?q=80&w=800&auto=format&fit=crop", 
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Systems', href: '#services' },      
  { label: 'Why Space Nest', href: '#whyme' },
  { label: 'Contact', href: '#contact' },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "CEO, StartUp Inc.",
    content: "Space Nest transformed our digital presence. The futuristic approach to our system architecture completely revitalized our workflow.",
    rating: 5
  },
  {
    name: "David Ross",
    role: "Marketing Director",
    content: "Incredible attention to detail. The branding felt light-years ahead of the competition.",
    rating: 5
  },
  {
    name: "Elena K.",
    role: "Founder, TechFlow",
    content: "The web system Jerome built handles our complex data needs effortlessly. True engineering excellence.",
    rating: 5
  },
  {
    name: "Marcus T.",
    role: "Creative Lead",
    content: "I needed a sci-fi inspired aesthetic and Space Nest nailed the vibe perfectly. Highly recommended!",
    rating: 5
  }
];

export const WEBSITE_PACKAGES: PricingPackage[] = [
  {
    name: "Orbital Launch",
    idealFor: "Personal Profiles, Blogs",
    price: "$100 - $400",
    color: "brand-blue",
    specs: [
      { label: "Pages", value: "1 - 3 Pages" },
      { label: "Design", value: "Clean Tech UI" },
      { label: "Mobile", value: "Responsive" },
      { label: "Hosting", value: "Included in Top Tier" },
    ],
    features: ["Eye-Catchy Animations", "Contact Form", "Fast Loading", "Social Media Links"]
  },
  {
    name: "Galactic Pro",
    idealFor: "Small Business, Corporate",
    price: "$400 - $800",
    isPopular: true,
    color: "brand-green",
    specs: [
      { label: "Pages", value: "5 - 10 Pages" },
      { label: "Design", value: "Custom Brand Design" },
      { label: "Mobile", value: "Responsive + Motion" },
      { label: "Hosting", value: "Included + Domain" },
    ],
    features: ["Advanced UI Effects", "Booking Forms", "Interactive Map", "CMS Integration", "Analytics"]
  },
  {
    name: "Cosmic Commerce",
    idealFor: "Online Stores, Retail",
    price: "$800 - $1,300",
    color: "brand-orange",
    specs: [
      { label: "Pages", value: "Unlimited Products" },
      { label: "Design", value: "High Conversion UX" },
      { label: "Mobile", value: "App-like Experience" },
      { label: "Hosting", value: "Included + Domain" },
    ],
    features: ["Cart & Checkout", "Payment Gateway", "Inventory System", "Customer Accounts", "SEO Optimized"]
  }
];

export const SYSTEM_PACKAGES: PricingPackage[] = [
  {
    name: "Core System (MVP)",
    idealFor: "Internal Tools",
    price: "$800+",
    color: "brand-blue",
    specs: [
      { label: "Users", value: "Admin + User" },
      { label: "Platform", value: "Web Dashboard" },
      { label: "Database", value: "Realtime Cloud" },
      { label: "Reporting", value: "Basic Tables" },
    ],
    features: ["Modern Dashboard", "Search & Filter", "Secure Login", "Data Entry Forms"]
  },
  {
    name: "Stellar ERP",
    idealFor: "Business Automation",
    price: "$1,000+",
    isPopular: true,
    color: "brand-green",
    specs: [
      { label: "Users", value: "Multi-Role Access" },
      { label: "Platform", value: "Web + Mobile" },
      { label: "Database", value: "Real-time Sync" },
      { label: "Reporting", value: "Advanced Export" },
    ],
    features: ["Auto-Calculations", "Role Security", "Live Updates", "Workflow Automation"]
  },
  {
    name: "Enterprise SaaS",
    idealFor: "Large Scale Ops",
    price: "$1,500+",
    color: "brand-orange",
    specs: [
      { label: "Users", value: "Unlimited Roles" },
      { label: "Platform", value: "PWA (Installable)" },
      { label: "Database", value: "Offline Capable" },
      { label: "Reporting", value: "Smart Analytics" },
    ],
    features: ["Intelligent Integration", "API Access", "Audit Logs", "White Labeling", "High Security"]
  },
  {
    name: "Enterprise SaaS",
    idealFor: "Large Scale Ops",
    price: "$1,500+",
    color: "brand-orange",
    specs: [
      { label: "Users", value: "Unlimited Roles" },
      { label: "Platform", value: "PWA (Installable)" },
      { label: "Database", value: "Offline Capable" },
      { label: "Reporting", value: "Smart Analytics" },
    ],
    features: ["Intelligent Integration", "API Access", "Audit Logs", "White Labeling", "High Security"]
  }
];

export const DESIGN_PACKAGES: PricingPackage[] = [
  {
    name: "Motion Identity",
    idealFor: "Brands & Content",
    price: "$40 - $80",
    color: "brand-orange",
    specs: [
      { label: "Delivery", value: "48 Hours" },
      { label: "Style", value: "100% Custom" },
      { label: "Quality", value: "4K Resolution" },
      { label: "Guarantee", value: "Money Back" },
    ],
    features: ["Logo Reveal", "Intro/Outro", "Custom Animation", "Sound Design"]
  },
  {
    name: "Brand Architect",
    idealFor: "Startups",
    price: "$10 - $40",
    isPopular: true,
    color: "brand-blue",
    specs: [
      { label: "Concepts", value: "2 Concepts" },
      { label: "Revisions", value: "Unlimited" },
      { label: "Files", value: "Vector Source" },
      { label: "Support", value: "Priority" },
    ],
    features: ["Logo Design", "Color Palette", "Typography", "Commercial Rights"]
  },
  {
    name: "Visual Assets",
    idealFor: "Events & Promo",
    price: "$10 - $50",
    color: "brand-green",
    specs: [
      { label: "Type", value: "Digital / Print" },
      { label: "Revisions", value: "Unlimited" },
      { label: "Format", value: "High Res" },
      { label: "Turnaround", value: "Rapid" },
    ],
    features: ["Social Media Kit", "Posters/Flyers", "Banners", "Marketing Materials"]
  },
];

export const INFRASTRUCTURE_COSTS: InfrastructureItem[] = [
  {
    title: "Domain Registration",
    description: "Your digital coordinates in the web universe.",
    type: 'domain',
    price: "$20 - $30 / year",
    includes: [".com / .net / .io available", "SSL Registration"]
  },
  {
    title: "Cloud Hosting",
    description: "High-speed hosting for corporate sites.",
    type: 'hosting',
    price: "$100 - $150 / year",
    includes: ["SSL Certificate", "Daily Backups", "Business Email"]
  },
  {
    title: "System Maintenance",
    description: "Keep your Space Nest secure and operational.",
    type: 'amc',
    price: "20% of Dev Cost",
    includes: ["Bug Fixes", "Security Patches", "Performance Tuning"]
  },
  {
    title: "VPS / App Server",
    description: "Dedicated power for large-scale systems.",
    type: 'hosting',
    price: "$300 - $600 / year",
    includes: ["High CPU/RAM", "Database Hosting", "Node.js Support", "Firewall"]
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { 
    id: 'motion-1', 
    title: 'Neon Genesis', 
    category: 'Motion', 
    videoUrl: 'https://drive.google.com/file/d/1GhiLxKUcBoDLsVdVmYvhTnz1BkK7E1pX/view?usp=sharing',
  },
  { 
    id: 'motion-2', 
    title: 'Cyberflow UI', 
    category: 'Motion', 
    videoUrl: 'https://drive.google.com/file/d/1m5-MFJOL0XNyyUg8_PU_eS2mST56Nz49/view?usp=sharing',
  },
  { 
    id: 'motion-3', 
    title: 'Kinetic Events', 
    category: 'Motion', 
    videoUrl: 'https://drive.google.com/file/d/171MEXlIsAB0yA9W-g4pjYs02nVesQkyx/view?usp=sharing',
  },
  {
    id: 'lanka-gold',
    title: 'Lanka Gold Global',
    category: 'Branding',
    // Using provided Drive ID
    imageUrl: 'https://drive.google.com/file/d/1uagQVKsKwGEUxZ6hq8tMXFmdzPSx3-hb/view?usp=sharing',
    link: 'https://lankagoldglobal.lk/',
    caseStudy: {
      subtitle: "High-Performance Corporate Web Presence",
      clientOverview: "A premium gold and investment firm requiring a digital presence that reflects trust, luxury, and authority.",
      solution: "We engineered a modern, mobile-first responsive website designed to convert visitors into investors.",
      techHighlights: [
        { title: "Responsive Architecture", content: "Flawless layout adaptation across iPhone, iPad, and Desktop 4K screens." },
        { title: "Conversion Optimized UI", content: "Strategic placement of CTAs and contact points." },
        { title: "SEO Foundation", content: "Semantic HTML5 and meta-tagging architecture." },
        { title: "Secure Infrastructure", content: "SSL-encrypted data transmission." }
      ]
    }
  },
  {
    id: 'anc-edu',
    title: 'ANC Education Portal',
    category: 'Branding',
    // Using provided Drive ID
    imageUrl: 'https://drive.google.com/file/d/10hj5mTvdbjt5W5At30d-iuJ-E9uHeK_n/view?usp=sharing',
    link: 'https://anceducation.netlify.app/',
    caseStudy: {
      subtitle: "Cloud-Native Academic Management System (SaaS)",
      clientOverview: "An educational institution needing to digitize manual attendance tracking and student management.",
      solution: "We developed a custom Progressive Web Application (PWA) that functions as both a website and a mobile app.",
      techHighlights: [
        { title: "Progressive Web App (PWA)", content: "Installable on iOS/Android directly from the browser." },
        { title: "Real-Time Cloud Sync", content: "Data updates instantly across devices using WebSockets." },
        { title: "Automated Payroll Engine", content: "Algorithms that automatically calculate payouts." },
        { title: "Role-Based Security", content: "Granular access control for Admins and Staff." }
      ]
    }
  },
  { 
    id: 'branding-1', 
    title: 'Apex Identity Design', 
    category: 'Branding', 
    imageUrl: 'https://drive.google.com/file/d/1mOgefOt_rcKXKAaHUadD77iZQEGwGI1m/view?usp=sharing'
  },
  { 
    id: 'branding-2', 
    title: 'Flux Minimalist Brand', 
    category: 'Branding', 
    imageUrl: 'https://drive.google.com/file/d/1thIo8ZNVHIuRU47dPYldETRrWvYLaQaE/view?usp=sharing'
  },
  { 
    id: 'branding-3', 
    title: 'TechStack Logo', 
    category: 'Branding', 
    imageUrl: 'https://drive.google.com/file/d/1XQsMV3bpEdy_FrREJ18XbpwCUHQMtomM/view?usp=sharing'
  },
];

export const FEATURES = [
  { title: 'Pixel Perfect', description: 'Designs that look stunning on 4K monitors and mobile screens alike.', icon: Layout },
  { title: 'Motion First', description: 'Bringing static brands to life with fluid animation and interaction.', icon: Video },
  { title: 'Secure Tech', description: 'Robust development with modern security practices.', icon: ShieldCheck },
  { title: 'Full Service', description: 'From logo concept to final deployed website.', icon: Globe },
];