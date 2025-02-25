import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { builtinModules } from 'module';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    outDir: 'dist',
    // Add these for proper Electron packaging
    assetsDir: './',
    target: 'chrome114', // Replace with your Electron's Chrome version
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
      external: [...builtinModules, 'electron'],
    },
  },
  resolve: {
    alias: {
      'node:process': 'process/browser',
      'node:util': 'util',
    },
  },
});