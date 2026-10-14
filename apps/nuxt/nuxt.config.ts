// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  experimental: {
    appManifest: false,
  },


  css: [
    "~/assets/css/tailwind.css",
  ],

  modules: [
    "@nuxtjs/tailwindcss",
  ],

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "~~/tailwind.config.ts",
  },

  vite: {
    optimizeDeps: {
      include: ["@cui-universal/vue", "@cui-universal/theme", "lucide-vue-next"],
    },
  },

  app: {
    head: {
      title: "CUI Nuxt 3 Demo - Universal UI from Public npm",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Nuxt 3 application consuming @cui-universal/vue and @cui-universal/theme published on npm",
        },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap",
        },
      ],
    },
  },
});
