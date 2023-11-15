// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
    `assets/styles/main.scss`,
    `assets/styles/helpers.scss`,
    `assets/styles/components.scss`,
    "bootstrap/dist/css/bootstrap.min.css",
    "bootstrap-icons/font/bootstrap-icons.css",
  ],
  nitro: {
    prerender: {
      routes: ["/home"],
    },
  },
  runtimeConfig: {
    public: {
      KEY_API: process.env.KEY_API,
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      SPREAD_SHEET_ID: process.env.SPREAD_SHEET_ID,
    },
  },
});
