"use client";
import { useContext, useState } from "react";
import Button from "./Button";
import { CartCountContext } from "@/context/CartCountProvider";
import { addProductToCard } from "@/lib/data";

export default function AddToCartButton({
  productId,
  addedToCart,
}: {
  productId: number;
  addedToCart: boolean;
}) {
  const { setCartCount } = useContext(CartCountContext);
  const [text, setText] = useState(addedToCart ? "Added" : "Add to Cart");
  return (
    <Button
      className="w-full"
      onClick={async () => {
        try {
          setCartCount((count) => count + 1);
          setText("Added");
          await addProductToCard(1, productId, 1);
        } catch (e) {
          console.error(e);
          setText("Add to Cart")
          setCartCount((count) => count - 1);
        }
      }}
      disabled={text === "Added"}
    >
      {text}
    </Button>
  );
}
