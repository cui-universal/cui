<script setup lang="ts">
import { Badge, Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@cui-universal/vue";
import { DollarSign, ShoppingBag, Users, TrendingUp, RefreshCw } from "lucide-vue-next";
import MetricCard from "~/components/dashboard/MetricCard.vue";
import RevenueChart from "~/components/dashboard/RevenueChart.vue";
import TopSellingList from "~/components/dashboard/TopSellingList.vue";
import OrdersTable from "~/components/orders/OrdersTable.vue";
import { useCommerce } from "~/composables/useCommerce";

const { showToast } = useCommerce();

useHead({
  title: "Dashboard Overview - CUI Commerce Admin",
});
</script>

<template>
  <div class="space-y-8">
    <!-- Header title + quick refresh -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight">Overview Dashboard</h1>
        <p class="text-xs sm:text-sm text-muted-foreground">
          Real-time storefront performance, revenue metrics, and order fulfillment.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <Badge variant="outline" class="gap-1.5 py-1 px-2.5">
          <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Realtime Sync</span>
        </Badge>
        <Button variant="ghost" size="sm" @click="showToast('Data refreshed!')" class="h-8 gap-1.5 text-xs text-muted-foreground">
          <RefreshCw class="h-3 w-3" />
          <span>Sync</span>
        </Button>
      </div>
    </div>

    <!-- 4 KPI Metrics Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      <MetricCard
        title="Total Revenue"
        value="$128,430.00"
        change="+14.2%"
        subtext="vs last month"
        trend="up"
        :icon="DollarSign"
        icon-bg-class="bg-primary/10 text-primary"
      />
      <MetricCard
        title="Total Orders"
        value="2,845"
        change="+8.5%"
        subtext="vs last month"
        trend="up"
        :icon="ShoppingBag"
        icon-bg-class="bg-sky-500/10 text-sky-500"
      />
      <MetricCard
        title="Active Customers"
        value="14,290"
        change="+22.1%"
        subtext="vs last month"
        trend="up"
        :icon="Users"
        icon-bg-class="bg-indigo-500/10 text-indigo-500"
      />
      <MetricCard
        title="Conversion Rate"
        value="3.42%"
        change="+0.8%"
        subtext="avg. 120s checkout"
        trend="up"
        :icon="TrendingUp"
        icon-bg-class="bg-amber-500/10 text-amber-500"
      />
    </div>

    <!-- Revenue Target Chart & Top Selling List -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <RevenueChart />
      <TopSellingList />
    </div>

    <!-- Recent Orders Table Section -->
    <Card>
      <!-- <CardHeader>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer purchases across web and mobile channels</CardDescription>
          </div>
          <div class="flex items-center gap-2">
            <NuxtLink to="/orders">
              <Button variant="outline" size="sm" class="text-xs">
                View All Orders
              </Button>
            </NuxtLink>
          </div>
        </div>
      </CardHeader> -->
      <CardContent class="p-0">
        <OrdersTable />
      </CardContent>
    </Card>
  </div>
</template>
