import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ setIsContactModalOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Why Online', path: '/why-online' },
    { name: 'Work', path: '/work' },
    { name: 'Internships', path: '/internships' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" aria-label="DudeX Innovations Home">
          <img src="/logo.webp" alt="DudeX Innovations Logo" width="40" height="40" decoding="async" className="logo-img" />
          <div className="logo-text-wrapper">
            <div className="logo-text">
              <span className="logo-dude">Dude</span><span className="logo-x">X</span>
            </div>
            <div className="logo-subtext">
              INNOVATIONS
            </div>
          </div>
        </Link>
        <div className="desktop-menu">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <button className="btn btn-primary nav-cta" onClick={() => setIsContactModalOpen(true)}>Contact Us</button>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label={isOpen ? 'Close menu' : 'Open menu'}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button className="btn btn-primary w-full" onClick={() => { setIsOpen(false); setIsContactModalOpen(true); }}>Contact Us</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
