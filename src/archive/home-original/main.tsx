import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import HomeOriginal from './HomeOriginal.tsx';
import '../../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomeOriginal />
  </StrictMode>,
);
