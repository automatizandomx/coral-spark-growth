import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Inmuebles Coral | Terrenos en Puerto Escondido, Oaxaca" },
      {
        name: "description",
        content:
          "Desarrollos inmobiliarios en Puerto Escondido, Oaxaca. Lotes residenciales, semi-urbanizados y de inversión con permisos vigentes y financiamiento sin buró.",
      },
      { name: "author", content: "Inmuebles Coral" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_MX" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@inmueblescoral" },
      { property: "og:title", content: "Inmuebles Coral | Terrenos en Puerto Escondido, Oaxaca" },
      { name: "twitter:title", content: "Inmuebles Coral | Terrenos en Puerto Escondido, Oaxaca" },
      { name: "description", content: "Coral Sales Booster is a website designed to drive sales and generate leads for real estate businesses." },
      { property: "og:description", content: "Coral Sales Booster is a website designed to drive sales and generate leads for real estate businesses." },
      { name: "twitter:description", content: "Coral Sales Booster is a website designed to drive sales and generate leads for real estate businesses." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a0eaca3e-36a2-49ad-84e5-4483b8c2a77f/id-preview-c0cde09f--d752ec89-31bd-4f27-a756-dc7d8acb6e15.lovable.app-1777133614485.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a0eaca3e-36a2-49ad-84e5-4483b8c2a77f/id-preview-c0cde09f--d752ec89-31bd-4f27-a756-dc7d8acb6e15.lovable.app-1777133614485.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
