export type OrderStatus = "Completed" | "Processing" | "Shipped" | "Pending" | "Refunded";

export interface Order {
  id: string;
  customer: string;
  email: string;
  avatar: string;
  initials: string;
  product: string;
  date: string;
  amount: string;
  status: OrderStatus;
  badgeVariant: "success" | "default" | "secondary" | "warning" | "destructive";
  payment: string;
}

export type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  sales: number;
  status: ProductStatus;
  inStock: boolean;
  description?: string;
  sku?: string;
}

export interface MetricCardData {
  title: string;
  value: string;
  change: string;
  subtext: string;
  trend: "up" | "down";
}

export type CustomerStatus = "Active" | "VIP" | "New" | "Inactive";

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  ordersCount: number;
  totalSpent: string;
  status: CustomerStatus;
  badgeVariant: "success" | "default" | "secondary" | "warning" | "destructive";
  lastOrderDate: string;
  paymentMethod: string;
  location: string;
  phone?: string;
}
