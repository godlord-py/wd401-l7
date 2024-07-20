import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    devOptions: {
      enabled: true // For making sure that the PWA is testable from the Local dev environment
    },
    registerType: 'autoUpdate',
    manifest: {
      name: "Sports News 301",
      short_name: "Sports 301",
      icons: [
        {
          "src": "/favicon.ico",
          "sizes": "64x64 32x32 24x24 16x16",
          "type": "image/x-icon"
        },
        {
          "src": "/favicon-16x16.png",
          "type": "image/png",
          "sizes": "16x16"
        },
        {
          "src": "/favicon-32x32.png",
          "type": "image/png",
          "sizes": "32x32"
        },
        {
          "src": "/pwa-192x192.png",
          "type": "image/png",
          "sizes": "192x192"
        },
        {
          "src": "/pwa-512x512.png",
          "type": "image/png",
          "sizes": "512x512",
          "purpose": "any maskable" // Icon format that ensures that your PWA icon looks great on all Android devices
        }
      ],
      theme_color: '#AAF',
    },
    base: "/vite-react-deploy/",
  }),
  sentryVitePlugin({
    org: "gh-raisoni-college-of-engin-h5",
    project: "sportnewsapp",
  }),
],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },

  build: {
    sourcemap: true
  }
});