<script setup lang="ts">
import {
  timelineVariants,
  timelineItemVariants,
  timelinePointVariants,
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
  status?: "complete" | "current" | "upcoming";
  icon?: any;
}

interface Props {
  items: TimelineItem[];
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn(timelineVariants(), props.class)">
    <div
      v-for="(item, idx) in items"
      :key="item.id || idx"
      :class="cn(timelineItemVariants())"
    >
      <!-- Point / Badge -->
      <div :class="cn(timelinePointVariants({ status: item.status || 'upcoming' }))">
        <Check v-if="item.status === 'complete'" class="h-3 w-3 stroke-[3]" />
        <component :is="item.icon" v-else-if="item.icon" class="h-3 w-3" />
        <span v-else class="h-1.5 w-1.5 rounded-full bg-current" />
      </div>

      <!-- Content -->
      <div :class="cn(timelineContentVariants())">
        <div class="flex items-center justify-between gap-2">
          <h4 :class="cn(timelineTitleVariants())">{{ item.title }}</h4>
          <span v-if="item.time" :class="cn(timelineTimeVariants())">{{ item.time }}</span>
        </div>
        <p v-if="item.description" class="text-xs text-muted-foreground leading-relaxed">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>
