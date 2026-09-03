import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:5000/api'
  const root = backendUrl.replace(/\/+$/, '').replace(/\/api$/, '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: root,
          changeOrigin: true,
        },
        '/uploads': {
          target: root,
          changeOrigin: true,
        },
      },
    },
  }
})
