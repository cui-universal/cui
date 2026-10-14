<script setup lang="ts">
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Switch } from "@cui-universal/vue";
import { useCommerce } from "~/composables/useCommerce";

const { showToast } = useCommerce();

const autoFulfill = ref(true);
const lowStockAlert = ref(true);
const internationalShipping = ref(false);

useHead({
  title: "Store Settings - CUI Commerce Admin",
});
</script>

<template>
  <div class="max-w-2xl space-y-6">
    <div>
      <h1 class="text-2xl sm:text-3xl font-black tracking-tight">Store Preferences</h1>
      <p class="text-xs sm:text-sm text-muted-foreground">
        Configure tax rates, checkout options, and notifications.
      </p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Checkout & Ordering</CardTitle>
        <CardDescription>Adjust online shopping rules and notifications</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-secondary/30">
          <div>
            <p class="text-xs font-semibold">Automatic Order Fulfillment</p>
            <p class="text-[10px] text-muted-foreground">Send digital keys or dispatch warehouse immediately on payment</p>
          </div>
          <Switch v-model="autoFulfill" />
        </div>

        <div class="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-secondary/30">
          <div>
            <p class="text-xs font-semibold">Low Stock Email Alerts</p>
            <p class="text-[10px] text-muted-foreground">Receive digest when product quantity drops below 5 units</p>
          </div>
          <Switch v-model="lowStockAlert" />
        </div>

        <div class="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-secondary/30">
          <div>
            <p class="text-xs font-semibold">International Shipping Rates</p>
            <p class="text-[10px] text-muted-foreground">Enable worldwide rate calculations at checkout</p>
          </div>
          <Switch v-model="internationalShipping" />
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm" @click="showToast('Preferences saved successfully!')">
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
