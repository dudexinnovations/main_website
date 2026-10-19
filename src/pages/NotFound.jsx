import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import DarkSection from '../components/DarkSection';
import SEO from '../components/SEO';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-page">
      <SEO 
        title="404 - Page Not Found"
        description="The architectural coordinate or endpoint requested is unavailable in the DudeX Innovations registry."
      />
      <DarkSection className="notfound-hero">
        <div className="container">
          <div className="text-center notfound-content">
            <div className="notfound-icon-wrap" aria-hidden="true">
              <Compass size={40} />
            </div>

            <span className="notfound-code">404 Exception</span>
            <h1 className="notfound-title">
              Architectural Coordinate <br />
              <span className="text-gradient">Not Found</span>
            </h1>

            <p className="notfound-subtitle">
              The digital endpoint or documentation path you requested is unavailable or has been relocated within our deployment registry.
            </p>

            <div className="notfound-actions">
              <Link to="/" className="btn btn-primary">
                <span>Return to Flagship Home</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/work" className="btn btn-outline-light">
                Inspect Production Work
              </Link>
            </div>
          </div>
        </div>
      </DarkSection>
    </div>
  );
};

export default NotFound;
