"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="relative flex items-center">
          <div className="relative h-10 w-[160px] sm:h-12 sm:w-[200px]">
            <Image
              src="/web_logo_300_v2.png"
              alt="Drive For Me - Designated Driver Service"
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 transition hover:text-[var(--primary)]"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 transition hover:text-[var(--primary)]"
          >
            About Us
          </Link>
          <Link
            href="/rates"
            className="text-sm font-medium text-gray-700 transition hover:text-[var(--primary)]"
          >
            Rates
          </Link>
          <Link
            href="/contact"
            className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-lg font-bold text-[var(--primary)]">
                PARTY ON
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-base font-medium text-gray-700"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="text-base font-medium text-gray-700"
              >
                About Us
              </Link>
              <Link
                href="/rates"
                onClick={() => setOpen(false)}
                className="text-base font-medium text-gray-700"
              >
                Rates
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-lg bg-[var(--primary)] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
