import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | Inmuebles Coral Puerto Escondido" },
      {
        name: "description",
        content:
          "Habla con un asesor en menos de 1 hora. WhatsApp +52 954 138 8112. Oficina en Puerto Escondido, Oaxaca. Atención de Lunes a Viernes 9-5.",
      },
      { property: "og:title", content: "Contacto | Inmuebles Coral" },
      {
        property: "og:description",
        content:
          "Escríbenos por WhatsApp para atención inmediata o llena el formulario y te contactamos en menos de 24 horas.",
      },
    ],
  }),
  component: ContactoPage,
});

const wa = (txt: string) =>
  `https://wa.me/529541388112?text=${encodeURIComponent(txt)}`;

function ContactoPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name");
    const phone = fd.get("phone");
    const interest = fd.get("interest");
    const message = fd.get("message");
    const txt =
      `Hola, soy ${name}. Tel: ${phone}. Me interesa: ${interest || "asesoría general"}. ` +
      (message ? `Mensaje: ${message}` : "");
    window.open(wa(txt), "_blank");
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="bg-gradient-hero pt-40 pb-20 text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-[13px] font-semibold uppercase tracking-[2px] text-teal-light mb-4">
            Contacto
          </div>
          <h1 className="text-[clamp(40px,5vw,60px)] font-extrabold tracking-tight mb-5 max-w-3xl">
            Hablemos de tu futuro <em className="not-italic text-white/55">patrimonio</em>.
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Escríbenos por WhatsApp para atención inmediata o llena el
            formulario y te contactamos en menos de 24 horas.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* INFO */}
            <div>
              <div className="space-y-7">
                {[
                  { i: "fab fa-whatsapp", l: "WhatsApp", v: "+52 954 138 8112", h: "https://wa.me/529541388112" },
                  { i: "fas fa-phone", l: "Teléfono", v: "+52 954 160 3427", h: "tel:+529541603427" },
                  { i: "fas fa-envelope", l: "Email", v: "info@inmueblescoral.com.mx", h: "mailto:info@inmueblescoral.com.mx" },
                ].map((c) => (
                  <a key={c.l} href={c.h} target={c.i.includes('whatsapp') ? '_blank' : undefined} rel="noopener noreferrer" className="flex gap-4 items-start group">
                    <div className="w-12 h-12 bg-teal-light rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal group-hover:text-white text-teal transition-all">
                      <i className={c.i} />
                    </div>
                    <div>
                      <div className="text-[12px] uppercase tracking-widest text-gray-3 mb-1">{c.l}</div>
                      <div className="text-base font-semibold text-dark group-hover:text-teal transition-colors">{c.v}</div>
                    </div>
                  </a>
                ))}

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-teal-light rounded-xl flex items-center justify-center flex-shrink-0 text-teal">
                    <i className="fas fa-map-marker-alt" />
                  </div>
                  <div>
                    <div className="text-[12px] uppercase tracking-widest text-gray-3 mb-1">Oficina</div>
                    <div className="text-base font-semibold text-dark">
                      Calle Tercera Pte. 501, Sector Juárez<br />
                      71980 Puerto Escondido, Oax.
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-teal-light rounded-xl flex items-center justify-center flex-shrink-0 text-teal">
                    <i className="fas fa-clock" />
                  </div>
                  <div>
                    <div className="text-[12px] uppercase tracking-widest text-gray-3 mb-1">Horario</div>
                    <div className="text-base font-semibold text-dark">
                      Lunes a Viernes · 9:00 AM – 5:00 PM
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-10">
                {[
                  { i: "facebook-f", h: "https://www.facebook.com/inmueblescoral/" },
                  { i: "instagram", h: "https://www.instagram.com/inmueblescoral/" },
                  { i: "tiktok", h: "https://www.tiktok.com/@inmueblescoral" },
                  { i: "youtube", h: "https://www.youtube.com/@inmueblescoral" },
                ].map((s) => (
                  <a key={s.i} href={s.h} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-gray-5 hover:bg-teal text-gray-2 hover:text-white flex items-center justify-center transition-all" aria-label={s.i}>
                    <i className={`fab fa-${s.i}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* FORM */}
            <div className="bg-gray-5 rounded-3xl p-8 md:p-12 shadow-soft">
              <h2 className="text-2xl font-bold text-dark mb-6">Solicita información</h2>
              {sent && (
                <div className="mb-5 p-4 bg-teal/10 border border-teal/30 rounded-lg text-sm text-teal-dark">
                  ¡Gracias! Te abrimos WhatsApp para que envíes tu mensaje.
                </div>
              )}
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Nombre" name="name" placeholder="Tu nombre completo" required />
                  <Field label="Teléfono" name="phone" type="tel" placeholder="+52 000 000 0000" required />
                </div>
                <Field label="Email" name="email" type="email" placeholder="tu@email.com" />
                <div>
                  <Label>¿Qué tipo de desarrollo te interesa?</Label>
                  <select name="interest" defaultValue="" className="w-full px-5 py-3.5 border-[1.5px] border-gray-4 rounded-xl text-[15px] bg-white text-dark focus:outline-none focus:border-teal transition">
                    <option value="">Selecciona una opción</option>
                    <option>Residencial (desde $592,948)</option>
                    <option>Semiurbanizado (desde $249,000)</option>
                    <option>Uniservicio (desde $281,996)</option>
                    <option>De Inversión (desde $242,000)</option>
                    <option>Zenit Eco Living</option>
                    <option>No estoy seguro, necesito asesoría</option>
                  </select>
                </div>
                <Field label="¿Desde dónde nos escribes?" name="from" placeholder="Ciudad y estado (ej: CDMX, USA)" />
                <div>
                  <Label>Mensaje (opcional)</Label>
                  <textarea
                    name="message"
                    placeholder="Cuéntanos tus dudas o lo que te gustaría saber..."
                    className="w-full px-5 py-3.5 border-[1.5px] border-gray-4 rounded-xl text-[15px] bg-white text-dark min-h-[120px] resize-y focus:outline-none focus:border-teal transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal hover:bg-teal-dark text-white rounded-full text-base font-semibold transition-all hover:-translate-y-0.5 shadow-soft"
                >
                  <i className="fab fa-whatsapp" /> Enviar por WhatsApp
                </button>
                <p className="text-xs text-gray-3 text-center">
                  Al enviar, abriremos WhatsApp con tu mensaje listo para enviar.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[12px] font-semibold text-gray-1 mb-2 uppercase tracking-wider">
      {children}
    </label>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full px-5 py-3.5 border-[1.5px] border-gray-4 rounded-xl text-[15px] bg-white text-dark placeholder:text-gray-3 focus:outline-none focus:border-teal transition"
      />
    </div>
  );
}
