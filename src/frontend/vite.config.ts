import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api/v1': {
        target: 'https://user:27b101b130869c544b40d504b5c10fd5@langflow-node-backend-tunnel-6vw0k3kd.devinapps.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
});
