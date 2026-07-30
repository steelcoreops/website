import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import About from './About.tsx';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <About />
  </StrictMode>,
);
