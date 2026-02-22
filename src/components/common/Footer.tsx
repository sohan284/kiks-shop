"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Music2 } from "lucide-react";
import logo from "@/assets/footerlogo.png"
import logoV2 from "@/assets/logoV2.png"
import Image from "next/image";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="">
      <div className="w-full rounded-[3rem] bg-[#4A69E2]">
        {/* Newsletter Section */}
        <motion.div
          className=" px-6 py-16 md:px-12 md:pt-20 lg:px-24 rounded-[3rem] md:rounded-[4rem] mx-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-[2rem]  uppercase leading-tight font-semibold tracking-tighter text-white lg:text-[3rem]">
                Join our KicksPlus <br />
                Club & get 15% off
              </h2>
              <p className="mt-4 text-base lg:text-[20px]  text-white/80">
                Sign up for free! Join the community.
              </p>
              <form className="mt-8 flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Email address"
                  className="h-12 flex-1 rounded-lg border border-white/20 bg-transparent px-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <button
                  type="submit"
                  className="h-12 cursor-pointer rounded-lg bg-[#232321] px-8 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800"
                >
                  Submit
                </button>
              </form>
            </div>

            <div className="relative">
              <div className="flex w-[200px] h-[60px] lg:w-[367px] lg:h-[112px] items-center gap-1 text-white relative">
                <Image src={logoV2} alt="logo" width={360} height={112} className="w-full h-full object-contain" />
                <div className="absolute -right-4 -top-2 flex h-4 w-4 pb-[2px] items-center justify-center rounded-full bg-[#FFA52F] font-black text-white">
                  +
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          className="rounded-[3rem]  bg-[#232321] px-6 pt-8 md:px-12 md:pt-24 lg:px-24 "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[40%_60%]">
            {/* About Us — Take 1/3 of the width */}
            <div className="flex flex-col gap-6 ">
              <h3 className="text-[20px] lg:text-[1.5rem] font-semibold tracking-tight text-[#FFA52F]">
                About us
              </h3>
              <p className="max-w-[446px] text-base lg:text-[20px] leading-relaxed text-[#ECEEF0]/70">
                We are the biggest hyperstore in the universe. We got you all cover with our exclusive collections and latest drops.
              </p>
            </div>

            {/* Links part — Take 2/3 of the width and split into 3 columns */}
            <div className=" grid grid-cols-1 gap-12 sm:grid-cols-3">
              {/* Categories */}
              <div className="flex flex-col gap-6">
                <h3 className="text-[20px] lg:text-[1.5rem] font-semibold tracking-tight text-[#FFA52F]">
                  Categories
                </h3>
                <ul className="flex flex-col gap-3">
                  {["Runners", "Sneakers", "Basketball", "Outdoor", "Golf", "Hiking"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-base font-normal text-[#ECEEF0] transition-colors hover:text-[#FFA52F] lg:text-[20px]">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="flex flex-col gap-6">
                <h3 className="text-[20px] lg:text-[1.5rem] font-semibold tracking-tight text-[#FFA52F]">
                  Company
                </h3>
                <ul className="flex flex-col gap-3">
                  {["About", "Contact", "Blogs"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-base font-normal text-[#ECEEF0] transition-colors hover:text-[#FFA52F] lg:text-[20px]">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Follow Us */}
              <div className="flex flex-col gap-6">
                <h3 className="text-[20px] lg:text-[1.5rem] font-semibold tracking-tight text-[#FFA52F]">
                  Follow us
                </h3>
                <div className="flex gap-4">
                  <Link href="#" className="text-[#ECEEF0] transition-colors hover:text-[#FFA52F]">
                    <Facebook className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-[#ECEEF0] transition-colors hover:text-[#FFA52F]">
                    <Instagram className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-[#ECEEF0] transition-colors hover:text-[#FFA52F]">
                    <Twitter className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-[#ECEEF0] transition-colors hover:text-[#FFA52F]">
                    <Music2 className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Massive Logo Background */}
          <motion.div
            className="mt-20 flex w-full items-center justify-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image src={logo} alt="logo" width={1000} height={1000} className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-[#ECEEF0] py-6 text-center">
        <p className="text-xs font-medium text-[#232321]/60">
          © All rights reserved
        </p>
      </div>
    </footer>
  );
}
