/**
 * Nuxt 3 integration helper for @cui/vue
 */
export const cuiNuxtModule = {
  name: "@cui/vue/nuxt",
  configKey: "cui",
  setup(_options: any, nuxt: any) {
    // Inject @cui/theme styles into Nuxt
    nuxt.options.css = nuxt.options.css || [];
    nuxt.options.css.push("@cui/theme/styles.css");
  },
};

export default cuiNuxtModule;
