// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig(({ command, mode }) => {
//   const env = loadEnv(mode, process.cwd(), '')
//   return {
//     plugins: [react()],
//     base: `${env.VITE_ASSET_URL}/`,
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})