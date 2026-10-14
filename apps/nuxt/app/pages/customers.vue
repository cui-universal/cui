<script setup lang="ts">
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Avatar, AvatarImage, AvatarFallback } from "@cui-universal/vue";
import { useCommerce } from "~/composables/useCommerce";

const { orders, showToast } = useCommerce();

useHead({
  title: "Customers Directory - CUI Commerce Admin",
});
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl sm:text-3xl font-black tracking-tight">Customers Directory</h1>
      <p class="text-xs sm:text-sm text-muted-foreground">
        Profiles, lifetime order values, and account status.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card v-for="order in orders" :key="order.email">
        <CardHeader class="flex flex-row items-center gap-3 space-y-0">
          <Avatar class="h-10 w-10">
            <AvatarImage :src="order.avatar" />
            <AvatarFallback>{{ order.initials }}</AvatarFallback>
          </Avatar>
          <div class="truncate">
            <CardTitle class="text-sm truncate">{{ order.customer }}</CardTitle>
            <CardDescription class="text-xs truncate">{{ order.email }}</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="space-y-2 text-xs">
          <div class="flex justify-between py-1 border-b border-border/50">
            <span class="text-muted-foreground">Primary Payment:</span>
            <span class="font-mono font-medium">{{ order.payment }}</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-muted-foreground">Total Spend:</span>
            <span class="font-bold text-primary">{{ order.amount }}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" class="w-full text-xs" @click="showToast(`Contacting ${order.customer}`)">
            View Customer Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
