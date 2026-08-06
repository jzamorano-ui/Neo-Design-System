# Modal Full-screen

> **Figma (fuente de verdad):** [❖ Modal-Full](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003720-5194) — validación visual contra el master.

Ocupa toda la pantalla para información densa o una tarea larga, sin perder el punto de origen: al cerrar (✕) la persona vuelve a donde estaba. Sirve tanto para un flujo con pasos como para una vista única sin pasos — un formulario completo, un detalle extenso, una tabla grande.

Si el contenido es corto y pide una decisión, el caso no es un full-screen — es un [Modal Dialog](modal-dialog.md).

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `device` | desktop · mobile — la versión por dispositivo. En código no es prop: lo resuelve el viewport. |
| `scroll` | none · top · mid · bottom — el estado del scroll interno. En código no es prop: lo dibuja el DOM al hacer scroll. |
| `title` (+ `text`) | El título. Siempre visible — es el ancla de la vista. |
| `back` | La ← (`system/nav-izquierda`). Llega apagada — se enciende solo dentro de un flujo con pasos. |
| `slot` | El contenido intercambiable: un formulario, una tabla, un detalle. |
| `cta` (+ `primary`, `secondary`) | Las acciones, fijas abajo. Máximo dos. |

**Las líneas divisoras indican dónde hay contenido oculto** (mobile): `none` = sin scroll, sin líneas · `top` = línea abajo · `mid` = ambas · `bottom` = línea arriba. En web los separadores son estructurales y el estado del scroll lo indica el scrollbar.

---

## Props

```typescript
interface ModalFullScreenProps {
  open: boolean
  onClose: () => void
  title: string
  showBack?: boolean            // default: false — la ←; solo dentro de un flujo
  onBack?: () => void           // requerido si showBack: retrocede un paso, no cierra
  children: React.ReactNode     // el contenido
  primaryAction?: ModalAction
  secondaryAction?: ModalAction
}

interface ModalAction {
  label: string                 // nombra la acción: "Enviar solicitud", no "Aceptar"
  onClick: () => void
}
```

Se implementa sobre el **`Dialog` de MUI con `fullScreen`**. El alto es el viewport (`100dvh`); el scroll vive **solo en el contenido** — header y cta quedan fijos. `device` y `scroll` no llegan a la API: la versión la decide el viewport (media query) y el estado de las líneas lo maneja el propio scroll del contenido.

---

## Tokens

### Color

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| contenedor · `header` · `cta` | — | background | `--surface--base--default` |
| `title` | — | color | `--text--base--default` |
| separadores (líneas) | — | background | `--border--base--secondary` |
| ✕ · ← (glifo) | — | color | `--icon--base--default` |
| botón primario | default | background | `--fill--primary--default` |
| botón secundario | default | background | `--fill--secondary--default` |
| botón terciario | default | background | `--fill--tertiary--default` |
| label del botón primario | — | color | `--text--base--contrast` |
| scrollbar — riel (web) | — | background | `--fill--base--default` |
| scrollbar — pulgar (web) | — | background | `--fill--base--medium` |

> Los botones son el componente `button` — sus estados completos viven en [button.md](button.md).

### Layout

| Propiedad | web | mobile |
|---|---|---|
| alto del `header` | 104px | 60px |
| padding del `header` | `--neo-space-xl` 24px · `--neo-space-3xl` 48px | `--neo-space-sm` 8px |
| alto del `cta` | 88px | 128px (2 acciones apiladas) |
| padding del `cta` | `--neo-space-xl` 24px · `--neo-space-3xl` 48px | `--neo-space-md` 12px · `--neo-space-lg` 16px · `--neo-space-xl` 24px |
| gutter del contenido | `--neo-space-3xl` 48px | `--neo-space-lg` 16px |
| gap entre acciones | `--neo-space-md` 12px | `--neo-space-md` 12px |
| ✕ y ← (`button/icon`) | **48×48px** — `size=large` | **40×40px** — `size=medium` |
| glifo de ✕ y ← | **24×24px** | 20×20px |

El **← es opcional y viene oculto** en el master, en las dos anchuras: la ✕ es el único control que
aparece por defecto. Los íconos son `system/cerrar` y `system/nav-izquierda`.

> Todos los espaciados están en la escala `space/*` del DS — sin constantes fuera de escala.

**Medidas** — el componente cubre el viewport completo; estos son los rangos que el diseño contempla:

| device | alto (diseño) | rango de alto | ancho |
|---|---|---|---|
| web | 720px | mín 720px – máx 1080px | fluido (diseño a 1440px) |
| mobile | 688px | mín 688px – máx 812px | 375px (diseño) |

> En el navegador el alto real es el viewport (`100dvh`) — el rango lo respeta el diseñador en Figma; la pantalla siempre gana.

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `title` (web) | `title/md-bold` | 20px | 700 | 28px |
| `title` (mobile) | `body/lg-bold` | 16px | 700 | 24px |
| label de botones | `body/lg-medium` | 16px | 500 | 24px |

> El título cambia de estilo por dispositivo: `title/md-bold` en web, compacto en mobile. Es lo que Figma dibuja — el CSS lo aplica con las variantes de tipografía del theme.

---

## HTML

```html
<div role="dialog"
     aria-modal="true"
     aria-labelledby="modal-full-title"
     class="modal-full">

  <header class="modal-full__header">
    <button type="button" class="modal-full__back" aria-label="Volver">
      <svg aria-hidden="true">…</svg>
    </button>
    <h2 id="modal-full-title" class="modal-full__title">Confirma tus datos</h2>
    <button type="button" class="modal-full__close" aria-label="Cerrar">
      <svg aria-hidden="true">…</svg>
    </button>
  </header>

  <div class="modal-full__content">
    <!-- el slot: formulario, tabla, detalle… -->
  </div>

  <footer class="modal-full__actions">
    <button type="button" class="btn btn--secondary">Cancelar</button>
    <button type="button" class="btn btn--primary">Enviar solicitud</button>
  </footer>
</div>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Modal | `<div role="dialog">` | `aria-modal="true"` · `aria-labelledby` (el título) |
| Título | `<h2>` | `id` referenciado por `aria-labelledby` |
| ✕ | `<button>` | **`aria-label="Cerrar"`** — es un ícono solo |
| ← | `<button>` | **`aria-label="Volver"`** — es un ícono solo |
| Íconos | `<svg>` | `aria-hidden="true"` |
| Líneas divisoras | — | Decorativas (CSS) — el estado del scroll no depende de ellas para tecnología asistiva |
| Fondo | — | El resto de la página queda `inert` mientras el modal está abierto |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Esc` | **Cierra el modal — siempre.** Nunca retrocede: retroceder es de la ← |
| `Tab` | Recorre solo los elementos del modal (focus trap) |
| `Shift + Tab` | Recorre hacia atrás, sin salir del modal |
| `Enter` · `Space` | Activa el botón con foco |

Al abrir, el foco entra al modal. **Al cerrar (✕ o Esc), el foco vuelve al elemento que lo abrió** — ese es el contrato de "no perder el punto de origen". Al retroceder con ←, el foco va al inicio del paso anterior, dentro del modal.

---

## Reglas

- **El componente llega completo. Apaga lo que no uses.** El master muestra todo lo que existe.
- **Siempre lleva título.** Es el ancla de la vista y del lector de pantalla.
- **Máximo 2 acciones, fijas abajo.** La primaria a la derecha en web; arriba en mobile.
- **La ← va solo dentro de un flujo con pasos.** Si la vista es única, la única salida es la ✕.
- **Las líneas marcan dónde hay contenido oculto.** Dependiendo del contenido y su extensión se puede generar scroll interno — en web lo indica el scrollbar y en mobile las líneas del borde. No son decoración fija.
- **No lleva scrim (overlay).** Cubre todo el viewport, así que no hay fondo que atenuar — aquí el contexto no se mantiene viéndolo, sino con la vuelta garantizada: ✕ y `Esc` regresan al punto de origen. El scrim `--surface--base--overlay` es de los overlays parciales (Dialog · Drawer · Sheet).
- **Si el contenido es corto y pide una decisión, usa un Modal Dialog.** El full-screen es para información densa o tareas largas.

---

## Accesibilidad

- **WCAG 2.1.2 (Sin trampas de teclado)** — el foco queda atrapado dentro del modal mientras está abierto, y `Esc` siempre ofrece la salida.
- **WCAG 2.4.3 (Orden del foco)** — al abrir, el foco entra al modal; al cerrar, vuelve al elemento que lo disparó; al retroceder con ←, va al paso anterior.
- **WCAG 1.3.1 (Información y relaciones)** — el título se conecta al modal con `aria-labelledby`.
- **WCAG 2.5.8 (Tamaño del target, AA)** — ✕ y ← miden 48×48px en web y 40×40px en mobile; los
  botones del cta, 40px de alto. Todos por encima del mínimo de 24×24.
- **WCAG 1.4.10 (Reflow)** — el scroll vive en el contenido; header y cta no se pierden al hacer zoom.
- **No solo color ni solo decoración** — las líneas y el scrollbar son refuerzo visual del scroll: todo el contenido sigue alcanzable por teclado y lector de pantalla sin depender de ellos.
