"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingCart, ChevronDown } from "lucide-react";
import logo from "../../assets/logo.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

// ─── Nav data ─────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "New Drops 🔥", href: "#", dropdown: null },
  {
    label: "Men",
    href: "#",
    dropdown: ["Sneakers", "Apparel", "Accessories", "Sale"],
  },
  {
    label: "Women",
    href: "#",
    dropdown: ["Sneakers", "Apparel", "Accessories", "Sale"],
  },
];

export default function Navbar() {
  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <nav className="flex h-16 items-center rounded-3xl bg-white px-6 shadow-sm">

        {/* ── LEFT ── */}
        <div className="flex flex-1 items-center">

          {/* Mobile: Sheet (burger) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-72 p-0">
              <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex h-6 w-24 items-center">
                  <Image
                    src={logo}
                    alt="Logo"
                    width={150}
                    height={150}
                    className="h-full w-full object-contain"
                  />
                </Link>
              </div>

              <div className="px-4 py-4">
                {NAV_LINKS.map((link) =>
                  link.dropdown ? (
                    /* Accordion for items with sub-links */
                    <Accordion key={link.label} type="single" collapsible>
                      <AccordionItem value={link.label} className="border-none">
                        <AccordionTrigger className="py-3 text-[15px] font-semibold text-zinc-900 hover:no-underline">
                          {link.label}
                        </AccordionTrigger>
                        <AccordionContent className="pb-2 pl-3">
                          <ul className="flex flex-col gap-1">
                            {link.dropdown.map((item) => (
                              <li key={item}>
                                <Link
                                  href="#"
                                  className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-gray-100 hover:text-primary"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    /* Plain link */
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block rounded-lg px-2 py-3 text-[15px] font-semibold text-zinc-900 transition-colors hover:bg-gray-100 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop: nav links */}
          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-1 font-semibold text-zinc-900 hover:text-primary px-2"
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-44 rounded-2xl p-1.5">
                    {link.dropdown.map((item) => (
                      <DropdownMenuItem key={item} asChild>
                        <Link
                          href="#"
                          className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 cursor-pointer hover:text-primary"
                        >
                          {item}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-semibold text-zinc-950 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>

        {/* ── CENTER – logo ── */}
        <Link href="/" className="flex h-5 w-20 shrink-0 items-center md:h-8 md:w-32">
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={150}
            className="h-full w-full object-contain"
          />
        </Link>

        {/* ── RIGHT – icons ── */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <Button variant="ghost" size="icon" className="text-zinc-900 hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-900 hover:text-primary">
            <User className="h-5 w-5" />
          </Button>
          <button className="relative flex items-center justify-center rounded-full bg-orange-400 p-2 text-white transition-colors hover:bg-orange-500">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold">
              0
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}