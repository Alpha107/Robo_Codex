import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { components, getCategories } from '../../data/components';
import type { RoboticsComponent } from '../../types/component';
import { categoryColor } from '../Landing/categoryColors';
import CategoryIcon from '../Landing/CategoryIcon';
import '../Shared/difficultyBadge.css';
import Footer from '../Shared/Footer';
import ThemeToggle from '../Shared/ThemeToggle';
import useDocumentTitle from '../Shared/useDocumentTitle';
import './ComponentLibrary.css';

// Precomputed once per component: name + category + pin names + use-case
// text, so search finds a component by e.g. "SCL", "I2C", or "deep sleep"
// even when none of those words are in the component's title.
function buildSearchIndex(c: RoboticsComponent): string {
  return [
    c.identity.name,
    c.identity.category,
    ...c.pinMap.map((p) => p.name),
    ...c.useCases.flatMap((uc) => [uc.title, uc.scenario]),
  ]
    .join(' ')
    .toLowerCase();
}

export default function ComponentLibrary() {
  useDocumentTitle('Browse Components');
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>(searchParams.get('category') ?? 'All');
  const categories = useMemo(() => ['All', ...getCategories()], []);
  const searchIndex = useMemo(() => new Map(components.map((c) => [c.identity.id, buildSearchIndex(c)])), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return components.filter((c) => {
      const matchesCategory = category === 'All' || c.identity.category === category;
      const matchesQuery = q === '' || (searchIndex.get(c.identity.id) ?? '').includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category, searchIndex]);

  return (
    <div className="library">
      <header className="library-header">
        <div className="library-header-top">
          <Link to="/" className="library-home-link">
            &larr; Home
          </Link>
          <div className="library-header-actions">
            <Link to="/concepts" className="library-header-link">
              Theory
            </Link>
            <Link to="/glossary" className="library-header-link">
              Glossary
            </Link>
            <Link to="/projects" className="library-projects-link">
              Browse Projects &rarr;
            </Link>
            <ThemeToggle />
          </div>
        </div>
        <h1>RoboCodex</h1>
        <p className="library-subtitle">
          Pick a component to explore it pin-by-pin in 3D.
        </p>
      </header>

      <div className="library-controls">
        <input
          type="search"
          placeholder="Search by name, pin, or use case..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="library-search"
          aria-label="Search components"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="library-filter"
          aria-label="Filter by category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <p className="library-count">
        {filtered.length} of {components.length} components
      </p>

      <div className="library-grid">
        {filtered.map((c) => (
          <Link
            key={c.identity.id}
            to={`/component/${c.identity.id}`}
            className="component-card"
            style={{ '--cat-color': categoryColor(c.identity.category) } as CSSProperties}
          >
            <div className="component-card-thumb" aria-hidden="true">
              <CategoryIcon category={c.identity.category} />
            </div>
            <div className="component-card-body">
              <h2>{c.identity.name}</h2>
              <span className="component-card-category">{c.identity.category}</span>
              <span className={`difficulty-badge difficulty-${c.identity.difficulty.split('-')[0].toLowerCase()}`}>
                {c.identity.difficulty}
              </span>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="library-empty">No components match your search.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
