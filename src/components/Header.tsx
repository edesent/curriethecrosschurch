"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { nav } from "@/lib/site";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/95 text-white backdrop-blur">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="Currie The Cross Church, home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-md px-3 py-2 text-[0.82rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                path.startsWith(n.href) ? "bg-white/10 text-amber" : "text-white/75 hover:text-white"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link href="/ride" className="btn btn-red ml-3 !py-2.5 !text-[0.88rem]">
            Get a ride
          </Link>
        </nav>
        <button
          className="rounded-md border border-white/25 px-4 py-2 text-sm font-bold uppercase tracking-wider lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-white/10 lg:hidden" aria-label="Main">
          <div className="wrap flex flex-col py-3">
            <Link href="/" className="border-b border-white/5 py-3.5 text-lg font-semibold">
              Home
            </Link>
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="border-b border-white/5 py-3.5 text-lg font-semibold">
                {n.label === "Nov 21" ? "Turkey Giveaway · Nov 21" : n.label}
              </Link>
            ))}
            <Link href="/contact" className="border-b border-white/5 py-3.5 text-lg font-semibold">
              Contact & prayer
            </Link>
            <Link href="/ride" className="btn btn-red mt-4 justify-center">
              Get a ride to church
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
