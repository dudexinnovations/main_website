import './Marquee.css';

const Marquee = () => {
  const items = [
    'Websites',
    'Web apps',
    'AI products',
    'Deployment',
    'Maintenance'
  ];

  // Repeat for continuous seamless looping
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-wrapper" aria-hidden="true">
      <div className="marquee-track">
        {repeatedItems.map((item, index) => (
          <div key={index} className="marquee-item">
            <span className="marquee-text">{item}</span>
            <span className="marquee-separator">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
