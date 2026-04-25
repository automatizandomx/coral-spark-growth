import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/desarrollos", label: "Desarrollos" },
  { to: "/zenit", label: "Zenit" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/blog", label: "Blog" },
  { to: "/contacto", label: "Contacto" },
] as const;

const WHATSAPP_URL =
  "https://wa.me/529541388112?text=Hola%2C%20me%20interesa%20información%20sobre%20sus%20desarrollos%20en%20Puerto%20Escondido";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)] py-3"
          : "py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className={`text-[22px] font-bold tracking-tight transition-colors ${
            scrolled ? "text-dark" : "text-white"
          }`}
          onClick={() => setOpen(false)}
        >
          Inmuebles{" "}
          <span
            className={`font-light transition-colors ${
              scrolled ? "text-teal" : "text-teal-light"
            }`}
          >
            Coral
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:opacity-100 ${
                scrolled
                  ? "text-gray-2 hover:text-dark"
                  : "text-white/85 hover:text-white"
              }`}
              activeProps={{ className: scrolled ? "text-dark" : "text-white" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal text-white rounded-full text-sm font-semibold hover:bg-teal-dark hover:-translate-y-0.5 transition-all shadow-soft"
          >
            <i className="fab fa-whatsapp" /> Cotizar
          </a>
        </div>

        <button
          className={`md:hidden text-2xl ${scrolled ? "text-dark" : "text-white"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          <i className={`fas ${open ? "fa-times" : "fa-bars"}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-elegant flex flex-col p-6 gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-dark"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal text-white rounded-full text-sm font-semibold"
          >
            <i className="fab fa-whatsapp" /> Cotizar por WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
