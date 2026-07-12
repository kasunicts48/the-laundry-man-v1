import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource/outfit/300.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/800.css';
import App from './App.tsx';
import './index.css';
import { pathHasHero, removeLcpHeroShell } from './utils/lcpHeroShell';

if (!pathHasHero(window.location.pathname)) {
  removeLcpHeroShell();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
