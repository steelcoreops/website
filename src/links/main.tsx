import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Links } from './Links';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Links />
  </StrictMode>,
);
