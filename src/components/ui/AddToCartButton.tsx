"use client";
import { useContext } from "react";
import Button from "./Button";
import { CartCountContext } from "@/context/CartCountProvider";
import { sql } from "@vercel/postgres";

export default function AddToCartButton({ productId }: { productId: number }) {
  const { setCartCount } = useContext(CartCountContext);

  const addProductToCart = async (productId: number) => {
    try{
      setCartCount((count) => count + 1);
      const {} = await sql`INSERT INTO`;
    }catch(err: any){

    }  
  }
  return (
    <Button
      className="w-full"
      onClick={() => {
        setCartCount((count) => count + 1);
      }}
    >
      Add to Cart
    </Button>
  );
}
