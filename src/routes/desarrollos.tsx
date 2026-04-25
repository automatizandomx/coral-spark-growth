import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import { getPostsByCategory, metaOr, titleOr, type WPPost } from "@/lib/wp";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export const Route = createFileRoute("/desarrollos")({
  loader: async () => ({
    devs: await getPostsByCategory("desarrollos", 30),
  }),
  staleTime: 60_000,
  head: () => ({
    meta: [
      { title: "Desarrollos en Puerto Escondido | Inmuebles Coral" },
      {
        name: "description",
        content:
          "13+ desarrollos en la costa de Oaxaca: residenciales, semi-urbanizados, uniservicio y de inversión. Lotes desde 200 m² y precios desde $242K MXN.",
      },
      { property: "og:title", content: "Desarrollos en Puerto Escondido | Inmuebles Coral" },
      {
        property: "og:description",
        content:
          "Encuentra tu terreno en la costa de Oaxaca. Permisos vigentes, escritura pública y financiamiento sin buró.",
      },
      { property: "og:image", content: project2 },
    ],
  }),
  component: DesarrollosPage,
});

const wa = (txt: string) =>
  `https://wa.me/529541388112?text=${encodeURIComponent(txt)}`;

const proyectos = [
  {
    title: "Vivir en el paraíso",
    type: "Residencial",
    badge: "Premium",
    desc: "Lotes con todos los servicios, áreas verdes y amenidades premium para construir tu hogar en la costa.",
    location: "Bajos de Chila",
    size: "200 m²",
    price: "$592,948",
    img: project3,
    features: ["🏡 Residencial", "🌿 Áreas verdes", "🔒 Seguridad"],
  },
  {
    title: "Naturaleza + servicios",
    type: "Semiurbanizado",
    badge: "Popular",
    desc: "El equilibrio perfecto entre naturaleza y comodidad. Terrenos con servicios básicos en zonas de alto crecimiento.",
    location: "Cozoaltepec",
    size: "200 m²",
    price: "$249,000",
    img: project1,
    features: ["🌳 Naturaleza", "💧 Servicios básicos", "📈 Plusvalía"],
  },
  {
    title: "Tu primer terreno",
    type: "Uniservicio",
    badge: null,
    desc: "La opción más accesible para comenzar a construir tu patrimonio en la costa oaxaqueña.",
    location: "San Juanito",
    size: "200 m²",
    price: "$281,996",
    img: project3,
    features: ["⚡ Luz", "🛣️ Acceso", "📋 Permisos"],
  },
  {
    title: "Haz crecer tu dinero",
    type: "De Inversión",
    badge: "Inversión",
    desc: "Terrenos con alta plusvalía en zonas de crecimiento turístico. La inversión más inteligente.",
    location: "El Rosedal",
    size: "200 m²",
    price: "$242,000",
    img: project2,
    features: ["📈 Alta plusvalía", "🌴 Zona turística", "💰 Inversión"],
  },
  {
    title: "Lotes con acceso a playa",
    type: "Frente al mar",
    badge: "Últimos lotes",
    desc: "Terrenos con acceso directo a playa en zona de surf con vista al océano Pacífico.",
    location: "Puerto Escondido",
    size: "250 m²",
    price: "Consultar",
    img: project2,
    features: ["🌊 Acceso a playa", "🌅 Vista al mar", "🏄 Zona surf"],
  },
  {
    title: "Zona Semi-Urbana",
    type: "Semiurbanizado",
    badge: "Disponible",
    desc: "Terrenos listos para construir con luz, agua y acceso pavimentado en zona en crecimiento.",
    location: "Costa de Oaxaca",
    size: "200 m²",
    price: "Consultar",
    img: project3,
    features: ["🏙️ Semi-urbanizado", "⚡ Luz y agua", "🏗️ Listo para construir"],
  },
];

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

const fallbackImgs = [project3, project1, project2];

function DesarrollosPage() {
  const { devs } = Route.useLoaderData();

  // Use WordPress posts when available, otherwise the static fallback list.
  const proyectosFinal = devs.length > 0
    ? devs.map((p: WPPost, i: number) => ({
        title: titleOr(p, "Desarrollo"),
        type: metaOr(p, "type", "Desarrollo"),
        badge: metaOr(p, "badge", "") || null,
        desc: stripTags(p.excerpt) || stripTags(p.content).slice(0, 200),
        location: metaOr(p, "location", "Puerto Escondido"),
        size: metaOr(p, "size", "200 m²"),
        price: metaOr(p, "price", "Consultar"),
        img: p.featured_image || fallbackImgs[i % fallbackImgs.length],
        features: metaOr(p, "features", "")
          .split("|")
          .map((f) => f.trim())
          .filter(Boolean),
      }))
    : proyectos;

  return (
    <SiteLayout>
      {/* HERO compacto */}
      <section className="bg-gradient-hero pt-40 pb-20 text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="text-[13px] font-semibold uppercase tracking-[2px] text-teal-light mb-4">
            Catálogo completo
          </div>
          <h1 className="text-[clamp(40px,5vw,60px)] font-extrabold tracking-tight mb-5">
            13+ desarrollos en la <em className="not-italic text-white/55">costa de Oaxaca</em>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Terrenos residenciales, semi-urbanizados, uniservicio y de inversión
            en Puerto Escondido y sus alrededores. Permisos vigentes y
            financiamiento sin buró.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {proyectosFinal.map((p: typeof proyectosFinal[number]) => (

              <article
                key={p.title}
                className="bg-white border border-gray-4 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-elegant hover:border-transparent transition-all duration-300"
              >
                <div className="h-56 relative overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {p.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1.5 bg-teal text-white rounded-full text-[11px] font-bold uppercase tracking-wider">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-7">
                  <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-teal mb-2">
                    {p.type}
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2">{p.title}</h3>
                  <div className="text-[13px] text-gray-2 mb-4 flex items-center gap-1">
                    <i className="fas fa-map-marker-alt text-teal text-xs" /> {p.location}
                  </div>
                  <p className="text-sm text-gray-2 leading-relaxed mb-5">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.features.map((f: string) => (
                      <span key={f} className="text-[12px] px-2.5 py-1 bg-gray-5 text-gray-1 rounded-full font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-5 border-t border-gray-4">
                    <div>
                      <div className="text-[11px] text-gray-3 uppercase tracking-wider">Desde</div>
                      <div className="text-lg font-bold text-dark">
                        {p.price} {p.price !== "Consultar" && <small className="text-xs font-normal text-gray-3">MXN</small>}
                      </div>
                    </div>
                    <a
                      href={wa(`Hola, me interesa el desarrollo "${p.title}" en ${p.location}. ¿Pueden darme más información?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal hover:bg-teal-dark text-white rounded-full text-[13px] font-semibold transition-all"
                    >
                      <i className="fab fa-whatsapp" /> Cotizar
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center p-10 bg-gray-5 rounded-2xl border-2 border-dashed border-gray-4">
            <p className="text-lg text-gray-2 mb-5">
              Estos son solo algunos de nuestros <strong className="text-dark">13+ desarrollos activos</strong>.
              Contáctanos para ver el catálogo completo con disponibilidad actualizada.
            </p>
            <a
              href={wa("Hola, quiero ver el catálogo completo de desarrollos disponibles")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal hover:bg-teal-dark text-white rounded-full text-base font-semibold transition-all hover:-translate-y-0.5 shadow-soft"
            >
              <i className="fab fa-whatsapp" /> Ver catálogo completo →
            </a>
          </div>
        </div>
      </section>

      <CTASection
        title="¿Te interesa alguno?"
        subtitle="Pregúntanos por disponibilidad, precios actualizados y planes de pago. Te respondemos en menos de 1 hora."
        whatsappText="Hola, vi sus desarrollos en la página y quiero más información"
      />

      <Link to="/" className="hidden">.</Link>
    </SiteLayout>
  );
}
