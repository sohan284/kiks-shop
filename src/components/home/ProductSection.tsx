"use client";

import { ProductCard, ProductSkeleton } from "@/components/common/ProductCard";
import { CustomButton } from "../common/CustomButton";
import { useGetProductsQuery } from "@/services/productsApi";
import { StatusView } from "../common/StatusView";

export function ProductSection() {
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();

  if (isLoading) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-start justify-between gap-6 md:items-end">
          <div className="flex flex-col gap-2">
            <div className="h-10 w-48 bg-zinc-300 rounded-lg animate-pulse" />
            <div className="h-10 w-32 bg-zinc-300 rounded-lg animate-pulse" />
          </div>
          <div className="h-12 w-40 bg-zinc-300 rounded-lg animate-pulse" />
        </div>
        <div className="grid gap-x-6 gap-y-12 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <StatusView 
          type="error" 
          onRetry={refetch}
          message="We couldn't load the latest drops. Check your connection or try again."
        />
      </section>
    );
  }

  /**
   * For the "New Drops" section, we skip the first few products 
   * and show a curated selection from the list.
   */
  const displayedProducts = products?.slice(2, 6) || [];

  if (displayedProducts.length === 0) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <StatusView 
          type="empty" 
          message="The new collection is on its way. Stay tuned for the latest drops!"
        />
      </section>
    );
  }

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
