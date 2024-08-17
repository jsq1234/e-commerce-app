import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';

export default function ShoppingCart({
    itemCount
}: {
    itemCount? : number
}) {
  return (
    <FaShoppingCart />
  )
}
