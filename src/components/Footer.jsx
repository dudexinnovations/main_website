import { Link } from 'react-router-dom';
import { Mail, MapPin, Globe } from 'lucide-react';
import './Footer.css';

const Footer = ({ setIsContactModalOpen }) => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="navbar-logo footer-logo" aria-label="DudeX Innovations Home">
            <img src="/logo.webp" alt="DudeX Innovations Logo" width="40" height="40" loading="lazy" decoding="async" className="logo-img" />
            <div className="logo-text-wrapper">
              <div className="logo-text">
                <span className="logo-dude" style={{color: 'white'}}>Dude</span><span className="logo-x">X</span>
              </div>
              <div className="logo-subtext">
                <span style={{color: 'white'}}>INNOVATIONS</span>
              </div>
            </div>
          </Link>
          <p className="footer-desc">
            Empowering businesses through cutting-edge web solutions, maintaining dynamic websites, and shaping the future tech leaders via internships.
          </p>
        </div>
        
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/why-online">Why Online</Link></li>
            <li><Link to="/partners">Partners</Link></li>
            <li><Link to="/work">Work</Link></li>
            <li><Link to="/internships">Internships</Link></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-primary" />
              <button 
                onClick={() => setIsContactModalOpen(true)}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit', textDecoration: 'underline' }}
              >
                team@dudexai.com
              </button>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={18} className="text-primary" />
              <span>dudexai.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <p>&copy; {new Date().getFullYear()} DudexAI Innovations. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
