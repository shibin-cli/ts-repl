import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/ts-repl/',
  resolve:{
    alias: {
      '@': path.join(__dirname, './src')
    }
  },
  plugins: [vue()]
})
