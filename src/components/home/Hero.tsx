"use client";

import Image from "next/image";
import hero from '@/assets/hero.png'
import hero2 from '@/assets/hero2.png'
import hero3 from '@/assets/hero3.png'

export default function Hero() {
  return (
    <section className=" px-4 py-12 sm:px-6 lg:px-8">
      {/* big bold typography */}
      <div className="mb-8 @container flex flex-col items-center text-center font-black leading-[0.85] tracking-tighter uppercase sm:mb-12">
        <h1 className="text-[clamp(2.5rem,16.5cqi,14.5rem)] text-nowrap text-zinc-900">
          DO IT <span className="text-blue-600">RIGHT</span>
        </h1>
      </div>

      {/* featured product container */}
      <div className="relative overflow-hidden rounded-[40px] bg-zinc-800">
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
        <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden lg:block">
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">
            Nike product of the year
          </span>
        </div>

        {/* brand card (bottom left content) */}
        <div className="absolute bottom-8 left-8 max-w-sm p-4 text-white md:bottom-12 md:left-12">
          <h2 className="text-hero-fluid font-black uppercase leading-none md:text-6xl">
            NIKE AIR MAX
          </h2>
          <p className="mt-4 text-sm font-medium text-white/80 md:text-base">
            Nike introducing the new air max for everyone&apos;s comfort
          </p>
          <button className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold uppercase transition-all hover:bg-blue-700 active:scale-95">
            SHOP NOW
          </button>
        </div>

        {/* thumbnails (bottom right) */}
        <div className="absolute bottom-8 right-8  flex gap-2 lg:gap-4 flex-col">
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
        </div>
      </div>
    </section>
  );
}
