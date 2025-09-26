"use client";

import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setSearchQuery, setRegionFilter, setJenisFilter } from "@/redux/slices/eSimSlice";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiChevronDown, mdiMagnify } from "@mdi/js";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, DrawerTrigger } from "../ui/drawer";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface RadioOptions {
  label: string;
  value: string;
}

export default function Header() {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedJenis, setSelectedJenis] = useState<string>("");
  const [regionDrawerOpen, setRegionDrawerOpen] = useState(false);
  const [jenisDrawerOpen, setJenisDrawerOpen] = useState(false);

  useEffect(() => {
    setSelectedRegion("");
    dispatch(setRegionFilter(""));
    setSelectedJenis("");
    dispatch(setJenisFilter(""));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(setSearchQuery(value));
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
  };

  const handleJenisChange = (value: string) => {
    setSelectedJenis(value);
  };

  const handleApplyRegionFilter = () => {
    dispatch(setRegionFilter(selectedRegion));
  };

  const handleApplyJenisFilter = () => {
    dispatch(setJenisFilter(selectedJenis));
  };

  const handleResetRegion = () => {
    setSelectedRegion("");
    dispatch(setRegionFilter(""));
    setRegionDrawerOpen(false);
  };

  const handleResetJenis = () => {
    setSelectedJenis("");
    dispatch(setJenisFilter(""));
    setJenisDrawerOpen(false);
  };

  const regionOptions: RadioOptions[] = [
    {
      label: "Semua Region",
      value: "",
    },
    {
      label: "Asia",
      value: "asia",
    },
    {
      label: "Amerika",
      value: "amerika",
    },
    {
      label: "Europe",
      value: "europe",
    },
  ];

  const jenisOptions: RadioOptions[] = [
    { label: "Semua Jenis", value: "" },
    { label: "Instants", value: "instant" },
    { label: "Topupable", value: "topupable" },
  ];

  return (
    <header className="bg-[#2B3499] text-white pt-3 pb-12 px-3 sm:px-10 w-full top-0 z-0">
      {/* Title */}
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
        <Drawer open={regionDrawerOpen} onOpenChange={setRegionDrawerOpen}>
          <DrawerTrigger className="flex items-center text-[13px] gap-3 justify-between px-3 py-2 rounded-full bg-[#2B3499] cursor-pointer border border-gray-200 hover:bg-[#3D50C7] transition duration-300">
            <span className="font-bold">Semua Region</span>
            <Icon path={mdiChevronDown} size={0.7} />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                <div className="flex justify-between">
                  <div>Pilih Region</div>
                  <div className="text-sm cursor-pointer text-blue-600" onClick={handleResetRegion}>
                    Reset
                  </div>
                </div>
              </DrawerTitle>
            </DrawerHeader>

            <div className="px-4 pb-4 mt-4">
              <RadioGroup value={selectedRegion} onValueChange={handleRegionChange} className="space-y-4">
                {regionOptions.map((option) => (
                  <div key={option.value} className="flex items-center justify-between">
                    <span className="font-bold text-sm">{option.label}</span>
                    <RadioGroupItem value={option.value} className="h-6 w-6 cursor-pointer" />
                  </div>
                ))}
              </RadioGroup>
            </div>

            <DrawerFooter>
              <DrawerClose
                className="flex font-bold w-full font-bold py-3 justify-center text-gray-200 mb-3 items-center text-[15px] gap-3 justify-between px-3 py-2 rounded-full bg-[#2B3499] cursor-pointer border border-gray-200 hover:bg-[#3D50C7] transition duration-300"
                onClick={handleApplyRegionFilter}>
                <span>Terapkan</span>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Drawer open={jenisDrawerOpen} onOpenChange={setJenisDrawerOpen}>
          <DrawerTrigger className="flex items-center text-[13px] gap-3 justify-between px-3 py-2 rounded-full bg-[#2B3499] cursor-pointer border border-gray-200 hover:bg-[#3D50C7] transition duration-300">
            <span className="font-bold">Semua Jenis</span>
            <Icon path={mdiChevronDown} size={0.7} />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                <div className="flex justify-between">
                  <div>Pilih Jenis</div>
                  <div className="text-sm text-blue-600 cursor-pointer" onClick={handleResetJenis}>
                    Reset
                  </div>
                </div>
              </DrawerTitle>

              <div className="px-4 pb-4 mt-4">
                <RadioGroup value={selectedJenis} onValueChange={handleJenisChange} className="space-y-4">
                  {jenisOptions.map((option) => (
                    <div key={option.value} className="flex items-center justify-between">
                      <span className="font-bold text-sm">{option.label}</span>
                      <RadioGroupItem value={option.value} className="h-6 w-6 cursor-pointer" />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </DrawerHeader>
            <DrawerFooter>
              {/* <Button variant="default">Terapkan</Button> */}
              <DrawerClose
                className="flex font-bold w-full font-bold py-3 justify-center text-gray-200 mb-3 items-center text-[15px] gap-3 justify-between px-3 py-2 rounded-full bg-[#2B3499] cursor-pointer border border-gray-200 hover:bg-[#3D50C7] transition duration-300"
                onClick={handleApplyJenisFilter}>
                <span>Terapkan</span>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
