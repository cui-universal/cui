<script setup lang="ts">
import type { Component } from "vue";
import { Card, CardHeader, CardTitle, CardContent } from "@cui-universal/vue";
import { ArrowUpRight, ArrowDownRight } from "lucide-vue-next";

defineProps<{
  title: string;
  value: string;
  change: string;
  subtext: string;
  trend?: "up" | "down";
  icon: Component;
  iconBgClass?: string;
}>();
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle class="text-xs font-semibold text-muted-foreground">{{ title }}</CardTitle>
      <div :class="['h-8 w-8 rounded-xl flex items-center justify-center', iconBgClass || 'bg-primary/10 text-primary']">
        <component :is="icon" class="h-4 w-4" />
      </div>
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-black tracking-tight">{{ value }}</div>
      <div class="flex items-center gap-1.5 mt-1 text-[11px] font-semibold" :class="trend === 'down' ? 'text-destructive' : 'text-emerald-500'">
        <ArrowDownRight v-if="trend === 'down'" class="h-3.5 w-3.5" />
        <ArrowUpRight v-else class="h-3.5 w-3.5" />
        <span>{{ change }}</span>
        <span class="text-muted-foreground font-normal">{{ subtext }}</span>
      </div>
    </CardContent>
  </Card>
</template>
