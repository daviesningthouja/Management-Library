import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.lottie'], 
  server: {
    host: '0.0.0.0', // Allows connections from external IPs
    port: 5173, // Replace with your desired port if different
    cors: true,
    mimeTypes: {
      '.jsx': 'application/javascript', // Ensures .jsx is treated as JS
    },},
    build: {
      sourcemap: true, // Optional: Enable source maps for debugging (set to false if not needed)
    },
})
