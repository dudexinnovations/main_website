import { useState, useRef, useEffect } from 'react';
import './DarkSection.css';

const DarkSection = ({ children, className = '', id, style = {} }) => {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [isInteractive, setIsInteractive] = useState(true);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reducedMotion) {
      setIsInteractive(false);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!isInteractive || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`dark-luxury-section ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {/* Film Grain Texture Overlay */}
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* Dynamic Soft Bronze Cursor Glow */}
      {isInteractive && (
        <div
          className={`cursor-bronze-glow ${isHovered ? 'active' : ''}`}
          style={{
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Section Content */}
      <div className="dark-section-inner">
        {children}
      </div>
    </section>
  );
};

export default DarkSection;
