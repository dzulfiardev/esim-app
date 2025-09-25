"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setSearchQuery } from "@/redux/slices/eSimSlice";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiChevronDown, mdiMagnify } from "@mdi/js";

export default function Header() {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(setSearchQuery(value));
  };

  return (
    <header className="bg-[#2B3499] text-white pt-3 pb-12 px-3 sm:px-10 w-full top-0 z-0">
      {/* Title row with back button */}
      <div className="flex items-center mt-4 mb-3">
        <button className="mr-2" aria-label="Go back">
          <Icon path={mdiChevronLeft} size={1} />
        </button>
        <h1 className="text-lg font-bold">Travel eSIM</h1>
      </div>

      {/* Search input */}
      <div className="relative mt-8 mb-3">
        <input
          type="text"
          placeholder="Cari Produk Yang Anda Mau"
          className="w-full py-2 px-3 pr-10 rounded-xl text-gray-200 text-md focus:outline-none focus:ring-white focus:ring-1 placeholder:text-gray-300 bg-[#151B6F] transition duration-200"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-200">
          <Icon path={mdiMagnify} size={0.9} />
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 text-sm mt-4">
        <button className="flex items-center text-[13px] gap-3 justify-between px-3 py-2 rounded-full bg-[#2B3499] cursor-pointer border border-gray-200 hover:bg-[#3D50C7] transition duration-300">
          <span className="font-bold">Semua Region</span>
          <Icon path={mdiChevronDown} size={0.7} />
        </button>
        <button className="flex items-center text-[13px] gap-3 font-weight-bold justify-between px-3 py-2 rounded-full bg-[#2B3499] cursor-pointer border border-gray-200 hover:bg-[#3D50C7] transition duration-300">
          <span className="font-bold">Semua Jenis</span>
          <Icon path={mdiChevronDown} size={0.7} />
        </button>
      </div>
    </header>
  );
}
