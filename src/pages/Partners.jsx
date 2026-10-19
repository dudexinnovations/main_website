import { useSearchParams } from 'react-router-dom';
import { Layers, Server, Cpu, ArrowRight, Sparkles, Calendar } from 'lucide-react';
import SEO from '../components/SEO';
import WorkCard from '../components/WorkCard';
import { projects } from '../data/projects';
import './Partners.css';
import '../work.css';

/**
 * Sanitize URL parameter to avoid XSS or broken formatting
 */
function sanitizeCompanyName(raw) {
  if (!raw || typeof raw !== 'string') return null;
  try {
    const decoded = decodeURIComponent(raw);
    const stripped = decoded.replace(/<[^>]*>?/gm, '').replace(/[^\w\s.,&'-]/gi, '').trim();
    if (!stripped || stripped.length < 2) return null;
    return stripped.slice(0, 45);
  } catch {
    return null;
  }
}

const Partners = ({ setIsContactModalOpen }) => {
  const [searchParams] = useSearchParams();
  const rawCompany = searchParams.get('company');
  const companyName = sanitizeCompanyName(rawCompany);

  const capabilities = [
    {
      icon: <Layers size={22} />,
      title: 'Digital Flagships',
      desc: 'Institutional web portals engineered for brand authority and sub-second performance.'
    },
    {
      icon: <Server size={22} />,
      title: 'Operations Consoles',
      desc: 'Multi-outlet management consoles with real-time inventory and automated workflows.'
    },
    {
      icon: <Cpu size={22} />,
      title: 'Autonomous AI Tooling',
      desc: 'Custom task orchestration, execution copilots, and intelligent automation pipelines.'
    }
  ];

  const handleBookCall = () => {
    if (setIsContactModalOpen) {
      setIsContactModalOpen(true);
    }
  };

  return (
    <div className="partners-page partners-page-dark">
      <SEO 
        title={companyName ? `Engineering Partnership for ${companyName}` : "Enterprise Engineering Partnership"}
        description="Bespoke engineering partnerships for enterprise organizations: digital flagships, operational consoles, and custom AI systems."
      />

      <div className="container">
        {/* 1. HERO USING ?company= */}
        <div className="partners-hero">
          <span className="partners-eyebrow">
            <Sparkles size={14} />
            Strategic Partnership
          </span>
          <h1 className="partners-headline">
            {companyName ? (
              <>Built for <span className="text-gradient">{companyName}</span>'s next stage.</>
            ) : (
              <>Built for your organization's <span className="text-gradient">next stage</span>.</>
            )}
          </h1>
          <p className="partners-subtitle">
            Bespoke web architectures, operational consoles, and proprietary AI tools engineered for scale.
          </p>
        </div>

        {/* 2. 3 SHORT CAPABILITY TILES */}
        <div className="partners-capabilities-grid">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="partner-cap-tile">
              <div className="cap-icon-wrap">
                {cap.icon}
              </div>
              <h2 className="cap-tile-title">{cap.title}</h2>
              <p className="cap-tile-line">{cap.desc}</p>
            </div>
          ))}
        </div>

        {/* 3. THE WORK CARDS */}
        <div className="partners-work-section">
          <div className="work-header">
            <h2 className="work-title">Selected Production Systems</h2>
          </div>
          <div className="work-grid">
            {projects.map((project) => (
              <WorkCard
                key={project.id}
                project={project}
                onStartSimilar={handleBookCall}
              />
            ))}
          </div>
        </div>

        {/* 4. BOOK-A-CALL BUTTON */}
        <div className="partners-cta-section">
          <button
            type="button"
            onClick={handleBookCall}
            className="btn btn-primary partners-book-btn"
          >
            <Calendar size={18} />
            <span>Book a Strategic Briefing</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Partners;
