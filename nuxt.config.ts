// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/icon", "@vueuse/nuxt"],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ["./.pnpm-store/**"],
        usePolling: true,
      },
      allowedHosts: ["darling-fun-krill.ngrok-free.app"],
    },
  },
  css: ["./app/tailwind.css"],
  typescript: {
    typeCheck: true,
  },
  components: {
    global: true,
    dirs: ["~/components", "~/components/common"],
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env["API_URL"],
    },
  },
});
