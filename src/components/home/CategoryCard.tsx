"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn, getDirectImageUrl } from "@/lib/utils";
import { useState } from "react";
import shoe1 from "@/assets/shoe1.png";
import shoe2 from "@/assets/shoe2.png";
import shoe3 from "@/assets/shoe3.png";
import shoe4 from "@/assets/shoe4.png";

const FALLBACK_IMAGES = [shoe1, shoe2, shoe3, shoe4];

interface CategoryCardProps {
  title: string;
  image: string;
  index: number;
  isActive?: boolean;
}

export function CategoryCard({ title, image, index, isActive }: CategoryCardProps) {
  const [imgError, setImgError] = useState(false);
  
  // Choose fallback based on index
  const fallbackImage = FALLBACK_IMAGES[index % 4];
  
  // Logic to determine if fallback should be shown
  const showFallback = !image || imgError || image.includes("placehold.co") || image.includes("placeimg.com");

  return (
    <div 
      className={cn(
        "group relative aspect-[4/5] w-full rounded-tl-[1.5rem] overflow-hidden transition-all duration-500 sm:aspect-square md:aspect-[4/5]",
        isActive 
          ? "bg-[#ECEEF0] ring-4 ring-primary/10" 
          : "bg-white opacity-80 grayscale-[0.5] hover:opacity-100 hover:grayscale-0"
      )}
    >
      {/* Category Image */}
      <div className={cn(
        "relative h-full w-full transition-transform duration-700",
        isActive ? "scale-105" : "group-hover:scale-105"
      )}>
        <Image
          src={showFallback ? fallbackImage : getDirectImageUrl(image)}
          alt={title}
          fill
          className="object-contain p-8 md:p-12"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
        <h3 className="text-xl font-black uppercase leading-tight tracking-tighter text-zinc-900 md:text-2xl lg:text-3xl">
          {title.split(" ").map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </h3>
        
        {/* Action Button */}
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white transition-all md:h-12 md:w-12">
          <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" />
        </div>
      </div>
    </div>
  );
}
