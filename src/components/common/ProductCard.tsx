"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/services/productsApi";
import { getDirectImageUrl } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index: number;
  badge?: string;
}

export function ProductCard({ product, index, badge }: ProductCardProps) {
  const { id, title, price, images } = product;

  // State to track if the remote image failed to load
  const [imgError, setImgError] = useState(false);

  // Use the first image from the array if available and not erroring
  const apiImage = images?.[0];
  const isValidImage = apiImage && !imgError && !apiImage.includes("placehold.co") && !apiImage.includes("placeimg.com");

  return (
    <div className="group flex flex-col gap-4">
      <Link href={`/product/${id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-302/334 w-full overflow-hidden rounded-[1.5rem] bg-[#ECEEF0] border-4 border-white">
          {badge && (
            <span className="absolute left-0 top-0 z-10 rounded-br-[1.5rem] bg-primary px-4 py-2 text-xs text-white uppercase">
              {badge}
            </span>
          )}
          <div className="relative h-full w-full">
            {isValidImage ? (
              <Image
                src={getDirectImageUrl(apiImage)}
                alt={title}
                fill
                className="object-contain p-6"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-200">
                <span className="text-zinc-400 text-xs">No Image</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col gap-3">
        <h3 className="line-clamp-2 h-[2.5em] text-sm-fluid font-black uppercase leading-tight tracking-tight text-zinc-900">
          {title}
        </h3>
        <Link href={`/product/${id}`}>
          <Button
            className="h-12 w-full justify-center rounded-xl bg-zinc-900 text-xs lg:text-sm font-medium uppercase tracking-wider text-white hover:bg-zinc-800 cursor-pointer"
          >
            View Product — <span className="text-orange-400 ml-1">${price}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {/* Image Container Skeleton */}
      <div className="relative aspect-302/334 w-full rounded-[1.5rem] bg-zinc-300 border-4 border-white" />

      {/* Product Info Skeleton */}
      <div className="flex flex-col gap-3">
        {/* Title Placeholder (2 lines height) */}
        <div className="h-10 w-full bg-zinc-300 rounded-md" />

        {/* Button Placeholder */}
        <div className="h-12 w-full bg-zinc-300 rounded-xl mt-2" />
      </div>
    </div>
  );
}
