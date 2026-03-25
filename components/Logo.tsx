import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg viewBox="0 0 460 100" className={className} overflow="visible">
      <defs>
        {/* Modern Blue-Teal Gradient (The Orbit) - Fits 'Build your Website & ERP & Web app' */}
        <linearGradient id="gradOrbitModern" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" /> {/* Blue 500 */}
          <stop offset="100%" stopColor="#14b8a6" /> {/* Teal 500 */}
        </linearGradient>
        
        {/* Modern Rose-Orange Gradient (The Core) - High Energy */}
        <linearGradient id="gradCoreModern" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" /> {/* Rose 500 */}
          <stop offset="100%" stopColor="#f97316" /> {/* Orange 500 */}
        </linearGradient>
      </defs>

      {/* LOGO MARK: "The Kinetic Arc" */}
      <g transform="translate(10, 10)">
         
         {/* The Orbit (Space) - Sleeker, thinner stroke (9px) */}
         {/* 300 degree arc for a more 'enclosed' but open feel */}
         <circle 
           cx="50" cy="50" r="34" 
           fill="none" 
           stroke="url(#gradOrbitModern)" 
           strokeWidth="9" 
           strokeLinecap="round"
           strokeDasharray="160 120" 
           transform="rotate(-45 50 50)"
         >
            <animateTransform 
               attributeName="transform"
               type="rotate"
               from="-45 50 50"
               to="315 50 50"
               dur="15s"
               repeatCount="indefinite"
            />
         </circle>

         {/* The Core (Nest) - Solid, energetic */}
         <circle 
           cx="50" cy="50" r="14" 
           fill="url(#gradCoreModern)" 
         >
           <animate 
             attributeName="r" 
             values="14;15;14" 
             dur="3s" 
             repeatCount="indefinite" 
           />
           {/* Inner glow pulse */}
           <animate 
             attributeName="opacity" 
             values="1;0.9;1" 
             dur="3s" 
             repeatCount="indefinite" 
           />
         </circle>
         
         {/* Satellite - White dot for clean tech feel */}
         <circle cx="50" cy="50" r="4" fill="white" className="drop-shadow-sm">
             <animateTransform 
               attributeName="transform"
               type="rotate"
               from="0 50 50"
               to="360 50 50"
               dur="5s"
               repeatCount="indefinite"
            />
            <animateTransform 
               attributeName="transform"
               type="translate"
               values="0 -34; 0 -34"
               additive="sum"
            />
         </circle>

      </g>

      {/* TYPOGRAPHY - Geometric & Modern */}
      <g transform="translate(115, 62)">
         {/* SPACE - Heavy, Geometric */}
         <text 
           fontFamily="Outfit, sans-serif" 
           fontWeight="800" 
           fontSize="42" 
           className="fill-black dark:fill-white" 
           letterSpacing="-1"
         >
            SPACE
         </text>
         
         {/* NEST - Gradient, same tracking */}
         <text 
           x="138" 
           fontFamily="Outfit, sans-serif" 
           fontWeight="800" 
           fontSize="42" 
           fill="url(#gradOrbitModern)" 
           letterSpacing="-1"
         >
            NEST
         </text>

         {/* SYSTEMS - High Impact, Bold, and Responsive position */}
         <text 
            x="2" 
            y="32" 
            fontFamily="Outfit, sans-serif" 
            fontWeight="900" 
            fontSize="22" 
            letterSpacing="2" 
            className="fill-black dark:fill-white uppercase"
         >
            SYSTEMS
         </text>
      </g>
    </svg>
  );
};

export default Logo;