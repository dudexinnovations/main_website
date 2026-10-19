import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import './WhereYouCouldBe.css';

const GOAL_PATHS = [
  {
    id: 'customers',
    title: 'More customers',
    stages: [
      { stop: 'Today', label: 'Word of mouth only' },
      { stop: 'Online', label: 'Found by new clients' },
      { stop: 'Growing', label: 'Steady stream of inquiries' },
      { stop: 'Leading', label: 'First choice in category' }
    ]
  },
  {
    id: 'orders',
    title: 'More orders',
    stages: [
      { stop: 'Today', label: 'Limited by store hours' },
      { stop: 'Online', label: 'Direct smooth client orders' },
      { stop: 'Growing', label: 'Steady daily order flow' },
      { stop: 'Leading', label: 'Effortless high repeat demand' }
    ]
  },
  {
    id: 'manual-work',
    title: 'Less manual work',
    stages: [
      { stop: 'Today', label: 'Manual calls and notes' },
      { stop: 'Online', label: 'Automated booking and inquiry' },
      { stop: 'Growing', label: 'Smooth connected daily workflows' },
      { stop: 'Leading', label: 'Complete operational peace' }
    ]
  },
  {
    id: 'brand',
    title: 'Stronger brand',
    stages: [
      { stop: 'Today', label: 'Blends with local competitors' },
      { stop: 'Online', label: 'Polished modern digital identity' },
      { stop: 'Growing', label: 'Recognized and respected authority' },
      { stop: 'Leading', label: 'The benchmark in industry' }
    ]
  }
];

const WhereYouCouldBe = ({ onStartPath }) => {
  const [activeGoalId, setActiveGoalId] = useState('customers');
  const [pulseKey, setPulseKey] = useState(0);

  const activeGoal = GOAL_PATHS.find((g) => g.id === activeGoalId) || GOAL_PATHS[0];

  const handleSelectGoal = (id) => {
    setActiveGoalId(id);
    setPulseKey((prev) => prev + 1);
  };

  return (
    <section className="where-you-could-be-section" aria-label="Where you could be">
      <div className="container">
        <div className="text-center where-header">
          <span className="where-eyebrow">
            <Sparkles size={13} />
            <span>Growth Trajectory</span>
          </span>
          <h2 className="where-title">Where you could be</h2>
          <p className="where-subtitle">
            Select a primary business goal to see how your digital presence elevates at each stage.
          </p>
        </div>

        {/* 4 Tappable Goal Chips */}
        <div className="goal-chips-bar" role="tablist" aria-label="Business Goals">
          {GOAL_PATHS.map((goal) => {
            const isSelected = goal.id === activeGoalId;
            return (
              <button
                key={goal.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`goal-chip ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelectGoal(goal.id)}
              >
                <span className="goal-chip-dot" aria-hidden="true" />
                <span className="goal-chip-text">{goal.title}</span>
              </button>
            );
          })}
        </div>

        {/* 4 Stops Path (Horizontal on desktop, vertical on mobile) */}
        <div className="path-display-wrap">
          <div className="path-track-container" key={pulseKey}>
            {/* Illuminated connecting line */}
            <div className="path-line-track" aria-hidden="true">
              <div className="path-line-fill path-lighting-active" />
            </div>

            {/* 4 Stops: Today, Online, Growing, Leading */}
            <div className="path-stops-list">
              {activeGoal.stages.map((stage, index) => {
                const stopNumber = `0${index + 1}`;
                return (
                  <div key={stage.stop} className="path-stop-item">
                    <div className="stop-node-wrap">
                      <div className="stop-node-ring">
                        <div className="stop-node-core" />
                      </div>
                      <span className="stop-index-pill" aria-hidden="true">{stopNumber}</span>
                    </div>

                    <div className="stop-content">
                      <h3 className="stop-title">{stage.stop}</h3>
                      <div className="stop-label-wrap">
                        <p className="stop-label">{stage.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action button at the end */}
          <div className="path-action-wrap text-center">
            <button
              type="button"
              className="btn btn-primary path-start-btn"
              onClick={onStartPath}
              id="start-your-path-btn"
            >
              <span>Start your path</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereYouCouldBe;
