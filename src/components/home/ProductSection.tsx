"use client";

import { ProductCard } from "@/components/common/ProductCard";
import { CustomButton } from "../common/CustomButton";
import { useGetProductsQuery } from "@/services/productsApi";

export function ProductSection() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-start justify-between gap-6 md:items-end animate-pulse">
          <div className="h-20 w-64 bg-zinc-200 rounded-lg" />
          <div className="h-12 w-40 bg-zinc-200 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-4 animate-pulse">
              <div className="aspect-square w-full rounded-[2.5rem] bg-zinc-200" />
              <div className="h-6 w-3/4 bg-zinc-200 rounded" />
              <div className="h-10 w-full bg-zinc-200 rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-4 py-16 text-center">
        <p className="text-red-500 font-bold">Failed to load products. Please try again later.</p>
      </section>
    );
  }

  /**
   * For the "New Drops" section, we skip the first few products 
   * and show a curated selection from the list.
   */
  const displayedProducts = products?.slice(2, 6) || [];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 flex items-start justify-between gap-6 md:items-end">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl-fluid font-black uppercase leading-[0.9] tracking-tighter text-zinc-900 ">
            Don&apos;t Miss Out <br />
            New Drops
          </h2>
        </div>
        <CustomButton>
          Shop New Drops
        </CustomButton>
      </div>

      {/* Grid */}
      <div className="grid gap-x-6 gap-y-12 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {displayedProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            badge="New"
          />
        ))}
      </div>
    </section>
  );
}
