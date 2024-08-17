import React from "react";

export default function Button({
  type,
  className,
  children,
}: {
  type?: "submit" | "reset" | "button";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button type={type} className={`py-2 px-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-white focus:border-2 focus:border-amber-700`}>
      {children}
    </button>
  );
}
