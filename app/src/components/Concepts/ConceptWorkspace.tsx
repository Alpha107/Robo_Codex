import { Link, Navigate, useParams } from 'react-router-dom';
import {
  getAdjacentConcepts,
  getConceptById,
  getConceptDiagram,
  resolveConceptComponents,
  resolveConceptConcepts,
  resolveConceptProjects,
} from '../../data/concepts';
import BackButton from '../Shared/BackButton';
import ExplainToggle from '../Shared/ExplainToggle';
import GlossaryText from '../Shared/GlossaryText';
import '../Shared/difficultyBadge.css';
import Footer from '../Shared/Footer';
import ThemeToggle from '../Shared/ThemeToggle';
import useDocumentTitle from '../Shared/useDocumentTitle';
import ConceptDiagram from './ConceptDiagram';
import './ConceptWorkspace.css';

export default function ConceptWorkspace() {
  const { id } = useParams<{ id: string }>();
  const concept = id ? getConceptById(id) : undefined;
  const { prev, next } = id ? getAdjacentConcepts(id) : { prev: null, next: null };

  useDocumentTitle(concept?.identity.title);

  if (!concept) {
    return <Navigate to="/concepts" replace />;
  }

  const diagram = getConceptDiagram(concept.identity.id);
  const relatedComponents = resolveConceptComponents(concept);
  const relatedProjects = resolveConceptProjects(concept);
  const relatedConcepts = resolveConceptConcepts(concept);

  return (
    <div className="concept-workspace">
      <header className="concept-workspace-header">
        <nav className="concept-workspace-breadcrumb" aria-label="Breadcrumb">
          <Link to="/concepts">Concepts</Link>
          <span className="crumb-sep" aria-hidden="true">/</span>
          <Link to={`/concepts?category=${encodeURIComponent(concept.identity.category)}`}>
            {concept.identity.category}
          </Link>
          <span className="crumb-sep" aria-hidden="true">/</span>
          <span className="crumb-current">{concept.identity.title}</span>
        </nav>
        <div className="concept-workspace-title-row">
          <div>
            <h1>{concept.identity.title}</h1>
            <p className="concept-workspace-tagline">{concept.identity.tagline}</p>
          </div>
          <div className="concept-workspace-pager">
            <BackButton fallback="/concepts" />
            <ThemeToggle />
            {prev ? (
              <Link to={`/concepts/${prev.identity.id}`} className="pager-btn" title={prev.identity.title}>
                &larr; Prev
              </Link>
            ) : (
              <span className="pager-btn pager-btn-disabled">&larr; Prev</span>
            )}
            {next ? (
              <Link to={`/concepts/${next.identity.id}`} className="pager-btn" title={next.identity.title}>
                Next &rarr;
              </Link>
            ) : (
              <span className="pager-btn pager-btn-disabled">Next &rarr;</span>
            )}
          </div>
        </div>
        <div className="concept-workspace-meta">
          <span className={`difficulty-badge difficulty-${concept.identity.level.toLowerCase()}`}>
            {concept.identity.level}
          </span>
        </div>
      </header>

      <div className="concept-workspace-body">
        <section className="concept-section">
          <h2>The Key Idea</h2>
          <p className="concept-key-idea">{concept.keyIdea}</p>
        </section>

        <section className="concept-section">
          <h2>Overview</h2>
          <ExplainToggle simple={concept.simpleSummary} detailed={concept.overview} />
        </section>

        {concept.equations && concept.equations.length > 0 && (
          <section className="concept-section">
            <h2>Key Equations</h2>
            <div className="concept-equations">
              {concept.equations.map((eq) => (
                <div key={eq.label} className="concept-equation">
                  <p className="concept-equation-label">{eq.label}</p>
                  <p className="concept-equation-expression">{eq.expression}</p>
                  <p className="concept-equation-meaning">{eq.meaning}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="concept-section">
          <h2>Diagram</h2>
          <ConceptDiagram svg={diagram} caption={concept.diagramCaption} />
        </section>

        <section className="concept-section">
          <h2>How It Works</h2>
          <GlossaryText text={concept.howItWorks} />
        </section>

        <section className="concept-section">
          <h2>Real-World Examples</h2>
          <ul className="concept-examples-list">
            {concept.realWorldExamples.map((ex) => (
              <li key={ex}>
                <GlossaryText text={ex} as="span" />
              </li>
            ))}
          </ul>
        </section>

        {concept.commonMisconceptions && concept.commonMisconceptions.length > 0 && (
          <section className="concept-section">
            <h2>Common Misconceptions</h2>
            <ul className="concept-misconceptions-list">
              {concept.commonMisconceptions.map((m) => (
                <li key={m}>
                  <GlossaryText text={m} as="span" />
                </li>
              ))}
            </ul>
          </section>
        )}

        {(relatedComponents.length > 0 || relatedProjects.length > 0 || relatedConcepts.length > 0) && (
          <section className="concept-section">
            <h2>Where This Shows Up</h2>
            {relatedComponents.length > 0 && (
              <div className="concept-related-group">
                <span className="concept-related-label">Related components</span>
                <div className="concept-related-links">
                  {relatedComponents.map((c) => (
                    <Link key={c.identity.id} to={`/component/${c.identity.id}`} className="concept-related-chip">
                      {c.identity.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {relatedProjects.length > 0 && (
              <div className="concept-related-group">
                <span className="concept-related-label">Related projects</span>
                <div className="concept-related-links">
                  {relatedProjects.map((p) => (
                    <Link key={p.identity.id} to={`/projects/${p.identity.id}`} className="concept-related-chip">
                      {p.identity.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {relatedConcepts.length > 0 && (
              <div className="concept-related-group">
                <span className="concept-related-label">Related concepts</span>
                <div className="concept-related-links">
                  {relatedConcepts.map((c) => (
                    <Link key={c.identity.id} to={`/concepts/${c.identity.id}`} className="concept-related-chip">
                      {c.identity.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
