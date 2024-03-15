import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'




const manifest: VitePWAOptions['manifest'] = {
  name: 'PWA Inject Manifest',
  short_name: 'PWA Inject',
  theme_color: '#ffffff',
  icons: [
    {
      src: 'pwa-192x192.png', // <== don't add slash, for testing
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/pwa-512x512.png', // <== don't remove slash, for testing
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: 'pwa-512x512.png', // <== don't add slash, for testing
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
}



const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  devOptions: {
    // enable PWA in dev mode
    enabled: true,
    type: 'module',
    navigateFallback: 'index.html',
  },
  strategies: 'injectManifest',
  /* injectManifest: {
    minify: false,
    enableWorkboxModulesLogs: true,
  }, */
  srcDir: 'src/service-worker',
  filename: 'service-worker.ts',
  injectRegister: 'script',
  manifest: false,
  //manifest: manifest,
  //manifest: false,
  base: '/',
  includeAssets: ['favicon.svg'],
}





// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(pwaOptions),
  ],
})
