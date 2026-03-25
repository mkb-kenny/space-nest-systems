export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  features: string[];
  icon: string;
  gradient: string;
}

export interface CaseStudy {
  subtitle: string;
  clientOverview: string;
  solution: string;
  techHighlights: {
    title: string;
    content: string;
  }[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl?: string; // Optional if videoUrl is provided
  videoUrl?: string; // Path to video file (e.g., /videos/demo.mp4)
  link?: string; // External link to the project
  caseStudy?: CaseStudy; // Optional detailed case study data
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PricingPackage {
  name: string;
  idealFor: string;
  specs: {
    label: string;
    value: string;
  }[];
  features: string[];
  price: string;
  isPopular?: boolean;
  color: string;
}

export interface InfrastructureItem {
  title: string;
  description: string;
  includes: string[];
  price: string;
  type: 'domain' | 'hosting' | 'amc';
}