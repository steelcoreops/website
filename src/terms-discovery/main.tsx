import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TermsDiscovery } from './TermsDiscovery';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TermsDiscovery />
  </StrictMode>,
);
