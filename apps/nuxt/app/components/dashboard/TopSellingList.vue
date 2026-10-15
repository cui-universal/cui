<script setup lang="ts">
import { useCommerce } from "~/composables/useCommerce";

const { products } = useCommerce();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Top Selling</CardTitle>
      <CardDescription>Highest revenue generators this week</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div v-for="item in products.slice(0, 4)" :key="item.id" class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 truncate">
          <div class="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center shrink-0 border border-border/80">
            <Icon name="lucide:box" class="h-4 w-4 text-primary" />
          </div>
          <div class="truncate">
            <p class="text-xs font-semibold truncate">{{ item.name }}</p>
            <p class="text-[10px] text-muted-foreground">{{ item.category }} • {{ item.sales }} sold</p>
          </div>
        </div>
        <div class="text-right shrink-0">
          <p class="text-xs font-bold">{{ item.price }}</p>
          <Badge :variant="item.stock > 10 ? 'outline' : 'warning'" class="text-[9px] px-1 py-0">
            {{ item.stock }} in stock
          </Badge>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
