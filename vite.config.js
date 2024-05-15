import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log("env", env)
  return {
    define: {
      'process.env.variables': JSON.stringify(env)
    },
    plugins: [react()],
  }
})