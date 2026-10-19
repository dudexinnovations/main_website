import WorkCard from '../components/WorkCard';
import SEO from '../components/SEO';
import { projects } from '../data/projects';
import '../work.css';

const Work = ({ setIsContactModalOpen }) => {
  const handleStartSimilar = () => {
    if (setIsContactModalOpen) {
      setIsContactModalOpen(true);
    }
  };

  return (
    <div className="work-page work-page-dark">
      <SEO 
        title="Production Work & Deployed Architectures"
        description="Inspect production deployments by DudeX Innovations: ILM Smart Academy, Snaxia, G. V. Milk Agency, Workforce CRM, and DudeX AI autonomous platform."
      />
      <div className="container">
        {/* Only the headline and the flip cards */}
        <div className="work-header">
          <h1 className="work-title">
            Crafted for founders. Built for scale.
          </h1>
        </div>

        <div className="work-grid">
          {projects.map((project) => (
            <WorkCard
              key={project.id}
              project={project}
              onStartSimilar={handleStartSimilar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
