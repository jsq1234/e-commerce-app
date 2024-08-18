import React from 'react'
import Input from './Input'
import { FaSearch } from 'react-icons/fa'

export default function SearchBar({
    className: string
}: {
    className?: string
}) {
  return (
    <div className={`xl:w-96 lg:w-64 relative`}>
        <Input name="searchBox" className="w-full leading-4 text-black pr-7 lg:text-sm text-xs py-0" />
        <FaSearch className="absolute top-1/4 right-2 text-amber-950 cursor-pointer" />
    </div>
  )
}
4