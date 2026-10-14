<script setup lang="ts">
import { ref, computed } from "vue";
import { Button, Card, CardContent, Badge, Input } from "@cui-universal/vue";
import { Package, CheckCircle2, AlertTriangle, XCircle, Search, Trash2, CheckSquare } from "lucide-vue-next";
import AddProductDialog from "~/components/products/AddProductDialog.vue";
import ProductsTable from "~/components/products/ProductsTable.vue";
import { useCommerce } from "~/composables/useCommerce";

const { products, filteredProducts, selectedProducts, showToast, searchQuery, deleteProduct } = useCommerce();

const activeCategory = ref<string>("all");

const filterByCategory = (cat: string) => {
  activeCategory.value = cat;
  if (cat === "all") {
    searchQuery.value = "";
  } else {
    searchQuery.value = cat;
  }
};

const totalInStock = computed(() => products.value.filter((p) => p.inStock && p.stock > 0).length);
const totalLowStock = computed(() => products.value.filter((p) => p.stock <= 10 && p.stock > 0).length);
const totalOutOfStock = computed(() => products.value.filter((p) => p.stock === 0 || !p.inStock).length);

const handleBatchDelete = () => {
  const count = selectedProducts.value.length;
  selectedProducts.value.forEach((id) => deleteProduct(id));
  selectedProducts.value = [];
  showToast(`Deleted ${count} products`);
};

useHead({
  title: "Products & Inventory - CUI Commerce Admin",
});
</script>

<template>
  <div class="space-y-6">
    <!-- Header with Quick Action -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight">Catalog & Inventory</h1>
        <p class="text-xs sm:text-sm text-muted-foreground">
          Monitor warehouse quantities, pricing, and live customer availability.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <AddProductDialog />
      </div>
    </div>

    <!-- Inventory Metric Summary Chips -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <Card class="p-3 sm:p-4 cursor-pointer hover:border-primary/50 transition-colors" @click="filterByCategory('all')">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-muted-foreground">Total SKUs</span>
          <Package class="h-4 w-4 text-muted-foreground" />
        </div>
        <div class="text-xl sm:text-2xl font-black mt-1">{{ products.length }}</div>
        <p class="text-[10px] text-muted-foreground mt-0.5">Full product catalog</p>
      </Card>

      <Card class="p-3 sm:p-4 cursor-pointer hover:border-emerald-500/50 transition-colors" @click="filterByCategory('In Stock')">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-emerald-500">In Stock</span>
          <CheckCircle2 class="h-4 w-4 text-emerald-500" />
        </div>
        <div class="text-xl sm:text-2xl font-black mt-1 text-emerald-500">{{ totalInStock }}</div>
        <p class="text-[10px] text-muted-foreground mt-0.5">Ready for shipment</p>
      </Card>

      <Card class="p-3 sm:p-4 cursor-pointer hover:border-amber-500/50 transition-colors" @click="filterByCategory('Low Stock')">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-amber-500">Low Stock</span>
          <AlertTriangle class="h-4 w-4 text-amber-500" />
        </div>
        <div class="text-xl sm:text-2xl font-black mt-1 text-amber-500">{{ totalLowStock }}</div>
        <p class="text-[10px] text-muted-foreground mt-0.5">Restock recommended</p>
      </Card>

      <Card class="p-3 sm:p-4 cursor-pointer hover:border-destructive/50 transition-colors" @click="filterByCategory('Out of Stock')">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-destructive">Out of Stock</span>
          <XCircle class="h-4 w-4 text-destructive" />
        </div>
        <div class="text-xl sm:text-2xl font-black mt-1 text-destructive">{{ totalOutOfStock }}</div>
        <p class="text-[10px] text-muted-foreground mt-0.5">Unavailable for order</p>
      </Card>
    </div>

    <!-- Search & Filter Controls -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div class="relative flex-1 max-w-sm">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          v-model="searchQuery"
          placeholder="Search products by name, category, SKU..."
          class="pl-9 h-9 text-xs"
        />
      </div>

      <!-- Batch Selection Action Bar -->
      <div v-if="selectedProducts.length > 0" class="flex items-center gap-2">
        <Badge variant="secondary" class="font-mono text-xs">
          {{ selectedProducts.length }} selected
        </Badge>
        <Button variant="destructive" size="sm" class="h-8 gap-1 text-xs" @click="handleBatchDelete">
          <Trash2 class="h-3 w-3" />
          <span>Delete Selected</span>
        </Button>
      </div>
    </div>

    <!-- Products Table -->
    <Card>
      <CardContent class="p-0">
        <ProductsTable />
      </CardContent>
    </Card>

    <!-- Table Footer Info -->
    <div class="flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2 px-1">
      <div>
        Showing {{ filteredProducts.length }} of {{ products.length }} catalog items
      </div>
      <div class="flex items-center gap-2">
        <span>Catalog updated live from warehouse inventory</span>
      </div>
    </div>
  </div>
</template>
