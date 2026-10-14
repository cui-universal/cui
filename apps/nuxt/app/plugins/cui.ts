import { CUIPlugin } from "@cui-universal/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(CUIPlugin, { prefix: "" });
});
