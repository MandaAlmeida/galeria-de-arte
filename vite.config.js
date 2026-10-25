import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' gera caminhos relativos, então a pasta dist/ funciona em qualquer subpasta (ex.: GitHub Pages).
export default defineConfig({
  plugins: [react()],
  base: './'
});
