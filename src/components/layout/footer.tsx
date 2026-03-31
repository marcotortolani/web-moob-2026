import Link from "next/link";
import { InstagramIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { navLinks } from "@/lib/data/navigation";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-10 lg:py-14 px-5 lg:px-16 xl:px-24">
      <div className="max-w-[1728px] mx-auto">
        {/* Mobile: stacked centered, Desktop: horizontal columns */}
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg
              width="44"
              height="44"
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
            <span className="text-white font-bold text-base leading-tight tracking-wide">
              MEDIA<br />MOOB
            </span>
          </div>

          {/* Navigation — desktop only */}
          <nav className="hidden lg:flex flex-col gap-2">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
              Navegación
            </p>
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="text-white/60 text-sm hover:text-mint transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact column — desktop */}
          <div className="hidden lg:flex flex-col gap-2">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
              Contacto
            </p>
            <p className="text-white/60 text-sm">
              Guatemala 5582, Ciudad de Buenos Aires.
              <br />
              República Argentina.
            </p>
            <Link href="/#contacto" className="text-mint text-sm hover:underline">
              Hablemos!
            </Link>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <p className="hidden lg:block text-white/40 text-xs uppercase tracking-widest mb-1">
              Redes
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-mint transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={22} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-mint transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-center lg:flex-row lg:justify-between mt-8 pt-6 border-t border-white/5 gap-2">
          {/* Address — mobile only */}
          <p className="text-white/40 text-sm text-center lg:hidden">
            Guatemala 5582, Ciudad de Buenos Aires. República Argentina.
          </p>
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Media Moob. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
