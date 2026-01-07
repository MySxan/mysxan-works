// Timeline component - displays milestones vertically with timeline line
import type { TimelineMilestone } from "../../data/timeline";

interface TimelineProps {
  milestones: TimelineMilestone[];
}

export function Timeline({ milestones }: TimelineProps) {
  return (
    <div className="timeline">
      <div className="timeline-line"></div>
      <div className="timeline-items">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3 className="timeline-year">{milestone.year}</h3>
              <h4 className="timeline-title">{milestone.title}</h4>
              <p className="timeline-description">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
