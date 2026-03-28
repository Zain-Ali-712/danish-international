"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import SidePanel from "./SidePanel";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative w-40 h-12">
            <Image
              src="/logo.png"
              alt="Danish International Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Navigation Options - Center */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[15px] font-medium text-color-3/70 hover:text-color-1 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-color-1 transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsPanelOpen(true)}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors group"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6 text-color-3 group-hover:text-color-1 transition-colors" />
          </button>
        </div>
      </nav>

      {/* Side Panel Overlay */}
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </>
  );
};

export default Navbar;
