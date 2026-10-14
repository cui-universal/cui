import type { Order, Product } from "~/types/commerce";

export const useCommerce = () => {
  // Global search input
  const searchQuery = useState<string>("commerce_search_query", () => "");

  // Store status
  const storeOnline = useState<boolean>("commerce_store_online", () => true);

  // Global Toast
  const toastMessage = useState<string>("commerce_toast_msg", () => "");
  const isToastVisible = useState<boolean>("commerce_toast_vis", () => false);

  const showToast = (message: string) => {
    toastMessage.value = message;
    isToastVisible.value = true;
    if (import.meta.client) {
      setTimeout(() => {
        isToastVisible.value = false;
      }, 3500);
    }
  };

  // Orders State
  const orders = useState<Order[]>("commerce_orders", () => [
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
      badgeVariant: "success",
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
      badgeVariant: "default",
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
      badgeVariant: "secondary",
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
      badgeVariant: "success",
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
      badgeVariant: "warning",
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
      badgeVariant: "destructive",
      payment: "Mastercard •••• 1042",
    },
  ]);

  // Products State
  const products = useState<Product[]>("commerce_products", () => [
    {
      id: "PRD-01",
      name: "Apple AirPods Max",
      category: "Audio",
      price: "$549.00",
      stock: 42,
      sales: 184,
      status: "In Stock",
      inStock: true,
      sku: "AP-MAX-SLV",
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
      sku: "SNY-XM5-BLK",
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
      sku: "KC-Q1-PRO",
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
      sku: "LOG-MX3S",
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
      sku: "DLL-U32-4K",
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
      sku: "CD-TS4-TB4",
    },
  ]);

  // Selected Orders for Bulk Actions
  const selectedOrders = useState<string[]>("commerce_selected_orders", () => []);

  // Filtered Orders
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

  const addProduct = (productData: Partial<Product>) => {
    const newProd: Product = {
      id: `PRD-0${products.value.length + 1}`,
      name: productData.name || "Untitled Product",
      category: productData.category || "General",
      price: `$${parseFloat(productData.price || "99.00").toFixed(2)}`,
      stock: Number(productData.stock ?? 25),
      sales: 0,
      status: Number(productData.stock ?? 25) > 10 ? "In Stock" : "Low Stock",
      inStock: productData.inStock ?? true,
      sku: productData.sku || `SKU-${Date.now().toString().slice(-4)}`,
      description: productData.description || "",
    };
    products.value.unshift(newProd);
    showToast(`Product "${newProd.name}" added to catalog!`);
  };

  const updateOrderStatus = (id: string, status: Order["status"], variant: Order["badgeVariant"]) => {
    const idx = orders.value.findIndex((o) => o.id === id);
    if (idx !== -1) {
      orders.value[idx].status = status;
      orders.value[idx].badgeVariant = variant;
      showToast(`Order ${id} marked as ${status}`);
    }
  };

  return {
    searchQuery,
    storeOnline,
    toastMessage,
    isToastVisible,
    showToast,
    orders,
    products,
    selectedOrders,
    filteredOrders,
    addProduct,
    updateOrderStatus,
  };
};
