"use client";

import React, { createContext, useState, Dispatch, SetStateAction} from "react";

interface CartCountContextType {
    cartCount: number;
    setCartCount: Dispatch<SetStateAction<number>>;
}

export const CartCountContext = createContext<CartCountContextType>({
    cartCount: 0,
    setCartCount: () => {},
});

export default function CartCountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartCount, setCartCount] = useState(0);
  return (
    <CartCountContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartCountContext.Provider>
  );
}
