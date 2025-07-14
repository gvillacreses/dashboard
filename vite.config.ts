import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/dashboard',
  plugins: [react(), VitePWA({
         registerType: 'autoUpdate',
         devOptions: {
            enabled: true
         }
      })
    ]
})
