export default defineNuxtConfig({
  buildModules: ["@nuxtjs/pwa"],
  pwa: {
    manifest: {
      name: "Meu PWA",
      short_name: "PWA",
      description: "Meu Progressive Web App",
      theme_color: "#ffffff",
      start_url: "/home",
      background_color: "#ffffff",
      display: "standalone",
      icons: [
        {
          src: "img/welcome.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
  },
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
