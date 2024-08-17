import React from "react";

export default function Input({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <input
      name={name}
      className={`border-2 border-amber-400 text-sm leading-8 rounded-md px-2 py-1 outline-none bg-orange-100 focus:bg-orange-200 hover:bg-orange-200 ${className}`}
    />
  );
}
