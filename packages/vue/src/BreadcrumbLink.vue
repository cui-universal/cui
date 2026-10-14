<script setup lang="ts">
import { breadcrumbLinkVariants, cn } from "@cui-universal/theme";

interface Props {
  href?: string;
  active?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
});
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :class="cn(breadcrumbLinkVariants({ active }), props.class)"
  >
    <slot />
  </a>
  <span
    v-else
    :class="cn(breadcrumbLinkVariants({ active }), props.class)"
  >
    <slot />
  </span>
</template>
