"use client";

import Image from "next/image";
import hero from '@/assets/hero.png'
import hero2 from '@/assets/hero2.png'
import hero3 from '@/assets/hero3.png'
import { CustomButton } from "../common/CustomButton";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="mt-6 px-4  sm:px-6 lg:px-8">
      {/* big bold typography */}
      <motion.div className="mb-6 lg:mb-12 @container flex flex-col items-center text-center font-black leading-[0.85] tracking-tighter uppercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[clamp(2.5rem,16.5cqi,14.5rem)] text-nowrap text-zinc-900">
          DO IT <span className="text-primary">RIGHT</span>
        </h1>
      </motion.div>

      {/* featured product container */}
      <motion.div className="relative overflow-hidden rounded-[40px] bg-zinc-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}

      >
        {/* large background image */}
        <div className="aspect-[16/9] w-full min-h-[400px] md:min-h-[600px] relative">
          <Image
            src={hero}
            alt="Nike Air Max Hero"
            fill
            className="object-cover object-center opacity-80"
            priority
          />
        </div>

        {/* vertical text overlay (left) */}
        <motion.div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden lg:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">
            Nike product of the year
          </span>
        </motion.div>

        {/* brand card (bottom left content) */}
        <motion.div className="absolute bottom-8 left-8 max-w-sm p-4 text-white md:bottom-12 md:left-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl-fluid font-black uppercase leading-none">
            NIKE AIR MAX
          </h2>
          <p className="mt-4 text-sm font-medium text-white/80 md:text-base">
            Nike introducing the new air max for everyone&apos;s comfort
          </p>
          <CustomButton className="mt-8">
            SHOP NOW
          </CustomButton>
        </motion.div>

        {/* thumbnails (bottom right) */}
        <motion.div className="absolute bottom-8 right-8  flex gap-2 lg:gap-4 flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:h-40 md:w-40 h-16 w-16 overflow-hidden rounded md:rounded-2xl ">
            <Image
              src={hero2}
              alt="Thumbnail 1"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="md:h-40 md:w-40 h-16 w-16 overflow-hidden rounded-2xl border-white/20">
            <Image
              src={hero3}
              alt="Thumbnail 2"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
