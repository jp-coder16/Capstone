import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy is only used as fallback for relative /api calls.
    // Axios uses the absolute VITE_API_URL so this is a safety net only.
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // No rewrite — backend expects the /api prefix
      }
    }
  }
})
