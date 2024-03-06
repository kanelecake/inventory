import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@api': resolve(__dirname, './src/api'),
      '@components': resolve(__dirname, './src/components'),
      '@routes': resolve(__dirname, './src/routes'),
      '@stores': resolve(__dirname, './src/stores'),
      '@styles': resolve(__dirname, './src/styles'),
      '@views': resolve(__dirname, './src/views'),
      "@types": resolve(__dirname, './src/types'),
    },
  },
})
