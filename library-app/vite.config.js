import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.lottie'], 
  server: {
    mimeTypes: {
      '.jsx': 'application/javascript', // Ensures .jsx is treated as JS
    },}
})
