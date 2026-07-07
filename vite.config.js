import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        drp: resolve(__dirname, 'drp/index.html'),
        objectdetection: resolve(__dirname, 'objectdetection/index.html'),
        pubs: resolve(__dirname, 'pubs/index.html'),
      },
    },
  },
})