import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.lottie'], 
  build: {
    outDir: 'dist', // Default Vite output folder
    sourcemap: true, // Optional: Enable for debugging
  },
  server: {
    host: '0.0.0.0', // Allows connections from external IPs
    port: 5173, // Replace with your desired port if different
    cors: true,
   },
   
})
