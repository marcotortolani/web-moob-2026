"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { navLinks } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 max-w-[1728px] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <MediaMoobLogo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-mint",
                  "highlight" in link && link.highlight
                    ? "text-mint font-semibold"
                    : "text-white/80"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Social Icons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-mint transition-colors"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-mint transition-colors"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-white p-1"
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col px-8 pt-8 pb-12"
          >
            {/* Close */}
            <div className="flex justify-between items-center mb-12">
              <MediaMoobLogo />
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white"
                aria-label="Cerrar menú"
              >
                <X size={28} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-6 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href + link.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "text-2xl font-bold transition-colors",
                      "highlight" in link && link.highlight
                        ? "text-mint"
                        : "text-white hover:text-mint"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Social */}
            <div className="flex gap-4 mt-auto">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-mint"
              >
                <InstagramIcon size={22} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-mint"
              >
                <LinkedinIcon size={22} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MediaMoobLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="17" height="17" fill="#40b09d" />
        <rect x="19" width="17" height="17" fill="#40b09d" />
        <rect y="19" width="17" height="17" fill="#40b09d" opacity="0.6" />
        <rect x="19" y="19" width="17" height="17" fill="#40b09d" opacity="0.3" />
      </svg>
      <span className="text-white font-bold text-sm leading-tight tracking-wide">
        MEDIA<br />MOOB
      </span>
    </div>
  );
}
