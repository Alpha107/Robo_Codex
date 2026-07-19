import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllComponentMistakes } from '../../data/components';
import { getAllProjectTroubleshooting } from '../../data/projects';
import GlossaryText from '../Shared/GlossaryText';
import Footer from '../Shared/Footer';
import ThemeToggle from '../Shared/ThemeToggle';
import useDocumentTitle from '../Shared/useDocumentTitle';
import './CommonMistakesPage.css';

type Tab = 'components' | 'projects';

export default function CommonMistakesPage() {
  useDocumentTitle('Common Mistakes');
  const [tab, setTab] = useState<Tab>('components');
  const [query, setQuery] = useState('');

  const componentMistakes = useMemo(() => getAllComponentMistakes(), []);
  const projectTrouble = useMemo(() => getAllProjectTroubleshooting(), []);

  const filteredComponentMistakes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === '') return componentMistakes;
    return componentMistakes.filter(
      (m) => m.text.toLowerCase().includes(q) || m.component.identity.name.toLowerCase().includes(q),
    );
  }, [componentMistakes, query]);

  const filteredProjectTrouble = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === '') return projectTrouble;
    return projectTrouble.filter(
      (t) =>
        t.issue.toLowerCase().includes(q) ||
        t.fix.toLowerCase().includes(q) ||
        t.project.identity.title.toLowerCase().includes(q),
    );
  }, [projectTrouble, query]);

  return (
    <div className="mistakes-page">
      <header className="mistakes-header">
        <div className="mistakes-header-top">
          <Link to="/" className="mistakes-home-link">
            &larr; Home
          </Link>
          <ThemeToggle />
        </div>
        <h1>Common Mistakes</h1>
        <p className="mistakes-subtitle">
          Every wiring gotcha, beginner mistake, and troubleshooting fix from across the whole encyclopedia and
          project library, gathered in one place. Worth a skim before you start building, and a good place to come
          back to when something isn't working.
        </p>
      </header>

      <div className="mistakes-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'components'}
          className={tab === 'components' ? 'mistakes-tab active' : 'mistakes-tab'}
          onClick={() => setTab('components')}
        >
          Component Gotchas ({componentMistakes.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'projects'}
          className={tab === 'projects' ? 'mistakes-tab active' : 'mistakes-tab'}
          onClick={() => setTab('projects')}
        >
          Project Troubleshooting ({projectTrouble.length})
        </button>
      </div>

      <input
        type="search"
        placeholder="Search mistakes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mistakes-search"
        aria-label="Search common mistakes"
      />

      {tab === 'components' ? (
        <ul className="mistakes-list">
          {filteredComponentMistakes.map((m, i) => (
            <li key={i} className="mistakes-item">
              <Link to={`/component/${m.component.identity.id}`} className="mistakes-item-source">
                {m.component.identity.name}
                {m.pinName && <span className="mistakes-item-pin"> · {m.pinName} pin</span>}
              </Link>
              <GlossaryText text={m.text} as="span" />
            </li>
          ))}
          {filteredComponentMistakes.length === 0 && <p className="mistakes-empty">No matches.</p>}
        </ul>
      ) : (
        <ul className="mistakes-list">
          {filteredProjectTrouble.map((t, i) => (
            <li key={i} className="mistakes-item">
              <Link to={`/projects/${t.project.identity.id}`} className="mistakes-item-source">
                {t.project.identity.title}
              </Link>
              <p className="mistakes-item-issue">{t.issue}</p>
              <GlossaryText text={t.fix} as="span" />
            </li>
          ))}
          {filteredProjectTrouble.length === 0 && <p className="mistakes-empty">No matches.</p>}
        </ul>
      )}

      <Footer />
    </div>
  );
}
