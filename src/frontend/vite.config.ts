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
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        headers: {
          'Authorization': 'Basic ' + Buffer.from('user:fbffeaaa6f83c708f77da667f0ac85ac').toString('base64')
        }
      }
    },
    hmr: {
      clientPort: 443,
      protocol: 'wss'
    }
  }
});
