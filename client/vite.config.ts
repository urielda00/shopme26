import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Needed for Docker to expose the port
    port: 5173,
    watch: {
      usePolling: true, // Essential for Hot Reload to work inside Docker volumes
    },
    proxy: {
      '/api': {
        target: 'http://backend:5000', // 'backend' is the service name from docker-compose
        changeOrigin: true,
        secure: false,
      },
    },
  },
});