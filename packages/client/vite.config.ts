import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3001,
    proxy: {
      '/api': 'http://localhost:3000',
      '/assets': 'http://localhost:3000',
    },
  },
  build: {
    outDir: 'build',
    commonjsOptions: {
      include: [/balanced-gym-model/, /node_modules/],
    },
  },
  optimizeDeps: {
    include: ['balanced-gym-model'],
  },
});
