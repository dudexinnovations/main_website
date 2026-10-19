import { Globe, LayoutGrid, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import './BentoGrid.css';

const CAPABILITIES = [
  {
    id: 'websites',
    title: 'Websites',
    line: 'High-performance digital flagships engineered for trust, speed, and top search discovery.',
    icon: Globe,
    number: '01'
  },
  {
    id: 'web-apps',
    title: 'Web apps',
    line: 'Custom operational portals, multi-outlet ERPs, and automated geospatial payroll engines.',
    icon: LayoutGrid,
    number: '02'
  },
  {
    id: 'ai-products',
    title: 'AI products',
    line: 'Autonomous founder copilots, structured technical roadmaps, and proprietary LLM workflows.',
    icon: Cpu,
    number: '03'
  },
  {
    id: 'care-and-support',
    title: 'Care and support',
    line: 'Continuous uptime monitoring, edge CDN distribution, security patches, and senior engineer SLAs.',
    icon: ShieldCheck,
    number: '04'
  }
];

const BentoGrid = () => {
  return (
    <div className="bento-container">
      <div className="bento-header text-center">
        <span className="bento-eyebrow">Capabilities</span>
        <h2 className="bento-title">What We Do</h2>
      </div>

      <div className="bento-four-grid">
        {CAPABILITIES.map((cap) => {
          const Icon = cap.icon;
          return (
            <div key={cap.id} className="bento-cap-tile">
              <div className="bento-cap-top">
                <div className="bento-cap-icon-wrap" aria-hidden="true">
                  <Icon size={20} />
                </div>
                <span className="bento-cap-number">{cap.number}</span>
              </div>
              <h3 className="bento-cap-title">{cap.title}</h3>
              <p className="bento-cap-line">{cap.line}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BentoGrid;
