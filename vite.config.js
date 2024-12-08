import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
        },
  },
  proxy: {
    '/login': 'http://localhost:3000',  // Proxy API calls to your Laravel backend
  },
  
})
