"use client"
import { useState } from "react";
import { ProductCard, ProductSkeleton } from "@/components/common/ProductCard";
import { CustomButton } from "../common/CustomButton";
import { useGetProductsQuery } from "@/services/productsApi";
import { StatusView } from "../common/StatusView";
import { motion, AnimatePresence, Variants } from "framer-motion";


export function ProductSection() {
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();
  const [count, setCount] = useState(8);

  const containerVariants: Variants = {

    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {

    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

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
  const displayedProducts = products?.slice(0, count) || [];
  const hasMore = products ? count < products.length : false;

  if (displayedProducts.length === 0) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <StatusView
          type="empty"
          title="New Drops Coming Soon"
          message="The new collection is on its way. Stay tuned for the latest drops!"
        />
      </section>
    );
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex items-start justify-between gap-6 md:items-end"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-xl-fluid font-black uppercase leading-[0.9] tracking-tighter text-zinc-900 ">
            Don&apos;t Miss Out <br />
            New Drops
          </h2>
        </div>
        {hasMore && (
          <CustomButton onClick={() => setCount(prev => Math.min(prev + 4, products?.length || prev + 4))}>
            Shop New Drops
          </CustomButton>
        )}
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-x-6 gap-y-12 grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {displayedProducts.map((product, index) => (
            <motion.div
              layout
              key={product.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                badge="New"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
