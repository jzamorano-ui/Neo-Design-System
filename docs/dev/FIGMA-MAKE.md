# Reglas de Neo — fuente de las guidelines del Make kit

Este archivo es **la fuente**. `npm run make-kit` lo parte en los cuatro archivos que el kit de Figma
Make espera (`Guidelines.md` · `tokens.md` · `styles.md` · `components.md`), usando los marcadores
`<!-- kit:… -->` de abajo. Se edita acá y se regenera: nunca al revés.

Los marcadores son **load-bearing**. Si se borra uno, el build falla en vez de emitir un archivo
vacío que nadie notaría hasta ver el resultado de Make.

<!-- kit:Guidelines.md -->
# Neo — reglas generales

Neo es el design system del equipo. Este kit lo trae entero como CSS plano — sin MUI y sin
componentes React: tokens, tipografía, 20 componentes en clases, y 164 íconos.

Todo se carga con una sola línea, que ya está puesta en `src/styles/index.css`:

```css
@import '@ops-Neo/neo/styles.css';
```

## Las otras guidelines

Este archivo son las reglas generales. El detalle está repartido, y hay que leerlo:

- **`tokens.md`** — la gramática del color, el árbol de decisión para elegir un rol, y los estados.
- **`styles.md`** — las 22 clases de tipografía, breakpoints, container y la receta de grilla.
- **`components.md`** — los 164 íconos con sus nombres reales, y las 186 clases de los 20
  componentes con sus variantes.

**Antes de escribir un componente, mira `components.md`.** Es el error más caro de este kit:
reconstruir a mano algo que ya existe como clase.

## La regla que más cambia el resultado

**Los componentes ya existen. No los escribas de nuevo.**

Si necesitas un botón es `.btn`, no un `<button>` con estilos propios. Si necesitas una alerta es
`.alert`, no un `<div>` con fondo amarillo. El inventario completo está en `components.md`.

```tsx
<button className="btn btn--primary btn--md">Continuar</button>
<div className="alert alert--warning">…</div>
<span className="tag">Vigente</span>
```

Construir con tokens es el **segundo** recurso: vale para lo que el sistema no cubre —la composición
de una página, una sección, un layout— no para rehacer lo que ya está.

## Regla de oro

**Si estás escribiendo un hex, está mal.** Siempre hay un token. Tampoco van px sueltos de
espaciado ni de radio: salen de la escala.

## No uses otras librerías

- **Íconos:** el sistema tiene 164 propios. No uses `lucide-react` ni ningún otro set.
- **Componentes:** no traigas shadcn ni equivalentes para algo que Neo ya cubre.

## Tailwind está instalado, pero su escala NO es la de Neo

Este kit corre sobre Tailwind, así que clases como `p-4`, `text-gray-600`, `rounded-lg` o
`bg-white` **existen y funcionan** — y ninguna sale de Neo. `p-4` son 16px, y el paso equivalente
del sistema es `--neo-space-md`, que son 12. Usarlas produce una pantalla que se ve ordenada y no
es el sistema.

**Tailwind sirve para estructura, no para apariencia.**

| se puede | no se puede |
|---|---|
| `flex` · `grid` · `block` · `hidden` | `p-*` · `m-*` · `gap-*` → van `var(--neo-space-*)` |
| `items-center` · `justify-between` | `bg-*` · `text-{color}` · `border-{color}` → van los roles |
| `relative` · `absolute` · `w-full` | `rounded-*` → va `var(--neo-radius-*)` |
| `overflow-x-auto` · `flex-wrap` | `text-sm` · `font-bold` → van las 22 clases |
| | `shadow-*` → va `var(--neo-elevation-*)` |

La regla corta: **si la clase de Tailwind decide un color, una medida o un tamaño de texto, está
mal.** Si solo decide dónde va algo, está bien.

Lo mismo vale para las variables de shadcn (`--primary`, `--muted`, `--destructive`, `--radius`):
pertenecen a otro sistema. No las uses ni las mapees a las de Neo.

## Accesibilidad — ya resuelta, no la rompas

- Todo cumple **WCAG AA** como mínimo. Es criterio de diseño, no validación final.
- `text--base--brand` (coral) es **solo para texto grande o bold**. Para texto normal de marca →
  `text--base--brand-strong`.
- El área táctil mínima es **24×24 px**. El tamaño del ícono **no** define el área interactiva: eso
  lo construye el contenedor.
- Lo `disabled` está exento de contraste por WCAG — no lo "arregles".
- El foco tiene token propio: `--focus--ring--default` y `--focus--gap--default`. Los componentes ya
  lo aplican en `:focus-visible`; si construyes algo nuevo, aplícalo igual.

## Antes de dar algo por terminado

1. ¿Escribiste un componente que **ya existe** en `components.md`? Bórralo y usa la clase.
2. ¿Usaste `text--base--contrast` o `icon--base--contrast` en algo que **no** cae sobre un fondo
   oscuro? Es blanco: ahí desaparece. Va `--default`. (Ver `tokens.md`.)
3. ¿Quedó algún **hex**? Hay un token que no se usó.
4. ¿Quedó algún **px suelto** de espaciado o radio? Va `var(--neo-space-*)` / `var(--neo-radius-*)`.
5. ¿Hay `font-size` a mano? Va una de las 22 clases de tipografía.
6. ¿Usaste un ícono que no es de Neo? Cámbialo por el del sprite.

<!-- kit:tokens.md -->
# Neo — tokens

## Cómo se escriben

Dos gramáticas, y cada una dice algo distinto:

```css
/* color — role-first, NO lleva el nombre del sistema */
color: var(--text--base--default);
background: var(--fill--primary--default);
border-color: var(--border--base--default);

/* todo lo demás — lleva el prefijo --neo- y YA VIENE CON UNIDAD */
padding: var(--neo-space-md);
border-radius: var(--neo-radius-pill);
gap: var(--neo-space-sm);
```

**No hace falta `calc()`.** Los dimensionales ya traen `px`.

## El patrón de nombres del color

`{rol}--{grupo}--{variante}` — se nombra por **intención**, no por componente.

| rol | qué pinta |
|---|---|
| `surface` | el lienzo: fondo de página o de sección |
| `fill` | relleno **de** un componente: botones, chips, alerts, marcadores |
| `text` | texto |
| `icon` | íconos |
| `border` | bordes y divisores |
| `focus` | el anillo de foco |

## El árbol de decisión

1. **¿`surface` o `fill`?** Si es el fondo *donde viven* los componentes → `surface`. Si es el
   relleno *de* un componente → `fill`.
2. **¿`base` o `semantic`?** `base` es neutro y estructural — **el 90% de la UI**. `semantic`
   comunica estado: `info · success · warning · error`.
3. **¿`soft` o `solid`?** `soft` es fondo tenue (el relleno de un alert); `solid` es marcador
   enfático (badge, punto de estado). Sobre `soft` va `text--semantic--{estado}`; sobre `solid` va
   `text--base--contrast`, **salvo warning**, que lleva texto oscuro.
4. **¿`contrast` o `inverse`?** `contrast` es un elemento **sobre** fondo oscuro. `inverse` es la
   variante de un componente **para** fondo oscuro.

### `contrast` es el error más caro, y no se ve venir

`text--base--contrast` es **blanco**. Existe para texto sobre la barra superior oscura, sobre un
botón primario, sobre un `solid`. **Sobre un fondo claro desaparece** — blanco sobre
`surface--base--secondary` da **1.08:1**, y el mínimo es 4.5.

Y no da error: el texto queda ahí, invisible.

```tsx
// MAL — título de página sobre el fondo claro
<h1 style={{ color: 'var(--text--base--contrast)' }}>Bandeja de Visación</h1>

// BIEN — 15.47:1
<h1 style={{ color: 'var(--text--base--default)' }}>Bandeja de Visación</h1>
```

**La pregunta que hay que hacerse siempre: ¿sobre qué fondo cae este texto?**

| el fondo detrás | el texto va |
|---|---|
| claro — `surface--base--default` o `--secondary` | `text--base--default` · `--secondary` |
| oscuro — `surface--base--inverse`, `fill--primary--default`, un `solid` | `text--base--contrast` |

Por defecto, **`text--base--default`**. `contrast` solo cuando puedas nombrar el fondo oscuro que
tiene debajo.

`deco--1..5` son para ilustración y gráficos, **no** para UI funcional.

## Los estados existen y hay que usarlos

`--default` · `--hover` · `--active` · `--disabled`. Un botón sin `hover` está incompleto.

## Nunca

- No uses primitivos (`color/brand/500`, `color/slate/900`): no están en el kit, y no es casualidad.
  Si falta un color, falta un **rol**.
- No inventes tokens ni nombres nuevos.
- El estado de error se llama **`error`**. No uses `critical` ni `danger`. <!-- naming-ok -->

<!-- kit:styles.md -->
# Neo — tipografía, espaciado y layout

## Tipografía — son clases, no variables

22 clases. Traen familia, tamaño, peso e interlineado. **No pongas `font-size` ni `line-height` a
mano.**

```
display-xl-bold
headline-lg-bold · headline-md-bold · headline-sm-bold
title-lg-bold · title-lg-medium · title-md-bold · title-md-medium
title-sm-bold · title-sm-medium · title-xs-bold
body-xl-bold · body-xl-medium · body-xl-regular
body-lg-bold · body-lg-medium · body-lg-regular
body-md-bold · body-md-medium · body-md-regular
caption-sm-medium · caption-sm-regular
```

```tsx
<p className="body-lg-regular">Texto base del sistema</p>
<h2 className="headline-md-bold">Título de sección</h2>
```

El texto base es **`body-lg-regular`** (16px). La familia es **Noto Sans**, única: no agregues otra
ni cambies pesos.

## Jerarquía

- `display` y `headline` → títulos de página y de sección. Uno de `display` por pantalla, como mucho.
- `title` → encabezados de tarjeta, de tabla, de modal.
- `body` → texto corrido y contenido de celdas.
- `caption` → etiquetas, metadatos, encabezados de columna.

## Layout

Breakpoints — referenciar **por llave, nunca por el número**:

`xs 0` · `sm 576` · `md 768` · `lg 992` · `xl 1200` · `xxl 1536`

El contenido se centra con ancho máximo: **fluido** hasta `lg`, **1180px** desde `xl`, **1320px**
desde `xxl` — `var(--neo-container-content)` y `var(--neo-container-wide)`.

Columnas y separación, igual en todos los layouts:

| | `xs` | `md` | `lg` en adelante |
|---|---|---|---|
| columnas | 4 | 8 | 12 |
| separación | 16px | 24px | 24px |

Para bandas de borde a borde: el fondo llena la pantalla, el contenido se alinea a 1320.

## Comportamiento responsive

Estructura con **flexbox y grid**, no con posicionamiento absoluto. En mobile, apilar en vertical;
desde `md`, distribuir en horizontal. Las tablas anchas van dentro de un contenedor con
`overflow-x: auto` — la página nunca debe desplazarse en horizontal.

<!-- kit:components.md -->
# Neo — componentes e íconos

## Íconos

**No uses `<use href>` contra el sprite.** Sale en blanco: el navegador no resuelve `<use>` contra
un documento SVG externo, y el empaquetador sirve el sprite como su propio archivo. Se importa el
sprite crudo y se inlinea el símbolo, así cada ícono es autocontenido y sobrevive a que lo copien
a cualquier parte.

```tsx
// src/app/components/icon.tsx
import type { CSSProperties } from 'react';
import spriteRaw from '@ops-Neo/neo/icons.svg?raw';

const simbolos = new Map<string, { viewBox: string; contenido: string }>();
for (const m of spriteRaw.matchAll(
  /<symbol\s+id="([^"]+)"\s+viewBox="([^"]+)"\s*>([\s\S]*?)<\/symbol>/g,
)) {
  simbolos.set(m[1], { viewBox: m[2], contenido: m[3] });
}

export function Icon({ name, className, style }:
  { name: string; className?: string; style?: CSSProperties }) {
  const s = simbolos.get(name);
  if (!s) return null;
  return (
    <svg className={className} style={style} viewBox={s.viewBox}
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"
      dangerouslySetInnerHTML={{ __html: s.contenido }} />
  );
}
```

```tsx
<Icon name="system-inicio" className="icon icon--lg" />
```

El `id` es `familia-nombre`. Tamaños: **`.icon--xs|sm|md|lg|xl`** y nada más — los tokens
`--neo-icon-size-2xl|3xl|4xl` existen pero **no tienen clase**; si un diseño los pide, van con
`width`/`height` en línea.

**Dentro de `.btn`, `.alert__icon`, `.menu-item__icon`, `.field__icon`, `.chip` y `.tag` el CSS del
componente YA dimensiona el `<svg>` — ahí se omite `.icon`.**

### Los nombres están en español y sin acentos

`bano` (no `baño`) · `senal` (no `señal`). Buscar en inglés no encuentra nada:

| inglés | Neo | | inglés | Neo |
|---|---|---|---|---|
| search | `buscar` | | close | `cerrar` |
| add | `agregar` | | edit | `editar` |
| delete | `papelera-reciclaje` | | home | `inicio` |
| settings | `configuracion` | | calendar | `calendario` |
| bell | `campana` | | mail | `correo` |
| check | `verificar` | | eye | `ojo` |
| lock | `candado` | | download | `descargar` |
| arrow | `flecha-{arriba\|abajo\|izquierda\|derecha}` | | chevron | `chevron-{arriba\|abajo\|izquierda\|derecha}` |

Las variantes van en el propio nombre: `-inverse` en los semantic, `-circulo` para la versión con
círculo, `-desactivar` · `-silencio` · `-oculto` para estados negados.

**Cuál puede cambiar de color y cuál no:**

- **`system`** (122) — íconos de interfaz. Vienen en **`icon/base/default`** y pueden tomar otro
  token **de la misma familia base** según el contexto: `.icon--secondary` para jerarquía menor,
  `.icon--disabled` en un control apagado, `.icon--inverse` sobre fondo oscuro.
- **`semantic`** (10) — íconos de feedback: info, alerta, éxito, advertencia y error, cada uno en
  `default` e `inverse`. **Ya traen su color bindeado al token semántico. No se modifican.**
- **`brand`** (32) — identidad de marca, multicolor. **Ya traen su dualidad de color. No se
  modifican.**

**No inventes nombres de ícono.** La lista completa está más abajo; si no está ahí, no existe.

### Tampoco inventes tokens de ícono

El color de un ícono se pone con **las clases**, no escribiendo un token propio. Los únicos tokens
de ícono que existen son `--icon--base--default · --secondary · --disabled · --contrast` y los
`--icon--semantic--*`.

```tsx
// MAL — ninguno de estos existe
color: var(--color-icon-system-primary)
color: var(--icon--base--primary)   <!-- token-ok -->

// BIEN — la clase ya lo resuelve
<svg className="icon icon--secondary">…</svg>
```

**No existe `primary` en la familia de íconos.** El valor por defecto se llama `default`, y ya viene
aplicado por la clase `.icon`: no hay que escribirlo.
