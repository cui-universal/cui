<script setup lang="ts">
import { ref, computed } from "vue";
import { Users, Crown, UserCheck, DollarSign, Search, Download, UserPlus, Trash2 } from "lucide-vue-next";
import CustomersTable from "~/components/customers/CustomersTable.vue";
import { useCommerce } from "~/composables/useCommerce";

const { customers, filteredCustomers, selectedCustomers, showToast, searchQuery, deleteCustomer } = useCommerce();

const totalVIP = computed(() => customers.value.filter((c) => c.status === "VIP").length);
const totalActive = computed(() => customers.value.filter((c) => c.status === "Active" || c.status === "VIP").length);

const filterByStatus = (status: string) => {
  if (status === "all") {
    searchQuery.value = "";
  } else {
    searchQuery.value = status;
  }
};

const handleBatchDelete = () => {
  const count = selectedCustomers.value.length;
  selectedCustomers.value.forEach((id) => deleteCustomer(id));
  selectedCustomers.value = [];
  showToast(`Removed ${count} customers`);
};

useHead({
  title: "Customers Directory - CUI Commerce Admin",
});
</script>

<template>
  <div class="space-y-6">
    <!-- Header with Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight">Customers Directory</h1>
        <p class="text-xs sm:text-sm text-muted-foreground">
          Profiles, lifetime order values, account status, and purchase activity.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" class="gap-1.5" @click="showToast('Exporting customer records as CSV...')">
          <Download class="h-3.5 w-3.5" />
          <span>Export CSV</span>
        </Button>
        <Button size="sm" class="gap-1.5" @click="showToast('Add customer drawer/modal opened!')">
          <UserPlus class="h-3.5 w-3.5" />
          <span>Add Customer</span>
        </Button>
      </div>
    </div>

    <!-- Customer Metric Summary Chips -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <Card class="p-3 sm:p-4 cursor-pointer hover:border-primary/50 transition-colors" @click="filterByStatus('all')">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-muted-foreground">Total Customers</span>
          <Users class="h-4 w-4 text-muted-foreground" />
        </div>
        <div class="text-xl sm:text-2xl font-black mt-1">{{ customers.length }}</div>
        <p class="text-[10px] text-muted-foreground mt-0.5">Verified customer accounts</p>
      </Card>

      <Card class="p-3 sm:p-4 cursor-pointer hover:border-primary/50 transition-colors" @click="filterByStatus('VIP')">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-primary">VIP High-Value</span>
          <Crown class="h-4 w-4 text-primary" />
        </div>
        <div class="text-xl sm:text-2xl font-black mt-1 text-primary">{{ totalVIP }}</div>
        <p class="text-[10px] text-muted-foreground mt-0.5">&gt;$2,000 spend tier</p>
      </Card>

      <Card class="p-3 sm:p-4 cursor-pointer hover:border-emerald-500/50 transition-colors" @click="filterByStatus('Active')">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-emerald-500">Active Accounts</span>
          <UserCheck class="h-4 w-4 text-emerald-500" />
        </div>
        <div class="text-xl sm:text-2xl font-black mt-1 text-emerald-500">{{ totalActive }}</div>
        <p class="text-[10px] text-muted-foreground mt-0.5">Purchased in last 30d</p>
      </Card>

      <Card class="p-3 sm:p-4 cursor-pointer hover:border-primary/50 transition-colors">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-muted-foreground">Avg Lifetime Value</span>
          <DollarSign class="h-4 w-4 text-muted-foreground" />
        </div>
        <div class="text-xl sm:text-2xl font-black mt-1">$1,173</div>
        <p class="text-[10px] text-muted-foreground mt-0.5">Per registered customer</p>
      </Card>
    </div>

    <!-- Search & Filter Controls -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div class="relative flex-1 max-w-sm">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          v-model="searchQuery"
          placeholder="Search by name, email, location..."
          class="pl-9 h-9 text-xs"
        />
      </div>

      <!-- Batch Selection Action Bar -->
      <div v-if="selectedCustomers.length > 0" class="flex items-center gap-2">
        <Badge variant="secondary" class="font-mono text-xs">
          {{ selectedCustomers.length }} selected
        </Badge>
        <Button variant="destructive" size="sm" class="h-8 gap-1 text-xs" @click="handleBatchDelete">
          <Trash2 class="h-3 w-3" />
          <span>Remove Selected</span>
        </Button>
      </div>
    </div>

    <!-- Customers Table -->
    <Card>
      <CardContent class="p-0">
        <CustomersTable />
      </CardContent>
    </Card>

    <!-- Table Footer Info -->
    <div class="flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2 px-1">
      <div>
        Showing {{ filteredCustomers.length }} of {{ customers.length }} registered customers
      </div>
      <div class="flex items-center gap-2">
        <span>Customer privacy protected under GDPR & CCPA</span>
      </div>
    </div>
  </div>
</template>
