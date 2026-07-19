import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import RouteFallback from './components/Shared/RouteFallback';
import ScrollToTop from './components/Shared/ScrollToTop';

const LandingPage = lazy(() => import('./components/Landing/LandingPage'));
const ComponentLibrary = lazy(() => import('./components/Library/ComponentLibrary'));
const ComponentWorkspace = lazy(() => import('./components/Workspace/ComponentWorkspace'));
const ProjectLibrary = lazy(() => import('./components/Projects/ProjectLibrary'));
const ProjectWorkspace = lazy(() => import('./components/Projects/ProjectWorkspace'));
const GlossaryPage = lazy(() => import('./components/Glossary/GlossaryPage'));
const BeforeYouStartPage = lazy(() => import('./components/Guide/BeforeYouStartPage'));
const CommonMistakesPage = lazy(() => import('./components/Guide/CommonMistakesPage'));
const ConceptLibrary = lazy(() => import('./components/Concepts/ConceptLibrary'));
const ConceptWorkspace = lazy(() => import('./components/Concepts/ConceptWorkspace'));

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/library" element={<ComponentLibrary />} />
        <Route path="/component/:id" element={<ComponentWorkspace />} />
        <Route path="/projects" element={<ProjectLibrary />} />
        <Route path="/projects/:id" element={<ProjectWorkspace />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/before-you-start" element={<BeforeYouStartPage />} />
        <Route path="/common-mistakes" element={<CommonMistakesPage />} />
        <Route path="/concepts" element={<ConceptLibrary />} />
        <Route path="/concepts/:id" element={<ConceptWorkspace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
