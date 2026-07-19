import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { concepts, getConceptCategories } from '../../data/concepts';
import { categoryColor } from '../Landing/categoryColors';
import CategoryIcon from '../Landing/CategoryIcon';
import '../Shared/difficultyBadge.css';
import Footer from '../Shared/Footer';
import ThemeToggle from '../Shared/ThemeToggle';
import useDocumentTitle from '../Shared/useDocumentTitle';
import './ConceptLibrary.css';

const LEVELS = ['All', 'Foundational', 'Intermediate', 'Advanced'];
const LEVEL_ORDER: Record<string, number> = { Foundational: 0, Intermediate: 1, Advanced: 2 };

export default function ConceptLibrary() {
  useDocumentTitle('Theory & Concepts');
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('All');
  const categories = useMemo(() => getConceptCategories(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return concepts.filter((c) => {
      const matchesLevel = level === 'All' || c.identity.level === level;
      const matchesQuery =
        q === '' ||
        c.identity.title.toLowerCase().includes(q) ||
        c.identity.tagline.toLowerCase().includes(q) ||
        c.simpleSummary.toLowerCase().includes(q);
      return matchesLevel && matchesQuery;
    });
  }, [query, level]);

  const categoryGroups = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          items: filtered
            .filter((c) => c.identity.category === category)
            .sort((a, b) => LEVEL_ORDER[a.identity.level] - LEVEL_ORDER[b.identity.level]),
        }))
        .filter((g) => g.items.length > 0),
    [categories, filtered],
  );

  return (
    <div className="concept-library">
      <header className="concept-library-header">
        <div className="concept-library-header-top">
          <Link to="/" className="concept-library-home-link">
            &larr; Home
          </Link>
          <ThemeToggle />
        </div>
        <h1>Theory &amp; Concepts</h1>
        <p className="concept-library-subtitle">
          The foundational theory behind the parts and projects on this site — control theory, kinematics,
          estimation, planning, and more — written to build a real bachelor/masters-level robotics foundation, not
          just define jargon.
        </p>
      </header>

      <div className="concept-library-controls">
        <input
          type="search"
          placeholder="Search concepts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="concept-library-search"
          aria-label="Search concepts"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="concept-library-filter"
          aria-label="Filter by level"
        >
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <p className="concept-library-count">
        {filtered.length} of {concepts.length} concepts
      </p>

      {categoryGroups.length > 1 && (
        <nav className="concept-jump-nav" aria-label="Jump to category">
          {categoryGroups.map(({ category, items }) => (
            <a
              key={category}
              href={`#cat-${category}`}
              style={{ '--cat-color': categoryColor(category) } as CSSProperties}
            >
              <span className="concept-jump-dot" />
              {category} <span className="concept-jump-count">{items.length}</span>
            </a>
          ))}
        </nav>
      )}

      <div className="concept-category-sections">
        {categoryGroups.map(({ category, items }) => (
          <section key={category} id={`cat-${category}`} className="concept-category-section">
            <div className="concept-category-heading" style={{ '--cat-color': categoryColor(category) } as CSSProperties}>
              <span className="concept-category-icon">
                <CategoryIcon category={category} />
              </span>
              <h2>{category}</h2>
              <span className="concept-category-count">{items.length} topics</span>
            </div>
            <div className="concept-grid">
              {items.map((c) => (
                <Link
                  key={c.identity.id}
                  to={`/concepts/${c.identity.id}`}
                  className="concept-card"
                  style={{ '--cat-color': categoryColor(category) } as CSSProperties}
                >
                  <span className={`difficulty-badge difficulty-${c.identity.level.toLowerCase()}`}>
                    {c.identity.level}
                  </span>
                  <h3>{c.identity.title}</h3>
                  <p className="concept-card-tagline">{c.identity.tagline}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
        {filtered.length === 0 && <p className="concept-library-empty">No concepts match your search.</p>}
      </div>

      <Footer />
    </div>
  );
}
