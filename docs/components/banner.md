# Banner

> **Figma (fuente de verdad):** [❖ Banner](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003685-37499) — validación visual contra el master.

Destaca un mensaje dentro de la página — una campaña, un beneficio, un aviso — con o sin una acción. Es la superficie promocional del sistema: llama la atención sin interrumpir la navegación.

No es para feedback del sistema: confirmaciones y errores son de **Alert**. El banner promociona, no notifica.

## Cuándo usarlo

| Caso | Variante |
|---|---|
| Campaña o beneficio protagonista, jerarquía alta | `lg` — con `full-photo` si la foto carga el mensaje |
| Aviso o promoción secundaria, jerarquía media | `medium` |
| Recordatorio o acceso puntual, jerarquía baja | `small` — franja compacta, sin título |

Pueden convivir varios banners en una vista, pero nunca seguidos — sepáralos con contenido o compiten entre sí.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `device` | mobile · desktop — la elige el **ancho disponible**, no el aparato |
| `size` | lg · md · sm — define el alto |
| `full-photo` | false · true — la imagen pasa a ser el fondo, con overlay |
| `title` | El título. No existe en `small`. |
| `subtitle` (+ `↪ text`) | El subtítulo. Opcional; no existe en `small`. |
| `description` (+ `↪ body`) | La bajada. |
| `image` | El slot de imagen: lo que entre llena la caja y se recorta. |
| `image left` · `image right` | En `small`, de qué lado va la imagen. |
| `icon` | El ícono de marca. Solo en `large`. |
| `button` | El CTA. Opcional — máximo uno. |

**Combinatoria:** `small` no lleva título, subtítulo ni ícono — solo bajada, CTA e imagen. El ícono de marca solo existe en `large`.

---

## Props

```typescript
interface BannerProps {
  device?: 'mobile' | 'desktop'         // default: 'desktop' — la decide el ancho disponible
  size?: 'large' | 'medium' | 'small'   // default: 'large'
  fullPhoto?: boolean                   // default: false — la imagen pasa a ser el fondo
  title?: string                        // no existe en small
  subtitle?: string                     // opcional; no existe en small
  description: string                   // la bajada
  image?: React.ReactNode               // el slot: <img>, ilustración — entra como fondo (cover)
  imagePosition?: 'left' | 'right'      // solo small; default: 'right'
  showIcon?: boolean                    // default: false — ícono de marca, solo large
  action?: BannerAction                 // el CTA — máximo uno
}

interface BannerAction {
  label: string                         // nombra la acción: "Conocer más", no "Aceptar"
  onClick: () => void
}
```

**La variante la elige el ancho disponible, no el dispositivo.** Contenido de 343–735px → `mobile` · desde 720px → `desktop` (se traslapan en 720–735). En un layout con sidebar, un viewport de 992px deja ~624px de contenido: ahí va la variante `mobile` aunque la pantalla sea desktop.

---

## Tokens

### Color

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| contenedor | default | background | `--fill--base--default` |
| `title` · `subtitle` · `description` | default | color | `--text--base--default` |
| `title` · `subtitle` · `description` | full-photo | color | `--text--base--contrast` |
| overlay (full photo) | — | background | gradiente negro 70% → 0 — **constante de diseño, no se tokeniza** (los gradientes no se tokenizan) |
| CTA | default | — | button `system primary` — hereda sus tokens |
| CTA | full photo | — | button `system primary` con `surface=inverse` |

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `border-radius` (contenedor) | `--neo-radius-lg` | 16px |
| `padding-top` (zona de contenido) | `--neo-space-2xl` | 32px |
| `padding-inline` (zona de contenido) | `--neo-space-xl` | 24px |
| `padding-bottom` (zona de contenido) | `--neo-space-lg` | 16px |
| `gap` (bloques de contenido) | `--neo-space-sm` | 8px |
| `gap` (título ↔ subtítulo) | `--neo-space-xs` | 4px |
| `gap` (acciones) | `--neo-space-md` | 12px |
| `padding-top` (acciones) | `--neo-space-sm` | 8px |
| `icon-size` (marca) | `--neo-icon-size-2xl` | 48px |

**Medidas** — el ancho lo gobierna el contenedor de cada contexto, no el componente. El alto lo dicta el `size`.

| device | se dibuja a | ancho mín | ancho máx | alto large · medium · small |
|---|---|---|---|---|
| `desktop` | 1180 | 720 | — (llena su contenedor) | 374 · 230 · 90 |
| `mobile` | 343 | 343 | 735 | 504 · 340 · 148 |

> En marketing el ancho lo acota el container del grid (1180 / 1320). En product (layout con sidebar) el banner llena el área de contenido.

### Tipografía

| Elemento | desktop `large` | resto de variantes |
|---|---|---|
| `title` | `title/lg-bold` — 24px · 700 · 32px | `title/md-bold` — 20px · 700 · 28px |
| `subtitle` | `title/md-bold` — 20px · 700 · 28px | `title/sm-bold` — 18px · 700 · 26px |
| `description` | `body/lg-regular` — 16px · 400 · 24px | `body/md-regular` — 14px · 400 · 20px |

**Extensión de textos** — el banner no crece con el texto: lo trunca. Sintetiza el mensaje.

| Variante | Titular | Subtítulo | Bajada con CTA | Bajada sin CTA |
|---|---|---|---|---|
| desktop · large | máx 2 líneas | máx 1 línea | máx 2 líneas | máx 3 líneas |
| desktop · medium | 1 línea con subtítulo · 2 sin | máx 1 línea | máx 2 líneas | máx 3 líneas |
| desktop · small | — | — | máx 2 líneas | máx 2 líneas |
| mobile · large | máx 2 líneas | máx 1 línea | máx 2 líneas | máx 3 líneas |
| mobile · medium | 1 línea con subtítulo · 2 sin | máx 1 línea | máx 2 líneas | máx 3 líneas |
| mobile · small | — | — | máx 3 líneas | máx 5 líneas |

---

## HTML

```html
<section class="banner banner--desktop banner--large" aria-labelledby="banner-title">
  <div class="banner__content">
    <svg class="banner__icon" aria-hidden="true">…</svg>
    <h2 id="banner-title" class="banner__title">Vive tranquilo con la mejor cobertura</h2>
    <p class="banner__subtitle">Contrata el plan Esencial en línea</p>
    <p class="banner__description">Atención preferente y coberturas ampliadas.</p>
    <div class="banner__actions">
      <button type="button" class="btn btn--primary">Conocer más</button>
    </div>
  </div>
  <div class="banner__media">
    <!-- la imagen es fondo: llena la caja y se recorta -->
    <img src="…" alt="" style="width: 100%; height: 100%; object-fit: cover;">
  </div>
</section>
```

```html
<!-- full photo: la imagen es el fondo, el overlay va encima y el texto sobre la zona oscura.
     El CTA va en `surface=inverse` (.btn--inverse): sobre foto, el botón claro pierde contorno. -->
<section class="banner banner--desktop banner--large banner--full-photo" aria-labelledby="promo-title">
  <div class="banner__media">
    <img src="…" alt="" style="width: 100%; height: 100%; object-fit: cover;">
  </div>
  <div class="banner__content">
    <h2 id="promo-title" class="banner__title">Cobertura completa desde hoy</h2>
    <p class="banner__description">Contrata en línea en cinco minutos.</p>
    <div class="banner__actions">
      <button type="button" class="btn btn--primary btn--inverse">Cotizar</button>
    </div>
  </div>
</section>
```

En `full photo` la imagen ocupa todo el banner, el overlay va encima y el contenido encima del overlay — el texto siempre sobre la zona oscura.

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Contenedor | `<section>` | `aria-labelledby` (el título) · `aria-label` en `small` (no hay título) |
| Título | `<h2>` | `id` referenciado por `aria-labelledby` — nivel según la jerarquía de la página |
| Imagen | `<img>` | `alt=""` — es fondo decorativo; el mensaje vive en el texto |
| CTA | `<button>` · `<a>` | el label nombra la acción — "Conocer más", nunca "Click aquí" |

> **Nunca `role="banner"`.** Ese landmark ARIA es el header del sitio — no tiene relación con este componente. Usar `<section>`.

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Llega al CTA (único elemento interactivo) |
| `Enter` · `Space` | Activa el CTA |

El banner mismo no es interactivo — solo el CTA recibe foco. No hacer clickeable toda la superficie.

---

## Reglas

- **La imagen es fondo, no contenido.** Llena la caja y se recorta (`object-fit: cover`); el alto lo dicta el `size`, nunca la imagen.
- **El ancho lo pone el contenedor.** El componente no fija máximos — el grid de cada contexto lo acota.
- **La variante la elige el ancho disponible**, no el dispositivo: hasta 735px → `mobile` · desde 720px → `desktop`.
- **`full photo` siempre con overlay.** Oscuro del lado del texto; el foco de la foto, al lado contrario. Nunca eliminarlo.
- **Respeta la extensión de textos.** El banner no crece: trunca. Ver la tabla.
- **CTA opcional — máximo uno.** El banner informa o pide una acción, nunca un menú.
- **No es para feedback del sistema.** Confirmaciones y errores son de Alert.
- **Nunca seguidos.** Varios banners por vista sí; apilados no — sepáralos con contenido.

---

## Accesibilidad

- **WCAG 1.4.3 (Contraste)** — sobre `full photo` el overlay es lo que sostiene el texto blanco, y
  **solo mientras el texto quede en el tercio oscuro**: a opacidad 0.7 da 8.45:1 sobre una foto
  clara, a mitad de ancho ya cae a 2.43:1 y en el borde derecho a 1.00:1. El gradiente se apaga a
  propósito —así se ve la foto—, así que la regla no es "el overlay garantiza AA" sino **el texto no
  pasa de la mitad**. Importa sobre todo en `device=mobile`, donde el grid es de una sola columna y
  el contenido puede cruzar todo el ancho. Nunca quitar el overlay ni bajarle la opacidad.
- **WCAG 1.1.1 (Contenido no textual)** — la imagen es decorativa: `alt=""`. El mensaje completo vive en el texto real, nunca dentro de la imagen.
- **WCAG 1.3.1 (Información y relaciones)** — el título es un heading real (`<h2>` o el nivel que corresponda) y nombra la región vía `aria-labelledby`.
- **WCAG 2.5.8 (Tamaño del target, AA)** — el CTA hereda la caja del button: 32/40/48 de alto según
  el size, todas por encima del mínimo de 24×24.
- **No solo color** — el mensaje no depende de la foto ni del color de fondo: texto + CTA lo comunican completo.
