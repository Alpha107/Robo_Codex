import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProjectCategories, projects } from '../../data/projects';
import { TIERS } from '../../data/tiers';
import { isProjectComplete, useCompletionVersion } from '../../data/progress';
import { categoryColor } from '../Landing/categoryColors';
import CategoryIcon from '../Landing/CategoryIcon';
import Footer from '../Shared/Footer';
import ThemeToggle from '../Shared/ThemeToggle';
import useDocumentTitle from '../Shared/useDocumentTitle';
import './ProjectLibrary.css';

export default function ProjectLibrary() {
  useDocumentTitle('Projects');
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') ?? 'All');
  const [difficulty, setDifficulty] = useState('All');
  const categories = useMemo(() => ['All', ...getProjectCategories()], []);
  const difficulties = ['All', ...TIERS.map((t) => t.key)];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCategory = category === 'All' || p.identity.category === category;
      const matchesDifficulty = difficulty === 'All' || p.identity.difficulty === difficulty;
      const matchesQuery =
        q === '' ||
        p.identity.title.toLowerCase().includes(q) ||
        p.identity.tagline.toLowerCase().includes(q) ||
        p.goal.toLowerCase().includes(q);
      return matchesCategory && matchesDifficulty && matchesQuery;
    });
  }, [query, category, difficulty]);

  const tierGroups = useMemo(
    () =>
      TIERS.map((tier) => ({
        tier,
        items: filtered.filter((p) => p.identity.difficulty === tier.key),
      })).filter((g) => g.items.length > 0),
    [filtered],
  );

  useCompletionVersion();

  return (
    <div className="project-library">
      <header className="project-library-header">
        <div className="project-library-header-top">
          <Link to="/" className="project-library-home-link">
            &larr; Home
          </Link>
          <div className="project-library-header-actions">
            <Link to="/before-you-start" className="project-library-header-link">
              Before You Start
            </Link>
            <Link to="/glossary" className="project-library-header-link">
              Glossary
            </Link>
            <Link to="/concepts" className="project-library-header-link">
              Theory
            </Link>
            <ThemeToggle />
          </div>
        </div>
        <h1>Build Real Projects</h1>
        <p className="project-library-subtitle">
          Step-by-step builds — goal, theory, wiring, code, and troubleshooting — with every part linked back to
          the component encyclopedia. Organized as a progression: work down the page as your skills grow.
        </p>
      </header>

      <div className="project-library-controls">
        <input
          type="search"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="project-library-search"
          aria-label="Search projects"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="project-library-filter"
          aria-label="Filter by category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="project-library-filter"
          aria-label="Filter by difficulty"
        >
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <p className="project-library-count">
        {filtered.length} of {projects.length} projects
      </p>

      {tierGroups.length > 1 && (
        <nav className="tier-jump-nav" aria-label="Jump to difficulty tier">
          {tierGroups.map(({ tier, items }) => (
            <a key={tier.key} href={`#tier-${tier.key}`} style={{ '--tier-color': tier.color } as CSSProperties}>
              <span className="tier-jump-dot" />
              {tier.label} <span className="tier-jump-count">{items.length}</span>
            </a>
          ))}
        </nav>
      )}

      <div className="tier-sections">
        {tierGroups.map(({ tier, items }, i) => (
          <section key={tier.key} id={`tier-${tier.key}`} className="tier-section">
            <div className="tier-heading" style={{ '--tier-color': tier.color } as CSSProperties}>
              <span className="tier-step">{i + 1}</span>
              <div>
                <h2>{tier.label}</h2>
                <p>{tier.tagline}</p>
              </div>
              <span className="tier-heading-count">
                {items.filter((p) => isProjectComplete(p.identity.id)).length}/{items.length} built
              </span>
            </div>
            <div className="project-grid">
              {items.map((p) => (
                <Link
                  key={p.identity.id}
                  to={`/projects/${p.identity.id}`}
                  className="project-card"
                  style={{ '--cat-color': categoryColor(p.identity.category) } as CSSProperties}
                >
                  {isProjectComplete(p.identity.id) && (
                    <span className="project-card-done" title="You've marked this as built">✓ Built</span>
                  )}
                  <div className="project-card-top">
                    <span className="project-card-icon">
                      <CategoryIcon category={p.identity.category} />
                    </span>
                    <span className="project-card-time">{p.identity.estimatedTime}</span>
                  </div>
                  <h3>{p.identity.title}</h3>
                  <p className="project-card-tagline">{p.identity.tagline}</p>
                  <span className="project-card-category">{p.identity.category}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
        {filtered.length === 0 && <p className="project-library-empty">No projects match your search.</p>}
      </div>

      <Footer />
    </div>
  );
}
