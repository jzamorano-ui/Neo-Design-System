# Guía de tokens — cuándo usar cuál

> El sistema nombra el color **por intención**, no por componente: `{rol}/{grupo}/{variante}`.
> Regla de oro: si estás escribiendo un hex, está mal — siempre hay un token.

## Los 6 roles

| Rol | Qué pinta | Ejemplo |
|---|---|---|
| `surface/*` | El **lienzo**: fondos de página, sección, banda oscura, scrim | `surface/base/default` |
| `fill/*` | **Relleno de componente**: botones, chips, alerts, marcadores | `fill/primary/default` |
| `text/*` | Texto | `text/base/default` |
| `icon/*` | Íconos | `icon/base/default` |
| `border/*` | Bordes y divisores | `border/base/default` |
| `focus/*` | Anillo y halo de foco (teclado) | `focus/ring/default` |

## Decisiones típicas

**¿`surface` o `fill`?** — Si es el fondo *donde viven* los componentes → `surface`. Si es el relleno *de* un componente → `fill`.

**¿`base` o `semantic`?** — `base` = neutro/estructural (el 90% de la UI). `semantic` = comunica estado: `info` · `success` · `warning` · `error` (1:1 con `severity` de MUI).

**¿`soft` o `solid`?** — `soft` = fondo tenue (el relleno de un alert). `solid` = marcador enfático (badge, punto de estado). El texto sobre `soft` usa `text/semantic/{i}`; sobre `solid` usa `text/base/contrast` (salvo warning: texto oscuro).

**¿`contrast` o `inverse`?** — `contrast` = elemento **sobre** fondo oscuro (`text/base/contrast` = blanco). `inverse` = la variante de un componente **para** fondo oscuro (`fill/base/inverse` = relleno oscuro sobre claro).

**¿`deco`?** — Serie categórica para ilustración/gráficos (`deco/1..5`, cada uno `soft`/`solid`). El número desacopla el orden del color: si mañana cambia la paleta, el consumo no se toca.

**Estados (`hover`/`active`)** — los aplica el **componente** (ya vienen en el theme). No los uses para pintar elementos estáticos.

**`disabled`** — trío listo: `fill/base/disabled` + `text/base/disabled` + `border/base/disabled` (exentos de contraste por WCAG).

## Reglas de accesibilidad ya resueltas (no romper)

- `text/base/secondary` pasa AA sobre blanco y grises sutiles — para fondos de color usar `text/base/default` o `contrast`.
- `text/base/brand` (coral) **solo texto grande/bold**; para texto normal de marca → `text/base/brand-strong` (maroon, AA cualquier tamaño).
- Bordes funcionales (`border/base/default`) **no van dentro de `fill/base/medium`** (contraste insuficiente).
- El foco siempre es **ring + gap** (`focus/*`) — nunca solo cambio de color.

## Cómo consumirlos

```js
// JS — desde el paquete
import { color, colorVars, scale } from '@neo/mui';
color['fill/primary/default']      // '#1F3644' (hex)
colorVars['fill/primary/default']  // 'var(--fill--primary--default)' → para sx/styled
scale.space.md                     // 12

// theme MUI — dentro de sx/styled
theme.neo.space.lg                 // 16
theme.neo.radius.sm                // 8

// CSS plano
color: var(--text--base--secondary);
padding: var(--neo-space-lg);
```

Referencia completa (token → var → primitivo → valor → uso): `TOKENS-DICTIONARY.md`, que viaja en el paquete.
