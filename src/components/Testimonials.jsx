import { Quote, Sparkles } from 'lucide-react';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    quote: '[TODO: Client quote on how the custom academic portal transformed parent trust, structured multi-board courses, and surged trial bookings round the clock]',
    client: '[TODO: Academic Director Name]',
    role: '[TODO: Founder & Head of Academics]',
    organization: '[TODO: Premier Tuition Academy, Chennai]'
  },
  {
    quote: '[TODO: Client quote on instantaneous mobile menu discovery, multi-branch footfall lift, and 1-tap WhatsApp beverage ordering]',
    client: '[TODO: Retail Operations Head]',
    role: '[TODO: Managing Partner]',
    organization: '[TODO: Snaxia F&B Chain]'
  },
  {
    quote: '[TODO: Client quote on how custom ERP automation replaced paper attendance books with verified geospatial payroll calculation]',
    client: '[TODO: General Manager Operations]',
    role: '[TODO: Chief Operating Officer]',
    organization: '[TODO: Multi-Outlet Commercial Laundry Group]'
  }
];

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <div className="text-center testimonials-header">
        <span className="testimonials-eyebrow">
          <Sparkles size={13} />
          <span>Client Perspectives</span>
        </span>
        <h2 className="testimonials-title">Verified Partnerships</h2>
        <p className="testimonials-subtitle">
          Direct feedback from organizational leaders, founders, and operations directors running our platforms.
        </p>
      </div>

      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, idx) => (
          <div key={idx} className="testimonial-card">
            <div className="testimonial-quote-icon">
              <Quote size={20} />
            </div>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-author-block">
              <span className="testimonial-client-todo">{t.client}</span>
              <span className="testimonial-role-todo">{t.role}</span>
              <span className="testimonial-org-todo">{t.organization}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
