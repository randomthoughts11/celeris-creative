"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { NAV_LINKS } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-iris focus:px-5 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className={clsx(
          "fixed inset-x-0 top-0 z-[95] transition-all duration-500",
          scrolled && !open ? "py-3" : "py-5"
        )}
      >
        <div
          className={clsx(
            "mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-all duration-500 lg:px-10",
            scrolled && !open && "lg:px-8"
          )}
        >
          <div
            aria-hidden
            className={clsx(
              "pointer-events-none absolute inset-0 transition-opacity duration-500",
              scrolled && !open ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="glass absolute inset-x-4 inset-y-0 rounded-2xl lg:inset-x-8" />
          </div>

          <Link
            href="/"
            className="relative z-10 font-display text-xl font-bold tracking-tight text-snow"
            aria-label="Celeris Creative — home"
          >
            celeris<span className="text-iris">.</span>
          </Link>

          <nav className="relative z-10 hidden items-center gap-9 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "group relative text-sm transition-colors duration-300",
                  pathname === link.href ? "text-snow" : "text-fog hover:text-snow"
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={clsx(
                    "absolute -bottom-1 left-0 h-px bg-iris transition-all duration-300",
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="relative z-10 hidden md:block">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-line-strong px-6 py-2.5 text-sm text-snow transition-colors duration-300 hover:border-iris"
            >
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full bg-iris transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
              />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
                Book Strategy Call
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={clsx(
                "h-px w-6 bg-snow transition-transform duration-300",
                open && "translate-y-[3.5px] rotate-45"
              )}
            />
            <span
              className={clsx(
                "h-px w-6 bg-snow transition-transform duration-300",
                open && "-translate-y-[3.5px] -rotate-45"
              )}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.65, 0.05, 0, 1] }}
            className="fixed inset-0 z-[94] flex flex-col justify-between bg-ink-2 px-6 pb-10 pt-28 md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="font-display block py-3 text-5xl font-semibold tracking-tight text-snow"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <Link
                href="/contact"
                className="flex w-full items-center justify-center rounded-full bg-iris px-8 py-4 text-base font-medium text-ink"
              >
                Book Strategy Call
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
