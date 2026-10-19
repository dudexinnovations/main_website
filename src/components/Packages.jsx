import { Check, ArrowRight, Sparkles } from 'lucide-react';
import './Packages.css';

const PACKAGES = [
  {
    id: 'launch',
    name: 'Launch',
    tag: 'Single-Location & MVP',
    pricePlaceholder: 'Custom Engagement Scope',
    turnaroundPlaceholder: '[TODO: 2-Week Target Delivery]',
    description: 'Designed for emerging brands, tuition centers, or single-outlet retailers seeking an authoritative digital flagship.',
    features: [
      '[TODO: 5-page bespoke responsive digital flagship]',
      '[TODO: Google Search & Maps structured Schema integration]',
      '[TODO: Direct 1-tap WhatsApp consultation funnel]',
      '[TODO: Fast asset pipeline under 1.2s mobile load time]',
      '[TODO: 30 days post-launch warranty & domain setup]'
    ],
    isFeatured: false
  },
  {
    id: 'growth',
    name: 'Growth',
    tag: 'Multi-Outlet & Scaling',
    pricePlaceholder: 'Custom Engagement Scope',
    turnaroundPlaceholder: '[TODO: 4-Week Sprint Delivery]',
    description: 'Engineered for growing institutions and retail chains needing multi-branch discovery, trial booking funnels, and analytics.',
    features: [
      '[TODO: Multi-branch store locator & dynamic menus/curricula]',
      '[TODO: Interactive inquiry intake & parent trial booking engine]',
      '[TODO: Real-time telemetry, visitor drop-off & event tracking]',
      '[TODO: Edge CDN caching & automated SSL security hardening]',
      '[TODO: 90 days priority SLA support & quarterly review]'
    ],
    isFeatured: true
  },
  {
    id: 'custom',
    name: 'Custom',
    tag: 'Enterprise & Operations',
    pricePlaceholder: 'Custom Enterprise Scope',
    turnaroundPlaceholder: '[TODO: Phased Milestone Architecture]',
    description: 'Tailored for large commercial operations, complex ERP consoles, and autonomous AI system deployments.',
    features: [
      '[TODO: Full manager console with geospatial biometric check-ins]',
      '[TODO: Automated multi-outlet dispatch & ledger-accurate payroll]',
      '[TODO: Domain-specific autonomous AI planning & roadmap copilot]',
      '[TODO: 99.98% uptime SLA with dedicated engineering lead]',
      '[TODO: 100% intellectual property & source code repository transfer]'
    ],
    isFeatured: false
  }
];

const Packages = ({ setIsContactModalOpen }) => {
  return (
    <div className="packages-container">
      <div className="text-center packages-header">
        <span className="packages-eyebrow">
          <Sparkles size={13} />
          <span>Transparent Engagements</span>
        </span>
        <h2 className="packages-title">Engineering Packages</h2>
        <p className="packages-subtitle">
          Structured scopes designed for rapid launch, multi-branch scaling, and enterprise operational continuity.
        </p>
      </div>

      <div className="packages-grid">
        {PACKAGES.map((pkg) => (
          <div key={pkg.id} className={`package-card ${pkg.isFeatured ? 'featured' : ''}`}>
            {pkg.isFeatured && (
              <div className="featured-ribbon">
                <span>Recommended for Scale</span>
              </div>
            )}

            <div className="package-top">
              <span className="package-tier-tag">{pkg.tag}</span>
              <h3 className="package-name">{pkg.name}</h3>
              <div className="package-price-wrap">
                <span className="package-price-todo">{pkg.pricePlaceholder}</span>
              </div>
              <span className="package-delivery-todo">{pkg.turnaroundPlaceholder}</span>
            </div>

            <p className="package-desc">{pkg.description}</p>

            <div className="package-features-list">
              <span className="features-header">Scope Inclusions:</span>
              {pkg.features.map((feat, idx) => (
                <div key={idx} className="feature-row">
                  <div className="feature-check">
                    <Check size={13} />
                  </div>
                  <span className="feature-text">{feat}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`btn ${pkg.isFeatured ? 'btn-primary' : 'btn-outline-pkg'}`}
              onClick={() => setIsContactModalOpen && setIsContactModalOpen(true)}
            >
              <span>Initiate {pkg.name} Brief</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
