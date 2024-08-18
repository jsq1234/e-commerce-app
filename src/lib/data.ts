"use server";

import { sql } from "@vercel/postgres";
import { CartProductView, Product } from "./types";
import { revalidatePath } from "next/cache";

export const fetchAllProducts = async () => {
  const products = await sql<Product>`SELECT * FROM products`;
  return products.rows;
};

export const fetchAllCartItemsForUserId = async (user_id: number) => {
  const cartItems = await sql<CartProductView>`SELECT * FROM cart_products_view WHERE user_id = ${user_id}`;
  return cartItems.rows;
};

export const addProductToCard = async (user_id: number, product_id: number, quantity: number) => {
  const result = await sql`INSERT INTO cart_items(user_id, product_id, quantity) VALUES(${user_id}, ${product_id}, ${quantity}) RETURNING id`;
  revalidatePath('/');
  revalidatePath('/cart');
  return result.rows;
}

export const productExistsInCart = async (product_id: number) => {
  const result = await sql`SELECT product_id FROM cart_items WHERE product_id = ${product_id}`;
  return result.rowCount ?? 0 > 0;
}

export const getProductsInCart = async (user_id: number) => {
  const result = await sql`SELECT product_id from cart_items WHERE user_id = ${user_id}`;
  return result.rows.map(item => item.product_id);
}