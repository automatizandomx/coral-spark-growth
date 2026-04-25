# Guía: Editar tu sitio desde WordPress.com

Tu sitio React lee contenido de **inmueblescoral.wordpress.com** mediante la API
pública de WordPress.com (no necesita login ni plan de pago). Cada vez que
publicas/edites algo en WordPress, el sitio lo refleja automáticamente
(caché de ~60 segundos).

> Si WordPress no devuelve un campo, el sitio usa el texto por defecto
> que ya está en el código. Nunca se rompe.

---

## 1. Blog (la parte más sencilla)

Crea **entradas (Posts)** normales en WordPress. Aparecerán automáticamente
en `tusitio.com/blog`.

- Título → título de la entrada
- Imagen destacada → imagen de la tarjeta
- Extracto → texto de preview
- Contenido → cuerpo del artículo en `/blog/<slug>`

**Importante:** las entradas que pongas en la categoría `desarrollos` NO aparecen
en el blog (se usan para el catálogo, ver siguiente sección).

---

## 2. Catálogo de Desarrollos

Crea una **categoría** llamada exactamente `desarrollos` (slug: `desarrollos`).

Por cada desarrollo, crea una **entrada** dentro de esa categoría:

- **Título** → nombre del desarrollo (ej: "Vivir en el paraíso")
- **Imagen destacada** → foto del terreno
- **Extracto** → descripción corta (1-2 líneas)
- **Contenido** → puede estar vacío o tener detalles ampliados

Para los **datos extra** (precio, ubicación, badge, etc.) pega lo siguiente
al final del contenido del post, ajustando los valores:

```
[field key="badge"]Premium[/field]
[field key="type"]Residencial[/field]
[field key="location"]Bajos de Chila[/field]
[field key="size"]Desde 200 m²[/field]
[field key="price"]$592,948[/field]
[field key="icon"]fa-home[/field]
[field key="features"]🏡 Residencial | 🌿 Áreas verdes | 🔒 Seguridad[/field]
```

**Notas:**
- Las shortcodes no se ven en la página, solo se usan para extraer los datos.
- `features` separa con `|`.
- `icon` es un nombre de Font Awesome (ej: `fa-home`, `fa-tree`, `fa-bolt`, `fa-chart-line`).
- Si dejas `badge` vacío, no se muestra el badge.

Los primeros 4 aparecen en la home, todos en `/desarrollos`.

---

## 3. Textos editables del Hero (página principal)

Crea una **PÁGINA** (no entrada) llamada como quieras, con slug exacto:
**`hero-home`**.

En el contenido, pega:

```
[field key="badge"]5.0 estrellas en Google — 21 reseñas verificadas[/field]
[field key="title_lead"]Tu lugar en la costa[/field]
[field key="title_em"]oaxaqueña[/field]
[field key="title_trail"]empieza aquí.[/field]
[field key="paragraph"]Diseñamos, planificamos y ejecutamos cada desarrollo desde cero. No somos intermediarios — somos los creadores de tu futuro patrimonio en Puerto Escondido.[/field]
[field key="stat1_v"]13+[/field]
[field key="stat1_l"]Desarrollos[/field]
[field key="stat2_v"]647+[/field]
[field key="stat2_l"]Familias felices[/field]
[field key="stat3_v"]200m²[/field]
[field key="stat3_l"]Lotes desde[/field]
[field key="stat4_v"]$242K[/field]
[field key="stat4_l"]Precio desde[/field]
```

---

## 4. Página "Nosotros"

Crea una **PÁGINA** con slug exacto: **`nosotros`**.

Al inicio del contenido pon las shortcodes con los textos cortos:

```
[field key="hero_badge"]Sobre Nosotros[/field]
[field key="hero_title_lead"]No somos intermediarios.[/field]
[field key="hero_title_em"]Somos los creadores.[/field]
[field key="hero_paragraph"]Diseñamos, planificamos y ejecutamos cada desarrollo desde cero, pensando en el bienestar de quienes lo habitarán.[/field]
[field key="stat"]+647[/field]
[field key="stat_label"]Familias felices en la costa[/field]
[field key="section_title"]Sabemos lo que es irse lejos a buscar lo que en casa no había.[/field]
[field key="quote"]Somos de aquí. Conocemos esta tierra. Y estamos contigo desde el primer recorrido hasta el acta de posesión a tu nombre.[/field]
```

Después de las shortcodes, escribe **la historia completa** con párrafos
normales de WordPress (negritas, párrafos, etc.). Ese contenido se
renderizará en la sección de "Quiénes somos".

---

## 5. ¿Cómo lo veo en mi sitio?

- El sitio refresca contenido cada ~60 segundos.
- Si publicas algo en WordPress y no aparece, recarga el navegador con
  Ctrl+Shift+R (Cmd+Shift+R en Mac).

## 6. Slugs — recordatorio

| Lugar del sitio        | Tipo en WP | Slug exacto    |
|------------------------|------------|----------------|
| Hero de la home        | Página     | `hero-home`    |
| Página Nosotros        | Página     | `nosotros`     |
| Tarjetas de desarrollo | Entradas   | (categoría: `desarrollos`) |
| Blog                   | Entradas   | (cualquier categoría salvo `desarrollos`) |

¡Listo! Empieza creando una entrada de blog para probar — aparecerá en
`/blog` en menos de un minuto.
