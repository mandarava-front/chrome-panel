import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {crx} from '@crxjs/vite-plugin'
import manifest from './mainfest.json'
import { resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    crx({manifest})
  ],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname,'index.html'),
        devtools: resolve(__dirname,'devtools.html'),
        panel: resolve(__dirname,'panel.html')

      },

    },
    outDir: resolve(__dirname,'dist')
   
  }
})
