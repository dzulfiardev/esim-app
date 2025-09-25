"use client";

import Image from "next/image";
import { ESim } from "@/redux/slices/eSimSlice";
import Icon from "@mdi/react";
import { mdiLightningBolt, mdiCashPlus } from "@mdi/js";
import Link from "next/link";

interface ProductCardProps {
  product: ESim;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Get the first price of the first data size package
  const defaultPrice = product.dataSize[0]?.prices[0]?.price || "N/A";

  return (
    <div className="rounded-[20px] overflow-hidden shadow-md bg-white h-full hover:cursor-pointer transition transform hover:scale-[1.02]">
      {/* Product Image */}
      <Link href={`/esim/${product.slug}`}>
        <div className="p-2">
          <div className="relative w-full h-50">
            <Image src={product.images[0]} alt={product.title} fill sizes="(max-width: 768px) 50vw, 33vw" style={{ objectFit: "cover", borderRadius: "20px" }} />
          </div>
        </div>

        {/* Product Details */}
        <div className="pt-2 pb-6 px-4">
          <h3 className="font-bold text-base mb-2">{product.title}</h3>
          <p className="text-gray-500 text-xs mb-2">Region {product.regions}</p>

          {/* Type indicator */}
          <div className="flex items-center mb-2">
            {product.type === "Instant" ? (
              <div className="flex items-center">
                <Icon path={mdiLightningBolt} size={0.9} className="text-[#2B3499]" />
                <span className="ml-1 text-xs text-gray-900 font-bold">Instant</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Icon path={mdiCashPlus} size={0.9} className="text-[#2B3499]" />
                <span className="ml-1 text-xs text-gray-900 font-bold">Topupable</span>
              </div>
            )}
          </div>

          {/* Price */}
          <p className="font-bold text-xl text-base text-[#2B3499]">{defaultPrice}</p>
        </div>
      </Link>
    </div>
  );
}
