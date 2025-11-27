// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/icon", "nuxt-auth-sanctum"],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ["./.pnpm-store/**"],
        usePolling: true,
      },
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
    app: {
      apiUrl: process.env["API_URL"],
    },
  },
  sanctum: {
    baseUrl: "http://localhost:8000",
    mode: "cookie",
    endpoints: {
      login: "/api/login",
    },
    // mode: "cookie",
  },
});
