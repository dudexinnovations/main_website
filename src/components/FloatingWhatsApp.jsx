import { MessageCircle } from 'lucide-react';
import './FloatingWhatsApp.css';

const WHATSAPP_URL = "https://wa.me/917338869230?text=Hi%20DudeX%2C%20I%27d%20like%20to%20talk%20about%20a%20project.";

const FloatingWhatsApp = () => {
  return (
    <aside aria-label="Quick WhatsApp contact" className="floating-whatsapp-container">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Message us on WhatsApp (opens in new tab)"
        id="floating-whatsapp-trigger"
      >
        <div className="wa-icon-glow">
          <MessageCircle size={18} className="wa-icon-bronze" />
        </div>
        <span className="wa-text">WhatsApp</span>
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;
