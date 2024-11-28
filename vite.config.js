import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/login': 'http://localhost:3000',  // Proxy API calls to your Laravel backend
  },
  
})
