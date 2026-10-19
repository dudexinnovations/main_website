import './TrustStrip.css';

const trustMetrics = [
  {
    placeholder: '[TODO: Outlets]',
    label: 'Retail Outlets Deployed',
    description: 'Multi-branch commercial operations managed through proprietary software.'
  },
  {
    placeholder: '[TODO: SLA %]',
    label: 'Uptime Availability SLA',
    description: 'Target edge infrastructure reliability across all client deployments.'
  },
  {
    placeholder: '[TODO: Deployments]',
    label: 'Production Systems',
    description: 'Active client platforms and proprietary internal tools delivered.'
  },
  {
    placeholder: '[TODO: Zero]',
    label: 'Manual Payroll Hours',
    description: 'Operational friction replaced by verified geospatial attendance.'
  }
];

const TrustStrip = () => {
  return (
    <div className="trust-strip-container">
      <div className="text-center trust-strip-header">
        <span className="trust-strip-eyebrow">Enterprise Validation</span>
        <h2 className="trust-strip-title">Verified Infrastructure</h2>
        <p className="trust-strip-subtitle">
          Rigid operational standards and high-reliability systems built for founders and enterprise leaders.
        </p>
      </div>

      <div className="trust-strip-grid">
        {trustMetrics.map((item, index) => (
          <div key={index} className="trust-metric-card">
            <div className="trust-metric-pill">
              <span className="trust-metric-todo">{item.placeholder}</span>
            </div>
            <h3 className="trust-metric-label">{item.label}</h3>
            <p className="trust-metric-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustStrip;
