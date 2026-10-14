<script setup lang="ts">
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Checkbox,
  Badge,
  Button,
  Switch,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@cui-universal/vue";
import { MoreVertical, Edit2, Plus, Copy, Trash2, PackageCheck, AlertTriangle } from "lucide-vue-next";
import { useCommerce } from "~/composables/useCommerce";

const { filteredProducts, selectedProducts, showToast, toggleProductStock, deleteProduct } = useCommerce();

const toggleSelectAll = (checked: boolean) => {
  if (checked) {
    selectedProducts.value = filteredProducts.value.map((p) => p.id);
  } else {
    selectedProducts.value = [];
  }
};

const toggleSelectProduct = (id: string) => {
  if (selectedProducts.value.includes(id)) {
    selectedProducts.value = selectedProducts.value.filter((i) => i !== id);
  } else {
    selectedProducts.value.push(id);
  }
};

const getStockBadgeVariant = (stock: number) => {
  if (stock > 15) return "success";
  if (stock > 0) return "warning";
  return "destructive";
};
</script>

<template>
  <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-12">
            <Checkbox
              :checked="selectedProducts.length === filteredProducts.length && filteredProducts.length > 0"
              @update:checked="toggleSelectAll"
            />
          </TableHead>
          <TableHead class="min-w-[200px]">Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock Level</TableHead>
          <TableHead>Units Sold</TableHead>
          <TableHead class="text-center">Live Status</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead class="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="product in filteredProducts"
          :key="product.id"
          class="hover:bg-secondary/40 transition-colors"
        >
          <TableCell>
            <Checkbox
              :checked="selectedProducts.includes(product.id)"
              @update:checked="() => toggleSelectProduct(product.id)"
            />
          </TableCell>
          <TableCell>
            <div class="space-y-0.5">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold leading-tight text-foreground">{{ product.name }}</span>
                <Badge variant="outline" class="font-mono text-[9px] px-1.5 py-0">
                  {{ product.sku || product.id }}
                </Badge>
              </div>
              <p class="text-[11px] text-muted-foreground line-clamp-1">
                {{ product.description || `Catalog entry ${product.id}` }}
              </p>
            </div>
          </TableCell>
          <TableCell>
            <Badge variant="secondary" class="text-[10px] font-medium">
              {{ product.category }}
            </Badge>
          </TableCell>
          <TableCell class="font-mono text-xs font-bold text-foreground">
            {{ product.price }}
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold">{{ product.stock }} units</span>
              <span
                v-if="product.stock <= 5 && product.stock > 0"
                class="flex items-center text-[10px] font-medium text-amber-500 gap-0.5"
              >
                <AlertTriangle class="h-3 w-3" />
                Low
              </span>
            </div>
          </TableCell>
          <TableCell class="text-xs font-mono font-medium text-muted-foreground">
            {{ product.sales }} sold
          </TableCell>
          <TableCell class="text-center">
            <div class="flex items-center justify-center gap-2">
              <Switch
                :checked="product.inStock"
                @update:checked="(val: boolean) => toggleProductStock(product.id, val)"
              />
              <span class="text-[11px] font-medium text-muted-foreground">
                {{ product.inStock ? "Active" : "Off" }}
              </span>
            </div>
          </TableCell>
          <TableCell>
            <Badge :variant="getStockBadgeVariant(product.stock)" class="text-[10px] px-2 py-0.5">
              {{ product.status }}
            </Badge>
          </TableCell>
          <TableCell class="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="sm" class="h-7 w-7 p-0">
                  <MoreVertical class="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem @click="showToast(`Editing product ${product.name}`)">
                  <Edit2 class="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>Edit Product</span>
                </DropdownMenuItem>
                <DropdownMenuItem @click="() => { product.stock += 10; product.status = 'In Stock'; showToast(`Added 10 units to ${product.name}`); }">
                  <PackageCheck class="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>Restock (+10)</span>
                </DropdownMenuItem>
                <DropdownMenuItem @click="showToast(`Product ${product.name} duplicated`)">
                  <Copy class="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>Duplicate</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="text-destructive focus:text-destructive" @click="deleteProduct(product.id)">
                  <Trash2 class="h-3.5 w-3.5 mr-2" />
                  <span>Delete Product</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
</template>
