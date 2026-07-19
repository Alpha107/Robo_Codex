import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Keyed by React Router's per-history-entry location.key. We can't just read
// window.scrollY when landing on the *new* route and attribute it to the page
// we just left — the browser clamps the scroll offset the instant the new
// (often shorter) page's DOM mounts, so that value is already stale. Instead
// we continuously record the scroll offset of whichever page is currently
// displayed, so the value is fresh at the moment the user actually navigates.
const scrollPositions = new Map<string, number>();

export default function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const currentKeyRef = useRef(location.key);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    currentKeyRef.current = location.key;

    if (navigationType === 'POP') {
      const saved = scrollPositions.get(location.key) ?? 0;
      // Wait a couple of frames so the new route's content has laid out
      // (especially for lazy/Suspense-loaded pages) before we scroll to it.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, saved);
        });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, navigationType]);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        scrollPositions.set(currentKeyRef.current, window.scrollY);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
