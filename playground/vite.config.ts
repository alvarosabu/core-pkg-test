import { defineConfig } from 'vite';
import { resolve } from 'pathe';

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@alvarosabu/core-pkg-test': resolve(__dirname, '../src/index.ts'),
    },
    dedupe: ['three'],
  },
});