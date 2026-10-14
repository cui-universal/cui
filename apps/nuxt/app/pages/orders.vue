<script setup lang="ts">
import { ref } from "vue";
import { Button, Card, CardContent, DatePicker } from "@cui-universal/vue";
import { Filter, Truck } from "lucide-vue-next";
import OrdersTable from "~/components/orders/OrdersTable.vue";
import { useCommerce } from "~/composables/useCommerce";

const { showToast } = useCommerce();
const selectedDate = ref("");

useHead({
  title: "Orders Fulfillment - CUI Commerce Admin",
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight">Orders Fulfillment</h1>
        <p class="text-xs sm:text-sm text-muted-foreground">
          Manage order verification, packaging, and dispatch tracking.
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <div class="w-40 sm:w-44">
          <DatePicker
            v-model="selectedDate"
            placeholder="Filter by date"
            @change="(d) => d && showToast(`Showing orders for ${d}`)"
          />
        </div>
        <Button variant="outline" size="sm" class="gap-1.5" @click="showToast('Filtering options applied!')">
          <Filter class="h-3.5 w-3.5" />
          <span>Filter</span>
        </Button>
        <Button size="sm" class="gap-1.5" @click="showToast('Batch shipping queued for selected orders!')">
          <Truck class="h-3.5 w-3.5" />
          <span>Batch Dispatch</span>
        </Button>
      </div>
    </div>

    <!-- Full Orders Table -->
    <Card>
      <CardContent class="p-0">
        <OrdersTable />
      </CardContent>
    </Card>
  </div>
</template>
