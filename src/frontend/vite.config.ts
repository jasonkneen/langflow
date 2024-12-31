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
        target: 'https://langflow-node-backend-tunnel-5dchn7qw.devinapps.com',
        changeOrigin: true,
        secure: true,
        headers: {
          'Authorization': 'Basic ' + Buffer.from('user:d85f131ca9292ff559b9f941a96a3374').toString('base64')
        }
      }
    },
    hmr: {
      clientPort: 443,
      protocol: 'wss'
    }
  }
});
