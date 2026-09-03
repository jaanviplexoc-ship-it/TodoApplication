import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 
function copyIndexTo404() {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const distDir = resolve(process.cwd(), 'dist')
      copyFileSync(resolve(distDir, 'index.html'), resolve(distDir, '404.html'))
    },
  }
}
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyIndexTo404()],
  base: "/ToDo_App/",
})
 