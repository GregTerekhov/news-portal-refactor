import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
  },
  resolve: {
    alias: {
      assets: resolve(__dirname, './src/assets/'),
      components: resolve(__dirname, './src/components'),
      config: resolve(__dirname, './src/config'),
      constants: resolve(__dirname, './src/constants'),
      contexts: resolve(__dirname, './src/contexts'),
      helpers: resolve(__dirname, './src/helpers'),
      hooks: resolve(__dirname, './src/hooks'),
      layouts: resolve(__dirname, './src/layouts'),
      pages: resolve(__dirname, './src/pages'),
      reduxStore: resolve(__dirname, './src/redux'),
      routes: resolve(__dirname, './src/routes'),
      types: resolve(__dirname, './src/types'),
      ui: resolve(__dirname, './src/ui'),
    },
  },
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    tsconfigPaths(),
  ],
});
