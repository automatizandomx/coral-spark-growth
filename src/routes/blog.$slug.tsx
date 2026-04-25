import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import { WPContent } from "@/components/site/WPContent";
import { getPostBySlug, formatDate } from "@/lib/wp";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  staleTime: 60_000,
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Entrada no encontrada" }] };
    const desc = post.excerpt
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim()
      .slice(0, 160);
    return {
      meta: [
        { title: `${post.title} | Inmuebles Coral` },
        { name: "description", content: desc },
        { property: "og:title", content: post.title },
        { property: "og:description", content: desc },
        ...(post.featured_image
          ? [
              { property: "og:image", content: post.featured_image },
              { name: "twitter:image", content: post.featured_image },
            ]
          : []),
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: PostPage,
  errorComponent: ({ error }) => {
    const router = useRouter();
    return (
      <SiteLayout>
        <div className="pt-40 pb-20 max-w-2xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-dark mb-4">Algo salió mal</h1>
          <p className="text-gray-2 mb-6">{error.message}</p>
          <button
            onClick={() => router.invalidate()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-full text-sm font-semibold"
          >
            Reintentar
          </button>
        </div>
      </SiteLayout>
    );
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="pt-40 pb-20 max-w-2xl mx-auto px-6 text-center">
        <h1 className="text-3xl font-bold text-dark mb-4">Entrada no encontrada</h1>
        <p className="text-gray-2 mb-6">Esta entrada del blog no existe o fue movida.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-full text-sm font-semibold"
        >
          Ver todas las entradas
        </Link>
      </div>
    </SiteLayout>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData();

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="bg-gradient-hero pt-40 pb-16 text-white">
        <div className="max-w-[800px] mx-auto px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6"
          >
            <i className="fas fa-arrow-left" /> Volver al blog
          </Link>
          <div className="text-[13px] font-semibold uppercase tracking-[2px] text-teal-light mb-4">
            {formatDate(post.date)}
          </div>
          <h1 className="text-[clamp(32px,4.5vw,52px)] font-extrabold tracking-tight leading-[1.15]">
            {post.title}
          </h1>
          {post.author?.name && (
            <div className="mt-6 flex items-center gap-3 text-sm text-white/70">
              {post.author.avatar_URL && (
                <img
                  src={post.author.avatar_URL}
                  alt={post.author.name}
                  className="w-9 h-9 rounded-full"
                />
              )}
              <span>Por {post.author.name}</span>
            </div>
          )}
        </div>
      </section>

      {/* FEATURED IMAGE */}
      {post.featured_image && (
        <div className="max-w-[1000px] mx-auto px-6 -mt-10 relative z-10">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-[420px] object-cover rounded-3xl shadow-elegant"
          />
        </div>
      )}

      {/* CONTENT */}
      <article className="py-20">
        <div className="max-w-[760px] mx-auto px-6">
          <WPContent
            html={post.content}
            className="prose prose-lg prose-neutral max-w-none
                       prose-headings:font-bold prose-headings:text-dark prose-headings:tracking-tight
                       prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                       prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-3
                       prose-p:text-gray-1 prose-p:leading-relaxed
                       prose-a:text-teal prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-dark
                       prose-img:rounded-2xl prose-img:shadow-soft
                       prose-blockquote:border-l-teal prose-blockquote:bg-teal-light/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic"
          />

          {Object.keys(post.tags).length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-4 flex flex-wrap gap-2">
              {Object.values(post.tags).map((t) => (
                <span
                  key={t.slug}
                  className="text-xs px-3 py-1 bg-gray-5 text-gray-2 rounded-full font-medium"
                >
                  #{t.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      <CTASection
        title="¿Quieres invertir en Puerto Escondido?"
        subtitle="Hablamos por WhatsApp y te asesoramos sin compromiso."
        whatsappText={`Hola, leí "${post.title}" en su blog y quiero más información`}
      />
    </SiteLayout>
  );
}
