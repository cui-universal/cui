import type { Order, Product, Customer } from "~/types/commerce";

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

  // Customers State
  const customers = useState<Customer[]>("commerce_customers", () => [
    {
      id: "CUST-001",
      name: "Sophia Anderson",
      email: "sophia.a@example.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
      initials: "SA",
      ordersCount: 14,
      totalSpent: "$2,840.00",
      status: "VIP",
      badgeVariant: "default",
      lastOrderDate: "14 Oct 2026",
      paymentMethod: "Visa •••• 4242",
      location: "San Francisco, CA",
      phone: "+1 (555) 234-8901",
    },
    {
      id: "CUST-002",
      name: "Liam Vance",
      email: "l.vance@company.io",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      initials: "LV",
      ordersCount: 8,
      totalSpent: "$1,390.00",
      status: "Active",
      badgeVariant: "success",
      lastOrderDate: "14 Oct 2026",
      paymentMethod: "Mastercard •••• 8812",
      location: "Austin, TX",
      phone: "+1 (555) 789-1023",
    },
    {
      id: "CUST-003",
      name: "Elena Rostova",
      email: "elena.rostova@design.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
      initials: "ER",
      ordersCount: 5,
      totalSpent: "$950.00",
      status: "Active",
      badgeVariant: "success",
      lastOrderDate: "14 Oct 2026",
      paymentMethod: "Apple Pay",
      location: "Seattle, WA",
      phone: "+1 (555) 341-9870",
    },
    {
      id: "CUST-004",
      name: "Marcus Wright",
      email: "marcus.w@techpulse.org",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
      initials: "MW",
      ordersCount: 3,
      totalSpent: "$430.00",
      status: "Active",
      badgeVariant: "success",
      lastOrderDate: "14 Oct 2026",
      paymentMethod: "PayPal",
      location: "Chicago, IL",
      phone: "+1 (555) 672-3312",
    },
    {
      id: "CUST-005",
      name: "Amara Chen",
      email: "amara.c@vector.studio",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80",
      initials: "AC",
      ordersCount: 1,
      totalSpent: "$889.00",
      status: "New",
      badgeVariant: "secondary",
      lastOrderDate: "14 Oct 2026",
      paymentMethod: "Visa •••• 9921",
      location: "New York, NY",
      phone: "+1 (555) 890-4451",
    },
    {
      id: "CUST-006",
      name: "Devon Miller",
      email: "devon@cloudforge.net",
      avatar: "",
      initials: "DM",
      ordersCount: 2,
      totalSpent: "$540.00",
      status: "Inactive",
      badgeVariant: "destructive",
      lastOrderDate: "13 Oct 2026",
      paymentMethod: "Mastercard •••• 1042",
      location: "Denver, CO",
      phone: "+1 (555) 431-7729",
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

  // Selection states for Bulk Actions
  const selectedOrders = useState<string[]>("commerce_selected_orders", () => []);
  const selectedProducts = useState<string[]>("commerce_selected_products", () => []);
  const selectedCustomers = useState<string[]>("commerce_selected_customers", () => []);

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

  // Filtered Products
  const filteredProducts = computed(() => {
    if (!searchQuery.value.trim()) return products.value;
    const q = searchQuery.value.toLowerCase();
    return products.value.filter(
      (p) =>
        p.id.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q))
    );
  });

  // Filtered Customers
  const filteredCustomers = computed(() => {
    if (!searchQuery.value.trim()) return customers.value;
    const q = searchQuery.value.toLowerCase();
    return customers.value.filter(
      (c) =>
        c.id.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q)
    );
  });

  const addProduct = (productData: Partial<Product>) => {
    const rawPrice = productData.price ?? "99.00";
    const numPrice = typeof rawPrice === "number"
      ? rawPrice
      : parseFloat(String(rawPrice).replace(/[^0-9.]/g, "") || "0");
    const formattedPrice = isNaN(numPrice) ? "$99.00" : `$${numPrice.toFixed(2)}`;
    const stockVal = Number(productData.stock ?? 25);

    const newProd: Product = {
      id: `PRD-${String(products.value.length + 1).padStart(2, "0")}`,
      name: productData.name?.trim() || "Untitled Product",
      category: productData.category?.trim() || "General",
      price: formattedPrice,
      stock: stockVal,
      sales: 0,
      status: !productData.inStock ? "Out of Stock" : stockVal > 10 ? "In Stock" : stockVal > 0 ? "Low Stock" : "Out of Stock",
      inStock: productData.inStock ?? true,
      sku: productData.sku?.trim() || `SKU-${Date.now().toString().slice(-4)}`,
      description: productData.description?.trim() || "",
    };
    products.value.unshift(newProd);
    showToast(`Product "${newProd.name}" added to catalog!`);
    return newProd;
  };

  const addCustomer = (customerData: Partial<Customer>) => {
    const name = customerData.name?.trim() || "New Customer";
    const nameParts = name.split(" ").filter(Boolean);
    const initials = nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase() || "NC";

    const status: CustomerStatus = customerData.status || "Active";
    const badgeVariant: Customer["badgeVariant"] =
      status === "VIP" ? "default" : status === "Active" ? "success" : status === "New" ? "secondary" : "warning";

    const newCust: Customer = {
      id: `CUST-${String(customers.value.length + 1).padStart(3, "0")}`,
      name,
      email: customerData.email?.trim() || `user${customers.value.length + 1}@example.com`,
      avatar: customerData.avatar?.trim() || "",
      initials,
      ordersCount: Number(customerData.ordersCount ?? 0),
      totalSpent: customerData.totalSpent ? (customerData.totalSpent.startsWith("$") ? customerData.totalSpent : `$${customerData.totalSpent}`) : "$0.00",
      status,
      badgeVariant,
      lastOrderDate: "Just now",
      paymentMethod: customerData.paymentMethod?.trim() || "Visa •••• 4242",
      location: customerData.location?.trim() || "San Francisco, CA",
      phone: customerData.phone?.trim() || "+1 (555) 012-3456",
    };
    customers.value.unshift(newCust);
    showToast(`Customer "${newCust.name}" registered!`);
    return newCust;
  };

  const toggleProductStock = (id: string, inStock: boolean) => {
    const p = products.value.find((item) => item.id === id);
    if (p) {
      p.inStock = inStock;
      p.status = inStock ? (p.stock > 10 ? "In Stock" : "Low Stock") : "Out of Stock";
      showToast(`${p.name} availability updated to ${inStock ? 'Available' : 'Hidden'}`);
    }
  };

  const deleteProduct = (id: string) => {
    const p = products.value.find((item) => item.id === id);
    products.value = products.value.filter((item) => item.id !== id);
    showToast(`Product ${p?.name || id} removed from catalog`);
  };

  const deleteCustomer = (id: string) => {
    const c = customers.value.find((item) => item.id === id);
    customers.value = customers.value.filter((item) => item.id !== id);
    showToast(`Customer ${c?.name || id} removed`);
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
    customers,
    selectedOrders,
    selectedProducts,
    selectedCustomers,
    filteredOrders,
    filteredProducts,
    filteredCustomers,
    addProduct,
    addCustomer,
    toggleProductStock,
    deleteProduct,
    deleteCustomer,
    updateOrderStatus,
  };
};
