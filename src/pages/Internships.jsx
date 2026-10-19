import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import InternshipModal from '../components/InternshipModal';
import SEO from '../components/SEO';
import './Internships.css';

const Internships = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const benefits = [
    'Ship production code directly onto live client systems.',
    'Weekly direct 1-on-1 architecture mentorship.',
    'Direct referral pathways and full-time hiring consideration.'
  ];

  return (
    <div className="internships-page internships-page-dark">
      <SEO 
        title="Engineering Internships | DudeX Innovations"
        description="Ship real code on production codebases alongside senior mentors at DudeX Innovations."
      />
      <div className="container internships-container">
        {/* Headline */}
        <div className="internships-header text-center">
          <span className="internships-eyebrow">Career Fellowships</span>
          <h1 className="internships-title">Engineering Internships</h1>
          <p className="internships-subtitle">
            Work alongside senior engineers and build real-world software.
          </p>
        </div>

        {/* 3 One-Line Benefits */}
        <div className="internships-benefits-card">
          <ul className="benefits-list">
            {benefits.map((benefit, index) => (
              <li key={index} className="benefit-item">
                <div className="benefit-icon-wrap" aria-hidden="true">
                  <CheckCircle2 size={18} />
                </div>
                <span className="benefit-text">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* One "Apply" Button */}
        <div className="internships-action text-center">
          <button 
            type="button" 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary internships-apply-btn"
            id="apply-internship-btn"
          >
            <span>Apply</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <InternshipModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Internships;
