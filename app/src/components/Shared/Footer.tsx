import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span className="site-footer-brand">RoboCodex</span>
        <nav className="site-footer-links" aria-label="Learning resources">
          <Link to="/before-you-start">Before You Start</Link>
          <Link to="/glossary">Glossary</Link>
          <Link to="/common-mistakes">Common Mistakes</Link>
          <Link to="/concepts">Theory &amp; Concepts</Link>
        </nav>
        <span className="site-footer-credit">
          Developed by{' '}
          <a href="https://www.abasheshranabhat.com.np/" target="_blank" rel="noopener noreferrer">
            <strong>Abashesh Ranabhat</strong>
          </a>
        </span>
      </div>
    </footer>
  );
}
