// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@pinia/nuxt", "@nuxt-alt/proxy"],
  runtimeConfig: {
    public: {
      serverBaseUrl: process.env.SERVER_BASE_URL,
    },
  },
  proxy: {
    enableProxy: true,
    proxies: {
      "/api": {
        target: process.env.SERVER_BASE_URL,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
  },
});
