import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-dark text-white/60 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          <div>
            <div className="text-[22px] font-bold text-white mb-4">
              Inmuebles <span className="text-teal font-light">Coral</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Especialistas en desarrollos residenciales, semi-urbanizados y de
              inversión en Puerto Escondido, Oaxaca. Comprometidos con la
              naturaleza y con tu futuro patrimonio.
            </p>
            <div className="flex gap-3">
              {[
                { i: "facebook-f", h: "https://www.facebook.com/inmueblescoral/" },
                { i: "instagram", h: "https://www.instagram.com/inmueblescoral/" },
                { i: "tiktok", h: "https://www.tiktok.com/@inmueblescoral" },
                { i: "youtube", h: "https://www.youtube.com/@inmueblescoral" },
              ].map((s) => (
                <a
                  key={s.i}
                  href={s.h}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-teal flex items-center justify-center text-white/70 hover:text-white transition-all"
                  aria-label={s.i}
                >
                  <i className={`fab fa-${s.i}`} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-bold text-white uppercase tracking-widest mb-5">
              Desarrollos
            </h4>
            <ul className="space-y-3">
              <li><Link to="/desarrollos" className="text-sm text-white/50 hover:text-white">Residenciales</Link></li>
              <li><Link to="/desarrollos" className="text-sm text-white/50 hover:text-white">Semi-urbanizados</Link></li>
              <li><Link to="/desarrollos" className="text-sm text-white/50 hover:text-white">Uniservicio</Link></li>
              <li><Link to="/desarrollos" className="text-sm text-white/50 hover:text-white">De Inversión</Link></li>
              <li><Link to="/zenit" className="text-sm text-white/50 hover:text-white">Zenit Eco Living</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-bold text-white uppercase tracking-widest mb-5">
              Empresa
            </h4>
            <ul className="space-y-3">
              <li><Link to="/nosotros" className="text-sm text-white/50 hover:text-white">Sobre nosotros</Link></li>
              <li><Link to="/contacto" className="text-sm text-white/50 hover:text-white">Contacto</Link></li>
              <li>
                <a
                  href="https://inmueblescoral.com.mx/blog/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-bold text-white uppercase tracking-widest mb-5">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://wa.me/529541388112" className="text-white/50 hover:text-white flex items-center gap-2">
                  <i className="fab fa-whatsapp text-teal-light" /> 954 138 8112
                </a>
              </li>
              <li>
                <a href="tel:+529541603427" className="text-white/50 hover:text-white flex items-center gap-2">
                  <i className="fas fa-phone text-teal-light" /> 954 160 3427
                </a>
              </li>
              <li>
                <a href="mailto:info@inmueblescoral.com.mx" className="text-white/50 hover:text-white flex items-center gap-2">
                  <i className="fas fa-envelope text-teal-light" /> info@inmueblescoral.com.mx
                </a>
              </li>
              <li className="text-white/50 flex items-start gap-2">
                <i className="fas fa-map-marker-alt text-teal-light mt-1" />
                <span>Calle Tercera Pte. 501, Sector Juárez, 71980 Puerto Escondido, Oax.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-[13px]">
          <span>© {new Date().getFullYear()} Inmuebles Coral. Todos los derechos reservados.</span>
          <span>Puerto Escondido, Oaxaca, México</span>
        </div>
      </div>
    </footer>
  );
}
