// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  plugins: ["@/plugins/notification.client.ts"],
  spaLoadingTemplate: false,
  css: [
    `assets/styles/main.scss`,
    `assets/styles/helpers.scss`,
    `assets/styles/components.scss`,
    "bootstrap/dist/css/bootstrap.min.css",
    "bootstrap-icons/font/bootstrap-icons.css",
  ],
  nitro: {
    prerender: {
      routes: ["/home", "/login", "/welcome"],
    },
  },
  runtimeConfig: {
    public: {
      KEY_API: process.env.KEY_API,
    },
  },
});
