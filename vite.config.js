import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  worker: {
    // Use ES modules for workers
    // format: 'es'
  },
  build: {
    // Ensure workers are properly bundled
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
});