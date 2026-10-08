import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WebSummit } from './WebSummit';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebSummit />
  </StrictMode>,
);
