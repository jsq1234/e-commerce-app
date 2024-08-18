// types.ts

// Represents a user in the 'users' table
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

// Represents a product in the 'products' table
export interface Product {
  id: number;
  title: string;
  price: number;
  discount_percentage: number;
  rating?: number;
  stock: number;
  image: string;
  created_at: Date;
  updated_at: Date;
}

// Represents a billing address in the 'billing_addresses' table
export interface BillingAddress {
  id: number;
  user_id: number;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  created_at: Date;
  updated_at: Date;
}

// Represents an item in the cart from the 'cart_items' table
export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface CartProductView {
  id: number;
  title: string;
  price: number;
  discount_percentage: number;
  image: string;
  quantity: string;
  stock: number;
}
