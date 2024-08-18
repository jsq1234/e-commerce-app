'use client';
import { CartCountContext } from '@/context/CartCountProvider';
import { getProductsInCart } from '@/lib/data';
import { useContext, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

export default function ShoppingCart() {
  const { cartCount, setCartCount } = useContext(CartCountContext);
  useEffect(() => {
    const func = async () => {
      const result = await getProductsInCart(1);
      setCartCount(result.length);
    }
    func()
  }, []);
  return (
    <div className="relative">
      <span className={`absolute rounded-full bg-rose-700 z-10 text-xs -right-3 text-white ${cartCount > 0 ? 'px-1 py-0.5' : '' } -top-5`}>{cartCount > 0 ? cartCount : ''}</span>
      <FaShoppingCart />
    </div>
  )
}
