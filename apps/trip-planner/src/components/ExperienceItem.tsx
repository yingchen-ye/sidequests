import type { Experience } from "../types";
import { CompassIcon } from "./icons";

export default function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <div className="card experience-card">
      <div className="card-icon">
        <CompassIcon />
      </div>
      <div className="card-body">
        <div className="card-title-row">
          <span className="card-title">{experience.title}</span>
          {experience.time && <span className="card-cost">{experience.time}</span>}
        </div>
        {experience.description && <div className="card-meta">{experience.description}</div>}
      </div>
    </div>
  );
}
