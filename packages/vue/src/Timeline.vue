<script setup lang="ts">
import {
  timelineVariants,
  timelineItemVariants,
  timelinePointVariants,
  timelineConnectorVariants,
  timelineContentVariants,
  timelineTitleVariants,
  timelineTimeVariants,
  cn,
} from "@cui-universal/theme";
import { Check } from "lucide-vue-next";

export interface TimelineItem {
  id?: string | number;
  title: string;
  description?: string;
  time?: string;
  status?: "complete" | "current" | "upcoming" | "error" | "warning";
  icon?: any;
}

interface Props {
  items: TimelineItem[];
  orientation?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  orientation: "vertical",
  size: "md",
});
</script>

<template>
  <div :class="cn(timelineVariants({ orientation: props.orientation, size: props.size }), props.class)">
    <div
      v-for="(item, idx) in props.items"
      :key="item.id || idx"
      :class="cn(timelineItemVariants({ orientation: props.orientation }))"
    >
      <!-- Connector line (omitted on the last item) -->
      <div
        v-if="idx < props.items.length - 1"
        :class="cn(
          timelineConnectorVariants({
            orientation: props.orientation,
            size: props.size,
            status: item.status || 'upcoming',
          })
        )"
        aria-hidden="true"
      />

      <!-- Point / Badge -->
      <div :class="cn(timelinePointVariants({ status: item.status || 'upcoming', size: props.size }))">
        <Check v-if="item.status === 'complete'" class="h-3 w-3 stroke-[3]" />
        <component :is="item.icon" v-else-if="item.icon" class="h-3 w-3" />
        <span v-else>{{ idx + 1 }}</span>
      </div>

      <!-- Content -->
      <div :class="cn(timelineContentVariants({ orientation: props.orientation }))">
        <div
          :class="
            cn(
              'flex gap-2',
              props.orientation === 'vertical'
                ? 'items-center justify-between'
                : 'flex-col items-center text-center'
            )
          "
        >
          <h4 :class="cn(timelineTitleVariants({ size: props.size }))">{{ item.title }}</h4>
          <span v-if="item.time" :class="cn(timelineTimeVariants({ size: props.size }))">{{ item.time }}</span>
        </div>
        <p v-if="item.description" class="text-xs text-muted-foreground leading-relaxed mt-0.5">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>
