import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const rootElement = document.getElementById('root')!;

// Only hydrate in production when pre-rendered HTML actually exists.
// In development, always use standard createRoot to support HMR and avoid comment-node mismatches.
if (import.meta.env.PROD && rootElement.firstElementChild) {
  hydrateRoot(
    rootElement,
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
