import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/exercises': {
      target: 'https://mern-demo-front.onrender.com'
      } 
    }
  }
})