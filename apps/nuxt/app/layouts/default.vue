<script setup lang="ts">
import { onMounted } from "vue";

import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  Search,
  Bell,
  Sun,
  Moon,
  Download,
  CheckCircle2,
  Store,
} from "lucide-vue-next";

import { useCommerce } from "~/composables/useCommerce";
import { useTheme } from "~/composables/useTheme";
import AddProductDialog from "~/components/products/AddProductDialog.vue";

const { searchQuery, storeOnline, toastMessage, isToastVisible, showToast, orders, products } = useCommerce();
const { isDark, toggleDarkMode, initTheme } = useTheme();
const route = useRoute();

onMounted(() => {
  initTheme();
});
</script>

<template>
  <div class="min-h-screen md:h-screen md:overflow-hidden bg-background text-foreground transition-colors duration-200 flex flex-col antialiased">
    <!-- Top Global Notification Banner -->
    <div
      v-if="isToastVisible"
      class="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/30 border border-primary/20 animate-in fade-in slide-in-from-top-4 duration-300"
    >
      <CheckCircle2 class="h-4 w-4" />
      <span class="text-xs font-semibold">{{ toastMessage }}</span>
    </div>

    <!-- Main Layout Shell -->
    <div class="flex-1 flex flex-col md:flex-row md:overflow-hidden min-h-0">
      <!-- Sidebar Navigation: Fixed to viewport height, does not scroll with content -->
      <aside class="w-full md:w-64 md:h-full md:sticky md:top-0 border-b md:border-b-0 md:border-r border-border/70 bg-card/40 backdrop-blur-xl flex flex-col shrink-0 z-20">
        <!-- Brand Header -->
        <div class="h-16 px-5 border-b border-border/60 flex items-center justify-between shrink-0">
          <NuxtLink to="/" class="flex items-center gap-3">
            <div class="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/25 text-white font-black text-sm tracking-tighter">
              CUI
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-extrabold text-sm tracking-tight">Commerce</span>
                <Badge variant="secondary" class="text-[10px] px-1.5 py-0 h-4 font-mono font-bold">
                  PRO
                </Badge>
              </div>
              <p class="text-[10px] text-muted-foreground font-mono">Nuxt 4 Architecture</p>
            </div>
          </NuxtLink>
          <div class="md:hidden">
            <Button variant="ghost" size="sm" @click="toggleDarkMode" class="h-8 w-8 p-0">
              <Sun v-if="isDark" class="h-4 w-4 text-amber-400" />
              <Moon v-else class="h-4 w-4 text-indigo-500" />
            </Button>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <NuxtLink
            to="/"
            :class="[
              'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer',
              route.path === '/'
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
            ]"
          >
            <div class="flex items-center gap-3">
              <LayoutDashboard class="h-4 w-4" />
              <span>Dashboard</span>
            </div>
            <span v-if="route.path === '/'" class="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          </NuxtLink>

          <NuxtLink
            to="/orders"
            :class="[
              'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer',
              route.path === '/orders'
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
            ]"
          >
            <div class="flex items-center gap-3">
              <ShoppingBag class="h-4 w-4" />
              <span>Orders</span>
            </div>
            <Badge variant="secondary" class="text-[10px] px-1.5 py-0">{{ orders.length }}</Badge>
          </NuxtLink>

          <NuxtLink
            to="/products"
            :class="[
              'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer',
              route.path === '/products'
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
            ]"
          >
            <div class="flex items-center gap-3">
              <Package class="h-4 w-4" />
              <span>Products</span>
            </div>
            <span class="text-[10px] text-muted-foreground font-mono">{{ products.length }} items</span>
          </NuxtLink>

          <NuxtLink
            to="/customers"
            :class="[
              'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer',
              route.path === '/customers'
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
            ]"
          >
            <div class="flex items-center gap-3">
              <Users class="h-4 w-4" />
              <span>Customers</span>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/settings"
            :class="[
              'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer',
              route.path === '/settings'
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
            ]"
          >
            <div class="flex items-center gap-3">
              <Settings class="h-4 w-4" />
              <span>Settings</span>
            </div>
          </NuxtLink>
        </div>

        <!-- Store Status & Bottom Profile Box -->
        <div class="p-3 border-t border-border/60 space-y-3">
          <div class="p-3 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Store class="h-3.5 w-3.5 text-muted-foreground" />
                <span class="text-xs font-semibold">Storefront</span>
              </div>
              <Switch v-model="storeOnline" />
            </div>
            <div class="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Checkout status:</span>
              <span :class="storeOnline ? 'text-emerald-500 font-bold' : 'text-amber-500 font-bold'">
                {{ storeOnline ? "Online" : "Maintenance" }}
              </span>
            </div>
          </div>

          <!-- User Card -->
          <div class="p-2.5 rounded-2xl border border-border/60 bg-secondary/30 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <Avatar class="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div class="truncate">
                <p class="text-xs font-bold truncate leading-tight">Alex Sterling</p>
                <p class="text-[10px] text-muted-foreground truncate">alex@cuistore.dev</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" @click="toggleDarkMode" class="h-7 w-7 p-0" title="Toggle theme">
              <Sun v-if="isDark" class="h-3.5 w-3.5 text-amber-400" />
              <Moon v-else class="h-3.5 w-3.5 text-indigo-500" />
            </Button>
          </div>
        </div>
      </aside>

      <!-- Main Content Column: Fixed header + independent scrollable content area -->
      <div class="flex-1 flex flex-col min-w-0 md:h-full md:overflow-hidden">
        <!-- Top App Bar: Pinned at top of content area -->
        <header class="h-16 px-6 border-b border-border/70 bg-background/80 backdrop-blur-xl flex items-center justify-between shrink-0 z-10">
          <div class="flex items-center gap-4 flex-1 max-w-md">
            <div class="relative w-full">
              <Search class="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                v-model="searchQuery"
                placeholder="Search orders, customers, or SKU..."
                class="pl-9 pr-12 h-9 text-xs bg-secondary/30 border-border/80 focus:bg-background"
              />
              <div class="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <Kbd class="text-[9px] px-1 py-0.5">⌘K</Kbd>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <!-- Add Product Dialog Component -->
            <AddProductDialog />

            <!-- Notifications Dropdown -->
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline" size="sm" class="h-9 w-9 p-0 rounded-xl relative">
                  <Bell class="h-4 w-4" />
                  <span class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-72">
                <DropdownMenuLabel>Notifications (3)</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="flex flex-col items-start gap-1 py-2 cursor-pointer">
                  <p class="text-xs font-semibold">New Order Received</p>
                  <p class="text-[11px] text-muted-foreground">Sophia Anderson placed #ORD-9481 ($549.00)</p>
                  <span class="text-[9px] text-muted-foreground font-mono">15m ago</span>
                </DropdownMenuItem>
                <DropdownMenuItem class="flex flex-col items-start gap-1 py-2 cursor-pointer">
                  <p class="text-xs font-semibold">Low Inventory Alert</p>
                  <p class="text-[11px] text-amber-500 font-medium">Dell UltraSharp 32 has only 3 units left.</p>
                  <span class="text-[9px] text-muted-foreground font-mono">1h ago</span>
                </DropdownMenuItem>
                <DropdownMenuItem class="flex flex-col items-start gap-1 py-2 cursor-pointer">
                  <p class="text-xs font-semibold">Weekly Payout Settled</p>
                  <p class="text-[11px] text-emerald-500 font-medium">$14,290.00 transferred to Stripe bank.</p>
                  <span class="text-[9px] text-muted-foreground font-mono">Yesterday</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <!-- Export Report -->
            <Button variant="outline" size="sm" @click="showToast('Sales report exported as CSV!')" class="hidden sm:flex items-center gap-1.5 h-9">
              <Download class="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
          </div>
        </header>

        <!-- Independent Scroll Container for Page View -->
        <div class="flex-1 overflow-y-auto min-h-0">
          <main class="p-6 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
            <slot />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>
