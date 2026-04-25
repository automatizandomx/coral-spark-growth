import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import { getPageBySlug, getPostsByCategory, metaOr, titleOr, type WPPost } from "@/lib/wp";
import heroCoast from "@/assets/hero-coast.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [hero, devs] = await Promise.all([
      getPageBySlug("hero-home"),
      getPostsByCategory("desarrollos", 4),
    ]);
    return { hero, devs };
  },
  staleTime: 60_000,
  head: () => ({
    meta: [
      { title: "Inmuebles Coral | Terrenos en Puerto Escondido, Oaxaca" },
      {
        name: "description",
        content:
          "Vende tu terreno en Puerto Escondido, Oaxaca. Desarrollos residenciales, semi-urbanizados y de inversión con permisos vigentes y financiamiento sin buró.",
      },
      { property: "og:title", content: "Inmuebles Coral | Puerto Escondido, Oaxaca" },
      {
        property: "og:description",
        content:
          "Más de 647 familias confían en nosotros. Diseñamos y ejecutamos cada desarrollo desde cero. Asesoría gratis por WhatsApp.",
      },
      { property: "og:image", content: heroCoast },
      { name: "twitter:image", content: heroCoast },
    ],
  }),
  component: HomePage,
});

const WHATSAPP_BASE = "https://wa.me/529541388112?text=";
const wa = (txt: string) => `${WHATSAPP_BASE}${encodeURIComponent(txt)}`;

type Desarrollo = {
  badge: string | null;
  type: string;
  title: string;
  desc: string;
  size: string;
  location: string;
  price: string;
  icon: string;
  img: string;
};

const desarrollosFallback: Desarrollo[] = [
  {
    badge: "Premium",
    type: "Residencial",
    title: "Vivir en el paraíso",
    desc: "Lotes con todos los servicios, áreas verdes y amenidades premium para construir tu hogar en la costa.",
    size: "Desde 200 m²",
    location: "Bajos de Chila",
    price: "$592,948",
    icon: "fa-home",
    img: project3,
  },
  {
    badge: "Popular",
    type: "Semiurbanizado",
    title: "Naturaleza + servicios",
    desc: "El equilibrio perfecto entre naturaleza y comodidad. Terrenos con servicios básicos en zonas de alto crecimiento.",
    size: "Desde 200 m²",
    location: "Cozoaltepec",
    price: "$249,000",
    icon: "fa-tree",
    img: project1,
  },
  {
    badge: null,
    type: "Uniservicio",
    title: "Tu primer terreno",
    desc: "La opción más accesible para comenzar a construir tu patrimonio en la costa oaxaqueña.",
    size: "Desde 200 m²",
    location: "San Juanito",
    price: "$281,996",
    icon: "fa-bolt",
    img: project3,
  },
  {
    badge: "Inversión",
    type: "De Inversión",
    title: "Haz crecer tu dinero",
    desc: "Terrenos con alta plusvalía en zonas de crecimiento turístico. La inversión más inteligente.",
    size: "Desde 200 m²",
    location: "El Rosedal",
    price: "$242,000",
    icon: "fa-chart-line",
    img: project2,
  },
];

const fallbackImgs = [project3, project1, project2];

const testimonios = [
  {
    initials: "PJ",
    name: "Paula Juárez",
    dev: "Desarrollo Amanalli",
    text: "Era mi primera inversión y tenía muchos miedos. Me explicaron paso a paso y me sentí apoyada todo el tiempo.",
  },
  {
    initials: "MA",
    name: "Manuel Apolinar",
    dev: "Desarrollo Miyana",
    text: "Es la primera inversión que realizo y me tardé 6 meses en encontrar el terreno. En Inmuebles Coral me han tratado de maravilla, me resolvieron todas mis dudas y tienen facilidades de pago.",
  },
  {
    initials: "GG",
    name: "Glace González",
    dev: "Google Review",
    text: "La mejor Inmobiliaria de Puerto Escondido: buenos precios, buena zona y excelente servicio de parte de los Asesores.",
  },
  {
    initials: "AH",
    name: "Agustina Hernández",
    dev: "Desarrollo Soleya",
    text: "Buscábamos algo seguro para la familia y aquí lo encontramos. Nos dieron confianza desde el primer contacto y eso hizo toda la diferencia.",
  },
  {
    initials: "NM",
    name: "Norma Maqueda",
    dev: "Desarrollo Miyana",
    text: "Pudimos concretar la inversión desde otro estado, todo fue muy fácil y claro.",
  },
  {
    initials: "IA",
    name: "Ignacio Álvarez",
    dev: "Desarrollo Sabal",
    text: "Me encantó el concepto verde del proyecto. Invertir aquí fue alinear mi dinero con mis valores.",
  },
];

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

function HomePage() {
  const { hero, devs } = Route.useLoaderData();

  // Map WordPress posts in the "desarrollos" category to the card shape.
  // Custom fields supported via shortcodes in the post body. See WORDPRESS_SETUP.md.
  const desarrollos: Desarrollo[] =
    devs.length > 0
      ? devs.map((p: WPPost, i: number) => ({
          badge: metaOr(p, "badge", "") || null,
          type: metaOr(p, "type", "Desarrollo"),
          title: titleOr(p, "Desarrollo"),
          desc: stripTags(p.excerpt) || stripTags(p.content).slice(0, 180),
          size: metaOr(p, "size", "Desde 200 m²"),
          location: metaOr(p, "location", "Puerto Escondido"),
          price: metaOr(p, "price", "Consultar"),
          icon: metaOr(p, "icon", "fa-home"),
          img: p.featured_image || fallbackImgs[i % fallbackImgs.length],
        }))
      : desarrollosFallback;

  const heroBadge = metaOr(hero, "badge", "5.0 estrellas en Google — 21 reseñas verificadas");
  const heroTitleLead = metaOr(hero, "title_lead", "Tu lugar en la costa");
  const heroTitleEm = metaOr(hero, "title_em", "oaxaqueña");
  const heroTitleTrail = metaOr(hero, "title_trail", "empieza aquí.");
  const heroParagraph = metaOr(
    hero,
    "paragraph",
    "Diseñamos, planificamos y ejecutamos cada desarrollo desde cero. No somos intermediarios — somos los creadores de tu futuro patrimonio en Puerto Escondido.",
  );

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img
          src={heroCoast}
          alt="Costa de Puerto Escondido, Oaxaca"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.18_0.03_200/0.92)] via-[oklch(0.25_0.05_195/0.78)] to-[oklch(0.42_0.08_195/0.55)]" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-20 w-full">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/15 backdrop-blur-md rounded-full text-[13px] text-white/85 mb-8">
              <i className="fas fa-star text-gold" /> {heroBadge}
            </div>
            <h1 className="text-[clamp(40px,6vw,72px)] font-extrabold text-white leading-[1.08] tracking-tight mb-6 max-w-3xl">
              {heroTitleLead}{" "}
              <em className="not-italic text-white/55">{heroTitleEm}</em>
              <br />
              {heroTitleTrail}
            </h1>
            <p className="text-[19px] text-white/75 leading-relaxed max-w-xl mb-10">
              {heroParagraph}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/desarrollos"
                className="inline-flex items-center gap-2 px-8 py-4 bg-teal hover:bg-teal-dark text-white rounded-full text-base font-semibold transition-all hover:-translate-y-0.5 shadow-elegant"
              >
                <i className="fas fa-compass" /> Ver desarrollos
              </Link>
              <a
                href={wa("Hola, quiero información sobre Zenit Eco Living")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-whatsapp hover:bg-whatsapp-dark text-white rounded-full text-base font-semibold transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(37,211,102,0.3)]"
              >
                <i className="fab fa-whatsapp" /> Escríbenos
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-white/10 max-w-3xl">
              {[
                { v: metaOr(hero, "stat1_v", "13+"), l: metaOr(hero, "stat1_l", "Desarrollos") },
                { v: metaOr(hero, "stat2_v", "647+"), l: metaOr(hero, "stat2_l", "Familias felices") },
                { v: metaOr(hero, "stat3_v", "200m²"), l: metaOr(hero, "stat3_l", "Lotes desde") },
                { v: metaOr(hero, "stat4_v", "$242K"), l: metaOr(hero, "stat4_l", "Precio desde") },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-[36px] font-bold text-white leading-none">
                    {s.v}
                  </div>
                  <div className="text-[12px] text-white/55 mt-2 uppercase tracking-widest">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="bg-gray-5 py-8 border-b border-gray-4">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
          {[
            { i: "fa-shield-halved", t: "Escritura pública garantizada" },
            { i: "fa-bolt", t: "Servicios de luz y agua" },
            { i: "fa-hand-holding-dollar", t: "Financiamiento sin buró" },
          ].map((t) => (
            <div key={t.i} className="flex items-center gap-3 text-[14px] font-medium text-gray-2">
              <i className={`fas ${t.i} text-teal text-lg`} /> {t.t}
            </div>
          ))}
          <div className="flex items-center gap-2 text-[14px] font-medium text-gray-2">
            <span className="text-[#f5a623]">
              {"★★★★★".split("").map((s, i) => <i key={i} className="fas fa-star" />)}
            </span>
            5.0 en Google
          </div>
        </div>
      </div>

      {/* DESARROLLOS */}
      <section className="py-32" id="desarrollos">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[13px] font-semibold uppercase tracking-[2px] text-teal mb-3">
              Nuestros Desarrollos
            </div>
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold text-dark leading-[1.15] mb-5 tracking-tight">
              Espacios con propósito.
            </h2>
            <p className="text-lg text-gray-2 leading-relaxed max-w-2xl mx-auto">
              Cada proyecto es diseñado pensando en el bienestar de quienes lo
              habitarán. Elige el tipo de desarrollo que se adapte a tu
              inversión.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {desarrollos.map((d) => (
              <div
                key={d.title}
                className="bg-white border border-gray-4 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-elegant hover:border-transparent"
              >
                <div className="h-52 relative overflow-hidden">
                  <img src={d.img} alt={d.title} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {d.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[11px] text-white font-semibold uppercase tracking-wider">
                      {d.badge}
                    </span>
                  )}
                  <i className={`fas ${d.icon} absolute bottom-4 right-4 text-3xl text-white/60`} />
                </div>
                <div className="p-6">
                  <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-teal mb-2">
                    {d.type}
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">{d.title}</h3>
                  <p className="text-sm text-gray-2 leading-relaxed mb-4">{d.desc}</p>
                  <div className="flex gap-4 text-[13px] text-gray-2 mb-5">
                    <span className="flex items-center gap-1">
                      <i className="fas fa-ruler-combined text-teal text-xs" /> {d.size}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fas fa-map-marker-alt text-teal text-xs" /> {d.location}
                    </span>
                  </div>
                  <div className="text-[22px] font-bold text-dark">
                    {d.price} <small className="text-[13px] font-normal text-gray-3">MXN</small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/desarrollos"
              className="inline-flex items-center gap-2 px-8 py-4 border-[1.5px] border-gray-4 hover:border-dark text-dark rounded-full text-[15px] font-semibold transition-all"
            >
              Ver todos los desarrollos <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED ZENIT */}
      <section className="py-32 bg-dark text-white relative overflow-hidden">
        <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full bg-teal/15" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="bg-gradient-card-teal rounded-3xl h-[480px] flex items-center justify-center relative overflow-hidden">
              <span className="absolute text-[80px] font-extrabold text-white/[0.05] tracking-tight whitespace-nowrap">
                ZENIT ECO LIVING
              </span>
              <i className="fas fa-leaf text-[80px] text-white/15" />
            </div>
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-[2px] text-teal-light mb-4 flex items-center gap-3">
                <span className="w-6 h-[2px] bg-teal-light" /> Desarrollo destacado
              </div>
              <h2 className="text-[clamp(36px,4vw,52px)] font-bold leading-[1.1] mb-6 tracking-tight">
                Zenit
                <br />
                Eco Living
              </h2>
              <p className="text-[17px] text-white/60 leading-relaxed mb-8">
                Un desarrollo exclusivo y sereno, con un número limitado de
                lotes que garantizan privacidad, tranquilidad y una experiencia
                íntima con la naturaleza. A pasos de la playa en Puerto
                Escondido.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  { i: "fa-droplet", t: "Luz y agua incluidos" },
                  { i: "fa-lightbulb", t: "Alumbrado público" },
                  { i: "fa-fire", t: "Área de asadores" },
                  { i: "fa-tree", t: "Camellones arbolados" },
                  { i: "fa-road", t: "Banquetas y señalización" },
                  { i: "fa-scroll", t: "Reglamento de convivencia" },
                ].map((a) => (
                  <div key={a.i} className="flex items-center gap-3 text-sm text-white/80">
                    <i
                      className={`fas ${a.i} w-8 h-8 flex items-center justify-center bg-teal/20 rounded-lg text-teal-light text-sm`}
                    />
                    {a.t}
                  </div>
                ))}
              </div>
              <div className="text-sm text-white/50 mb-8">
                Desde <strong className="text-[32px] text-white font-bold">$592,948 MXN</strong>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href={wa("Hola, quiero información sobre Zenit Eco Living")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-whatsapp hover:bg-whatsapp-dark text-white rounded-full text-[15px] font-semibold transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(37,211,102,0.3)]"
                >
                  <i className="fab fa-whatsapp" /> Conocer Zenit
                </a>
                <Link
                  to="/zenit"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-[1.5px] border-white/30 hover:border-white text-white rounded-full text-[15px] font-semibold transition-all"
                >
                  <i className="fas fa-circle-info" /> Ver detalles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-32 bg-gray-5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-4">
            <div className="text-[13px] font-semibold uppercase tracking-[2px] text-teal mb-3">
              Clientes Satisfechos
            </div>
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold text-dark mb-5 tracking-tight">
              Ellos ya dieron el paso.
            </h2>
            <p className="text-lg text-gray-2 leading-relaxed max-w-xl mx-auto">
              Más de 647 familias confían en nosotros. Esto es lo que dicen.
            </p>
          </div>

          <div className="flex justify-center my-12">
            <div className="inline-flex items-center gap-4 px-7 py-4 bg-white rounded-2xl shadow-soft">
              <div className="text-2xl font-bold flex items-center">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
              <div className="text-[28px] font-bold text-dark">5.0</div>
              <div>
                <div className="text-[#f5a623] text-base">
                  {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star" />)}
                </div>
                <div className="text-[13px] text-gray-2">21 reseñas verificadas</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonios.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-8 border border-transparent hover:border-gray-4 hover:shadow-soft transition-all"
              >
                <div className="text-[#f5a623] text-sm mb-4">
                  {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star" />)}
                </div>
                <p className="text-[15px] text-gray-1 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-light flex items-center justify-center text-teal font-bold text-base">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-dark">{t.name}</div>
                    <div className="text-xs text-gray-3">{t.dev}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
