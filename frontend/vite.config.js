import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // ADD THIS LINE - missing /v1 proxy
      '/v1': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      '/v2': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      '/backend-api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      '/api/image-tools': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/api/gemini': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
})
