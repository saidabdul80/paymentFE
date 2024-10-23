import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';
import path from 'path';

// Determine the publicPath based on the deployment URL


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
  ],
  cacheDir: './node_modules/.vite_cache',
  build: {
    minify: 'esbuild', // default is 'terser', 'esbuild' is faster
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Split vendor modules
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@':  path.resolve(__dirname, "src"),
    }
  },
  base: '/',
});
