"use client";

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
// Fallback images are only used if the API provides zero images
import shoe1 from "@/assets/shoe1.png";
import detailsShoe1 from "@/assets/details-1.png";
import detailsShoe2 from "@/assets/details-2.png";
import detailsShoe3 from "@/assets/details-3.png";
import { motion } from "framer-motion";
import { useGetProductByIdQuery } from "@/services/productsApi";
import { StatusView } from "@/components/common/StatusView";
import { getDirectImageUrl } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ProductDetailsSkeleton } from "./ProductDetailsSkeleton";

const FALLBACK_IMAGES = [detailsShoe1, detailsShoe2, detailsShoe3, shoe1];

interface ProductDetailsContentProps {
  productId: number;
}

export default function ProductDetailsContent({ productId }: ProductDetailsContentProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const dispatch = useDispatch();

  const { data: product, isLoading, isError, refetch } = useGetProductByIdQuery(productId);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError || !product) {
    return (
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <StatusView
          type="error"
          onRetry={refetch}
          message="We couldn't load the product details. Check your connection or try again."
        />
      </main>
    );
  }

  // Use API images, fallback only if completely empty
  const finalImages = product.images && product.images.length > 0
    ? product.images
    : FALLBACK_IMAGES;

  // Colors and sizes are not in the current API, so we keep dummy data for design
  const productMeta = {
    colors: ["#2D3240", "#7B8E7D"],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"],
    about: [
      "This product is excluded from all promotional discounts and offers.",
      "Pay over time in interest-free installments with Affirm, Klarna or Afterpay.",
      "Join adiClub to get unlimited free standard shipping, returns, & exchanges."
    ]
  };

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Gallery Section */}
        <motion.div
          className="lg:col-span-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Desktop: 2x2 Grid (LG and up) */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {finalImages.map((img, idx) => {
              const isRemote = typeof img === "string";

              // Dynamic corner rounding based on count and position
              const isFirst = idx === 0;
              const isSecond = idx === 1;
              const isLast = idx === finalImages.length - 1;

              const cornerClass =
                (isFirst ? "rounded-tl-[4rem] " : "") +
                (isSecond || (isFirst && finalImages.length === 1) ? "rounded-tr-[4rem] " : "") +
                (isLast ? "rounded-br-[4rem] " : "");

              return (
                <div
                  key={idx}
                  className={`relative aspect-square overflow-hidden max-h-[510px] bg-[#ECEEF0] ${cornerClass} ${finalImages.length === 1 ? "col-span-2" : ""}`}
                >
                  <Image
                    src={isRemote ? getDirectImageUrl(img as string) : img}
                    alt={`${product.title} view ${idx + 1}`}
                    fill
                    className="object-contain p-8 transition-transform duration-500 hover:scale-105"
                  />
                </div>
              );
            })}
          </div>

          {/* Mobile: State-managed Gallery (Below LG) */}
          <div className="block lg:hidden">
            <div className="relative mb-4 aspect-square rounded-[1.5rem] h-[273px] w-full bg-[#ECEEF0] overflow-hidden">
              {finalImages[activeIndex] && (
                <Image
                  src={typeof finalImages[activeIndex] === "string"
                    ? getDirectImageUrl(finalImages[activeIndex] as string)
                    : finalImages[activeIndex]}
                  alt={`${product.title} mobile view`}
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>

            {/* Thumbnails: 2x2 Grid or Row */}
            <div className="grid grid-cols-5 gap-3 px-1">
              {finalImages.map((img, idx) => {
                const isRemote = typeof img === "string";
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative aspect-square overflow-hidden rounded-lg bg-[#ECEEF0] transition-all ${activeIndex === idx ? "ring-2 ring-primary ring-offset-2 scale-95" : "opacity-70"
                      }`}
                  >
                    <Image
                      src={isRemote ? getDirectImageUrl(img as string) : img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {/* Right: Product Info */}
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col gap-6 sticky top-24">
            {/* Badge & Title */}
            <div className="flex flex-col gap-4 text-left">
              <div className="w-fit bg-primary text-white rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider">
                New Release
              </div>
              <h1 className="text-[1.5rem] lg:text-[2rem] font-black uppercase leading-none tracking-tight text-zinc-900">
                {product.title}
              </h1>
              <p className="text-2xl font-black text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Color Selection */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Color</span>
              <div className="flex gap-3">
                {productMeta.colors.map((color, i) => (
                  <button
                    key={i}
                    className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${i === 0 ? "border-zinc-900 ring-2 ring-zinc-100 ring-offset-1" : "border-transparent"}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Size</span>
                <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 underline underline-offset-4">Size Chart</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {productMeta.sizes.map((size, i) => (
                  <button
                    key={size}
                    className={`flex h-12 items-center justify-center rounded-lg border text-sm font-bold transition-all hover:bg-zinc-100 ${i === 0 ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-900 border-zinc-200"} ${["39", "40"].includes(size) ? "opacity-30 pointer-events-none bg-zinc-50" : ""}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex gap-2">
                <Button
                  onClick={() => dispatch(addToCart({
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    image: finalImages[0],
                    category: product.category?.name || "Sneakers"
                  }))}
                  className="h-14 flex-1 rounded-xl bg-zinc-900 text-base uppercase tracking-widest text-white hover:bg-zinc-800"
                >
                  Add To Cart
                </Button>
                <Button variant="outline" className="h-14 w-14 rounded-xl border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              <Button className="h-14 w-full rounded-xl bg-primary text-base uppercase tracking-widest text-white hover:bg-primary/90">
                Buy It Now
              </Button>
            </div>

            {/* Description & About */}
            <div className="flex flex-col gap-4 pt-3 ">
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold uppercase tracking-widest text-zinc-900">About the Product</span>
                <p className="text-base text-zinc-500 line-clamp-3">{product.description}</p>
              </div>
              <ul className="flex flex-col ">
                {productMeta.about.map((item, i) => (
                  <li key={i} className="flex gap-2 text-base leading-relaxed text-zinc-500">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <RelatedProducts currentProductId={productId} />
      </motion.div>
    </main>
  );
}
