import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import { WPContent } from "@/components/site/WPContent";
import { getPageBySlug, metaOr, contentOr } from "@/lib/wp";
import aboutTeam from "@/assets/about-team.jpg";

export const Route = createFileRoute("/nosotros")({
  loader: async () => ({
    page: await getPageBySlug("nosotros"),
  }),
  staleTime: 60_000,
  head: () => ({
    meta: [
      { title: "Sobre Nosotros | Inmuebles Coral Puerto Escondido" },
      {
        name: "description",
        content:
          "Somos los creadores de cada desarrollo, no intermediarios. Arquitectos, abogados y asesores acompañándote desde la primera duda hasta tu acta de posesión.",
      },
      { property: "og:title", content: "Sobre Inmuebles Coral" },
      {
        property: "og:description",
        content:
          "Diseñamos, planificamos y ejecutamos cada desarrollo desde cero en Puerto Escondido, Oaxaca.",
      },
      { property: "og:image", content: aboutTeam },
    ],
  }),
  component: NosotrosPage,
});

const valores = [
  {
    icon: "fa-shield-halved",
    t: "Seguridad Jurídica",
    d: "Cada lote cuenta con documentación legal verificable y escritura pública garantizada.",
  },
  {
    icon: "fa-leaf",
    t: "Comprometidos con la Naturaleza",
    d: "Desarrollos que respetan el entorno natural de la costa oaxaqueña.",
  },
  {
    icon: "fa-handshake",
    t: "Atención Personalizada",
    d: "Te explicamos todo paso a paso, sin rodeos y sin letra chiquita.",
  },
  {
    icon: "fa-coins",
    t: "Financiamiento Flexible",
    d: "Planes de pago cómodos sin necesidad de revisar tu buró de crédito.",
  },
];

const proceso = [
  { n: 1, t: "Asesoría sin costo", d: "Agendamos una videollamada o te atendemos por WhatsApp. Te explicamos el proceso completo, sin presión." },
  { n: 2, t: "Eliges tu terreno", d: "Te enviamos fotos, videos y ubicación exacta. Coordinamos un recorrido virtual en vivo si lo prefieres." },
  { n: 3, t: "Contrato y pagos", d: "Firmamos contrato y eliges tu plan de pagos. Sin buró, sin sorpresas, todo claro." },
  { n: 4, t: "Acta de posesión", d: "Te acompañamos hasta tu acta de posesión registrada a tu nombre. Listo para construir." },
];

function NosotrosPage() {
  const { page } = Route.useLoaderData();

  const heroBadge = metaOr(page, "hero_badge", "Sobre Nosotros");
  const heroTitleLead = metaOr(page, "hero_title_lead", "No somos intermediarios.");
  const heroTitleEm = metaOr(page, "hero_title_em", "Somos los creadores.");
  const heroParagraph = metaOr(
    page,
    "hero_paragraph",
    "Diseñamos, planificamos y ejecutamos cada desarrollo desde cero, pensando en el bienestar de quienes lo habitarán.",
  );
  const stat = metaOr(page, "stat", "+647");
  const statLabel = metaOr(page, "stat_label", "Familias felices en la costa");
  const sectionTitle = metaOr(
    page,
    "section_title",
    "Sabemos lo que es irse lejos a buscar lo que en casa no había.",
  );
  const quote = metaOr(
    page,
    "quote",
    "Somos de aquí. Conocemos esta tierra. Y estamos contigo desde el primer recorrido hasta el acta de posesión a tu nombre.",
  );

  // Default fallback story (used when the WP page has no body content)
  const defaultStory = `<p>Omar Ramírez nació en Puerto Escondido. Estudió en la Ciudad de México, trabajó en lo que encontró, y un día regresó a Oaxaca sin dinero y con las manos vacías. Conoce ese camino. Sabe lo que cuesta construir algo desde cero, lejos de donde uno creció.</p><p>De vuelta en la costa, encontró su lugar en el mundo inmobiliario. Aprendió el negocio desde adentro: los recorridos, los trámites, las escrituras, los fraccionamientos. <strong>Cada detalle.</strong> Años después, junto a su esposa <strong>Isis Santana</strong>, fundó Inmuebles Coral con una convicción clara: que quienes trabajan duro merecen tener tierra propia en el lugar más hermoso de México.</p>`;
  const story = contentOr(page, defaultStory);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="bg-gradient-hero pt-40 pb-20 text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-[13px] font-semibold uppercase tracking-[2px] text-teal-light mb-4">
            {heroBadge}
          </div>
          <h1 className="text-[clamp(40px,5vw,64px)] font-extrabold tracking-tight mb-6 max-w-3xl">
            {heroTitleLead}<br />
            <em className="not-italic text-white/55">{heroTitleEm}</em>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            {heroParagraph}
          </p>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img
                src={aboutTeam}
                alt="Equipo Inmuebles Coral"
                loading="lazy"
                className="w-full h-[520px] object-cover rounded-3xl shadow-elegant"
              />
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-elegant flex items-center gap-4 border border-gray-4">
                <div className="text-[42px] font-bold text-teal leading-none">{stat}</div>
                <div className="text-[13px] text-gray-2 leading-tight max-w-[100px]">
                  {statLabel}
                </div>
              </div>
            </div>

            <div>
              <div className="text-[13px] font-semibold uppercase tracking-[2px] text-teal mb-4">
                Quiénes somos
              </div>
              <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-dark leading-tight mb-6 tracking-tight">
                {sectionTitle}
              </h2>

              <WPContent
                html={story}
                className="space-y-4 text-gray-2 leading-relaxed mb-8 [&_strong]:text-dark"
              />

              <blockquote className="border-l-[3px] border-teal pl-5 py-3 my-6 bg-teal-light/40 rounded-r-lg italic text-dark text-base leading-relaxed">
                "{quote}"
              </blockquote>

              <Link
                to="/desarrollos"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-teal hover:bg-teal-dark text-white rounded-full text-[15px] font-semibold transition-all hover:-translate-y-0.5"
              >
                Conoce nuestros desarrollos <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-32 bg-gray-5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-[13px] font-semibold uppercase tracking-[2px] text-teal mb-3">
              Nuestros diferenciales
            </div>
            <h2 className="text-[clamp(32px,5vw,44px)] font-bold text-dark tracking-tight">
              Por qué más de 647 familias eligieron Inmuebles Coral
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((v) => (
              <div
                key={v.t}
                className="bg-white border border-gray-4 rounded-2xl p-8 hover:border-teal hover:shadow-elegant hover:-translate-y-1 transition-all"
              >
                <div className="w-13 h-13 w-[52px] h-[52px] bg-teal-light rounded-xl flex items-center justify-center text-teal text-xl mb-5">
                  <i className={`fas ${v.icon}`} />
                </div>
                <h3 className="text-base font-bold text-dark mb-2">{v.t}</h3>
                <p className="text-sm text-gray-2 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-32 bg-teal-light/30" id="proceso">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-[13px] font-semibold uppercase tracking-[2px] text-teal mb-3">
              Cómo comprar
            </div>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-dark tracking-tight mb-4">
              Compra tu terreno desde Estados Unidos en 4 pasos
            </h2>
            <p className="text-lg text-gray-2 leading-relaxed">
              No necesitas estar en México. Todo el proceso se puede hacer de
              forma remota, con acompañamiento personalizado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-teal to-teal-dark z-0" />
            {proceso.map((s) => (
              <div key={s.n} className="text-center px-4 relative z-10">
                <div className="w-16 h-16 bg-teal text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-[0_4px_16px_oklch(0.52_0.08_195/0.4)]">
                  {s.n}
                </div>
                <h3 className="text-base font-bold text-dark mb-2">{s.t}</h3>
                <p className="text-[13px] text-gray-2 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Hablemos de tu futuro patrimonio"
        subtitle="Agenda una asesoría sin costo. Te respondemos en menos de 1 hora."
        whatsappText="Hola, quiero agendar una asesoría sin costo para conocer los desarrollos disponibles"
      />
    </SiteLayout>
  );
}
