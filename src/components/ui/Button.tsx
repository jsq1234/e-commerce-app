"use client";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`py-2 px-4 rounded-lg bg-rose-600 hover:bg-rose-500 text-white focus:border-rose-700 disabled:bg-gray-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}