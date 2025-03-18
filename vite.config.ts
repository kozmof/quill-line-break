import { defineConfig } from 'vite';
// Package
import pkg from './package.json';


// https://vite.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'index',
      fileName: 'index'
    },
    rollupOptions: {
      output: {
        interop: 'auto',
        globals: {
          quill: 'Quill',
          parchment: 'Parchment',
          'quill/modules/clipboard': 'Clipboard',
          'quill/blots/scroll': 'Scroll',
          'quill/blots/block': 'Block'
        }
      },
      external: [
        ...Object.keys(pkg.dependencies || {}),
        'parchment',
        'quill/modules/clipboard',
        'quill/blots/scroll',
        'quill/blots/block'
      ]
    }
  }
});
