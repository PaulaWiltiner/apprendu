
export default defineNuxtConfig({
  modules: ["@vite-pwa/nuxt"],
  plugins: [{ src: '~/plugins/vercelAnalytics.client.ts', mode: 'client' }],
  pwa: {
    manifest: {
      name: "aljkjd",
      short_name: "SVP",
      description: "snsknsks",
      icons: [{ src: "img/logo.png", type: "img/png" }],
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  css: [
    "katex/dist/katex.min.css",
    `assets/styles/main.scss`,
    `assets/styles/helpers.scss`,
    `assets/styles/components.scss`,
    "bootstrap/dist/css/bootstrap.min.css",
    "bootstrap-icons/font/bootstrap-icons.css",
  ],
  runtimeConfig: {
    public: {
      KEY_API: process.env.KEY_API,
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      SPREAD_SHEET_ID: process.env.SPREAD_SHEET_ID,
    },
  },
});
