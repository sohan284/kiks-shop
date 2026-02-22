"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Heart, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
  addToCart,
  removeFromCart,
  deleteFromCart
} from "@/features/cart/cartSlice";
import { getDirectImageUrl } from "@/lib/utils";
import { RelatedProducts } from "@/components/product/RelatedProducts";

export default function CartContent() {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQuantity = useSelector(selectTotalQuantity);
  const dispatch = useDispatch();

  const deliveryFee = cartItems.length > 0 ? 6.99 : 0;
  const grandTotal = totalPrice + deliveryFee;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      {/* Promo Header */}
      <motion.div
        className="mb-8 flex flex-col gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-black tracking-tight text-zinc-900">Saving to celebrate</h2>
        <p className="text-sm text-zinc-500">
          Enjoy up to 60% off thousands of styles during the End of Year sale - while supplies last. No code needed.
        </p>
        <div className="flex gap-1 text-sm underline underline-offset-4">
          Join us
          <span className="no-underline text-zinc-400">or</span>
          Sign-in
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left: Your Bag */}
        <motion.div
          className="lg:col-span-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="rounded-[2rem] bg-white p-6 md:p-10 shadow-sm">
            <h1 className="mb-2 text-2xl font-black uppercase tracking-tight text-zinc-900">Your Bag</h1>
            <p className="mb-8 text-sm text-zinc-500">
              Items in your bag not reserved- check out now to make them yours.
            </p>

            {cartItems.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-lg font-medium text-zinc-500 mb-6">Your bag is empty.</p>
                <Link href="/">
                  <Button className="bg-zinc-900 text-white rounded-xl px-8 h-12 uppercase tracking-widest">
                    Go Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex flex-col gap-6 md:flex-row md:items-start border-b border-zinc-100 pb-8 last:border-0 last:pb-0">
                    {/* Item Image */}
                    <div className="relative aspect-square w-full md:w-48 shrink-0 overflow-hidden rounded-3xl bg-[#ECEEF0]">
                      <Image
                        src={typeof item.image === "string" ? getDirectImageUrl(item.image) : item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-lg font-black uppercase leading-tight text-zinc-900 md:text-xl">
                            {item.name}
                          </h3>
                          <p className="text-sm font-medium text-zinc-500">{item.category || "Men's Road Running Shoes"}</p>
                          <p className="text-sm font-medium text-zinc-400">Enamel Blue/ University White</p>
                        </div>
                        <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
                      </div>

                      {/* Size/Quantity Selectors */}
                      <div className="mt-4 flex gap-6">
                        <button className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                          Size 10 <ChevronDown className="h-4 w-4" />
                        </button>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-zinc-600">Quantity {item.quantity}</span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => dispatch(removeFromCart(item.id))}
                              className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-200 hover:bg-zinc-50"
                            >
                              <ChevronLeft className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => dispatch(addToCart(item))}
                              className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-200 hover:bg-zinc-50"
                            >
                              <ChevronRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-auto flex gap-4 pt-6">
                        <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
                          <Heart className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => dispatch(deleteFromCart(item.id))}
                          className="text-zinc-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Right: Order Summary */}
        <motion.div
          className="lg:col-span-4 lg:pl-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col gap-6 sticky top-24">
            <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">Order Summary</h2>

            <div className="flex flex-col gap-4 text-sm font-medium text-zinc-700">
              <div className="flex justify-between">
                <span>{totalQuantity} ITEM{totalQuantity !== 1 ? 'S' : ''}</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax</span>
                <span>-</span>
              </div>
              <div className="mt-2 flex justify-between text-lg font-black text-zinc-900 border-t border-zinc-100 pt-4">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button className="h-14 w-full rounded-xl bg-zinc-900 text-base font-bold uppercase tracking-widest text-white hover:bg-zinc-800">
              Checkout
            </Button>

            <Link href="#" className="flex items-center gap-1 text-sm font-bold text-zinc-900 underline underline-offset-4">
              Use a promo code
            </Link>
          </div>
        </motion.div>
      </div>

      {/* You may also like Section */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <RelatedProducts showTitle="You may also like" currentProductId={0} />
      </motion.div>
    </main>
  );
}
