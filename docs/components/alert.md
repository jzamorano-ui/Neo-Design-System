# Alert

> **Figma (fuente de verdad):** [❖ Alert](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=881-18695) — validación visual contra el master.

Comunica mensajes del sistema que el usuario necesita leer. No usar para decoración ni estados de navegación.

---

## Propiedades

| Propiedad | Tipo | Valores |
|---|---|---|
| `type` | Variant | info · success · warning · error |
| `title` | Boolean | true · false |
| `title-text` | Text | el texto del título |
| `description` | Text | el cuerpo del mensaje |
| `close` | Boolean | true · false |
| `link` | Boolean | true · false |

`link=true` requiere `title=true`. `close=true` y `link=true` pueden coexistir.

---

## Props

```typescript
interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error'  // default: 'info' — 1:1 con MUI Alert severity
  title?: boolean       // default: true
  titleText?: string    // requerido si title=true
  description: string   // requerido
  close?: boolean       // default: true
  link?: boolean        // default: false
  linkText?: string     // requerido si link=true
  linkHref?: string     // requerido si link=true
  onClose?: () => void
}
```

---

## Tokens

### Color

| Elemento | Variant | Propiedad CSS | CSS custom property |
|---|---|---|---|
| Componente | info | background | `--fill--semantic--info--soft` |
| Componente | info | border | `--border--semantic--info` |
| Componente | success | background | `--fill--semantic--success--soft` |
| Componente | success | border | `--border--semantic--success` |
| Componente | warning | background | `--fill--semantic--warning--soft` |
| Componente | warning | border | `--border--semantic--warning` |
| Componente | error | background | `--fill--semantic--error--soft` |
| Componente | error | border | `--border--semantic--error-soft` |
| `título` | info | color | `--text--semantic--info` |
| `título` | success | color | `--text--semantic--success` |
| `título` | warning | color | `--text--semantic--warning` |
| `título` | error | color | `--text--semantic--error` |
| `link` | todos | color | hereda `--text--base--default` (sin token propio) |
| `descripción` | todos | color | `--text--base--default` |
| `ícono semántico` | info | fill | `--icon--semantic--info` |
| `ícono semántico` | success | fill | `--icon--semantic--success` |
| `ícono semántico` | warning | fill | `--icon--semantic--warning` |
| `ícono semántico` | error | fill | `--icon--semantic--error` |
| `botón cierre` | — | icon fill | `--icon--base--default` |

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `padding-inline` | `--neo-space-lg` | 16px |
| `padding-block` | `--neo-space-md` | 12px |
| `gap` (icon · content · button) | `--neo-space-sm` | 8px |
| `gap` interno (title ↔ desc) | `--neo-space-xs` | 4px |
| `padding-block` del bloque de texto | `--neo-space-xs` | 4px |
| `gap` bloque de texto ↔ link | `--neo-space-xs` | 4px |
| `border-radius` | `--neo-radius-sm` | 8px |
| `border-width` | `--neo-stroke-xs` | 1px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `título` | `title/xs-bold` | 14px | 700 | 20px |
| `descripción` | `body/md-regular` | 14px | 400 | 20px |
| `link` | `body/md-medium` | 14px | 500 | 20px |

---

## HTML

```html
<!-- Alert info con título, link y cierre -->
<!-- Estructura: icon · content[ text(title+desc) · link ] · close -->
<div role="status" aria-live="polite" class="alert alert--info">
  <span class="alert__icon" aria-hidden="true"><!-- icon/semantic/info --></span>
  <div class="alert__body">
    <div class="alert__description">
      <p class="alert__title">Título informativo</p>
      <p class="alert__description">Descripción del mensaje.</p>
    </div>
    <a class="alert__link" href="…">Ver detalle</a>
  </div>
  <button type="button" aria-label="Cerrar alerta" class="btn btn--icon-only btn--tertiary btn--sm">
    <svg aria-hidden="true">…</svg>
  </button>
</div>

<!-- Alert error sin cierre — el error debe resolverse antes de continuar -->
<div role="alert" aria-live="assertive" class="alert alert--error">
  <span class="alert__icon" aria-hidden="true"><!-- icon/semantic/error --></span>
  <div class="alert__body">
    <p class="alert__title">Error de validación</p>
    <p class="alert__description">Descripción del error.</p>
  </div>
</div>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Alert urgente (error · warning) | `<div role="alert">` | `aria-live="assertive"` |
| Alert no urgente (info · success) | `<div role="status">` | `aria-live="polite"` |
| Botón de cierre | `<button type="button">` | `aria-label="Cerrar alerta"` |
| Ícono semántico | `<svg>` o wrapper | `aria-hidden="true"` |
| Link embebido | `<a>` | texto descriptivo — prohibido "ver más" · "clic aquí" |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Foco al link (`link=true`) y/o al botón de cierre (`close=true`) en orden DOM |
| `Enter` · `Space` | Activa el elemento con foco |
| `Shift + Tab` | Retrocede al elemento anterior |

El contenedor del alert no recibe foco — solo sus elementos internos accionables.

---

## Reglas

- Un solo alert por contexto — consolidar mensajes si hay varios.
- La descripción no debe superar 3 líneas de texto — mensaje claro y puntual.
- `error` con `close=false` indica que el error debe resolverse antes de continuar.
- No usar `error` para advertencias → `warning`. No usar `info` para confirmaciones → `success`.
- `link=true` debe ser único y secundario al mensaje — no reemplaza el contenido principal.
- Ubicar el alert cerca del contenido afectado, no como elemento flotante global.
- El alert ocupa el 100% del ancho del contenedor padre.
- No ocultar con `display: none` al cerrar — usar `aria-hidden` o remover del DOM.

---

## Accesibilidad

- **WCAG 1.4.3** — tokens `text/semantic/*` sobre `fill/semantic/*/soft` cumplen 4.5:1 AA mínimo en todos los variants.
- **WCAG 1.4.11** — iconos semánticos sobre fondos soft cumplen 3:1 mínimo.
- **WCAG 2.5.8 (AA)** — touch target 24px: el `link` es **inline** (dentro del bloque de texto) → **exento** del mínimo. Si se requiere área clickeable de 24px, lograrla con `padding: 6px` + `margin: -6px` (el área crece **sin empujar el layout**) — nunca padding visual que agrande la caja. El botón de cierre es un `button/icon` Small de 32px (cumple de sobra).
- `role="alert"` dispara `aria-live="assertive"` — usar solo cuando la atención es inmediata. Para `info` y `success` usar `role="status"`.
