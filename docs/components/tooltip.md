# Tooltip

> **Figma (fuente de verdad):** [❖ Tooltip](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002339-1862) — validación visual contra el master.

Etiqueta informativa contextual. No interactivo, no crítico. No reemplaza labels visibles ni contiene acciones.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `type` | none · left · right · up · down · up-left · up-right · down-left · down-right |
| `label` | texto breve, **máximo ~80 caracteres** (≈2 líneas) |

> **En Figma los valores llevan un emoji de flecha** (`⬅️ left`, `⬆️ up`…). Es **ayuda visual del panel**, no parte del contrato: en código el valor es **`left`**, sin emoji.

`type` indica el lado donde aparece la flecha — la posición del tooltip es la opuesta:
`type=down` → flecha abajo → tooltip aparece encima del trigger.

| type | Flecha en... | Tooltip aparece... |
|---|---|---|
| `none` | — | cualquier posición |
| `left` | izquierda | a la derecha del trigger |
| `right` | derecha | a la izquierda del trigger |
| `up` | parte superior | debajo del trigger |
| `down` | parte inferior | encima del trigger |
| `up-left` · `up-right` | esquina superior | abajo en diagonal |
| `down-left` · `down-right` | esquina inferior | arriba en diagonal |

---

## Props

```typescript
interface TooltipProps {
  text: string                          // requerido — máximo ~80 caracteres (≈2 líneas)
  type?: 'none' | 'left' | 'right' | 'up' | 'down'
       | 'up-left' | 'up-right' | 'down-left' | 'down-right'  // default: 'down'
  children: React.ReactNode             // trigger — debe ser un elemento focusable
}
```

---

## Tokens

### Color

| Elemento | Propiedad CSS | CSS custom property |
|---|---|---|
| `tooltip-body` | background | `--fill--semantic--info--solid` |
| `label` | color | `--text--base--contrast` |
| `arrow` | fill | `--fill--semantic--info--solid` |

Tokens iguales en todas las variantes de `Type`. El tooltip es **info (azul)** — contenedor informativo; texto blanco sobre `--fill--semantic--info--solid` cumple WCAG AA (7.79:1).

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `padding-inline` | `--neo-space-sm` | 8px |
| `padding-block` | `--neo-space-xs` | 4px |
| `border-radius` | `--neo-radius-xs` | 4px |
| Tamaño arrow | — | 12×6px |
| Margen trigger → tooltip | `--neo-space-sm` | 8px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/md-regular` | 14px | 400 | 20px |

---

## HTML

```html
<!-- Trigger con texto visible -->
<button type="button" aria-describedby="tooltip-1">
  Ver información
</button>
<span role="tooltip" id="tooltip-1" hidden>Texto explicativo breve</span>

<!-- button/icon sin texto visible -->
<button type="button" aria-label="Información del producto" aria-describedby="tooltip-2">
  <svg aria-hidden="true">…</svg>
</button>
<span role="tooltip" id="tooltip-2" hidden>Texto explicativo breve</span>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Tooltip | `<span role="tooltip">` | `id="[tooltip-id]"` · `hidden` cuando no está visible |
| Trigger con texto | elemento focusable | `aria-describedby="[tooltip-id]"` |
| Trigger sin texto | `<button>` | `aria-label="[acción]"` · `aria-describedby="[tooltip-id]"` |

---

## Teclado

Este componente no recibe foco — el foco es del trigger. El tooltip aparece al recibir foco el trigger.

| Dispositivo | Aparece | Se cierra |
|---|---|---|
| Desktop | hover · focus del trigger | `Escape` · al salir del trigger **y** del propio tooltip |
| Mobile | press del trigger | `Escape` · al interactuar fuera |

> **WCAG 1.4.13 pide las tres.** *Dismissible*: `Escape` lo cierra sin mover el foco. *Hoverable*: si
> el cursor pasa del trigger al tooltip, sigue visible — por eso el cierre mira los dos, no solo el
> trigger. *Persistent*: no se cierra solo por tiempo.

---

## Reglas

- **Texto máximo ~80 caracteres**, que caben en **1–2 líneas**. El tope se hace cumplir con
  `max-width: 40ch` (≈312px), NO con 80ch: una línea de 80 caracteres mide ~624px y queda fuera del
  rango legible (el óptimo tipográfico es 45–75 por línea). Con 40ch, 80 caracteres envuelven en dos
  líneas cómodas. Si el texto no cabe en dos líneas, el caso no es un tooltip — es helper text.
- No dejar el placeholder `"My Tooltip"` en producción.
- Usar `Type=none` cuando el posicionamiento lo controla el layout.
- El `Type` elegido debe coincidir con la posición real del tooltip en la interfaz.

---

## Accesibilidad

- El tooltip aparece al recibir `focus` el trigger — no solo en hover.
- **WCAG 1.4.13** — el tooltip permanece visible si el usuario mueve el cursor desde el trigger hacia el tooltip.
- No reemplaza `aria-label` — el trigger debe tener su propio label accesible.
- Texto breve — lectores de pantalla leen el contenido completo al recibir foco.
