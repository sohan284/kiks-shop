"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { cn, getDirectImageUrl } from "@/lib/utils";
import type { StaticImageData } from "next/image";
import review1 from "@/assets/review1.png";
import review2 from "@/assets/review2.png";
import review3 from "@/assets/review3.png";

const SHOE_IMAGES: StaticImageData[] = [review1, review2, review3];

interface ReviewCardProps {
  title: string;
  review: string;
  rating: number;
  userAvatar: string | StaticImageData;
  className?: string;
  index: number;
}

export function ReviewCard({
  index,
  title,
  review,
  rating,
  userAvatar,
  className,
}: ReviewCardProps) {
  // index % 3 — 3 এর বেশি card হলেও loop করবে
  const shoeImage = SHOE_IMAGES[index % SHOE_IMAGES.length];

  const isAvatarStatic = typeof userAvatar !== "string";

  return (
    <div className={cn("flex flex-col h-[340px] lg:h-[503px]", className)}>
      {/* Testimonial Area — 35% height */}
      <div className="relative rounded-t-[1rem] lg:rounded-t-[2rem] bg-white p-6 md:p-8 h-[35%] flex flex-col justify-center">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-zinc-900">{title}</h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600">
              {review}
            </p>
          </div>

          {/* Avatar */}
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/10">
            <Image
              src={isAvatarStatic ? userAvatar : getDirectImageUrl(userAvatar as string)}
              alt="User"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4 fill-current",
                  i < Math.floor(rating) ? "text-orange-400" : "text-zinc-200"
                )}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-zinc-900">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Product Lifestyle Image — 65% height */}
      <div className="relative w-full overflow-hidden rounded-b-[1rem] lg:rounded-b-[2rem] h-[65%]">
        <Image
          src={shoeImage}
          alt={`Review image ${index + 1}`}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  );
}