import { lazy, Suspense, useMemo } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { components } from '../../data/components';
import { concepts } from '../../data/concepts';
import { projects } from '../../data/projects';
import Footer from '../Shared/Footer';
import ThemeToggle from '../Shared/ThemeToggle';
import useDocumentTitle from '../Shared/useDocumentTitle';
import { categoryColor } from './categoryColors';
import CategoryIcon from './CategoryIcon';
import Logo from './Logo';
import './LandingPage.css';

// Lazy-loaded so the heavy three.js + full model registry chunk isn't part of
// the first paint of the landing page — it fetches in the background and
// swaps in once ready.
const HeroShowcase = lazy(() => import('./HeroShowcase'));

const FEATURES = [
  {
    title: 'Bespoke 3D Models',
    body: 'Every single component — not a generic box — modeled by hand so it actually looks like the part in your hand.',
  },
  {
    title: 'Click-to-Learn Pinouts',
    body: 'Click any pin to see its function, voltage range, current limit, and alternate uses instantly.',
  },
  {
    title: 'Real-World Gotchas',
    body: "Curated from real debugging pain — the mistakes that trip up beginners aren't in the datasheet.",
  },
  {
    title: 'Beginner to Advanced',
    body: 'From a bare LED to a LiDAR unit, difficulty tags help you build up your hardware vocabulary in order.',
  },
  {
    title: 'Animated Theory Diagrams',
    body: 'Every theory topic ships with a hand-animated diagram, not a static textbook figure — ideas like PID control or A* actually move.',
  },
  {
    title: 'Everything Cross-Linked',
    body: 'Every component links to the projects and theory it shows up in, and back again — one connected reference instead of three separate silos.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Pick a part',
    body: 'Browse components by category, or jump straight to the one you already have on your desk.',
  },
  {
    step: '02',
    title: 'Learn by clicking',
    body: 'Spin it in 3D, click a pin for its voltage and function, then read the theory and gotchas behind it.',
  },
  {
    step: '03',
    title: 'Build something real',
    body: 'Follow a guided project end to end — goal, wiring, code, and troubleshooting — with every part linked back.',
  },
];

export default function LandingPage() {
  useDocumentTitle();
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const c of components) {
      counts.set(c.identity.category, (counts.get(c.identity.category) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  const totalCategories = categoryCounts.length;
  const totalComponents = components.length;

  return (
    <div className="landing">
      <div className="landing-grid-fx" aria-hidden="true" />

      <nav className="landing-nav">
        <span className="landing-nav-brand">
          <Logo className="landing-nav-mark" />
          RoboCodex
        </span>
        <div className="landing-nav-actions">
          <div className="landing-nav-links">
            <Link to="/before-you-start" className="landing-nav-link">
              Before You Start
            </Link>
            <Link to="/glossary" className="landing-nav-link">
              Glossary
            </Link>
            <Link to="/common-mistakes" className="landing-nav-link">
              Common Mistakes
            </Link>
            <Link to="/concepts" className="landing-nav-link">
              Theory
            </Link>
            <Link to="/projects" className="landing-nav-link">
              Projects
            </Link>
          </div>
          <Link to="/library" className="landing-nav-cta">
            Open Library
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <header className="landing-hero">
        <div className="landing-hero-copy">
          <span className="landing-eyebrow">{totalComponents} components &middot; {totalCategories} categories &middot; fully interactive 3D</span>
          <h1>
            Explore robotics hardware,
            <span className="landing-gradient-text"> pin by pin, in 3D.</span>
          </h1>
          <p className="landing-hero-sub">
            An interactive encyclopedia of microcontrollers, sensors, motors, and mechanical parts —
            click a component, spin it around in 3D, and click any pin to learn exactly what it does.
          </p>
          <div className="landing-hero-actions">
            <Link to="/library" className="btn-primary">
              Explore the Library <span aria-hidden="true">&rarr;</span>
            </Link>
            <a href="#categories" className="btn-secondary">
              Browse Categories
            </a>
          </div>
          <dl className="landing-stats">
            <div>
              <dt>{totalComponents}</dt>
              <dd>Components</dd>
            </div>
            <div>
              <dt>{totalCategories}</dt>
              <dd>Categories</dd>
            </div>
            <div>
              <dt>{projects.length}</dt>
              <dd>Guided projects</dd>
            </div>
            <div>
              <dt>{concepts.length}</dt>
              <dd>Theory topics</dd>
            </div>
          </dl>
        </div>
        <div className="landing-hero-visual">
          <Suspense fallback={<div className="hero-showcase hero-showcase-loading" />}>
            <HeroShowcase />
          </Suspense>
        </div>
      </header>

      <section className="landing-how">
        <div className="landing-section-heading">
          <h2>How It Works</h2>
          <p>Three steps from "what is this part" to "I built something with it."</p>
        </div>
        <div className="how-grid">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.step} className="how-card">
              <span className="how-step">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-categories" id="categories">
        <div className="landing-section-heading">
          <h2>Browse by Category</h2>
          <p>Jump straight into the part of the stack you're working on.</p>
        </div>
        <div className="category-grid">
          {categoryCounts.map(([category, count]) => (
            <Link
              key={category}
              to={`/library?category=${encodeURIComponent(category)}`}
              className="category-tile"
              style={{ '--cat-color': categoryColor(category) } as CSSProperties}
            >
              <span className="category-tile-icon">
                <CategoryIcon category={category} />
              </span>
              <span className="category-tile-name">{category}</span>
              <span className="category-tile-count">{count} parts</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="landing-projects-teaser">
        <div className="landing-projects-teaser-copy">
          <span className="landing-eyebrow">{projects.length} guided builds</span>
          <h2>Know the parts. Now build something.</h2>
          <p>
            Full step-by-step projects — goal, theory, wiring, code, and troubleshooting — with every part linked
            straight back to its page in the encyclopedia.
          </p>
          <Link to="/projects" className="btn-primary">
            Browse Projects <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <section className="landing-projects-teaser">
        <div className="landing-projects-teaser-copy">
          <span className="landing-eyebrow">{concepts.length} theory topics</span>
          <h2>Now build the foundation underneath it all.</h2>
          <p>
            Control theory, kinematics, estimation, and planning — the bachelor/masters-level theory behind the
            hardware and projects, cross-linked back to the exact parts and builds where each idea shows up.
          </p>
          <Link to="/concepts" className="btn-primary">
            Explore Theory &amp; Concepts <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-section-heading">
          <h2>Why this, and not a datasheet</h2>
          <p>Built for building intuition, not just looking things up.</p>
        </div>
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-cta-band">
        <div className="landing-cta-band-inner">
          <h2>Ready to stop guessing and start building?</h2>
          <p>
            {totalComponents} components, {projects.length} guided projects, and {concepts.length} theory topics —
            all cross-linked, all free to explore.
          </p>
          <div className="landing-cta-band-actions">
            <Link to="/library" className="btn-primary">
              Open the Library <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link to="/projects" className="btn-secondary">
              Browse Projects
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
