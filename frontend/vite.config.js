import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'; // Make sure to import VitePWA from vite-plugin-pwa


// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000  ,
        proxy: {
            '/api': {
              target: 'http://localhost:3001',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          manifest: {
            name: 'List App',
            short_name: 'List',
            description: 'An app to create and use different lists',
            theme_color: '#1b4121',
            icons: []
          }
        })
      ]
})
