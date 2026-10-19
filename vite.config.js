import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

function cloudflareSpaFallback() {
  return {
    name: 'cloudflare-spa-fallback',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, path.join(distDir, '200.html'));
        fs.copyFileSync(indexPath, path.join(distDir, '404.html'));
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflareSpaFallback()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/lucide-react') || id.includes('node_modules/lenis')) {
            return 'vendor-ui';
          }
        }
      }
    }
  }
})
