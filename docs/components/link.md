# Link

> **Figma (fuente de verdad):** [❖ Link](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=564-2268) — validación visual contra el master.

Navega a una URL, ruta o ancla. Para ejecutar acciones usar `button`; si visualmente parece link pero dispara lógica, usar `button variant=Tertiary`.

**Dos formas de uso — no se confunden:**

| Uso | Qué es | Cuándo |
|---|---|---|
| **Standalone** | El **componente** Link (con estados y touch target) | El link va en su propia línea: un CTA, "Ver más", un link de footer |
| **Inline** | Un **rango de texto estilado** dentro de un párrafo — **no** el componente | El link va dentro de una oración |

El componente documentado abajo es el **standalone**. El inline tiene su propia sección.

---

## Propiedades (standalone)

| Propiedad | Valores |
|---|---|
| `label` | el texto del link |
| `size` | xs (12px) · sm (14px) · md (16px) · lg (18px) |
| `surface` | default · **inverse** |
| `state` | default · focus · disabled |

- `size` debe coincidir con el tipo de texto donde se ubica. Bold en `sm`/`md`/`lg`, medium en `xs`.
- **No hay `hover` ni `active`** (eliminados 2026-07-27): no se distinguían del default. En código son estados del navegador, no variantes.
- **`surface=inverse`** = link sobre fondo oscuro (headers, banners, `tag` dark).
- **Siempre subrayado** — no existe modo sin subrayado (WCAG 1.4.1: el color solo no distingue el link).

---

## Props

```typescript
interface LinkProps {
  href: string                              // requerido
  // NO hay prop `size`: el tamaño y el peso se eligen con la variante de tipografía
  // (<Link variant="bodyLgBold"> = size md). Ver la nota al final de la sección Tipografía.
  surface?: 'default' | 'inverse'           // default: 'default'
  disabled?: boolean                         // default: false
  children: React.ReactNode                  // texto del link — requerido
  onClick?: (e: React.MouseEvent) => void
}
```

> El standalone lleva un **touch target de 24px** (WCAG 2.5.8 AA) — ver Accesibilidad.

---

## Tokens

### Color (label + subrayado)

**El link no tiene token de color propio — hereda el color del texto que lo rodea** (`color: inherit`, igual que MUI). Se distingue por el **subrayado**, no por el color.

| Estado | Color del texto |
|---|---|
| default · hover · active · focus | hereda `--text--base--default` (superficie clara) · `--text--base--contrast` (`surface=inverse`) |
| disabled | `--text--base--disabled` |
| focus (outline) | `--focus--ring--default` · `--focus--ring--inverse` (inverse) · `--neo-stroke-focus-ring-width` |

El subrayado usa `currentColor` (= el color de texto heredado) — no lleva token propio.

### Subrayado (`::after`, MUI-literal)

El subrayado es un pseudo-elemento `::after` (barra de `currentColor`), **sólido siempre y sin estados**. El color del texto **no cambia**.

| Propiedad | Valor |
|---|---|
| color | `currentColor` (= el color de texto heredado) |
| grosor | `--neo-stroke-xs` (1px) |
| opacidad | **1.0** en todos los estados |
| offset | 2px (`bottom`) |

> **Por qué sólido y no atenuado (corregido 2026-07-27):** MUI atenúa el subrayado a `alpha(color, .4)` **solo en la rama `color !== 'inherit'`** (`Link.js` v5.18); con `color: 'inherit'` —nuestra config, desde que se eliminó `text/link`— deja el subrayado sólido y el hover no cambia nada. Verificado renderizando el componente real. El 0.4 anterior estaba copiado de la otra rama y además dejaba el subrayado en **2.47:1** sobre blanco: como el link no se distingue por color, el subrayado es su único identificador y WCAG 1.4.11 pide 3:1. Sólido da **16.64:1**. <!-- naming-ok -->

> **Nota Figma ↔ dev:** en **código** el subrayado es un `::after`. En **Figma**, el standalone lo dibuja con una **línea** (rectángulo aparte) — porque el label está atado a la propiedad de texto editable y una mutación de texto se re-sincroniza a la variante default. Se ven igual; es solo la representación. El **inline** en Figma usa underline nativo (es un rango, no un componente con propiedad).

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| Touch target (standalone) | — | **24px mín** (WCAG 2.5.8 AA) |
| `focus-ring-width` | `--neo-stroke-focus-ring-width` | 2px |
| `border-radius` (focus ring) | `--neo-radius-xs` | 4px |

### Tipografía

**El link va en BOLD** (decisión 2026-07-27): medium pasaba desapercibido, y como el link no se distingue por color el peso suma affordance junto al subrayado. **`xs` es la excepción y queda en medium** — a 12px la escala no tiene bold (`captionSmBold` no existe) y crearlo sería un token nuevo para el tamaño menos usado.

| Size | Estilo | variante MUI (código) | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `xs` | `caption/sm-medium` | `captionSmMedium` | 12px | **500** | 16px |
| `sm` | `body/md-bold` | `bodyMdBold` | 14px | **700** | 20px |
| `md` | `body/lg-bold` | `bodyLgBold` | 16px | **700** | 24px |
| `lg` | `title/sm-bold` | `titleSmBold` | 18px | **700** | 26px |

> **Cómo se aplica en código:** el `<Link>` de MUI **no tiene prop `size`** — hereda la tipografía del contexto (decisión de diseño: el tamaño no es una prop del componente). El tamaño y el peso se eligen con la variante de tipografía: `<Link variant="bodyLgBold">` para `size=md`, y así según la tabla. En **inline** no se pasa variante: hereda el párrafo, incluido su peso.

---

## Link inline (dentro de un párrafo)

**No usa el componente.** Es texto del párrafo con tratamiento de link — como negrita o cursiva.

- **Tamaño:** heredado del párrafo — no se elige.
- **Accesibilidad:** exento del touch target (WCAG 2.5.8, excepción inline: su tamaño lo limita el line-height del texto que lo rodea).
- **Comportamiento** (hover, focus, click): lo maneja el navegador — es un `<a>` real.

### En código

```html
<p>Al registrarte, aceptas nuestra <a href="/privacy" class="link">política de privacidad</a> para continuar.</p>
```

```css
/* el inline hereda font-size/line-height/baseline del <p> — NO tocar el flujo */
/* ❌ nunca en inline: display:inline-flex · min-height · padding · font-size propio */
```

### En Figma

Un **solo nodo de texto** para todo el párrafo, con line-height uniforme. Al rango del link se le aplica: **subrayado + Medium** (hereda el color del texto — sin color propio). El tamaño queda el del texto. (Nunca cambiar el line-height solo del rango — se descalza.)

---

## HTML (standalone)

```html
<!-- Standalone con touch target -->
<a href="/terms" class="link link--standalone">Ver términos y condiciones</a>

<!-- Standalone sobre fondo oscuro: el link HEREDA el color del contexto (color: inherit),
     así que no lleva clase propia — el contenedor inverso ya le da el color -->
<a href="/more" class="link link--standalone">Ver más</a>

<!-- Disabled -->
<a aria-disabled="true" class="link link--standalone link--disabled">Ver más</a>
```

---

## ARIA

| Elemento | Tag | Atributos requeridos |
|---|---|---|
| Link | `<a href="…">` | texto descriptivo — prohibido "clic aquí" · "ver" · "más info" |
| Link disabled | `<a>` | `aria-disabled="true"` · sin `href` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Mueve el foco al link |
| `Shift + Tab` | Foco al elemento anterior |
| `Enter` | Navega al destino |

---

## Reglas

- El link **siempre va subrayado** (WCAG 1.4.1). No existe modo sin subrayado.
- **Inline vs standalone:** dentro de una oración → inline (rango de texto); aislado en su línea → el componente.
- `size` (standalone) debe coincidir con el texto circundante. **El inline hereda el tamaño** del párrafo.
- El label va **bold** en `sm`, `md` y `lg`; **`xs` queda en medium** (no hay bold a 12px en la escala).
- **`hover` y `active` ya no son variantes** del componente (eliminadas 2026-07-27): el link no tiene estados de color ni de subrayado, así que no se distinguían del default. El affordance lo dan el cursor y el subrayado permanente. Quedan `default`, `focus` y `disabled` — medido en el master: **24 variantes** = 4 tamaños × 3 estados × 2 superficies.
- El subrayado va **sólido en todos los estados** — el color del texto **no cambia** (hereda `text/base`). Siempre visible (WCAG 1.4.1) y con contraste suficiente para identificar el link (WCAG 1.4.11).
- `surface=inverse` para links sobre fondo oscuro; en superficie clara usar el default.
- Usar disabled con moderación — preferir eliminar el link si no es navegable.

---

## Accesibilidad

- **WCAG 1.4.1** — siempre subrayado; el color solo no distingue el link.
- **WCAG 2.4.4** — texto del link descriptivo por sí solo.
- **WCAG 2.4.7** — focus visible siempre. No suprimir `state=focus`.
- **WCAG 2.5.8 (AA)** — **standalone:** touch target de 24×24px mínimo. **Inline:** exento (su tamaño lo limita el line-height del texto circundante).
