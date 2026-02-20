"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryCard } from "./CategoryCard";
import { useGetCategoriesQuery } from "@/services/categoriesApi";
import { cn } from "@/lib/utils";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export function CategorySection() {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");

  // Detect direction based on viewport width
  useEffect(() => {
    const checkDirection = () => {
      setDirection(window.innerWidth < 768 ? "vertical" : "horizontal");
    };
    checkDirection();
    window.addEventListener("resize", checkDirection);
    return () => window.removeEventListener("resize", checkDirection);
  }, []);

  if (isLoading) {
    return (
      <section className="bg-zinc-900 py-20 text-center text-white">
        <p className="animate-pulse">Loading Categories...</p>
      </section>
    );
  }

  if (isError || !categories) {
    return (
      <section className="bg-zinc-900 py-20 text-center text-red-500">
        <p>Failed to load categories.</p>
      </section>
    );
  }

  return (
    <section className="bg-zinc-900">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl-fluid font-black uppercase tracking-tighter text-white">
          Categories
        </h2>
        
        {/* Navigation Controls */}
        <div className="flex gap-2">
          <button 
            onClick={() => swiperRef.current?.slidePrev()}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-all md:h-10 md:w-10",
              activeIndex > 0 ? "bg-white text-zinc-900" : "bg-zinc-700 text-white/30 cursor-not-allowed"
            )}
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => swiperRef.current?.slideNext()}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-all md:h-10 md:w-10",
              activeIndex < categories.length - 1 ? "bg-white text-zinc-900" : "bg-zinc-700 text-white/30 cursor-not-allowed"
            )}
            disabled={activeIndex >= categories.length - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content Container with Rounded Top-Left */}
      <div className="rounded-tl-[3rem] bg-white w-[90%] ml-auto md:rounded-tl-[5rem] overflow-hidden">
        <div className={cn(direction === "vertical" ? "h-[500px]" : "h-auto")}>
          <Swiper
            key={direction} // Re-init swiper when direction changes
            modules={[Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            direction={direction}
            spaceBetween={24}
            slidesPerView={direction === "vertical" ? 1.5 : 1.2}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 2 },
            }}
            className="category-swiper h-full"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={category.id}>
                <CategoryCard 
                  title={category.name} 
                  image={category.image} 
                  index={index}
                  isActive={index === activeIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
