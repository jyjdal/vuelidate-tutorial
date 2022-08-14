// noinspection JSUnusedGlobalSymbols

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import vuetify from "@vuetify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: { "process.env": {} },
  css: {
    devSourcemap: true,
  },
  server: {
    port: 3000,
  },
});
