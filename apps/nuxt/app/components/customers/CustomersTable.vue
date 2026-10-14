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
import { MoreVertical, Mail, ExternalLink, ShoppingBag, Trash2, MapPin } from "lucide-vue-next";
import { useCommerce } from "~/composables/useCommerce";
import type { Customer } from "~/types/commerce";

const { filteredCustomers, selectedCustomers, showToast, deleteCustomer } = useCommerce();

const toggleSelectAll = (checked: boolean) => {
  if (checked) {
    selectedCustomers.value = filteredCustomers.value.map((c) => c.id);
  } else {
    selectedCustomers.value = [];
  }
};

const toggleSelectCustomer = (id: string) => {
  if (selectedCustomers.value.includes(id)) {
    selectedCustomers.value = selectedCustomers.value.filter((i) => i !== id);
  } else {
    selectedCustomers.value.push(id);
  }
};

const getCustomerBadgeVariant = (status: Customer["status"]) => {
  switch (status) {
    case "VIP":
      return "default";
    case "Active":
      return "success";
    case "New":
      return "secondary";
    case "Inactive":
      return "destructive";
    default:
      return "outline";
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
              :checked="selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0"
              @update:checked="toggleSelectAll"
            />
          </TableHead>
          <TableHead class="min-w-[220px]">Customer</TableHead>
          <TableHead>Location</TableHead>
          <TableHead class="text-center">Total Orders</TableHead>
          <TableHead>Lifetime Spend</TableHead>
          <TableHead>Primary Payment</TableHead>
          <TableHead>Last Order</TableHead>
          <TableHead>Account Status</TableHead>
          <TableHead class="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="customer in filteredCustomers"
          :key="customer.id"
          class="hover:bg-secondary/40 transition-colors"
        >
          <TableCell>
            <Checkbox
              :checked="selectedCustomers.includes(customer.id)"
              @update:checked="() => toggleSelectCustomer(customer.id)"
            />
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-3">
              <Avatar class="h-8 w-8 text-xs shrink-0">
                <AvatarImage :src="customer.avatar" />
                <AvatarFallback>{{ customer.initials }}</AvatarFallback>
              </Avatar>
              <div class="truncate">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-bold leading-tight truncate text-foreground">
                    {{ customer.name }}
                  </span>
                  <Badge v-if="customer.status === 'VIP'" variant="outline" class="text-[9px] px-1 py-0 border-primary text-primary">
                    VIP
                  </Badge>
                </div>
                <p class="text-[11px] text-muted-foreground truncate">{{ customer.email }}</p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin class="h-3 w-3 shrink-0 text-muted-foreground/70" />
              <span class="truncate">{{ customer.location }}</span>
            </div>
          </TableCell>
          <TableCell class="text-center">
            <Badge variant="secondary" class="font-mono text-xs">
              {{ customer.ordersCount }} orders
            </Badge>
          </TableCell>
          <TableCell class="font-mono text-xs font-bold text-foreground">
            {{ customer.totalSpent }}
          </TableCell>
          <TableCell class="text-xs font-mono text-muted-foreground">
            {{ customer.paymentMethod }}
          </TableCell>
          <TableCell class="text-xs text-muted-foreground">
            {{ customer.lastOrderDate }}
          </TableCell>
          <TableCell>
            <Badge :variant="getCustomerBadgeVariant(customer.status)" class="text-[10px] px-2 py-0.5">
              {{ customer.status }}
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
                <DropdownMenuItem @click="showToast(`Viewing profile of ${customer.name}`)">
                  <ExternalLink class="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem @click="showToast(`Email composer opened for ${customer.email}`)">
                  <Mail class="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>Send Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem @click="showToast(`New manual order started for ${customer.name}`)">
                  <ShoppingBag class="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>Create Order</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="text-destructive focus:text-destructive" @click="deleteCustomer(customer.id)">
                  <Trash2 class="h-3.5 w-3.5 mr-2" />
                  <span>Remove Customer</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
