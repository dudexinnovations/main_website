import { useEffect, useState, useRef } from 'react';
import { RotateCw } from 'lucide-react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isOverCard, setIsOverCard] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices and if user prefers reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reducedMotion) {
      setIsDisabled(true);
      return;
    }
    setIsDisabled(false);

    let hovering = false;

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const card = e.target.closest('.work-card-container');
      if (card) {
        if (!hovering) {
          hovering = true;
          setIsOverCard(true);
        }
      } else {
        if (hovering) {
          hovering = false;
          setIsOverCard(false);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsOverCard(false);
      hovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (isDisabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`work-custom-cursor ${isOverCard ? 'active' : ''}`}
      style={{
        transform: 'translate3d(-200px, -200px, 0)'
      }}
      aria-hidden="true"
    >
      <div className="cursor-pill">
        <RotateCw size={11} className="cursor-rotate-icon" />
        <span>Flip</span>
      </div>
    </div>
  );
};

export default CustomCursor;
