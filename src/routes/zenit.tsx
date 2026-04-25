import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import project2 from "@/assets/project-2.jpg";

export const Route = createFileRoute("/zenit")({
  head: () => ({
    meta: [
      { title: "Zenit Eco Living | Desarrollo destacado en Puerto Escondido" },
      {
        name: "description",
        content:
          "Zenit Eco Living: lotes limitados con luz, agua, alumbrado, asadores y áreas verdes a pasos de la playa de Puerto Escondido. Desde $592,948 MXN.",
      },
      { property: "og:title", content: "Zenit Eco Living | Inmuebles Coral" },
      {
        property: "og:description",
        content:
          "Desarrollo exclusivo y sereno con privacidad, naturaleza y a pasos de la playa. Lotes limitados desde $592,948 MXN.",
      },
      { property: "og:image", content: project2 },
    ],
  }),
  component: ZenitPage,
});

const wa = (txt: string) =>
  `https://wa.me/529541388112?text=${encodeURIComponent(txt)}`;

const amenidades = [
  { i: "fa-droplet", t: "Luz y agua incluidos" },
  { i: "fa-lightbulb", t: "Alumbrado público" },
  { i: "fa-fire", t: "Área de asadores" },
  { i: "fa-tree", t: "Camellones arbolados" },
  { i: "fa-road", t: "Banquetas y señalización" },
  { i: "fa-scroll", t: "Reglamento de convivencia" },
  { i: "fa-shield-halved", t: "Seguridad las 24h" },
  { i: "fa-umbrella-beach", t: "Acceso cercano a playa" },
];

function ZenitPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-dark text-white">
        <img
          src={project2}
          alt="Zenit Eco Living Puerto Escondido"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/80 to-teal-dark/40" />
        <div className="relative max-w-[1200px] mx-auto px-6">
          <div className="text-[13px] font-semibold uppercase tracking-[2px] text-teal-light mb-4 flex items-center gap-3">
            <span className="w-6 h-[2px] bg-teal-light" /> Desarrollo destacado
          </div>
          <h1 className="text-[clamp(48px,7vw,84px)] font-extrabold tracking-tight leading-[0.95] mb-6">
            Zenit
            <br />
            <em className="not-italic text-teal-light">Eco Living.</em>
          </h1>
          <p className="text-xl text-white/75 max-w-2xl leading-relaxed mb-10">
            Un desarrollo exclusivo y sereno, con un número limitado de lotes
            que garantizan privacidad, tranquilidad y una experiencia íntima
            con la naturaleza. A pasos de la playa en Puerto Escondido.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={wa("Hola, quiero información sobre Zenit Eco Living")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-whatsapp hover:bg-whatsapp-dark text-white rounded-full text-base font-semibold transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(37,211,102,0.3)]"
            >
              <i className="fab fa-whatsapp text-xl" /> Cotizar Zenit
            </a>
            <a
              href={wa("Hola, quiero descargar el brochure de Zenit Eco Living")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-full text-base font-semibold transition-all"
            >
              <i className="fas fa-file-pdf" /> Descargar brochure
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10 max-w-3xl">
            {[
              { v: "Lim.", l: "Lotes disponibles" },
              { v: "200m²", l: "Desde" },
              { v: "5min", l: "A la playa" },
              { v: "$592K", l: "Precio desde" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-[32px] font-bold leading-none">{s.v}</div>
                <div className="text-[12px] text-white/55 mt-2 uppercase tracking-widest">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMENIDADES */}
      <section className="py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-[13px] font-semibold uppercase tracking-[2px] text-teal mb-3">
              Amenidades incluidas
            </div>
            <h2 className="text-[clamp(32px,5vw,44px)] font-bold text-dark tracking-tight mb-4">
              Todo lo que necesitas para vivir bien.
            </h2>
            <p className="text-lg text-gray-2 leading-relaxed">
              Cada detalle pensado para que tu inversión sea también tu hogar.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {amenidades.map((a) => (
              <div
                key={a.i}
                className="bg-white border border-gray-4 rounded-2xl p-6 text-center hover:border-teal hover:shadow-soft transition-all"
              >
                <div className="w-12 h-12 bg-teal-light rounded-xl flex items-center justify-center text-teal text-lg mx-auto mb-4">
                  <i className={`fas ${a.i}`} />
                </div>
                <div className="text-sm font-semibold text-dark">{a.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIO Y CTA */}
      <section className="py-24 bg-gradient-cta text-white text-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="relative max-w-[1200px] mx-auto px-6">
          <div className="text-[13px] uppercase tracking-widest text-white/60 mb-4">
            Precio desde
          </div>
          <div className="text-[clamp(48px,8vw,96px)] font-extrabold leading-none mb-2 tracking-tight">
            $592,948
          </div>
          <div className="text-xl text-white/70 mb-10">MXN · Lotes desde 200 m²</div>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
            Lotes limitados. Reserva tu espacio con un plan de pagos flexible
            sin necesidad de buró.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={wa("Hola, quiero apartar un lote en Zenit Eco Living")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 bg-whatsapp hover:bg-whatsapp-dark text-white rounded-full text-base font-semibold transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(37,211,102,0.3)]"
            >
              <i className="fab fa-whatsapp" /> Apartar mi lote
            </a>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-10 py-4 bg-transparent border-[1.5px] border-white/30 hover:border-white text-white rounded-full text-base font-semibold transition-all"
            >
              <i className="fas fa-envelope" /> Solicitar info
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="¿Tienes dudas sobre Zenit?"
        subtitle="Hablamos contigo por WhatsApp y te enviamos plano, ubicación, precios y planes de pago."
        whatsappText="Hola, quiero información completa de Zenit Eco Living"
      />
    </SiteLayout>
  );
}
