"use client";

import { useESimBySlug } from "@/redux/hooks";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiLightningBoltOutline, mdiCashPlus } from "@mdi/js";
import { Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import { CarouselDots, useCarouselDots } from "@/components/ui/carousel/carousel-dots";
import Autoplay from "embla-carousel-autoplay";
import { useState, use } from "react";

export default function ESimProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  
  const eSim = useESimBySlug(slug);
  const [api, setApi] = useState<any>(null);
  const { selectedIndex, scrollTo } = useCarouselDots(api);

  // If eSIM not found, show 404 page
  if (!eSim) {
    notFound();
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
          className="relative"
        >
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
            <CarouselDots 
              api={api} 
              count={eSim.images.length} 
              selectedIndex={selectedIndex} 
              onDotClick={scrollTo} 
            />
          </div>
        </Carousel>
      </header>

      <main className="flex-grow pb-16 z-2">
        <div className="bg-white rounded-[30px] mt-[-30px] p-4">

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{eSim.title}</h2>
            <p className="text-gray-500 mb-2">Region {eSim.regions}</p>

            <div className="flex items-center mb-4">
              {eSim.type === "Instant" ? (
                <div className="flex items-center">
                  <Icon path={mdiLightningBoltOutline} size={0.9} className="text-[#2B3499]" />
                  <span className="ml-1 text-sm text-gray-900 font-bold">Instant</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Icon path={mdiCashPlus} size={0.9} className="text-[#2B3499]" />
                  <span className="ml-1 text-sm text-gray-900 font-bold">Topupable</span>
                </div>
              )}
            </div>
          </div>

          {/* <div>
            <h3 className="text-xl font-bold mb-4">Data Packages</h3>
            <div className="space-y-6">
              {eSim.dataSize.map((dataPackage, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4">
                  <h4 className="text-lg font-bold mb-3">{dataPackage.size}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {dataPackage.prices.map((price, priceIndex) => (
                      <div 
                        key={priceIndex} 
                        className="border border-gray-200 rounded-xl p-3 flex flex-col items-center hover:border-blue-500 cursor-pointer"
                      >
                        <p className="text-sm text-gray-500 mb-1">{price.validity} days</p>
                        <p className="font-bold text-[#2B3499]">{price.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Buy Button */}
          <div className="mt-8">
            <button className="w-full bg-[#2B3499] cursor-pointer text-white py-3 rounded-full font-bold hover:bg-[#3D50C7] transition duration-300">Buy Now</button>
          </div>
        </div>
      </main>
    </div>
  );
}
