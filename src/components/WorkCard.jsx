import { useState, useRef, useEffect } from 'react';
import { RotateCw, ArrowRight } from 'lucide-react';
import '../work.css';

const WorkCard = ({ project, onStartSimilar }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e) => {
    if (isFlipped || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Gentle cursor tilt while face-up (max ~5 degrees)
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = -((y - centerY) / centerY) * 5;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleCardClick = (e) => {
    // If the click originated from an action button on the back face, don't flip from container click
    if (e.target.closest('button')) {
      return;
    }
    setIsFlipped((prev) => !prev);
    setTilt({ x: 0, y: 0 });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target.tagName === 'BUTTON') return;
      e.preventDefault();
      setIsFlipped((prev) => !prev);
      setTilt({ x: 0, y: 0 });
    } else if (e.key === 'Escape' && isFlipped) {
      e.preventDefault();
      setIsFlipped(false);
      setTilt({ x: 0, y: 0 });
    }
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
    if (onStartSimilar) {
      onStartSimilar(project);
    }
  };

  const handleBackClick = (e) => {
    e.stopPropagation();
    setIsFlipped(false);
    setTilt({ x: 0, y: 0 });
  };

  const tiltStyle = !isFlipped && !prefersReducedMotion && (tilt.x !== 0 || tilt.y !== 0)
    ? `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
    : undefined;

  return (
    <div
      ref={cardRef}
      className={`work-card-container ${isFlipped ? 'is-flipped' : ''}`}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`${project.name}. Industry: ${project.industry}. Click or press Enter to flip card.`}
      aria-expanded={isFlipped}
      style={{
        transform: tiltStyle,
        transition: (tilt.x === 0 && tilt.y === 0) ? 'transform 0.4s ease-out' : 'none'
      }}
    >
      <div className="work-card-inner">
        {/* FRONT FACE */}
        <div className="work-card-face work-card-front">
          <div className="work-media-wrapper">
            {project.hasScreenshot && project.image ? (
              <img
                src={project.image}
                alt={`${project.name} interface demonstration`}
                className="work-screenshot"
                loading="lazy"
                decoding="async"
                width="600"
                height="340"
              />
            ) : (
              /* Abstract bronze-line front on charcoal, CSS only */
              <div className="abstract-bronze-front" aria-label="Abstract bronze architectural geometry">
                <div className="abstract-bronze-line-grid" />
                <div className="abstract-bronze-glow" />
                <div className="abstract-bronze-geometric-core">
                  <div className="bronze-outer-circle" />
                  <div className="bronze-inner-diamond" />
                  <div className="bronze-axis-horizontal" />
                  <div className="bronze-axis-vertical" />
                </div>
              </div>
            )}
          </div>

          <div className="work-front-content">
            <div className="work-front-meta">
              <span className="work-industry-tag">{project.industry}</span>
              <span className="work-flip-pill" aria-hidden="true">
                <RotateCw size={12} />
                <span>Flip</span>
              </span>
            </div>
            <h3 className="work-front-name">{project.name}</h3>
            <p className="work-front-summary" title={project.summary}>
              {project.summary}
            </p>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="work-card-face work-card-back">
          <div className="work-back-header">
            <span className="work-type-tag">{project.type}</span>
          </div>

          <div className="work-back-body">
            <h3 className="work-back-name">{project.name}</h3>
            <p className="work-back-desc">{project.description}</p>
            <div className="work-result-line">
              <span className="work-result-prefix">Result: </span>
              <span className="work-result-text">{project.result}</span>
            </div>
          </div>

          <div className="work-back-actions">
            <button
              type="button"
              className="btn-work-cta"
              onClick={handleActionClick}
            >
              <span>{project.buttonText || 'Start a similar project'}</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              className="btn-work-back"
              onClick={handleBackClick}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
