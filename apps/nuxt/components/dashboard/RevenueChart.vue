<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Progress } from "@cui-universal/vue";

const salesGoalProgress = 78;
const currentMonthRevenue = "$98,450.00";
const targetRevenue = "$125,000.00";

const weeklyStats = [
  { day: "Mon", height: "45%" },
  { day: "Tue", height: "60%" },
  { day: "Wed", height: "75%" },
  { day: "Thu", height: "90%" },
  { day: "Fri", height: "68%" },
  { day: "Sat", height: "85%" },
  { day: "Sun", height: "100%", isHighlight: true },
];
</script>

<template>
  <Card class="lg:col-span-2">
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <CardTitle>Monthly Revenue Target</CardTitle>
          <CardDescription>Target pacing for October 2026 fiscal cycle</CardDescription>
        </div>
        <Badge variant="success" class="gap-1 font-mono">
          <span>{{ salesGoalProgress }}% of goal</span>
        </Badge>
      </div>
    </CardHeader>
    <CardContent class="space-y-6">
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs">
          <span class="font-semibold">Current: {{ currentMonthRevenue }}</span>
          <span class="text-muted-foreground font-mono">Goal: {{ targetRevenue }}</span>
        </div>
        <Progress :model-value="salesGoalProgress" class="h-2.5" />
      </div>

      <!-- Weekly Gross Sales Volume Bars -->
      <div class="pt-2 border-t border-border/60">
        <p class="text-xs font-semibold mb-3">Weekly Gross Sales Volume</p>
        <div class="grid grid-cols-7 gap-2 items-end h-28 pt-2">
          <div v-for="item in weeklyStats" :key="item.day" class="flex flex-col items-center gap-1.5 h-full justify-end group">
            <div
              :class="[
                'w-full transition-all rounded-t-md',
                item.isHighlight ? 'bg-primary group-hover:bg-primary/90' : 'bg-primary/20 group-hover:bg-primary',
              ]"
              :style="{ height: item.height }"
            />
            <span
              :class="[
                'text-[10px] font-mono',
                item.isHighlight ? 'text-primary font-bold' : 'text-muted-foreground',
              ]"
            >
              {{ item.day }}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
