# Layout — breakpoints, container y la receta de grilla

No se diseña una grilla por cada pantalla: no alcanzaría y envejecería mal. Diseño define
**dos anclas** y una **receta**; dev hace fluir todo lo que hay en el medio.

## Breakpoints

Son los del theme, y son el contrato: el código responsive entero (`sx`, `useMediaQuery`,
`Container`) cuelga de estas seis llaves.

| llave | valor | de dónde sale |
|---|---|---|
| `xs` | `0` | — |
| `sm` | `576px` | Bootstrap (el sitio institucional corre Bootstrap 5) |
| `md` | `768px` | Bootstrap · es también el iPad vertical |
| `lg` | `992px` | Bootstrap |
| `xl` | `1200px` | Bootstrap · coincide con el `lg` del MUI productivo |
| `xxl` | `1536px` | el `xl` stock de MUI |

En CSS están como `--neo-breakpoint-{llave}` (y su par `-rem`). **Referenciar por llave, nunca por
el número**: el valor puede moverse y la llave no.

Un solo set sirve a los tres productos vivos, que hoy no comparten nada entre sí: el sitio
(Bootstrap), el cotizador (MUI stock) y Sucursal Virtual (MUI defaults).

## Container

Escalona en dos pasos en vez de crecer sin límite:

| desde | ancho de contenido | var |
|---|---|---|
| `xs`–`lg` | fluido | — |
| `xl` | `1180px` | `--neo-container-content` |
| `xxl` | `1320px` | `--neo-container-wide` |

`1180` es la conducta real del sitio; `1320` es la grilla exacta de 12×88. El theme ya trae el
override de `MuiContainer` con estos anchos por llave — no hace falta configurarlo.

Para bandas de borde a borde: fondo al 100% y el contenido de la banda a `1320`.

## La receta de grilla

Columnas y separación por tramo. Es lo mismo en los tres layouts:

| | `xs` | `md` | `lg` en adelante |
|---|---|---|---|
| columnas | 4 | 8 | 12 |
| separación | `16px` | `24px` | `24px` |

En MUI:

```tsx
<Grid container columns={{ xs: 4, md: 8, lg: 12 }} spacing={{ xs: 2, md: 3 }}>
```

**Tablet no se diseña** — por porcentaje de uso, es una decisión de producto. Pero sí se
implementa: el tramo `768`–`991` sale de esta receta, no de un mockup. Por eso existen las 8
columnas.

## Los tres layouts

Viven en Figma como especificación de diseño. Se listan acá para leer un mockup, no para
configurar nada: en código los tres se resuelven con los breakpoints y el container de arriba.

| layout | dónde | cómo se comporta |
|---|---|---|
| **base** | mobile y tablet | fluido, márgenes `16`/`24` |
| **marketing** | sitio público, desktop | container centrado — los márgenes anchos son lo que produce el `1180`/`1320` |
| **product** | Sucursal Virtual, backoffice | fluido menos la barra lateral fija de `304px` y su separación de `32px` |

Los tres comparten la receta; lo que cambia es qué ancho de contenido queda disponible.

**Los márgenes de layout no son tokens, y es a propósito.** Layout es una capa propia: acoplarla a
la escala de espaciado de los componentes ataba dos cosas que cambian por razones distintas. En
Figma son valores literales.

## Anclas de diseño

Los mockups se dibujan en `375` · `1440` · `1920`. Un ancho de diseño **no es** un breakpoint:
`1440` cae dentro de `xl`, y `1920` dentro de `xxl`.
