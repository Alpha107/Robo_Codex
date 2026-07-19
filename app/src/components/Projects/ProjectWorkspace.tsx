import { Link, Navigate, useParams } from 'react-router-dom';
import { getAdjacentProjects, getProjectById, resolveProjectComponents } from '../../data/projects';
import { getConceptsUsingProject } from '../../data/concepts';
import { getTier } from '../../data/tiers';
import { isProjectComplete, toggleProjectComplete, useCompletionVersion } from '../../data/progress';
import { CONCEPT_DIAGRAMS } from '../../data/conceptDiagrams';
import PwmWaveformDiagram from '../Concepts/PwmWaveformDiagram';
import CurrentFlowDiagram from '../Concepts/CurrentFlowDiagram';
import BackButton from '../Shared/BackButton';
import ExplainToggle from '../Shared/ExplainToggle';
import GlossaryText from '../Shared/GlossaryText';
import '../Shared/difficultyBadge.css';
import Footer from '../Shared/Footer';
import ThemeToggle from '../Shared/ThemeToggle';
import useDocumentTitle from '../Shared/useDocumentTitle';
import CircuitDiagram from './CircuitDiagram';
import CodeBlock from './CodeBlock';
import ProjectAssemblyPanel from './ProjectAssemblyPanel';
import ProjectComponentLink from './ProjectComponentLink';
import TroubleshootingCard from './TroubleshootingCard';
import WiringSteps from './WiringSteps';
import './ProjectWorkspace.css';

export default function ProjectWorkspace() {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;
  const { prev, next } = id ? getAdjacentProjects(id) : { prev: null, next: null };
  useCompletionVersion();

  useDocumentTitle(project?.identity.title);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const resolvedComponents = resolveProjectComponents(project);
  const tier = getTier(project.identity.difficulty);
  const complete = isProjectComplete(project.identity.id);
  const relatedConcepts = getConceptsUsingProject(project.identity.id);

  return (
    <div className="project-workspace">
      <header className="project-workspace-header">
        <nav className="project-workspace-breadcrumb" aria-label="Breadcrumb">
          <Link to="/projects">Projects</Link>
          <span className="crumb-sep" aria-hidden="true">/</span>
          <Link to={`/projects?category=${encodeURIComponent(project.identity.category)}`}>
            {project.identity.category}
          </Link>
          <span className="crumb-sep" aria-hidden="true">/</span>
          <span className="crumb-current">{project.identity.title}</span>
        </nav>
        <div className="project-workspace-title-row">
          <div>
            <h1>{project.identity.title}</h1>
            <p className="project-workspace-tagline">{project.identity.tagline}</p>
          </div>
          <div className="project-workspace-pager">
            <BackButton fallback="/projects" />
            <ThemeToggle />
            {prev ? (
              <Link to={`/projects/${prev.identity.id}`} className="pager-btn" title={prev.identity.title}>
                &larr; Prev
              </Link>
            ) : (
              <span className="pager-btn pager-btn-disabled">&larr; Prev</span>
            )}
            {next ? (
              <Link to={`/projects/${next.identity.id}`} className="pager-btn" title={next.identity.title}>
                Next &rarr;
              </Link>
            ) : (
              <span className="pager-btn pager-btn-disabled">Next &rarr;</span>
            )}
          </div>
        </div>
        <div className="project-workspace-meta">
          <span className={`difficulty-badge difficulty-${project.identity.difficulty.split('-')[0].toLowerCase()}`}>
            {project.identity.difficulty}
          </span>
          <span className="project-workspace-time">⏱ {project.identity.estimatedTime}</span>
          <button
            type="button"
            className={complete ? 'mark-built-btn mark-built-btn-done' : 'mark-built-btn'}
            onClick={() => toggleProjectComplete(project.identity.id)}
          >
            {complete ? '✓ Built' : 'Mark as Built'}
          </button>
        </div>
        {tier && (
          <p className="project-encouragement" style={{ borderColor: tier.color }}>
            {tier.encouragement}
          </p>
        )}
      </header>

      <div className="project-workspace-body">
        <section className="project-section">
          <h2>Goal</h2>
          <GlossaryText text={project.goal} />
        </section>

        <section className="project-section">
          <h2>How It Works</h2>
          {project.simpleSummary ? (
            <ExplainToggle simple={project.simpleSummary} detailed={project.howItWorks} />
          ) : (
            <GlossaryText text={project.howItWorks} />
          )}
          {(CONCEPT_DIAGRAMS[project.identity.id] ?? []).map((diagram, i) =>
            diagram.type === 'pwm' ? (
              <PwmWaveformDiagram key={i} label={diagram.label} />
            ) : (
              <CurrentFlowDiagram key={i} />
            ),
          )}
        </section>

        {project.toolsNeeded && project.toolsNeeded.length > 0 && (
          <section className="project-section">
            <h2>What You'll Need</h2>
            <ul className="tools-needed-list">
              {project.toolsNeeded.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="project-section">
          <h2>Components Required</h2>
          <div className="project-components-grid">
            {resolvedComponents.map(({ ref, component }, i) => (
              <ProjectComponentLink key={`${component.identity.id}-${i}`} component={component} entry={ref} />
            ))}
          </div>
        </section>

        <section className="project-section project-assembly-breakout">
          <h2>3D Build</h2>
          <ProjectAssemblyPanel project={project} />
        </section>

        {relatedConcepts.length > 0 && (
          <section className="project-section">
            <h2>Related Theory</h2>
            <div className="project-related-concepts">
              {relatedConcepts.map((c) => (
                <Link key={c.identity.id} to={`/concepts/${c.identity.id}`} className="project-related-concept-chip">
                  {c.identity.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="project-section">
          <h2>Circuit Diagram</h2>
          <CircuitDiagram svg={project.circuitDiagramSvg} caption={project.circuitDiagramCaption} />
        </section>

        <section className="project-section">
          <h2>Step-by-Step Wiring</h2>
          <WiringSteps projectId={project.identity.id} steps={project.wiringSteps} />
        </section>

        <section className="project-section">
          <h2>Code</h2>
          <div className="project-code-list">
            {project.code.map((c) => (
              <div key={c.filename} className="project-code-item">
                <CodeBlock filename={c.filename} source={c.source} />
                {c.explanation && <p className="project-code-explanation">{c.explanation}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="project-section">
          <h2>Expected Behavior</h2>
          <p>{project.expectedBehavior}</p>
        </section>

        <section className="project-section">
          <h2>Troubleshooting</h2>
          <p className="troubleshooting-hint">Something not working? Click an issue below to reveal the fix.</p>
          <div className="troubleshooting-list">
            {project.troubleshooting.map((t) => (
              <TroubleshootingCard key={t.issue} issue={t.issue} fix={t.fix} />
            ))}
          </div>
        </section>

        {project.extensions && project.extensions.length > 0 && (
          <section className="project-section">
            <h2>Extend This Project</h2>
            <ul className="extensions-list">
              {project.extensions.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
