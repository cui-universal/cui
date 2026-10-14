/**
 * Nuxt 3 integration helper for @cui-universal/vue
 */
export const cuiNuxtModule = {
  name: "@cui-universal/vue/nuxt",
  configKey: "cui",
  setup(_options: any, nuxt: any) {
    // Inject @cui-universal/theme styles into Nuxt
    nuxt.options.css = nuxt.options.css || [];
    nuxt.options.css.push("@cui-universal/theme/styles.css");
  },
};

export default cuiNuxtModule;
