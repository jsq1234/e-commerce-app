"use server";

import { sql } from "@vercel/postgres";
import { CartProductView, Product } from "./types";

export const fetchAllProducts = async () => {
  const products = await sql<Product>`SELECT * FROM products`;
  return products.rows;
};

export const fetchAllCartItemsForUserId = async (user_id: number) => {
  const cartItems = await sql<CartProductView>`SELECT * FROM cart_products_view WHERE user_id = ${user_id}`;
  return cartItems.rows;
};

export const addProductToCard = async (user_id: number, product_id: number, quantity: number) => {
    return await sql`INSERT INTO cart_items(user_id, product_id, quantity) VALUES(${user_id}, ${product_id}, ${quantity}) RETURNING id`;
}
