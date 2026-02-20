"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/services/productsApi";
import { getDirectImageUrl } from "@/lib/utils";
import shoe1 from "@/assets/shoe1.png";
import shoe2 from "@/assets/shoe2.png";
import shoe3 from "@/assets/shoe3.png";
import shoe4 from "@/assets/shoe4.png";

const FALLBACK_IMAGES = [shoe1, shoe2, shoe3, shoe4];

interface ProductCardProps {
  product: Product;
  index: number;
  badge?: string;
}

export function ProductCard({ product, index, badge }: ProductCardProps) {
  const { title, price, images } = product;
  
  // Choose fallback based on index
  const fallbackImage = FALLBACK_IMAGES[index % 4];
  
  // State to track if the remote image failed to load
  const [imgError, setImgError] = useState(false);

  // Use the first image from the array if available and not erroring
  const apiImage = images?.[0];
  const showFallback = !apiImage || imgError || apiImage.includes("placehold.co") || apiImage.includes("placeimg.com");

  return (
    <div className="group flex flex-col gap-4">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-[#ECEEF0] border-4 border-white lg:w-[302px] lg:h-[334px]">
        {badge && (
          <span className="absolute left-0 top-0 z-10 rounded-br-[1.5rem] bg-primary px-4 py-2 text-xs text-white uppercase">
            {badge}
          </span>
        )}
        <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-110">
          <Image
            src={showFallback ? fallbackImage : getDirectImageUrl(apiImage)}
            alt={title}
            fill
            className="object-contain p-6"
            onError={() => setImgError(true)}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-3">
        <h3 className="line-clamp-2 text-sm-fluid font-black uppercase leading-tight tracking-tight text-zinc-900">
          {title}
        </h3>
        <Button 
          className="h-12 w-full justify-center rounded-xl bg-zinc-900 text-xs lg:text-sm font-medium uppercase tracking-wider text-white hover:bg-zinc-800"
        >
          View Product — <span className="text-orange-400 ml-1">${price}</span>
        </Button>
      </div>
    </div>
  );
}
