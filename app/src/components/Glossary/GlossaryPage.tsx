import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { GLOSSARY } from '../../data/glossary';
import Footer from '../Shared/Footer';
import ThemeToggle from '../Shared/ThemeToggle';
import useDocumentTitle from '../Shared/useDocumentTitle';
import './GlossaryPage.css';

export default function GlossaryPage() {
  useDocumentTitle('Glossary');
  const [query, setQuery] = useState('');

  const sorted = useMemo(() => [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term)), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === '') return sorted;
    return sorted.filter(
      (e) =>
        e.term.toLowerCase().includes(q) ||
        e.definition.toLowerCase().includes(q) ||
        (e.aliases ?? []).some((a) => a.toLowerCase().includes(q)),
    );
  }, [query, sorted]);

  return (
    <div className="glossary-page">
      <header className="glossary-header">
        <div className="glossary-header-top">
          <Link to="/" className="glossary-home-link">
            &larr; Home
          </Link>
          <ThemeToggle />
        </div>
        <h1>Glossary</h1>
        <p className="glossary-subtitle">
          Plain-English explanations of the acronyms and jargon used across the encyclopedia and projects. Terms
          like these are also underlined with a dotted line wherever they appear in the text — hover or tap one
          to see its definition right there.
        </p>
      </header>

      <input
        type="search"
        placeholder="Search terms..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="glossary-search"
        aria-label="Search glossary"
      />

      <p className="glossary-count">
        {filtered.length} of {sorted.length} terms
      </p>

      <dl className="glossary-list">
        {filtered.map((entry) => (
          <div className="glossary-entry" key={entry.term} id={entry.term.toLowerCase().replace(/\s+/g, '-')}>
            <dt>
              {entry.term}
              {entry.aliases && entry.aliases.length > 0 && (
                <span className="glossary-entry-aliases"> ({entry.aliases.join(', ')})</span>
              )}
            </dt>
            <dd>{entry.definition}</dd>
          </div>
        ))}
        {filtered.length === 0 && <p className="glossary-empty">No terms match your search.</p>}
      </dl>

      <Footer />
    </div>
  );
}
