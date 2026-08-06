# Badge

> **Figma (fuente de verdad):** [❖ Badge](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002369-4082) — validación visual contra el master.

Comunica estado del sistema o conteo de actividad de forma compacta. No es interactivo.

`badge/indicator` → actividad o cantidad · `badge/state` → estado semántico del sistema · `notification` → composición badge sobre button/icon.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `type` (badge) | dot · number |
| `type` (badge/state) | neutral · info · success · warning · error |
| `label` (badge/state) | el texto del badge |

---

## Props

```typescript
interface BadgeStateProps {
  type: 'error' | 'warning' | 'success' | 'info' | 'neutral'
  label: string   // máximo 1–2 palabras
}

interface BadgeIndicatorProps {
  type: 'dot' | 'number'
  count?: number  // requerido si type='number'; mostrar '99+' si count > 99
  ariaLabel: string  // requerido — describe el estado al lector de pantalla
}
```

---

## Tokens

### Color

| Elemento | Propiedad CSS | CSS custom property |
|---|---|---|
| `badge` (indicator · number · dot) | background | `--fill--semantic--error--solid` |
| `badge` texto | color | `--text--base--contrast` |
| `badge/state` error | background | `--fill--semantic--error--soft` |
| `badge/state` error | border | `--border--semantic--error-soft` |
| `badge/state` error · label | color | `--text--semantic--error` |
| `badge/state` warning | background | `--fill--semantic--warning--soft` |
| `badge/state` warning | border | `--border--semantic--warning` |
| `badge/state` warning · label | color | `--text--semantic--warning` |
| `badge/state` success | background | `--fill--semantic--success--soft` |
| `badge/state` success | border | `--border--semantic--success` |
| `badge/state` success · label | color | `--text--semantic--success` |
| `badge/state` info | background | `--fill--semantic--info--soft` |
| `badge/state` info | border | `--border--semantic--info` |
| `badge/state` info · label | color | `--text--semantic--info` |
| `badge/state` neutral | background | `--fill--base--light` |
| `badge/state` neutral | border | `--border--base--default` |
| `badge/state` neutral · label | color | `--text--base--default` |

### Layout

| Propiedad | Elemento | CSS custom property | Valor |
|---|---|---|---|
| `border-radius` | badge/state · indicator number | `--neo-radius-pill` | 999px |
| `padding-inline` | badge/state | `--neo-space-md` | 12px |
| `padding-block` | badge/state · indicator number | `--neo-space-xs` | 4px |
| `border-width` | badge/state | `--neo-stroke-xs` | 1px |
| Tamaño indicator dot | — | — | 8×8px |
| Tamaño indicator number | — | — | 20×20px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `badge/state` label | `body/md-medium` | 14px | 500 | 20px |
| `indicator` number | `caption/sm-medium` | 12px | 500 | 16px |

---

## HTML

```html
<!-- badge/state -->
<span class="badge badge--error">Rechazada</span>
<span class="badge badge--success">Aprobada</span>

<!-- badge indicator dot -->
<span class="badge badge--dot" aria-label="Nuevo contenido disponible"></span>

<!-- badge indicator number -->
<span class="badge badge--number" aria-label="3 notificaciones pendientes">3</span>

<!-- notification: badge sobre button/icon -->
<div class="notification">
  <button type="button" aria-label="Ver notificaciones (3 pendientes)">
    <svg aria-hidden="true">…</svg>
  </button>
  <span class="badge badge--number" aria-hidden="true">3</span>
</div>
```

---

## ARIA

| Elemento | Tag | Atributos requeridos |
|---|---|---|
| `badge/state` | `<span>` | texto visible como contenido |
| `badge` indicator dot | `<span role="status">` | `aria-label="[descripción del estado]"` |
| `badge` indicator number | `<span role="status">` | `aria-label="[n] [contexto]"` ej: `"3 notificaciones pendientes"` |
| Badge en notification | `<span>` | `aria-hidden="true"` — el button/icon ya tiene su `aria-label` |

> **El `role` no es opcional en los indicadores.** Un `<span>` sin rol es `role=generic`, y la
> especificación ARIA **prohíbe nombrar un elemento genérico**: el `aria-label` no se expone y el
> indicador queda mudo. Con `role="status"` el nombre se anuncia y, además, el cambio de conteo se
> comunica solo. Alternativa equivalente: texto oculto visualmente dentro del span.

---

## Teclado

Este componente no es interactivo — no recibe foco.

---

## Reglas

- No usar el color semántico para otro propósito — cada variant comunica un significado fijo.
- `badge/state` máximo 1–2 palabras. `badge/indicator number` máximo "99+".
- No reemplazar botones con badge — el badge no ejecuta acciones.
- No usar badge para selección o filtros → usar `chip`.

---

## Accesibilidad

- No depender solo del color para comunicar el estado — siempre incluir texto en `badge/state`.
- `badge/indicator dot` debe tener `aria-label` si es la única señal de actividad.
- El badge no recibe foco ni requiere role de acción.
