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
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@cui-universal/vue";
import { MoreVertical, Eye, Truck, Download } from "lucide-vue-next";
import { useCommerce } from "~/composables/useCommerce";

const { filteredOrders, selectedOrders, showToast, updateOrderStatus } = useCommerce();

const toggleSelectAll = (checked: boolean) => {
  if (checked) {
    selectedOrders.value = filteredOrders.value.map((o) => o.id);
  } else {
    selectedOrders.value = [];
  }
};

const toggleSelectOrder = (id: string) => {
  if (selectedOrders.value.includes(id)) {
    selectedOrders.value = selectedOrders.value.filter((i) => i !== id);
  } else {
    selectedOrders.value.push(id);
  }
};
</script>

<template>
  <div class="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-12">
            <Checkbox
              :checked="selectedOrders.length === filteredOrders.length && filteredOrders.length > 0"
              @update:checked="toggleSelectAll"
            />
          </TableHead>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead class="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="order in filteredOrders" :key="order.id" class="hover:bg-secondary/40">
          <TableCell>
            <Checkbox
              :checked="selectedOrders.includes(order.id)"
              @update:checked="() => toggleSelectOrder(order.id)"
            />
          </TableCell>
          <TableCell class="font-mono text-xs font-bold">{{ order.id }}</TableCell>
          <TableCell>
            <div class="flex items-center gap-2.5">
              <Avatar class="h-7 w-7 text-xs">
                <AvatarImage :src="order.avatar" />
                <AvatarFallback>{{ order.initials }}</AvatarFallback>
              </Avatar>
              <div>
                <p class="text-xs font-semibold leading-tight">{{ order.customer }}</p>
                <p class="text-[10px] text-muted-foreground">{{ order.email }}</p>
              </div>
            </div>
          </TableCell>
          <TableCell class="text-xs font-medium">{{ order.product }}</TableCell>
          <TableCell class="text-xs text-muted-foreground">{{ order.date }}</TableCell>
          <TableCell class="text-xs font-bold font-mono">{{ order.amount }}</TableCell>
          <TableCell>
            <Badge :variant="order.badgeVariant" class="text-[10px] px-2 py-0.5">
              {{ order.status }}
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
                <DropdownMenuItem @click="showToast(`Viewing details for ${order.id}`)">
                  <Eye class="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>Order Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem @click="updateOrderStatus(order.id, 'Shipped', 'secondary')">
                  <Truck class="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>Mark Shipped</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="showToast(`Invoice downloaded for ${order.id}`)">
                  <Download class="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>Download Invoice</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
