<script setup lang="ts">
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Switch } from "@cui-universal/vue";
import AddProductDialog from "~/components/products/AddProductDialog.vue";
import { useCommerce } from "~/composables/useCommerce";

const { products, showToast } = useCommerce();

useHead({
  title: "Products & Inventory - CUI Commerce Admin",
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight">Catalog & Inventory</h1>
        <p class="text-xs sm:text-sm text-muted-foreground">
          Monitor warehouse quantities, pricing, and live customer availability.
        </p>
      </div>
      <AddProductDialog />
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card v-for="product in products" :key="product.id" class="flex flex-col justify-between">
        <CardHeader>
          <div class="flex items-center justify-between">
            <Badge variant="outline" class="font-mono text-[10px]">{{ product.sku || product.id }}</Badge>
            <Badge :variant="product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'destructive'">
              {{ product.status }}
            </Badge>
          </div>
          <CardTitle class="mt-2">{{ product.name }}</CardTitle>
          <CardDescription>{{ product.category }} • {{ product.sales }} units sold</CardDescription>
        </CardHeader>
        <CardContent class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xl font-black">{{ product.price }}</span>
            <span class="text-xs font-semibold text-muted-foreground">{{ product.stock }} units remaining</span>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-border/60">
            <span class="text-xs font-medium">In-Stock Switch:</span>
            <Switch
              v-model="product.inStock"
              @update:checked="(val) => showToast(`${product.name} is now ${val ? 'Active' : 'Hidden'}`)"
            />
          </div>
        </CardContent>
        <CardFooter class="border-t border-border/50 pt-4">
          <Button variant="outline" size="sm" class="w-full text-xs" @click="showToast(`Editing ${product.name}`)">
            Edit Inventory
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
