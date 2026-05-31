import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DiscoveryReport } from './DiscoveryReport';
import '../../../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DiscoveryReport />
  </StrictMode>,
);
