import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

// This app is served both standalone (Vercel root) and mounted under
// /Robo_Codex on the main portfolio domain via a rewrite proxy. Deriving
// the basename from the actual URL lets one build serve both correctly.
const basename = window.location.pathname.startsWith('/Robo_Codex') ? '/Robo_Codex' : '/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
