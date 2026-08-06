# Modal Dialog

> **Figma (fuente de verdad):** [❖ Modal-Dialog](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003650-15191) — validación visual contra el master.

Interrumpe el flujo para pedir una decisión o una respuesta. Al cerrarlo, la persona vuelve a donde estaba. Es un solo componente: `type` define de qué se trata y `size` cuán grande es.

Si el contenido necesita scroll o varios pasos, el caso no es un diálogo — es un Modal full-screen.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `size` | xs · sm · md · lg |
| `type` | default · brand · info · success · warning · error |
| `title` | El título. |
| `close` | La ✕. Llega encendida. |
| `description` (+ `text`) | La bajada. |
| `content` (+ `slot`) | El contenido intercambiable: un campo, una lista, una tabla. |
| `cta` (+ `primary`, `secondary`) | Las acciones. Máximo dos. |

**Combinatoria:** los tipos con color (`brand` · `info` · `success` · `warning` · `error`) **solo existen en `xs` y `sm`**. En `md` y `lg` el header va neutro.

---

## Props

```typescript
interface ModalDialogProps {
  open: boolean
  onClose: () => void
  size?: 'xs' | 'sm' | 'md' | 'lg'                                        // default: 'xs'
  type?: 'default' | 'brand' | 'info' | 'success' | 'warning' | 'error' // default: 'default'
  title: string
  description?: string                       // la bajada; mapea a aria-describedby
  showClose?: boolean                        // default: true — la ✕
  children?: React.ReactNode                 // el contenido
  primaryAction?: DialogAction
  secondaryAction?: DialogAction
}

interface DialogAction {
  label: string                              // nombra la acción: "Eliminar cuenta", no "Aceptar"
  onClick: () => void
  variant?: 'secondary' | 'tertiary'         // solo la secundaria; default: 'secondary'
}
```

Se implementa sobre el **`Dialog` de MUI** con `scroll="paper"`. **Los anchos del modal son constantes de diseño fijas (440 · 600 · 900 · 1200), independientes de los breakpoints del sistema** — no usar la prop `maxWidth` de MUI (resuelve contra `theme.breakpoints.values` y daría otros anchos): aplicar el `max-width` en px según el `size`, como ya hace el CSS.

---

## Tokens

### Color

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `dialog` | — | background | `--surface--base--default` |
| scrim (overlay) | — | background | `--surface--base--overlay` |
| `title` | default | color | `--text--base--default` |
| `title` | brand | color | `--text--base--brand` |
| `title` | info | color | `--text--semantic--info` |
| `title` | success | color | `--text--semantic--success` |
| `title` | warning | color | `--text--semantic--warning` |
| `title` | error | color | `--text--semantic--error` |
| `header` | info | background | `--fill--semantic--info--soft` |
| `header` | success | background | `--fill--semantic--success--soft` |
| `header` | warning | background | `--fill--semantic--warning--soft` |
| `header` | error | background | `--fill--semantic--error--soft` |
| `header` | brand | background | `--fill--base--default` |
| `description` | — | color | `--text--base--default` |
| botón primario | default | background | `--fill--primary--default` |
| botón secundario | default | background | `--fill--secondary--default` |
| botón terciario | default | background | `--fill--tertiary--default` |
| label del botón primario | — | color | `--text--base--contrast` |
| ✕ (focus) | focus | outline | `--neo-stroke-focus-ring-width` |
### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `border-radius` (dialog) | `--neo-radius-xl` | 24px |
| `border-radius` (contenido) | `--neo-radius-xs` | 4px |
| `border-radius` (✕) | `--neo-radius-pill` | 999px |
| `padding` (gutter) — xs | `--neo-space-lg` | 16px |
| `padding` (gutter) — sm · md | `--neo-space-xl` | 24px |
| `padding` (gutter) — lg | `--neo-space-2xl` | 32px |
| `gap` (bajada ↔ contenido) | `--neo-space-lg` | 16px |
| `gap` (entre acciones) | `--neo-space-md` | 12px |
| `icon-size` (semántico) | `--neo-icon-size-3xl` | — |
| `icon-size` (brand) | `--neo-icon-size-4xl` | — |
| `icon-size` (✕ · glifo) | `--neo-icon-size-sm` | 20px |
| `size` (✕ · caja) | `--neo-icon-size-xl` | 40px |

**Medidas** — el `size` define el **ancho máximo** (contrato con el código). El mínimo es una regla de diseño: si necesitas menos, usa la medida anterior.

| size | ancho (mín – máx) | alto máximo |
|---|---|---|
| `xs` | 343 – 440 | 600 |
| `sm` | 440 – 600 | 700 |
| `md` | 600 – 900 | 740 |
| `lg` | 900 – 1200 | 840 |

> En el navegador, el ancho real es `min(viewport − márgenes, max-width)`. El mínimo lo respeta el diseñador en Figma; el viewport siempre gana.

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `title` (xs · sm · md · lg) | `title/sm-bold` | 18px | 700 | 26px |
| `description` | `body/lg-regular` | 16px | 400 | 24px |

> **El título NO escala con el `size`:** va `title/sm-bold` en las 4 medidas. Hasta el 2026-07-27 `xs` bajaba a `body/lg-bold`; el master lo unificó y se eliminó la excepción en el theme y en el CSS plano. Lo que sí escala por size es el **gutter** horizontal (xs 16 · sm/md 24 · lg 32).

---

## HTML

```html
<!-- el scrim: atenúa la página sin ocultarla — mantiene el contexto; clic = cerrar -->
<div class="modal-overlay" aria-hidden="true"></div>

<div role="dialog"
     aria-modal="true"
     aria-labelledby="dialog-title"
     aria-describedby="dialog-description"
     class="modal-dialog modal-dialog--sm modal-dialog--info">

  <header class="modal-dialog__header">
    <h2 id="dialog-title" class="modal-dialog__title">Ten a mano tu cédula</h2>
    <button type="button" class="modal-dialog__close" aria-label="Cerrar">
      <svg aria-hidden="true">…</svg>
    </button>
  </header>

  <div class="modal-dialog__content">
    <p id="dialog-description" class="modal-dialog__description">
      En el siguiente paso te pediremos una foto de tu cédula.
    </p>
    <!-- el slot: formulario, lista, tabla… -->
  </div>

  <footer class="modal-dialog__actions">
    <button type="button" class="btn btn--secondary">Cancelar</button>
    <button type="button" class="btn btn--primary">Continuar</button>
  </footer>
</div>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Diálogo | `<div role="dialog">` | `aria-modal="true"` · `aria-labelledby` (el título) · `aria-describedby` (la bajada) |
| Título | `<h2>` | `id` referenciado por `aria-labelledby` |
| Bajada | `<p>` | `id` referenciado por `aria-describedby` |
| ✕ | `<button>` | **`aria-label="Cerrar"`** — es un ícono solo |
| Íconos | `<svg>` | `aria-hidden="true"` |
| Scrim | `<div class="modal-overlay">` | `aria-hidden="true"` — es visual; el cierre por clic lo maneja el script del modal |
| Fondo | — | El resto de la página queda `inert` bajo el scrim: sin foco, sin clics, sin scroll |

> **`aria-describedby` apunta a la bajada, no al slot.** Por eso la bajada es una propiedad del componente y no un párrafo suelto dentro del contenido: es el nodo estable al que el lector de pantalla se ancla.

---

## Teclado

| Tecla | Acción |
|---|---|
| `Esc` | **Cierra el diálogo — siempre, haya ✕ o no.** |
| `Tab` | Recorre solo los elementos del diálogo (focus trap) |
| `Shift + Tab` | Recorre hacia atrás, sin salir del diálogo |
| `Enter` · `Space` | Activa el botón con foco |

Al abrir, el foco entra al diálogo (al primer elemento interactivo o al contenedor). **Al cerrar, el foco vuelve al elemento que lo abrió.**

---

## Reglas

- **El componente llega completo. Apaga lo que no uses.** El master muestra todo lo que existe.
- **Máximo 2 acciones.** Un diálogo pide una decisión, no un menú.
- **El contenido es corto.** Si necesita scroll o varios pasos, usa un Modal full-screen.
- **El scrim mantiene el contexto.** La página sigue visible, atenuada con `--surface--base--overlay` — la persona sabe dónde está y a dónde vuelve. Clic en el scrim cierra, igual que `Esc`. Un solo scrim a la vez: los overlays no se apilan.
- **El semántico va en `xs` o `sm`.** No existe en `md` ni `lg`.
- **Siempre lleva bajada o contenido.** Al menos uno de los dos.
- **La ✕ va solo si ninguna acción permite salir.** Si ya hay un "Cancelar", la ✕ lo duplica.
- **El botón nombra la acción.** "Eliminar cuenta", nunca "Aceptar" — el label es lo último que se lee antes del clic.

---

## Accesibilidad

- **WCAG 2.1.2 (Sin trampas de teclado)** — el foco queda atrapado dentro del diálogo mientras está abierto, y `Esc` siempre ofrece la salida.
- **WCAG 2.4.3 (Orden del foco)** — al abrir, el foco entra al diálogo; al cerrar, vuelve al elemento que lo disparó.
- **WCAG 1.3.1 (Información y relaciones)** — el título y la bajada se conectan al diálogo con `aria-labelledby` y `aria-describedby`.
- **WCAG 1.4.3 (Contraste)** — los cuatro títulos semánticos sobre su banda de color pasan AA en texto normal (info 11.3 · success 8.7 · error 7.8 · warning 5.7).
- **WCAG 2.5.8 (Target Size, AA)** — la ✕ es un `button/icon` de **40×40** con el glifo en 20, y los botones de acción miden 40 de alto. Los dos superan con holgura el mínimo AA de 24×24. *(No alcanzan los 44×44 de la 2.5.5, que es nivel AAA — el sistema apunta a AA.)*
- **No solo color** — cada tipo semántico lleva ícono además de color: el estado no se comunica solo con el fondo.
- El sistema **no tiene botón destructivo**. El riesgo lo comunican el `type=error`, una bajada que dice qué se pierde, y un label explícito.
