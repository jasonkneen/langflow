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
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api/v1': {
        target: 'https://langflow-node-backend-tunnel-3qvfzqw0.devinapps.com',
        changeOrigin: true,
        secure: false,
        headers: {
          'Authorization': 'Basic ' + Buffer.from('user:990ae4614d5a31ece370727bb3174e45').toString('base64')
        }
      }
    }
  }
});
