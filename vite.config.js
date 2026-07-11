import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Custom domain (kamrandev.me) is served from the site root, so assets
  // must resolve from "/", not a repo-name subpath.
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three:  ['three'],
          motion: ['framer-motion'],
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // three.js is dynamically imported (desktop-only, post-mount) so its
    // chunk is never on the critical/mobile path despite its raw size.
    chunkSizeWarningLimit: 750,
  },
})
