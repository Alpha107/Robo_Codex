import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { resolveRelatedComponent } from '../../data/components';
import { getConceptsUsingComponent } from '../../data/concepts';
import { getProjectsUsingComponent } from '../../data/projects';
import type { RoboticsComponent } from '../../types/component';
import ExplainToggle from '../Shared/ExplainToggle';
import GlossaryText from '../Shared/GlossaryText';
import './KnowledgePanel.css';

interface KnowledgePanelProps {
  component: RoboticsComponent;
}

function RelatedMentions({ mentions, currentId }: { mentions: string[]; currentId: string }) {
  if (mentions.length === 0) return <span>None listed</span>;
  return (
    <span>
      {mentions.map((mention, i) => {
        const match = resolveRelatedComponent(mention);
        const linkable = match && match.identity.id !== currentId;
        return (
          <Fragment key={mention}>
            {i > 0 && ', '}
            {linkable ? (
              <Link to={`/component/${match.identity.id}`} className="related-link">
                {mention}
              </Link>
            ) : (
              mention
            )}
          </Fragment>
        );
      })}
    </span>
  );
}

export default function KnowledgePanel({ component }: KnowledgePanelProps) {
  const { overview, simpleSummary, specifications, useCases, relatedComponents, beginnerMistakes } = component;
  const projectsUsingThis = getProjectsUsingComponent(component.identity.id);
  const conceptsUsingThis = getConceptsUsingComponent(component.identity.id);

  return (
    <div className="knowledge-panel">
      {projectsUsingThis.length > 0 && (
        <section>
          <h3>Used In These Projects</h3>
          <ul className="project-backlink-list">
            {projectsUsingThis.map((p) => (
              <li key={p.identity.id}>
                <Link to={`/projects/${p.identity.id}`} className="project-backlink">
                  {p.identity.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {conceptsUsingThis.length > 0 && (
        <section>
          <h3>Related Theory</h3>
          <ul className="project-backlink-list">
            {conceptsUsingThis.map((c) => (
              <li key={c.identity.id}>
                <Link to={`/concepts/${c.identity.id}`} className="concept-backlink">
                  {c.identity.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section>
        <h3>Overview</h3>
        {simpleSummary ? (
          <ExplainToggle simple={simpleSummary} detailed={overview} />
        ) : (
          <GlossaryText text={overview} />
        )}
      </section>

      <section>
        <h3>Specifications</h3>
        <dl className="spec-list">
          {Object.entries(specifications).map(([key, value]) => (
            <div className="spec-row" key={key}>
              <dt>{camelToLabel(key)}</dt>
              <dd>{String(value)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h3>Use Cases</h3>
        <ul className="use-case-list">
          {useCases.map((uc) => (
            <li key={uc.title}>
              <strong>{uc.title}</strong>
              <span className="use-case-difficulty">{uc.difficulty}</span>
              <GlossaryText text={uc.scenario} />
              <p className="use-case-pins">Pins: {uc.pinsInvolved.join(', ')}</p>
            </li>
          ))}
        </ul>
      </section>

      {beginnerMistakes && beginnerMistakes.length > 0 && (
        <section>
          <h3>Common Beginner Mistakes</h3>
          <ul className="mistake-list">
            {beginnerMistakes.map((m) => (
              <li key={m}>
                <GlossaryText text={m} as="span" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3>Related Components</h3>
        <div className="related-group">
          <span className="related-label">Commonly paired with:</span>
          <RelatedMentions mentions={relatedComponents.commonlyPairedWith} currentId={component.identity.id} />
        </div>
        <div className="related-group">
          <span className="related-label">Often confused with:</span>
          <RelatedMentions mentions={relatedComponents.oftenConfusedWith} currentId={component.identity.id} />
        </div>
        <div className="related-group">
          <span className="related-label">Often upgraded to:</span>
          <RelatedMentions mentions={relatedComponents.oftenUpgradedTo} currentId={component.identity.id} />
        </div>
      </section>
    </div>
  );
}

function camelToLabel(key: string): string {
  const spaced = key.replace(/([A-Z])/g, ' $1');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
