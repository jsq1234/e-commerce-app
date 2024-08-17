import React from "react";
import Link from "next/link";
import SearchBar from "../ui/SearchBar";
import ShoppingCart from "../ui/ShoppingCart";
import { FaHeart, FaUser } from "react-icons/fa";

const navItems = [
  { name: "Shop", link: "/shop" },
  { name: "On Sale", link: "/shop?on-sale=true" },
  { name: "Brands", link: "/brands" },
  { name: "About Us", link: "/about-us" },
];

export default function Navbar() {
  return (
    <nav className="flex-between bg-amber-950 text-white sticky px-4 py-2 space-x-4">
      <div className="md:flex-between flex items-center lg:gap-6 gap-2  md:grow-0 grow">
        <img src="/shop-logo.png" alt="logo" className="w-11 h-11 lg:w-16 lg:h-16" />
        <h1 className="tracking-wider font-semibold lg:text-2xl text-md">ShopKart</h1>
      </div>
      <ul className="md:flex-between md:gap-2 md:grow hidden">
        {navItems.map(({ name, link }, idx) => (
          <li key={idx} className="rounded-md py-2 xl:px-8 px-4 xl:text-lg lg:text-lg text-sm min-w-fit hover:bg-amber-600 transition-all duration-400">
            <Link href={link}>{name}</Link>
          </li>
        ))}
      </ul>
      <div className="flex-between lg:space-x-5 md:space-x-3 space-x-2 text-lg">
        <SearchBar />
        <ShoppingCart />
        <FaHeart />
        <FaUser />
      </div>
    </nav>
  );
}
