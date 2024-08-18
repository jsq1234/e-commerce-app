"use client";
import React from "react";

export default function Button({
  type,
  className,
  children,
  onClick
}: {
  type?: "submit" | "reset" | "button";
  className?: string;
  children?: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}) {
  return (
    <button type={type} className={`py-2 px-4 rounded-lg bg-rose-600 hover:bg-rose-500 text-white focus:border-rose-700 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
