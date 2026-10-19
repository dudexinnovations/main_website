import DarkSection from '../components/DarkSection';
import BentoGrid from '../components/BentoGrid';
import WhereYouCouldBe from '../components/WhereYouCouldBe';
import SEO from '../components/SEO';
import './Home.css';

const Home = ({ setIsContactModalOpen }) => {
  const handleOpenContact = () => {
    if (setIsContactModalOpen) {
      setIsContactModalOpen(true);
    }
  };

  return (
    <div className="home-page-dark">
      <SEO 
        title="Websites & Software Built for Ambitious Businesses"
        description="DudeX Innovations builds quiet luxury digital flagships, operational enterprise consoles, and autonomous systems with sub-second performance."
      />

      {/* 1. NEW HERO: HEADLINE (MAX 8 WORDS) + SUB-TEXT (MAX 12 WORDS) + ONE BUTTON ("Let's talk") */}
      <section className="home-hero-dark" aria-label="Hero">
        {/* Subtle CSS-only bronze line animation background */}
        <div className="hero-bronze-line-ambient" aria-hidden="true">
          <svg className="hero-bronze-svg" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="none">
            <path
              className="hero-bronze-line-path"
              d="M -120 220 C 280 80, 680 320, 1080 160 C 1280 80, 1440 220, 1620 150"
              stroke="url(#heroBronzeGrad)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id="heroBronzeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A47C54" stopOpacity="0" />
                <stop offset="25%" stopColor="#A47C54" stopOpacity="0.32" />
                <stop offset="55%" stopColor="#C5A07A" stopOpacity="0.6" />
                <stop offset="85%" stopColor="#A47C54" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#C5A07A" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container hero-content-container">
          <div className="hero-text-wrap text-center">
            {/* Exactly 7 words (Constraint: max 8 words) */}
            <h1 className="hero-compact-title">
              Websites and software built for <span className="text-gradient">ambitious businesses</span>.
            </h1>

            {/* Exactly 10 words, one line (Constraint: max 12 words) */}
            <p className="hero-compact-subtitle">
              Bespoke digital flagships and operational systems engineered for lasting growth.
            </p>

            {/* Exactly one button: "Let's talk" (Opens ContactModal, nothing else) */}
            <div className="hero-action-wrap">
              <button
                type="button"
                className="btn btn-primary hero-talk-btn"
                onClick={handleOpenContact}
                id="hero-lets-talk-btn"
              >
                Let&apos;s talk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHERE YOU COULD BE: 4 STOPS PATH + 4 GOAL CHIPS + START YOUR PATH BUTTON */}
      <WhereYouCouldBe onStartPath={handleOpenContact} />

      {/* 4. WHAT WE DO: BENTO GRID OF 4 TILES */}
      <section className="home-capabilities-dark" aria-label="Capabilities">
        <DarkSection>
          <BentoGrid />
        </DarkSection>
      </section>
    </div>
  );
};

export default Home;
