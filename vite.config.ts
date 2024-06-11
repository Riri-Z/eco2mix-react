import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    watch:{
      usePolling:true
    },
    host:true,
    strictPort:true,
    port: 5173
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
