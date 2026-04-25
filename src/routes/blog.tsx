import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import { getBlogPosts, formatDate } from "@/lib/wp";
import heroCoast from "@/assets/hero-coast.jpg";

export const Route = createFileRoute("/blog")({
  loader: async () => ({
    posts: await getBlogPosts("desarrollos", 30),
  }),
  staleTime: 60_000,
  head: () => ({
    meta: [
      { title: "Blog | Inmuebles Coral Puerto Escondido" },
      {
        name: "description",
        content:
          "Consejos, guías y novedades sobre inversión inmobiliaria en Puerto Escondido y la costa de Oaxaca.",
      },
      { property: "og:title", content: "Blog Inmuebles Coral" },
      {
        property: "og:description",
        content:
          "Aprende a invertir en terrenos en Puerto Escondido. Guías prácticas, casos reales y novedades del mercado.",
      },
      { property: "og:image", content: heroCoast },
    ],
  }),
  component: BlogPage,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="pt-40 pb-20 max-w-2xl mx-auto px-6 text-center">
        <h1 className="text-3xl font-bold text-dark mb-4">No pudimos cargar el blog</h1>
        <p className="text-gray-2">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="pt-40 pb-20 text-center">
        <p className="text-gray-2">Sin entradas todavía.</p>
      </div>
    </SiteLayout>
  ),
});

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

function BlogPage() {
  const { posts } = Route.useLoaderData();
  const router = useRouter();

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="bg-gradient-hero pt-40 pb-20 text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-[13px] font-semibold uppercase tracking-[2px] text-teal-light mb-4">
            Blog
          </div>
          <h1 className="text-[clamp(40px,5vw,60px)] font-extrabold tracking-tight mb-5 max-w-3xl">
            Aprende a invertir en la <em className="not-italic text-white/55">costa de Oaxaca</em>.
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Guías prácticas, casos reales y novedades sobre desarrollos
            inmobiliarios en Puerto Escondido.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center p-12 bg-gray-5 rounded-2xl border-2 border-dashed border-gray-4">
              <p className="text-lg text-gray-2 mb-4">
                Aún no hay entradas publicadas en el blog.
              </p>
              <p className="text-sm text-gray-3 mb-6">
                Las entradas que publiques en{" "}
                <a
                  href="https://wordpress.com/posts/inmueblescoral.wordpress.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal underline"
                >
                  WordPress.com
                </a>{" "}
                aparecerán aquí automáticamente.
              </p>
              <button
                onClick={() => router.invalidate()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal hover:bg-teal-dark text-white rounded-full text-sm font-semibold transition-all"
              >
                <i className="fas fa-rotate" /> Recargar
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.map((p) => (
                <Link
                  key={p.ID}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="bg-white border border-gray-4 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-elegant hover:border-transparent transition-all duration-300 group"
                >
                  <div className="h-52 relative overflow-hidden bg-gray-5">
                    {p.featured_image ? (
                      <img
                        src={p.featured_image}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-card-teal flex items-center justify-center">
                        <i className="fas fa-newspaper text-5xl text-white/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-7">
                    <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-teal mb-2">
                      {formatDate(p.date)}
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-3 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-2 leading-relaxed line-clamp-3">
                      {stripTags(p.excerpt)}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-teal font-semibold text-sm">
                      Leer más <i className="fas fa-arrow-right text-xs" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="¿Quieres saber más?"
        subtitle="Hablamos por WhatsApp y resolvemos todas tus dudas sobre invertir en Puerto Escondido."
        whatsappText="Hola, leí su blog y quiero más información"
      />
    </SiteLayout>
  );
}
