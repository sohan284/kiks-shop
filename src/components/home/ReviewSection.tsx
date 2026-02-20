"use client";

import { ReviewCard } from "./ReviewCard";
import { CustomButton } from "../common/CustomButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import review1 from "@/assets/review1.png";
import review2 from "@/assets/review2.png";
import review3 from "@/assets/review3.png";

const REVIEWS = [
  {
    id: 1,
    title: "Good Quality",
    review: "I highly recommend shopping from kicks. The product quality is top-notch and delivery was super fast.",
    rating: 5.0,
    userAvatar: "https://pravatar.cc/150?u=1",
    shoeImage: review1,
  },
  {
    id: 2,
    title: "Good Quality",
    review: "The shoes are incredibly comfortable and stylish. Exactly what I was looking for. Will definitely buy more!",
    rating: 5.0,
    userAvatar: "https://pravatar.cc/150?u=2",
    shoeImage: review2,
  },
  {
    id: 3,
    title: "Good Quality",
    review: "Best shopping experience ever. The attention to detail in the packaging and product is amazing.",
    rating: 5.0,
    userAvatar: "https://pravatar.cc/150?u=3",
    shoeImage: review3,
  },
];

export function ReviewSection() {
  return (
    <section className="bg-[#ECEEF0] px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <h2 className="text-xl-fluid font-black uppercase leading-[0.9] tracking-tighter text-zinc-900">
          Reviews
        </h2>
        <CustomButton className="bg-[#4A69E2] border-[#4A69E2] hover:bg-[#3d58be]">
          See All
        </CustomButton>
      </div>

      {/* Slider */}
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="review-swiper pb-12"
        >
          {REVIEWS.map((review, index) => (
            <SwiperSlide key={index}>
              <ReviewCard {...review} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .review-swiper .swiper-pagination-bullet {
          background: #4A69E2;
          opacity: 0.2;
        }
        .review-swiper .swiper-pagination-bullet-active {
          background: #4A69E2;
          opacity: 1;
        }
        .review-swiper .swiper-pagination {
          bottom: 0 !ve-important;
        }
      `}</style>
    </section>
  );
}
