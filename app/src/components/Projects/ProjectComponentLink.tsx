import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { RoboticsComponent } from '../../types/component';
import type { ProjectComponentRef } from '../../types/project';
import { categoryColor } from '../Landing/categoryColors';
import CategoryIcon from '../Landing/CategoryIcon';
import './ProjectComponentLink.css';

interface ProjectComponentLinkProps {
  component: RoboticsComponent;
  entry: ProjectComponentRef;
}

export default function ProjectComponentLink({ component, entry: pref }: ProjectComponentLinkProps) {
  return (
    <Link
      to={`/component/${component.identity.id}`}
      className="project-component-link"
      style={{ '--cat-color': categoryColor(component.identity.category) } as CSSProperties}
    >
      <span className="project-component-icon">
        <CategoryIcon category={component.identity.category} />
      </span>
      <span className="project-component-text">
        <span className="project-component-name">
          {component.identity.name}
          {pref.quantity > 1 && <span className="project-component-qty"> ×{pref.quantity}</span>}
        </span>
        {pref.note && <span className="project-component-note">{pref.note}</span>}
      </span>
    </Link>
  );
}
