import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        mtcProposal: path.resolve(__dirname, 'proposals/master-the-curriculum/index.html'),
        mtcDiscovery: path.resolve(__dirname, 'proposals/master-the-curriculum/discovery/index.html'),
        termsDiscovery: path.resolve(__dirname, 'terms-discovery/index.html'),
        privacy: path.resolve(__dirname, 'privacy/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
