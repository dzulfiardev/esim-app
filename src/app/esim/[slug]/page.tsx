"use client";

import { useESimBySlug } from "@/redux/hooks";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiLightningBoltOutline, mdiCashPlus } from "@mdi/js";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CarouselDots, useCarouselDots } from "@/components/ui/carousel/carousel-dots";
import Autoplay from "embla-carousel-autoplay";
import { useState, use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ESim } from "../../../redux/slices/eSimSlice";

export default function ESimProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const router = useRouter();

  const eSim = useESimBySlug(slug) as ESim;
  const [api, setApi] = useState<any>(null);
  const { selectedIndex, scrollTo } = useCarouselDots(api);

  // If eSIM not found, show 404 page
  if (!eSim) {
    notFound();
  }

  interface DataSizeType {
    size: string;
    prices: Array<{
      validity: string;
      price: string;
    }>;
  }

  interface DataSizePriceType { 
    validity: string;
    price: string;
    price_raw: number;
  }

  const [selectedData, setSelectedData] = useState<string>("");
  const [dataSizeList, setDataSizeList] = useState<DataSizePriceType[]>([]);
  const [selectedValidity, setSelectedValidity] = useState<string>("");
  const [price, setPrice] = useState<string>("RP-");
  const [price_raw, setPriceRaw] = useState<number>(0);

  useEffect(() => {
    setSelectedData(eSim.dataSize[0].size);
    setDataSizeList(eSim.dataSize[0].prices);
    setSelectedValidity(eSim.dataSize[0].prices[0].validity);
    setPrice(eSim.dataSize[0].prices[0].price);
    setPriceRaw(eSim.dataSize[0].prices[0].price_raw);
  }, []);

  function handleDataSizeSelect(dataSize: string): void {
    setSelectedData(dataSize);
    const selectedDataSize = eSim.dataSize.find((data) => data.size === dataSize);
    if (selectedDataSize) {
      setDataSizeList(selectedDataSize.prices);
      setSelectedValidity(selectedDataSize.prices[0].validity);
      setPrice(selectedDataSize.prices[0].price);
    }
  }

  function handleValiditySelect(validity: string, price: string, price_raw: number): void {
    setSelectedValidity(validity);
    setPrice(price);
    setPriceRaw(price_raw);
  }

  function handleOrder(): void {
    const orderData = {
      productId: eSim.slug,
      productTitle: eSim.title,
      productRegion: eSim.regions,
      productType: eSim.type,
      selectedData: selectedData,
      selectedValidity: selectedValidity,
      price: price,
      price_raw: price_raw,
      timestamp: new Date().toISOString(),
      unix_time: Math.floor(Date.now() / 1000),
    };

    if (typeof window !== "undefined") {
      try {
        // Save to localStorage
        localStorage.setItem("eSimOrderData", JSON.stringify(orderData));
        router.push('/checkout?step=1');
      } catch (error) {
        console.error("Error saving order data:", error);
        alert("Terjadi kesalahan saat menyimpan data pesanan.");
      }
    }
  }

  return (
    <div className="max-w-[768px] mx-auto flex flex-col min-h-screen bg-gray-100">
      <header className="text-white w-full h-80 top-0 z-0 relative">
        <div className="items-center mt-4 mb-3 absolute top-4 sm:top-5 left-5 sm:left-4 z-10">
          <Link href="/" className="mr-2" aria-label="Go back">
            <Icon path={mdiChevronLeft} size={1.2} className="font-bold" />
          </Link>
        </div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          setApi={setApi}
          className="relative">
          <CarouselContent>
            {eSim.images.map((imageUrl, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-100 sm:h-80 flex justify-center items-center">
                  <Image src={imageUrl} alt={`${eSim.title} Image ${index + 1}`} fill className="object-cover object-center" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute bottom-32 sm:bottom-12 left-0 right-0 ">
            <CarouselDots api={api} count={eSim.images.length} selectedIndex={selectedIndex} onDotClick={scrollTo} />
          </div>
        </Carousel>
      </header>

      <main className="flex-grow pb-16 z-2">
        <div className="bg-white rounded-[30px] mt-[-30px] p-4">
          <div className="flex direction-row justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">{eSim.title}</h3>
              <p className="text-gray-500 mb-2">Region {eSim.regions}</p>

              <div className="flex items-center mb-4">
                {eSim.type === "Instant" ? (
                  <div className="flex items-center">
                    <Icon path={mdiLightningBoltOutline} size={0.9} className="text-[#2B3499]" />
                    <span className="text-sm text-gray-900 font-bold">Instant</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Icon path={mdiCashPlus} size={0.9} className="text-[#2B3499]" />
                    <span className="text-sm text-gray-900 font-bold">Topupable</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-2xl font-bold text-[#2B3499] mt-5">{price}</div>
          </div>

          <div className="cakupan-negara-wrapper p-4 mb-6 border border-gray-200 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-bold mb-1">Cakupan Negara</h3>
            <p className="text-gray-900">{eSim.country}</p>
          </div>

          <div className="ukuran-data-wrapper">
            <h3 className="text-lg font-bold mb-1">Ukuran Data {selectedData}</h3>
            <div className="flex gap-2 flex-wrap">
              {eSim.dataSize.map((data, index) => (
                <Button
                  onClick={() => handleDataSizeSelect(data.size)}
                  key={index}
                  className={`${
                    data.size === selectedData ? "bg-[#2B3499] text-white" : "bg-gray-100 text-[#2B3499]"
                  } py-5 border border-gray-300 rounded-xl font-bold hover:text-white hover:bg-[#2B3499]`}>
                  {data.size}
                </Button>
              ))}
            </div>
          </div>

          <div className="jumlah-hari-wrapper mt-5">
            <h3 className="text-lg font-bold mb-1">Pilih Jumlah Hari</h3>
            <div className="flex gap-2 flex-wrap">
              {dataSizeList.map((data, index) => (
                <Button
                  onClick={() => handleValiditySelect(data.validity, data.price, data.price_raw)}
                  key={index}
                  className={`${
                    data.validity == selectedValidity ? "bg-[#2B3499] text-white" : "bg-gray-100 text-[#2B3499]"
                  } border border-gray-300 py-5 rounded-xl font-bold hover:text-white hover:bg-[#2B3499]`}>
                  {data.validity} Hari
                </Button>
              ))}
            </div>
          </div>

          <div className="description-section mt-5 mb-6">
            <h4 className="text-lg font-bold mb-1">Deskripsi</h4>
            <ul className="list-disc list-inside text-gray-900 mt-2 text-sm leading-6 list-outside px-4">
              <li>SIM/eSIM dengan kecepatan hingga 4G.</li>
              <li>SIM/ tersedia dalam tiga ukuran; eSIM dilengkapi dengan kode QR dan petunjuk pemasangan.</li>
              <li>Terhubung ke operator terbaik untuk cakupan dan kecepatan optimal</li>
              <li>Masa berlaku data dimulai saat pertama kali digunakan di negara tujuan</li>
              <li>Paket mulai dari 500MB/hari hingga 30GB/bulan, dengan durasi dari 1 hari hingga 1 bulan</li>
            </ul>
          </div>

          <div className="mt-8 mb-5">
            <button onClick={handleOrder} className="w-full bg-[#2B3499] cursor-pointer text-white py-3 rounded-full font-bold hover:bg-[#3D50C7] transition duration-300">
              Pesan Sekarang
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
