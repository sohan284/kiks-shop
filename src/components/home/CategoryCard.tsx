"use client";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn, getDirectImageUrl } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  image: string;
  index: number;
  isActive?: boolean;
}

export function CategoryCard({ title, image, index, isActive }: CategoryCardProps) {
  return (
    <div
      className={cn(
        "group relative aspect-[4/3] w-full rounded-tl-[1.5rem] overflow-hidden transition-all duration-500 sm:aspect-square md:aspect-[4/5]",
        isActive
          ? "bg-[#ECEEF0] ring-4 ring-primary/10"
          : "bg-white opacity-80 grayscale-[0.5] hover:opacity-100 hover:grayscale-0"
      )}
    >
      {/* Category Image */}
      <div
        className={cn(
          "relative h-[80%] lg:h-[90%] w-full",
          isActive ? "scale-105" : ""
        )}
      >
        <Image
          src={getDirectImageUrl(image)}
          alt={title}
          fill
          className="object-contain"

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

export function CategorySkeleton() {
  return (
    <div className="group relative aspect-[4/3] w-full rounded-tl-[1.5rem] overflow-hidden bg-[#ECEEF0] animate-pulse sm:aspect-square md:aspect-[4/5]">
      {/* Category Image Placeholder */}
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="h-32 w-32 rounded-full bg-zinc-300" />
      </div>

      {/* Overlay Info Placeholder */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-32 bg-zinc-300 rounded-md" />
          <div className="h-8 w-24 bg-zinc-300 rounded-md" />
        </div>

        {/* Action Button Placeholder */}
        <div className="h-10 w-10 rounded-lg bg-zinc-300 md:h-12 md:w-12" />
      </div>
    </div>
  );
}
