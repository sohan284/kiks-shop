"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryCard, CategorySkeleton } from "./CategoryCard";
import { useGetCategoriesQuery } from "@/services/categoriesApi";
import { cn } from "@/lib/utils";
import { StatusView } from "../common/StatusView";
import { SliderNavigation } from "../common/SliderNavigation";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export function CategorySection() {
  const { data: categories, isLoading, isError, refetch } = useGetCategoriesQuery();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
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
      <section className="bg-zinc-900 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <div className="h-10 w-48 bg-zinc-700 rounded-lg animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 w-10 bg-zinc-700 rounded-lg animate-pulse" />
            <div className="h-10 w-10 bg-zinc-700 rounded-lg animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <CategorySkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !categories) {
    return (
      <section className="bg-zinc-900 px-4 py-16 sm:px-6 lg:px-8">
        <StatusView
          type="error"
          onRetry={refetch}
          className="bg-zinc-800/50 border-zinc-700"
          message="Failed to load categories. Please check your connection and try again."
        />
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="bg-zinc-900 px-4 py-16 sm:px-6 lg:px-8">
        <StatusView
          type="empty"
          title="No Categories"
          message="We couldn't find any sneaker categories at the moment."
          className="bg-zinc-800/50 border-zinc-700"
        />
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

        <SliderNavigation
          onPrev={() => swiperRef.current?.slidePrev()}
          onNext={() => swiperRef.current?.slideNext()}
          isBeginning={isBeginning}
          isEnd={isEnd}
          prevColors={{
            active: "bg-white text-zinc-900 hover:bg-zinc-100",
            inactive: "bg-zinc-400"
          }}
          nextColors={{
            active: "bg-white text-zinc-900 hover:bg-zinc-100",
            inactive: "bg-zinc-400"
          }}
        />
      </div>

      {/* Content Container with Rounded Top-Left */}
      <div className="rounded-tl-[3rem] bg-white w-[90%] ml-auto md:rounded-tl-[5rem] overflow-hidden">
        <div className={cn(direction === "vertical" ? "h-[700px] py-4" : "h-auto")}>
          <Swiper
            key={direction} // Re-init swiper when direction changes
            modules={[Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            direction={direction}
            spaceBetween={24}
            slidesPerView={direction === "vertical" ? 2 : 1.2}
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
