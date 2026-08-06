# Button

> **Figma (fuente de verdad):** [❖ Button](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=557-1953) — validación visual contra el master.

Ejecuta acciones. Para navegar usar `link`; para opciones on/off usar `toggle`.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `type` | system · brand |
| `variant` | primary · secondary · tertiary |
| `surface` | default · inverse |
| `size` | large · medium · small · _(brand: solo large)_ |
| `state` | default · hover · active · focus · disabled · loading |
| `label` | el texto del botón — nombra la acción |
| `icon-left` | true · false |
| `icon-right` | true · false |

**Combos válidos:** System/Primary/Default · System/Primary/Inverse · System/Secondary/Default · System/Secondary/Inverse · System/Tertiary/Default · System/Tertiary/Inverse · Brand/Primary/Default (solo surface=Default) · Disabled (todos) · Loading (System — solo `button`) · Focus (todos).

> **button/icon** soporta todos los combos anteriores excepto `Loading` — incluyendo `Brand`. `Brand` es exclusivamente talla `Large` en ambos componentes.

---

## Props

```typescript
interface ButtonProps {
  type?: 'System' | 'Brand'                                  // default: 'System'
  variant?: 'Primary' | 'Secondary' | 'Tertiary'             // default: 'Primary'
  surface?: 'Default' | 'Inverse'                            // default: 'Default'
  size?: 'Large' | 'Medium' | 'Small'                       // default: 'Medium' — Brand: solo 'Large'
  label?: string                                             // requerido en button; omitir en button/icon
  icon?: React.ReactNode                                     // opcional en button; requerido en button/icon
  iconPosition?: 'left' | 'right'                           // default: 'left'
  disabled?: boolean                                         // default: false
  loading?: boolean                                          // default: false
  ariaLabel?: string                                         // requerido si no hay label visible (button/icon)
  onClick?: () => void
}
```

---

## Tokens

### Color

| Combo | `background` | `color` (label) | `icon` | `focus-ring` |
|---|---|---|---|---|
| Primary Default | `--fill--primary--*` | `--text--base--contrast` | `--icon--base--contrast` | `--focus--ring--default` |
| Primary Inverse | `--fill--primary--inverse--*` | `--text--base--default` | `--icon--base--default` | `--focus--ring--inverse` |
| Secondary Default | `--fill--secondary--*` | `--text--base--default` | `--icon--base--default` | `--focus--ring--default` |
| Secondary Inverse | `--fill--secondary--inverse--*` | `--text--base--contrast` | `--icon--base--contrast` | `--focus--ring--inverse` |
| Tertiary Default | `--fill--tertiary--*` | `--text--base--default` | `--icon--base--default` | `--focus--ring--default` |
| Tertiary Inverse | `--fill--tertiary--inverse--*` | `--text--base--contrast` | `--icon--base--contrast` | `--focus--ring--inverse` |
| Brand Primary | `--fill--brand--primary--*` | `--text--base--contrast` | `--icon--base--contrast` | `--focus--ring--default` |
| Brand Secondary | `--fill--brand--secondary--*` | `--fill--brand--primary--active` | `--icon--base--default` | `--focus--ring--default` |
| Brand Tertiary | `--fill--brand--tertiary--*` | `--fill--brand--primary--active` | `--icon--base--default` | `--focus--ring--default` |
| **Disabled (todos)** | `--fill--base--disabled` | `--text--base--disabled` | `--icon--base--disabled` | — |

`*` = sufijo por estado interactivo: `-default` · `-hover` · `-active`

**Ícono**: el color del glifo se bindea directo a `--icon--base--*` según el fondo del botón — `contrast` (blanco) sobre fondos oscuros/color, `default` (oscuro) sobre fondos claros, `disabled` en disabled. Sin indirección de modos (eliminada).

**Focus ring** (Figma): 2 capas de stroke — `focus/ring/*` en la capa exterior, `focus/gap/*` en la capa interior. Secondary añade una tercera capa con el border de botón preservado.

```css
/* Default surface */
outline: var(--neo-stroke-focus-ring-width) solid var(--focus--ring--default);
outline-offset: 2px;
box-shadow: 0 0 0 2px var(--focus--gap--default);

/* Inverse surface */
outline: var(--neo-stroke-focus-ring-width) solid var(--focus--ring--inverse);
outline-offset: 2px;
box-shadow: 0 0 0 2px var(--focus--gap--inverse);
```

**Además:** el `Secondary` sobre `surface=Inverse` usa `--border--base--contrast` como borde, y el label del **Brand Secondary/Tertiary** usa `--fill--brand--primary--active`.

### Layout

| Propiedad | Size | CSS custom property | Valor |
|---|---|---|---|
| altura del componente | Large | — | 48px |
| altura del componente | Medium | — | 40px |
| altura del componente | Small | — | 32px |
| `padding-inline` | Large | `--neo-space-xl` | 24px |
| `padding-inline` | Medium | `--neo-space-lg` | 16px |
| `padding-inline` | Small | `--neo-space-md` | 12px |
| `gap` (icon · label) | todos | `--neo-space-sm` | 8px |
| `border-radius` | todos | `--neo-radius-pill` | 999px |
| `border-width` (Secondary/Inverse) | todos | `--neo-stroke-xs` | 1px |
| `focus-ring-width` | todos | `--neo-stroke-focus-ring-width` | 2px |

### Tipografía

| Size | Tipo | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| Large | System | `title/sm-medium` | 18px | 500 | 26px |
| Large | **Brand** | `title/md-bold` | **20px** | **700** | **28px** |
| Medium | System | `body/lg-medium` | 16px | 500 | 24px |
| Small | System | `body/md-medium` | 14px | 500 | 20px |

---

## HTML

```html
<!-- button -->
<button type="button">Guardar</button>

<!-- button/icon — aria-label obligatorio -->
<button type="button" aria-label="Cerrar">
  <svg aria-hidden="true">…</svg>
</button>

<!-- Estado loading -->
<button type="button" disabled aria-busy="true" aria-label="Guardando…">
  <span class="spinner" aria-hidden="true"></span>
</button>

<!-- Estado disabled -->
<button type="button" disabled aria-disabled="true">Guardar</button>
```

---

## ARIA

| Elemento | Tag | Atributos requeridos |
|---|---|---|
| button con label | `<button type="button">` | — |
| button/icon | `<button type="button">` | `aria-label="[acción]"` |
| Disabled | `<button>` | `disabled` · `aria-disabled="true"` |
| Loading | `<button>` | `disabled` · `aria-busy="true"` · `aria-label="[acción en curso]"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Mueve el foco al botón |
| `Enter` · `Space` | Ejecuta la acción |

---

## Reglas

- Un solo `Primary` por vista — múltiples anulan la jerarquía.
- `surface=Inverse` aplica a `Primary`, `Secondary` y `Tertiary` — usar cuando el botón se sitúa sobre fondo oscuro o de color. `Brand` no tiene surface=Inverse.
- Acciones irreversibles (eliminar, cancelar proceso en curso) → usar `Primary` en modal de confirmación — el contexto hace el trabajo de señalar el peligro.
- `Loading` solo en `button` — `button/icon` no soporta loading.
- `button/icon` sin `aria-label` es un error, no un warning.

### Brand — uso restringido

El botón `Brand` es una variante expresiva de alto impacto visual. **No es un botón funcional general.**

| | |
|---|---|
| ✔ Usar en | Hero · Landings · Campañas |
| ✗ No usar en | Formularios · Pagos · Contratación · Acciones críticas · Navegación |
| Tamaño | Solo `Large` — no configurable en `sm`/`md` · no admite `surface=Inverse` |
| Tipografía mínima | 20px Bold (`title/md-bold`) — requerido para cumplir WCAG AA |
| Jerarquía | No reemplaza a `Primary` — si es una acción funcional → usar `Primary` |

---

## Accesibilidad

- **WCAG 2.5.8 (AA)** — touch target de 24×24px mínimo. Todas las tallas lo superan por el tamaño de su propia caja (la menor, `Small`, mide 32px).
- Focus visible siempre — no suprimir en ningún contexto.
- Contraste mínimo 3:1 texto sobre fondo del botón.
- **WCAG 2.5.3** — el `aria-label` de `button/icon` debe describir la acción, no el ícono.
- **Brand** — el fondo `--fill--brand--primary--default` pasa WCAG AA para texto grande: contraste 3.09:1 sobre el 3:1 requerido. Condición obligatoria: mínimo 14pt bold (19px) · mínimo 18pt regular (24px). No reducir el tamaño ni el peso del label — por debajo de ese umbral el contraste es insuficiente.
