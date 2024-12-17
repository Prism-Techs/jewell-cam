
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5174,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@img': path.resolve(__dirname, './src/assets/img'),
      '@font': path.resolve(__dirname, './src/assets/fonts'),
      '@css': path.resolve(__dirname, './src/assets/css'),
      '@svg': path.resolve(__dirname, './src/assets/svg'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore certain warnings during build
        if (warning.code === 'MISSING_EXPORT') return;
        if (warning.code === 'CIRCULAR_DEPENDENCY') return;
        warn(warning);
      }
    }
  },
  plugins: [react()],
});
