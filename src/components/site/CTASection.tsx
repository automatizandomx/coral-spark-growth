import { Link } from "@tanstack/react-router";

export function CTASection({
  title = "¿Listo para dar el primer paso?",
  subtitle = "Te acompañamos desde tu primera duda hasta tu acta de posesión. Sin rodeos, sin letra chiquita.",
  whatsappText = "Hola%2C%20me%20interesa%20agendar%20una%20asesor%C3%ADa%20gratis%20para%20conocer%20los%20terrenos%20disponibles",
}: {
  title?: string;
  subtitle?: string;
  whatsappText?: string;
}) {
  return (
    <section className="bg-gradient-cta py-24 text-center relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
      <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-white/5" />
      <div className="max-w-[1200px] mx-auto px-6 relative">
        <h2 className="text-[clamp(32px,4vw,48px)] font-bold text-white mb-4 tracking-tight">
          {title}
        </h2>
        <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={`https://wa.me/529541388112?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-whatsapp hover:bg-whatsapp-dark text-white rounded-full text-base font-semibold transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(37,211,102,0.3)]"
          >
            <i className="fab fa-whatsapp text-xl" /> Escríbenos por WhatsApp
          </a>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-10 py-4 bg-transparent border-[1.5px] border-white/30 hover:border-white text-white rounded-full text-base font-semibold transition-all"
          >
            <i className="fas fa-envelope" /> Enviar formulario
          </Link>
        </div>
      </div>
    </section>
  );
}
