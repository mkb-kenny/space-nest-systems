import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number; // delay in seconds
  className?: string;
}

const Reveal: React.FC<RevealProps> = ({ children, width = "fit-content", delay = 0, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ width }}
      className={`relative ${className}`}
    >
      <div
        className="transform-gpu"
        style={{
          transform: isVisible ? "translateY(0) translateZ(0)" : "translateY(20px) translateZ(0)",
          opacity: isVisible ? 1 : 0,
          transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
          willChange: isVisible ? 'auto' : 'transform, opacity',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Reveal;