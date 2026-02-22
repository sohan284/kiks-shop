"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useGetProductsQuery } from "@/services/productsApi";
import { ProductCard, ProductSkeleton } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface RelatedProductsProps {
  currentProductId: number;
  showTitle?: string;
}

export function RelatedProducts({ currentProductId, showTitle = "You may also like" }: RelatedProductsProps) {
  const { data: products, isLoading } = useGetProductsQuery();
  const swiperRef = useRef<any>(null);

  if (isLoading || !products) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-10 w-48 bg-zinc-300 rounded-lg animate-pulse mb-12" />
        <div className="grid gap-x-6 gap-y-12 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  // Filter out the current product
  const relatedProducts = products.filter((p) => p.id !== currentProductId);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <h2 className="text-[1.5rem] lg:text-[3rem] font-black tracking-tighter text-zinc-900">
          {showTitle}
        </h2>
        
        {/* Navigation buttons */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => swiperRef.current?.slidePrev()}
            className="h-10 w-10 rounded-lg bg-zinc-400 text-white hover:bg-zinc-500"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => swiperRef.current?.slideNext()}
            className="h-10 w-10 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ 
            type: "progressbar",
            el: ".slider-progress-bar"
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="related-products-swiper overflow-visible!"
        >
          {relatedProducts.map((product, index) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .slider-progress-bar .swiper-pagination-progressbar-fill {
          background: #4A69E2 !important;
          border-radius: 9999px;
        }
      `}</style>
    </section>
  );
}
