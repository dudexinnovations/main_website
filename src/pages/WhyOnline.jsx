import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import './WhyOnline.css';

const clamp = (val, min = 0, max = 1) => Math.min(Math.max(val, min), max);

const WhyOnline = ({ setIsContactModalOpen }) => {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const onMotionChange = (e) => {
      setIsReducedMotion(e.matches);
      if (e.matches) {
        setProgress(1);
      }
    };
    mediaQuery.addEventListener('change', onMotionChange);

    if (mediaQuery.matches) {
      setProgress(1);
      return () => mediaQuery.removeEventListener('change', onMotionChange);
    }

    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        if (trackRef.current) {
          const rect = trackRef.current.getBoundingClientRect();
          const totalScrollable = rect.height - window.innerHeight;
          const currentScroll = -rect.top;
          const raw = totalScrollable > 0 ? currentScroll / totalScrollable : 0;
          setProgress(clamp(raw, 0, 1));
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to capture current position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', onMotionChange);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleOpenContact = () => {
    if (setIsContactModalOpen) {
      setIsContactModalOpen(true);
    }
  };

  // Effective progress for animations (always 1 if reduced motion)
  const p = isReducedMotion ? 1 : progress;

  // 1. Screen 1 Headline: "Offline, you're one dot."
  // Visible at start (p=0..0.10), smoothly fades out by p=0.20
  const headline1Opacity = isReducedMotion ? 0 : clamp(1 - (p - 0.08) / 0.12);

  // 2. Screen 2: Google Search & Google Maps (p: 0.10 -> 0.28)
  const p2 = isReducedMotion ? 1 : clamp((p - 0.10) / 0.16);
  const opacity2 = p2;
  const scale2 = isReducedMotion ? 1 : 0.25 + 0.75 * p2;

  // 3. Screen 3: WhatsApp, Instagram, Your website (p: 0.28 -> 0.48)
  const p3 = isReducedMotion ? 1 : clamp((p - 0.28) / 0.16);
  const opacity3 = p3;
  const scale3 = isReducedMotion ? 1 : 0.35 + 0.65 * p3;

  // 4. Screen 4: Customers & Pulses (p: 0.48 -> 0.68)
  const p4 = isReducedMotion ? 1 : clamp((p - 0.48) / 0.16);
  const opacity4 = p4;
  const scale4 = isReducedMotion ? 1 : 0.45 + 0.55 * p4;

  // 5. Screen 5: Full network glow, Headline 5 & Grow my business button (p: 0.68 -> 0.84)
  const p5 = isReducedMotion ? 1 : clamp((p - 0.68) / 0.14);
  const headline5Opacity = p5;
  const headline5Y = isReducedMotion ? 0 : (1 - p5) * 14;
  const buttonOpacity = isReducedMotion ? 1 : clamp((p - 0.72) / 0.12);
  const buttonY = isReducedMotion ? 0 : (1 - buttonOpacity) * 12;
  const masterNetworkScale = isReducedMotion ? 1 : 1 + p5 * 0.04;
  const ambientGlowOpacity = p5 * 0.85;

  // Active story screen indicator (1 to 5)
  let currentScreen = 1;
  if (p >= 0.70) currentScreen = 5;
  else if (p >= 0.50) currentScreen = 4;
  else if (p >= 0.30) currentScreen = 3;
  else if (p >= 0.10) currentScreen = 2;

  return (
    <div className="why-online-page">
      <SEO 
        title="Why Online | DudeX Innovations"
        description="A visual journey: offline you are one dot; online, your connected digital presence is everywhere."
      />

      {/* 5-Screen native scroll track */}
      <div 
        ref={trackRef} 
        className={`why-scroll-track ${isReducedMotion ? 'reduced-motion-track' : ''}`}
      >
        {/* Full-screen sticky stage */}
        <div className="why-sticky-stage">
          {/* Subtle radial background glow */}
          <div 
            className="why-ambient-glow" 
            style={{ opacity: 0.2 + ambientGlowOpacity * 0.6 }}
            aria-hidden="true" 
          />

          {/* Top Story Header HUD */}
          <div className="why-hud-header">
            {/* Screen 1 Headline: Max 6 words (Exactly 4 words) */}
            <div 
              className="why-headline-box"
              style={{
                opacity: headline1Opacity,
                pointerEvents: headline1Opacity > 0.1 ? 'auto' : 'none'
              }}
            >
              <h1 className="why-story-headline">
                Offline, you&apos;re <span className="text-gradient">one dot</span>.
              </h1>
            </div>

            {/* Screen 5 Headline: Max 6 words (Exactly 3 words) */}
            <div 
              className="why-headline-box"
              style={{
                opacity: headline5Opacity,
                transform: `translate3d(0, ${headline5Y}px, 0)`,
                pointerEvents: headline5Opacity > 0.1 ? 'auto' : 'none'
              }}
            >
              <h1 className="why-story-headline">
                Online, you&apos;re <span className="text-gradient">everywhere</span>.
              </h1>
            </div>

            {/* Stage progress dots (1 through 5) */}
            <div className="why-pills-progress" aria-label={`Story stage ${currentScreen} of 5`}>
              {[1, 2, 3, 4, 5].map((step) => (
                <span 
                  key={step} 
                  className={`progress-pip ${step === currentScreen ? 'active' : ''} ${step < currentScreen ? 'completed' : ''}`} 
                  title={`Stage ${step}`}
                />
              ))}
            </div>
          </div>

          {/* SVG Visual Stage */}
          <div className="why-svg-wrapper">
            <svg
              className="why-network-svg"
              viewBox="0 0 1000 700"
              preserveAspectRatio="xMidYMid meet"
              aria-label="Interactive network map"
            >
              <defs>
                {/* Bronze Glow Filter */}
                <filter id="bronzeGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Subtle Line Glow */}
                <filter id="lineGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Bronze Core Radial Gradient */}
                <radialGradient id="centerDotGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="35%" stopColor="#E6CAAB" />
                  <stop offset="75%" stopColor="#C5A07A" />
                  <stop offset="100%" stopColor="#8A623C" />
                </radialGradient>

                {/* Node Surface Gradient */}
                <radialGradient id="nodeSurfaceGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#252525" />
                  <stop offset="100%" stopColor="#141414" />
                </radialGradient>
              </defs>

              {/* Master scaling group for Stage 5 full-screen network fill */}
              <g 
                className="master-network-group"
                transform={`translate(500, 360) scale(${masterNetworkScale}) translate(-500, -360)`}
              >
                {/* ======================================================== */}
                {/* STAGE 4 LINES: Customers -> Ecosystem nodes */}
                {/* ======================================================== */}
                <g 
                  className="layer-screen-4-lines"
                  opacity={opacity4}
                  transform={`translate(500, 360) scale(${scale4}) translate(-500, -360)`}
                >
                  <line x1="130" y1="210" x2="310" y2="250" className="network-line customer-line" />
                  <line x1="500" y1="75" x2="500" y2="180" className="network-line customer-line" />
                  <line x1="870" y1="210" x2="690" y2="250" className="network-line customer-line" />
                  <line x1="120" y1="480" x2="240" y2="440" className="network-line customer-line" />
                  <line x1="880" y1="480" x2="760" y2="440" className="network-line customer-line" />
                </g>

                {/* ======================================================== */}
                {/* STAGE 3 LINES: Ecosystem cross-connections */}
                {/* ======================================================== */}
                <g 
                  className="layer-screen-3-lines"
                  opacity={opacity3}
                  transform={`translate(500, 360) scale(${scale3}) translate(-500, -360)`}
                >
                  <line x1="500" y1="360" x2="500" y2="180" className="network-line primary-line" />
                  <line x1="500" y1="360" x2="240" y2="440" className="network-line primary-line" />
                  <line x1="500" y1="360" x2="760" y2="440" className="network-line primary-line" />
                  <line x1="310" y1="250" x2="500" y2="180" className="network-line secondary-line" />
                  <line x1="690" y1="250" x2="500" y2="180" className="network-line secondary-line" />
                  <line x1="310" y1="250" x2="240" y2="440" className="network-line secondary-line" />
                  <line x1="690" y1="250" x2="760" y2="440" className="network-line secondary-line" />
                </g>

                {/* ======================================================== */}
                {/* STAGE 2 LINES: Center dot -> Google Search & Google Maps */}
                {/* ======================================================== */}
                <g 
                  className="layer-screen-2-lines"
                  opacity={opacity2}
                  transform={`translate(500, 360) scale(${scale2}) translate(-500, -360)`}
                >
                  <line x1="500" y1="360" x2="310" y2="250" className="network-line primary-line" />
                  <line x1="500" y1="360" x2="690" y2="250" className="network-line primary-line" />
                </g>

                {/* ======================================================== */}
                {/* STAGE 4 PULSES: "Order" & "Enquiry" traveling pulses */}
                {/* ======================================================== */}
                <g 
                  className="layer-screen-4-pulses"
                  opacity={opacity4}
                  style={{ display: opacity4 > 0.05 ? 'inline' : 'none' }}
                >
                  {/* Pulse 1: "Order" (Customer 1 -> Google Search -> Your business) */}
                  <g className="pulse-item">
                    {!isReducedMotion && (
                      <animateMotion
                        dur="3.2s"
                        repeatCount="indefinite"
                        path="M 130 210 L 310 250 L 500 360"
                      />
                    )}
                    <rect x="-23" y="-9" width="46" height="18" rx="9" className="pulse-pill" />
                    <text x="0" y="3.5" textAnchor="middle" className="pulse-label">Order</text>
                  </g>

                  {/* Pulse 2: "Enquiry" (Customer 2 -> WhatsApp -> Your business) */}
                  <g className="pulse-item">
                    {!isReducedMotion && (
                      <animateMotion
                        dur="3.6s"
                        repeatCount="indefinite"
                        path="M 120 480 L 240 440 L 500 360"
                      />
                    )}
                    <rect x="-27" y="-9" width="54" height="18" rx="9" className="pulse-pill" />
                    <text x="0" y="3.5" textAnchor="middle" className="pulse-label">Enquiry</text>
                  </g>

                  {/* Pulse 3: "Order" (Customer 3 -> Your website -> Your business) */}
                  <g className="pulse-item">
                    {!isReducedMotion && (
                      <animateMotion
                        dur="2.8s"
                        repeatCount="indefinite"
                        path="M 500 75 L 500 180 L 500 360"
                      />
                    )}
                    <rect x="-23" y="-9" width="46" height="18" rx="9" className="pulse-pill" />
                    <text x="0" y="3.5" textAnchor="middle" className="pulse-label">Order</text>
                  </g>

                  {/* Pulse 4: "Enquiry" (Customer 4 -> Google Maps -> Your business) */}
                  <g className="pulse-item">
                    {!isReducedMotion && (
                      <animateMotion
                        dur="3.4s"
                        repeatCount="indefinite"
                        path="M 870 210 L 690 250 L 500 360"
                      />
                    )}
                    <rect x="-27" y="-9" width="54" height="18" rx="9" className="pulse-pill" />
                    <text x="0" y="3.5" textAnchor="middle" className="pulse-label">Enquiry</text>
                  </g>

                  {/* Pulse 5: "Order" (Customer 5 -> Instagram -> Your business) */}
                  <g className="pulse-item">
                    {!isReducedMotion && (
                      <animateMotion
                        dur="3.8s"
                        repeatCount="indefinite"
                        path="M 880 480 L 760 440 L 500 360"
                      />
                    )}
                    <rect x="-23" y="-9" width="46" height="18" rx="9" className="pulse-pill" />
                    <text x="0" y="3.5" textAnchor="middle" className="pulse-label">Order</text>
                  </g>
                </g>

                {/* ======================================================== */}
                {/* STAGE 4 NODES: Customers (Label: "Customer" - max 3 words) */}
                {/* ======================================================== */}
                <g 
                  className="layer-screen-4-nodes"
                  opacity={opacity4}
                  transform={`translate(500, 360) scale(${scale4}) translate(-500, -360)`}
                >
                  {/* Customer 1 */}
                  <g className="network-node customer-node" transform="translate(130, 210)">
                    <circle r="12" className="node-body customer-circle" />
                    <circle r="4" className="node-core-pip customer-pip" />
                    <text x="0" y="27" textAnchor="middle" className="node-label customer-text">Customer</text>
                  </g>

                  {/* Customer 2 */}
                  <g className="network-node customer-node" transform="translate(120, 480)">
                    <circle r="12" className="node-body customer-circle" />
                    <circle r="4" className="node-core-pip customer-pip" />
                    <text x="0" y="27" textAnchor="middle" className="node-label customer-text">Customer</text>
                  </g>

                  {/* Customer 3 */}
                  <g className="network-node customer-node" transform="translate(500, 75)">
                    <circle r="12" className="node-body customer-circle" />
                    <circle r="4" className="node-core-pip customer-pip" />
                    <text x="0" y="27" textAnchor="middle" className="node-label customer-text">Customer</text>
                  </g>

                  {/* Customer 4 */}
                  <g className="network-node customer-node" transform="translate(870, 210)">
                    <circle r="12" className="node-body customer-circle" />
                    <circle r="4" className="node-core-pip customer-pip" />
                    <text x="0" y="27" textAnchor="middle" className="node-label customer-text">Customer</text>
                  </g>

                  {/* Customer 5 */}
                  <g className="network-node customer-node" transform="translate(880, 480)">
                    <circle r="12" className="node-body customer-circle" />
                    <circle r="4" className="node-core-pip customer-pip" />
                    <text x="0" y="27" textAnchor="middle" className="node-label customer-text">Customer</text>
                  </g>
                </g>

                {/* ======================================================== */}
                {/* STAGE 3 NODES: "WhatsApp", "Instagram", "Your website" */}
                {/* ======================================================== */}
                <g 
                  className="layer-screen-3-nodes"
                  opacity={opacity3}
                  transform={`translate(500, 360) scale(${scale3}) translate(-500, -360)`}
                >
                  {/* Your website */}
                  <g className="network-node ecosystem-node" transform="translate(500, 180)">
                    <circle r="20" className="node-halo" />
                    <circle r="17" className="node-body" />
                    <circle r="6" className="node-core-pip" />
                    <text x="0" y="34" textAnchor="middle" className="node-label">Your website</text>
                  </g>

                  {/* WhatsApp */}
                  <g className="network-node ecosystem-node" transform="translate(240, 440)">
                    <circle r="19" className="node-halo" />
                    <circle r="16" className="node-body" />
                    <circle r="5" className="node-core-pip" />
                    <text x="0" y="32" textAnchor="middle" className="node-label">WhatsApp</text>
                  </g>

                  {/* Instagram */}
                  <g className="network-node ecosystem-node" transform="translate(760, 440)">
                    <circle r="19" className="node-halo" />
                    <circle r="16" className="node-body" />
                    <circle r="5" className="node-core-pip" />
                    <text x="0" y="32" textAnchor="middle" className="node-label">Instagram</text>
                  </g>
                </g>

                {/* ======================================================== */}
                {/* STAGE 2 NODES: "Google Search" & "Google Maps" */}
                {/* ======================================================== */}
                <g 
                  className="layer-screen-2-nodes"
                  opacity={opacity2}
                  transform={`translate(500, 360) scale(${scale2}) translate(-500, -360)`}
                >
                  {/* Google Search */}
                  <g className="network-node ecosystem-node" transform="translate(310, 250)">
                    <circle r="20" className="node-halo" />
                    <circle r="17" className="node-body" />
                    <circle r="6" className="node-core-pip" />
                    <text x="0" y="34" textAnchor="middle" className="node-label">Google Search</text>
                  </g>

                  {/* Google Maps */}
                  <g className="network-node ecosystem-node" transform="translate(690, 250)">
                    <circle r="20" className="node-halo" />
                    <circle r="17" className="node-body" />
                    <circle r="6" className="node-core-pip" />
                    <text x="0" y="34" textAnchor="middle" className="node-label">Google Maps</text>
                  </g>
                </g>

                {/* ======================================================== */}
                {/* STAGE 1: Central Bronze Dot "Your business" */}
                {/* ======================================================== */}
                <g className="network-node central-node" transform="translate(500, 360)">
                  {/* Radiating beacon rings */}
                  <circle r="44" className="central-beacon-outer" />
                  <circle r="32" className="central-beacon-inner" />

                  {/* Core badge */}
                  <circle r="22" className="central-badge-bg" />
                  <circle r="9" fill="url(#centerDotGrad)" filter="url(#bronzeGlowFilter)" className="central-dot-pip" />

                  {/* Label: "Your business" (2 words <= 3 words) */}
                  <text x="0" y="42" textAnchor="middle" className="node-label central-label">
                    Your business
                  </text>
                </g>
              </g>
            </svg>
          </div>

          {/* Bottom Action HUD: One button "Grow my business" for Screen 5 */}
          <div className="why-hud-footer">
            <div 
              className="why-action-box"
              style={{
                opacity: buttonOpacity,
                transform: `translate3d(0, ${buttonY}px, 0)`,
                pointerEvents: buttonOpacity > 0.1 ? 'auto' : 'none'
              }}
            >
              <button
                type="button"
                className="btn btn-primary why-grow-btn"
                onClick={handleOpenContact}
                id="grow-my-business-btn"
              >
                <span>Grow my business</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Subtle scroll prompt during early screens */}
            {!isReducedMotion && p < 0.25 && (
              <div 
                className="why-scroll-hint" 
                style={{ opacity: clamp(1 - p * 4) }}
                aria-hidden="true"
              >
                <div className="scroll-hint-bar" />
                <span className="scroll-hint-text">Scroll to connect</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyOnline;
