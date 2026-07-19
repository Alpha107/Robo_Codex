import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getAdjacentComponents, getComponentById } from '../../data/components';
import type { Pin } from '../../types/component';
import Viewer3D from '../Viewer3D/Viewer3D';
import PinDetailCard from '../PinDetail/PinDetailCard';
import PinQuiz from '../PinDetail/PinQuiz';
import KnowledgePanel from '../Knowledge/KnowledgePanel';
import BackButton from '../Shared/BackButton';
import ThemeToggle from '../Shared/ThemeToggle';
import useDocumentTitle from '../Shared/useDocumentTitle';
import './ComponentWorkspace.css';

export default function ComponentWorkspace() {
  const { id } = useParams<{ id: string }>();
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);

  const component = id ? getComponentById(id) : undefined;
  const { prev, next } = id ? getAdjacentComponents(id) : { prev: null, next: null };

  useDocumentTitle(component?.identity.name);

  if (!component) {
    return <Navigate to="/library" replace />;
  }

  return (
    <div className="workspace">
      <header className="workspace-header">
        <nav className="workspace-breadcrumb" aria-label="Breadcrumb">
          <Link to="/library">Library</Link>
          <span className="crumb-sep" aria-hidden="true">/</span>
          <Link to={`/library?category=${encodeURIComponent(component.identity.category)}`}>
            {component.identity.category}
          </Link>
          <span className="crumb-sep" aria-hidden="true">/</span>
          <span className="crumb-current">{component.identity.name}</span>
        </nav>
        <div className="workspace-title-row">
          <h1>{component.identity.name}</h1>
          <div className="workspace-pager">
            <BackButton fallback="/library" />
            <ThemeToggle />
            {component.pinMap.length >= 2 && (
              <button type="button" className="pager-btn workspace-quiz-btn" onClick={() => setQuizOpen(true)}>
                🧠 Quiz Me
              </button>
            )}
            {prev ? (
              <Link to={`/component/${prev.identity.id}`} className="pager-btn" title={prev.identity.name}>
                &larr; Prev
              </Link>
            ) : (
              <span className="pager-btn pager-btn-disabled">&larr; Prev</span>
            )}
            {next ? (
              <Link to={`/component/${next.identity.id}`} className="pager-btn" title={next.identity.name}>
                Next &rarr;
              </Link>
            ) : (
              <span className="pager-btn pager-btn-disabled">Next &rarr;</span>
            )}
          </div>
        </div>
      </header>

      <div className="workspace-grid">
        <div className="workspace-viewer">
          <Viewer3D
            componentId={component.identity.id}
            pins={component.pinMap}
            selectedPin={selectedPin}
            onSelectPin={setSelectedPin}
          />
        </div>
        <div className="workspace-side">
          <div className="workspace-pin">
            <PinDetailCard pin={selectedPin} onClose={() => setSelectedPin(null)} />
          </div>
          <div className="workspace-knowledge">
            <KnowledgePanel component={component} />
          </div>
        </div>
      </div>

      {quizOpen && (
        <PinQuiz componentName={component.identity.name} pins={component.pinMap} onClose={() => setQuizOpen(false)} />
      )}
    </div>
  );
}
