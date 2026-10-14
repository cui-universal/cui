<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Switch,
  Checkbox,
  Progress,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Kbd,
} from "@cui-universal/vue";

import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Settings,
  Search,
  Bell,
  Sun,
  Moon,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  TrendingUp,
  DollarSign,
  CreditCard,
  Truck,
  ExternalLink,
  ChevronDown,
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
  Store,
  Box,
  AlertCircle,
} from "lucide-vue-next";

// Dark mode state
const isDark = ref(true);

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("cui_theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("cui_theme", "light");
  }
};

onMounted(() => {
  const saved = localStorage.getItem("cui_theme");
  if (saved === "light") {
    isDark.value = false;
    document.documentElement.classList.remove("dark");
  } else {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  }
});

// Active Navigation Tab
const activeNav = ref("overview");

// Store Status switch
const storeOnline = ref(true);

// Search Query
const searchQuery = ref("");

// Add Product Modal & Form
const isAddProductOpen = ref(false);
const isSavingProduct = ref(false);
const newProduct = ref({
  name: "",
  sku: "",
  price: "",
  stock: 25,
  category: "Electronics",
  description: "",
  inStock: true,
});

// Recent Orders Data
const orders = ref([
  {
    id: "ORD-9481",
    customer: "Sophia Anderson",
    email: "sophia.a@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    initials: "SA",
    product: "Apple AirPods Max (Silver)",
    date: "14 Oct 2026, 17:42",
    amount: "$549.00",
    status: "Completed",
    badgeVariant: "success" as const,
    payment: "Visa •••• 4242",
  },
  {
    id: "ORD-9480",
    customer: "Liam Vance",
    email: "l.vance@company.io",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    initials: "LV",
    product: "Sony WH-1000XM5 ANC",
    date: "14 Oct 2026, 16:15",
    amount: "$398.00",
    status: "Processing",
    badgeVariant: "default" as const,
    payment: "Mastercard •••• 8812",
  },
  {
    id: "ORD-9479",
    customer: "Elena Rostova",
    email: "elena.rostova@design.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
    initials: "ER",
    product: "Keychron Q1 Pro Wireless",
    date: "14 Oct 2026, 15:30",
    amount: "$210.00",
    status: "Shipped",
    badgeVariant: "secondary" as const,
    payment: "Apple Pay",
  },
  {
    id: "ORD-9478",
    customer: "Marcus Wright",
    email: "marcus.w@techpulse.org",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    initials: "MW",
    product: "Logitech MX Master 3S",
    date: "14 Oct 2026, 13:05",
    amount: "$99.00",
    status: "Completed",
    badgeVariant: "success" as const,
    payment: "PayPal",
  },
  {
    id: "ORD-9477",
    customer: "Amara Chen",
    email: "amara.c@vector.studio",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80",
    initials: "AC",
    product: "Dell UltraSharp 32 4K USB-C",
    date: "14 Oct 2026, 11:22",
    amount: "$889.00",
    status: "Pending",
    badgeVariant: "warning" as const,
    payment: "Visa •••• 9921",
  },
  {
    id: "ORD-9476",
    customer: "Devon Miller",
    email: "devon@cloudforge.net",
    avatar: "",
    initials: "DM",
    product: "CalDigit TS4 Thunderbolt 4",
    date: "13 Oct 2026, 22:50",
    amount: "$399.95",
    status: "Refunded",
    badgeVariant: "destructive" as const,
    payment: "Mastercard •••• 1042",
  },
]);

// Products Inventory Data
const products = ref([
  {
    id: "PRD-01",
    name: "Apple AirPods Max",
    category: "Audio",
    price: "$549.00",
    stock: 42,
    sales: 184,
    status: "In Stock",
    inStock: true,
  },
  {
    id: "PRD-02",
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: "$398.00",
    stock: 19,
    sales: 312,
    status: "In Stock",
    inStock: true,
  },
  {
    id: "PRD-03",
    name: "Keychron Q1 Pro",
    category: "Keyboards",
    price: "$210.00",
    stock: 8,
    sales: 145,
    status: "Low Stock",
    inStock: true,
  },
  {
    id: "PRD-04",
    name: "Logitech MX Master 3S",
    category: "Accessories",
    price: "$99.00",
    stock: 64,
    sales: 420,
    status: "In Stock",
    inStock: true,
  },
  {
    id: "PRD-05",
    name: "Dell UltraSharp 32",
    category: "Monitors",
    price: "$889.00",
    stock: 3,
    sales: 68,
    status: "Low Stock",
    inStock: true,
  },
  {
    id: "PRD-06",
    name: "CalDigit TS4 Dock",
    category: "Hubs",
    price: "$399.95",
    stock: 0,
    sales: 92,
    status: "Out of Stock",
    inStock: false,
  },
]);

// Filtered Orders based on search
const filteredOrders = computed(() => {
  if (!searchQuery.value.trim()) return orders.value;
  const q = searchQuery.value.toLowerCase();
  return orders.value.filter(
    (o) =>
      o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q) ||
      o.status.toLowerCase().includes(q)
  );
});

// Selected orders for batch actions
const selectedOrders = ref<string[]>([]);
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

// Quick notification toast simulation
const notificationText = ref("");
const showToast = ref(false);
const triggerToast = (msg: string) => {
  notificationText.value = msg;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3500);
};

// Handle Add Product submission
const handleAddProduct = () => {
  if (!newProduct.value.name.trim()) return;
  isSavingProduct.value = true;
  setTimeout(() => {
    products.value.unshift({
      id: `PRD-0${products.value.length + 1}`,
      name: newProduct.value.name,
      category: newProduct.value.category,
      price: `$${parseFloat(newProduct.value.price || "99.00").toFixed(2)}`,
      stock: Number(newProduct.value.stock),
      sales: 0,
      status: Number(newProduct.value.stock) > 10 ? "In Stock" : "Low Stock",
      inStock: newProduct.value.inStock,
    });
    isSavingProduct.value = false;
    isAddProductOpen.value = false;
    triggerToast(`Product "${newProduct.value.name}" added to inventory!`);
    newProduct.value = {
      name: "",
      sku: "",
      price: "",
      stock: 25,
      category: "Electronics",
      description: "",
      inStock: true,
    };
  }, 600);
};

// Monthly Sales Goal Progress
const salesGoalProgress = ref(78);
const currentMonthRevenue = ref("$98,450.00");
const targetRevenue = ref("$125,000.00");
</script>

<template>
  <div class="min-h-screen bg-background text-foreground transition-colors duration-200 flex flex-col antialiased">
    <!-- Top Global Notification Banner -->
    <div
      v-if="showToast"
      class="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/30 border border-primary/20 animate-in fade-in slide-in-from-top-4 duration-300"
    >
      <CheckCircle2 class="h-4 w-4" />
      <span class="text-xs font-semibold">{{ notificationText }}</span>
    </div>

    <!-- Main App Layout: Sidebar + Content -->
    <div class="flex-1 flex flex-col md:flex-row">
      <!-- Sidebar Navigation -->
      <aside class="w-full md:w-64 border-b md:border-b-0 md:border-r border-border/70 bg-card/40 backdrop-blur-xl flex flex-col shrink-0">
        <!-- Brand Header -->
        <div class="h-16 px-5 border-b border-border/60 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-9 w-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-black text-sm tracking-tighter">
              CUI
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-extrabold text-sm tracking-tight">Commerce</span>
                <Badge variant="secondary" class="text-[10px] px-1.5 py-0 h-4 font-mono font-bold">
                  PRO
                </Badge>
              </div>
              <p class="text-[10px] text-muted-foreground font-mono">Nuxt 3 + CUI Vue</p>
            </div>
          </div>
          <div class="md:hidden">
            <Button variant="ghost" size="sm" @click="toggleDarkMode" class="h-8 w-8 p-0">
              <Sun v-if="isDark" class="h-4 w-4 text-amber-400" />
              <Moon v-else class="h-4 w-4 text-indigo-500" />
            </Button>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <button
            type="button"
            @click="activeNav = 'overview'"
            :class="[
              'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer',
              activeNav === 'overview'
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
            ]"
          >
            <div class="flex items-center gap-3">
              <LayoutDashboard class="h-4 w-4" />
              <span>Dashboard</span>
            </div>
            <span v-if="activeNav === 'overview'" class="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          </button>

          <button
            type="button"
            @click="activeNav = 'orders'"
            :class="[
              'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer',
              activeNav === 'orders'
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
            ]"
          >
            <div class="flex items-center gap-3">
              <ShoppingBag class="h-4 w-4" />
              <span>Orders</span>
            </div>
            <Badge variant="secondary" class="text-[10px] px-1.5 py-0">12</Badge>
          </button>

          <button
            type="button"
            @click="activeNav = 'products'"
            :class="[
              'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer',
              activeNav === 'products'
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
            ]"
          >
            <div class="flex items-center gap-3">
              <Package class="h-4 w-4" />
              <span>Products</span>
            </div>
            <span class="text-[10px] text-muted-foreground font-mono">6 active</span>
          </button>

          <button
            type="button"
            @click="activeNav = 'customers'"
            :class="[
              'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer',
              activeNav === 'customers'
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
            ]"
          >
            <div class="flex items-center gap-3">
              <Users class="h-4 w-4" />
              <span>Customers</span>
            </div>
          </button>

          <button
            type="button"
            @click="activeNav = 'settings'"
            :class="[
              'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer',
              activeNav === 'settings'
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
            ]"
          >
            <div class="flex items-center gap-3">
              <Settings class="h-4 w-4" />
              <span>Store Settings</span>
            </div>
          </button>
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

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Top App Bar -->
        <header class="h-16 px-6 border-b border-border/70 bg-background/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-30">
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
            <!-- Add Product Dialog -->
            <Dialog v-model:open="isAddProductOpen">
              <DialogTrigger as-child>
                <Button size="sm" class="gap-1.5 shadow-sm shadow-primary/20">
                  <Plus class="h-3.5 w-3.5" />
                  <span>Add Product</span>
                </Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Fill in the inventory details. Published automatically to your public catalog.
                  </DialogDescription>
                </DialogHeader>

                <div class="space-y-4 py-2">
                  <div class="space-y-1.5">
                    <label class="text-xs font-semibold text-muted-foreground">Product Title</label>
                    <Input v-model="newProduct.name" placeholder="e.g. Mechanical Studio Keyboard" />
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div class="space-y-1.5">
                      <label class="text-xs font-semibold text-muted-foreground">Price (USD)</label>
                      <Input v-model="newProduct.price" placeholder="199.00" type="number" />
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-xs font-semibold text-muted-foreground">Initial Stock</label>
                      <Input v-model="newProduct.stock" placeholder="25" type="number" />
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div class="space-y-1.5">
                      <label class="text-xs font-semibold text-muted-foreground">SKU Code</label>
                      <Input v-model="newProduct.sku" placeholder="CUI-KB-09" />
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-xs font-semibold text-muted-foreground">Category</label>
                      <Input v-model="newProduct.category" placeholder="Electronics" />
                    </div>
                  </div>

                  <div class="space-y-1.5">
                    <label class="text-xs font-semibold text-muted-foreground">Description</label>
                    <Textarea v-model="newProduct.description" placeholder="Brief technical summary..." rows="2" />
                  </div>

                  <div class="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-secondary/30">
                    <div>
                      <p class="text-xs font-semibold">Enable for Instant Purchase</p>
                      <p class="text-[10px] text-muted-foreground">Show in catalog as ready to ship</p>
                    </div>
                    <Switch v-model="newProduct.inStock" />
                  </div>
                </div>

                <DialogFooter class="gap-2">
                  <DialogClose as-child>
                    <Button variant="outline" size="sm">Cancel</Button>
                  </DialogClose>
                  <Button size="sm" :loading="isSavingProduct" @click="handleAddProduct">
                    Save Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

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
            <Button variant="outline" size="sm" @click="triggerToast('Sales report exported as CSV!')" class="hidden sm:flex items-center gap-1.5 h-9">
              <Download class="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
          </div>
        </header>

        <!-- Dynamic Body according to Navigation -->
        <main class="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
          <!-- 1. OVERVIEW VIEW -->
          <div v-if="activeNav === 'overview'" class="space-y-8">
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
                <Button variant="ghost" size="sm" @click="triggerToast('Data refreshed!')" class="h-8 gap-1.5 text-xs text-muted-foreground">
                  <RefreshCw class="h-3 w-3" />
                  <span>Sync</span>
                </Button>
              </div>
            </div>

            <!-- KPI Metric Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <!-- Revenue -->
              <Card>
                <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle class="text-xs font-semibold text-muted-foreground">Total Revenue</CardTitle>
                  <div class="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <DollarSign class="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div class="text-2xl font-black tracking-tight">$128,430.00</div>
                  <div class="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-500 font-semibold">
                    <ArrowUpRight class="h-3.5 w-3.5" />
                    <span>+14.2%</span>
                    <span class="text-muted-foreground font-normal">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <!-- Orders -->
              <Card>
                <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle class="text-xs font-semibold text-muted-foreground">Total Orders</CardTitle>
                  <div class="h-8 w-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                    <ShoppingBag class="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div class="text-2xl font-black tracking-tight">2,845</div>
                  <div class="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-500 font-semibold">
                    <ArrowUpRight class="h-3.5 w-3.5" />
                    <span>+8.5%</span>
                    <span class="text-muted-foreground font-normal">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <!-- Active Customers -->
              <Card>
                <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle class="text-xs font-semibold text-muted-foreground">Customers</CardTitle>
                  <div class="h-8 w-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                    <Users class="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div class="text-2xl font-black tracking-tight">14,290</div>
                  <div class="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-500 font-semibold">
                    <ArrowUpRight class="h-3.5 w-3.5" />
                    <span>+22.1%</span>
                    <span class="text-muted-foreground font-normal">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <!-- Conversion Rate -->
              <Card>
                <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle class="text-xs font-semibold text-muted-foreground">Conversion Rate</CardTitle>
                  <div class="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <TrendingUp class="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div class="text-2xl font-black tracking-tight">3.42%</div>
                  <div class="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-500 font-semibold">
                    <ArrowUpRight class="h-3.5 w-3.5" />
                    <span>+0.8%</span>
                    <span class="text-muted-foreground font-normal">avg. 120s checkout</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <!-- Revenue Goal & Monthly Distribution Section -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Sales Progress Card -->
              <Card class="lg:col-span-2">
                <CardHeader>
                  <div class="flex items-center justify-between">
                    <div>
                      <CardTitle>Monthly Revenue Target</CardTitle>
                      <CardDescription>Target pacing for October 2026 fiscal cycle</CardDescription>
                    </div>
                    <Badge variant="success" class="gap-1 font-mono">
                      <span>{{ salesGoalProgress }}% of goal</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent class="space-y-6">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between text-xs">
                      <span class="font-semibold">Current: {{ currentMonthRevenue }}</span>
                      <span class="text-muted-foreground font-mono">Goal: {{ targetRevenue }}</span>
                    </div>
                    <Progress :model-value="salesGoalProgress" class="h-2.5" />
                  </div>

                  <!-- Mini Chart Simulator (Weekly performance bars) -->
                  <div class="pt-2 border-t border-border/60">
                    <p class="text-xs font-semibold mb-3">Weekly Gross Sales Volume</p>
                    <div class="grid grid-cols-7 gap-2 items-end h-28 pt-2">
                      <div class="flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div class="w-full bg-primary/20 group-hover:bg-primary transition-all rounded-t-md" style="height: 45%;" />
                        <span class="text-[10px] text-muted-foreground font-mono">Mon</span>
                      </div>
                      <div class="flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div class="w-full bg-primary/20 group-hover:bg-primary transition-all rounded-t-md" style="height: 60%;" />
                        <span class="text-[10px] text-muted-foreground font-mono">Tue</span>
                      </div>
                      <div class="flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div class="w-full bg-primary/20 group-hover:bg-primary transition-all rounded-t-md" style="height: 75%;" />
                        <span class="text-[10px] text-muted-foreground font-mono">Wed</span>
                      </div>
                      <div class="flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div class="w-full bg-primary/20 group-hover:bg-primary transition-all rounded-t-md" style="height: 90%;" />
                        <span class="text-[10px] text-muted-foreground font-mono">Thu</span>
                      </div>
                      <div class="flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div class="w-full bg-primary/30 group-hover:bg-primary transition-all rounded-t-md" style="height: 68%;" />
                        <span class="text-[10px] text-muted-foreground font-mono">Fri</span>
                      </div>
                      <div class="flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div class="w-full bg-primary/50 group-hover:bg-primary transition-all rounded-t-md" style="height: 85%;" />
                        <span class="text-[10px] text-muted-foreground font-mono">Sat</span>
                      </div>
                      <div class="flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div class="w-full bg-primary group-hover:bg-primary/90 transition-all rounded-t-md" style="height: 100%;" />
                        <span class="text-[10px] text-primary font-bold font-mono">Sun</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <!-- Top Products Quick List -->
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling</CardTitle>
                  <CardDescription>Highest revenue generators this week</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                  <div v-for="item in products.slice(0, 4)" :key="item.id" class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3 truncate">
                      <div class="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center shrink-0 border border-border/80">
                        <Box class="h-4 w-4 text-primary" />
                      </div>
                      <div class="truncate">
                        <p class="text-xs font-semibold truncate">{{ item.name }}</p>
                        <p class="text-[10px] text-muted-foreground">{{ item.category }} • {{ item.sales }} sold</p>
                      </div>
                    </div>
                    <div class="text-right shrink-0">
                      <p class="text-xs font-bold">{{ item.price }}</p>
                      <Badge :variant="item.stock > 10 ? 'outline' : 'warning'" class="text-[9px] px-1 py-0">
                        {{ item.stock }} in stock
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <!-- Recent Orders Table -->
            <Card>
              <CardHeader>
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest customer purchases across web and mobile channels</CardDescription>
                  </div>
                  <div class="flex items-center gap-2">
                    <Button variant="outline" size="sm" @click="activeNav = 'orders'" class="text-xs">
                      View All Orders
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent class="p-0">
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
                        <TableHead>Order</TableHead>
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
                              <DropdownMenuItem @click="triggerToast(`Viewing details for ${order.id}`)">
                                <Eye class="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                <span>Order Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem @click="triggerToast(`Marked ${order.id} as Delivered`)">
                                <Truck class="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                <span>Mark Shipped</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem @click="triggerToast(`Invoice downloaded for ${order.id}`)">
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
              </CardContent>
            </Card>
          </div>

          <!-- 2. ORDERS MANAGEMENT VIEW -->
          <div v-else-if="activeNav === 'orders'" class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 class="text-2xl sm:text-3xl font-black tracking-tight">Orders Fulfillment</h1>
                <p class="text-xs sm:text-sm text-muted-foreground">Manage order verification, packaging, and dispatch tracking.</p>
              </div>
              <div class="flex items-center gap-2">
                <Button variant="outline" size="sm" class="gap-1.5" @click="triggerToast('Filtering applied!')">
                  <Filter class="h-3.5 w-3.5" />
                  <span>Filter Status</span>
                </Button>
                <Button size="sm" class="gap-1.5" @click="triggerToast('Batch shipping queued!')">
                  <Truck class="h-3.5 w-3.5" />
                  <span>Batch Dispatch</span>
                </Button>
              </div>
            </div>

            <!-- Orders Table in Full Tab -->
            <Card>
              <CardContent class="p-0">
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
                      <TableHead>Item</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead class="text-right">Actions</TableHead>
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
                      <TableCell class="text-xs font-medium">{{ order.customer }}</TableCell>
                      <TableCell class="text-xs">{{ order.product }}</TableCell>
                      <TableCell class="text-xs text-muted-foreground font-mono">{{ order.payment }}</TableCell>
                      <TableCell class="text-xs font-bold">{{ order.amount }}</TableCell>
                      <TableCell>
                        <Badge :variant="order.badgeVariant" class="text-[10px] px-2 py-0.5">
                          {{ order.status }}
                        </Badge>
                      </TableCell>
                      <TableCell class="text-right">
                        <Button variant="outline" size="sm" class="h-7 text-xs" @click="triggerToast(`Order ${order.id} updated`)">
                          Process
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <!-- 3. PRODUCTS INVENTORY VIEW -->
          <div v-else-if="activeNav === 'products'" class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 class="text-2xl sm:text-3xl font-black tracking-tight">Catalog & Inventory</h1>
                <p class="text-xs sm:text-sm text-muted-foreground">Monitor warehouse quantities, pricing, and live availability.</p>
              </div>
              <Button size="sm" @click="isAddProductOpen = true" class="gap-1.5 shadow-sm shadow-primary/20">
                <Plus class="h-3.5 w-3.5" />
                <span>Add Product</span>
              </Button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Card v-for="product in products" :key="product.id" class="flex flex-col justify-between">
                <CardHeader>
                  <div class="flex items-center justify-between">
                    <Badge variant="outline" class="font-mono text-[10px]">{{ product.id }}</Badge>
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
                    <Switch v-model="product.inStock" @update:checked="(val) => triggerToast(`${product.name} is now ${val ? 'Active' : 'Hidden'}`)" />
                  </div>
                </CardContent>
                <CardFooter class="border-t border-border/50 pt-4">
                  <Button variant="outline" size="sm" class="w-full text-xs" @click="triggerToast(`Editing ${product.name}`)">
                    Edit Inventory
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <!-- 4. CUSTOMERS VIEW -->
          <div v-else-if="activeNav === 'customers'" class="space-y-6">
            <div>
              <h1 class="text-2xl sm:text-3xl font-black tracking-tight">Customers Directory</h1>
              <p class="text-xs sm:text-sm text-muted-foreground">Profiles, lifetime order values, and account status.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Card v-for="order in orders" :key="order.email">
                <CardHeader class="flex flex-row items-center gap-3 space-y-0">
                  <Avatar class="h-10 w-10">
                    <AvatarImage :src="order.avatar" />
                    <AvatarFallback>{{ order.initials }}</AvatarFallback>
                  </Avatar>
                  <div class="truncate">
                    <CardTitle class="text-sm truncate">{{ order.customer }}</CardTitle>
                    <CardDescription class="text-xs truncate">{{ order.email }}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent class="space-y-2 text-xs">
                  <div class="flex justify-between py-1 border-b border-border/50">
                    <span class="text-muted-foreground">Primary Payment:</span>
                    <span class="font-mono font-medium">{{ order.payment }}</span>
                  </div>
                  <div class="flex justify-between py-1">
                    <span class="text-muted-foreground">Total Spend:</span>
                    <span class="font-bold text-primary">{{ order.amount }}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" class="w-full text-xs" @click="triggerToast(`Contacting ${order.customer}`)">
                    View Customer Profile
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <!-- 5. SETTINGS VIEW -->
          <div v-else-if="activeNav === 'settings'" class="max-w-2xl space-y-6">
            <div>
              <h1 class="text-2xl sm:text-3xl font-black tracking-tight">Store Preferences</h1>
              <p class="text-xs sm:text-sm text-muted-foreground">Configure tax rates, checkout options, and notifications.</p>
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
                  <Switch :model-value="true" />
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-secondary/30">
                  <div>
                    <p class="text-xs font-semibold">Low Stock Email Alerts</p>
                    <p class="text-[10px] text-muted-foreground">Receive digest when product quantity drops below 5 units</p>
                  </div>
                  <Switch :model-value="true" />
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-secondary/30">
                  <div>
                    <p class="text-xs font-semibold">International Shipping Rates</p>
                    <p class="text-[10px] text-muted-foreground">Enable DHL/FedEx worldwide calculations at checkout</p>
                  </div>
                  <Switch :model-value="false" />
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" @click="triggerToast('Settings updated successfully!')">Save Preferences</Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
