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
      className={`border-2 border-red-300 text-sm leading-8 rounded-md px-2 py-1 outline-none bg-rose-100 focus:bg-rose-50 ${className}`}
    />
  );
}
