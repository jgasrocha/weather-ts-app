import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// @ts-expect-error
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
})
