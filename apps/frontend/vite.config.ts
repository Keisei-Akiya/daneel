import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/solid-start/plugin/vite'
import viteSolid from 'vite-plugin-solid'
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig({
  plugins: [cloudflare({ viteEnvironment: { name: 'ssr' } }), tanstackStart(), viteSolid({ ssr: true })],
})
