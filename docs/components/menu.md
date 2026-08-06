# Menu

> **Figma (fuente de verdad):** [❖ Menu](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003104-25695) — validación visual contra el master.

Primitiva pública de **lista flotante**: `menu/list` es el panel reusable (opciones + divisor + scroll) que se compone con **cualquier trigger** (button, icon-button, avatar, card…). La consumen **Select** y **Combobox** (rol ARIA `listbox`/`option`) y los menús de acciones (rol nativo `menu`/`menuitem`).

`menu/list` es el componente **público** y `divider` (el separador) también: se publicó suelto el 2026-08-06 porque separar grupos hace falta fuera del menú. `_menu/item` (la opción) sigue siendo un **building block interno** — no se instancia solo.

> Los patrones de uso completos de un menú de acciones (DO/DON'T, action menu, menú de usuario, agrupación destructiva) se documentan aparte.

---

## Propiedades

### menu/list (panel — público)

| Propiedad | Valores |
|---|---|
| `scroll` | none · top · mid · bottom |
| `divider` | true · false — separador antes de la(s) acción(es) terminal(es) |
| `option-1` … `option-10` | true · false — muestra u oculta cada slot de opción |

- **`scroll=none`** — hug, hasta 6 opciones, sin scrollbar. **`top · mid · bottom`** — con 7+ opciones: alto fijo **260px** (6 filas de 40 + 50% de la siguiente) con scroll interno; `top/mid/bottom` = posición del scroll.
- **`divider`** separa la última acción (hug: 1 terminal) o las dos últimas (scroll: 2 terminales) — para acciones destructivas/terminales (ej. *Eliminar*, *Cerrar sesión*).

### \_menu/item (opción — interno)

| Propiedad | Valores |
|---|---|
| `state` | default · hover · active · focus · disabled |
| `icon` | true · false — muestra u oculta el ícono |
| `label-text` | texto de la opción — requerido |

- El ícono se cambia por **swap nativo** del `option-icon` (no hay prop expuesta).
- `active` = opción seleccionada/destacada. Si una opción tiene ícono, todas deben tenerlo.

### divider (separador — público)

Línea de 1px que separa grupos. Dentro de `menu/list` la enciende la prop `divider`; también se instancia suelta en cualquier superficie.

---

## Props

```typescript
interface MenuListProps {
  scroll?: 'none' | 'top' | 'mid' | 'bottom'   // default: 'none'
  divider?: boolean                            // default: false
  items: MenuItemProps[]                       // hasta 10
  // composición: el trigger (Button/Button-icon/avatar/…) es externo
  ariaRole?: 'menu' | 'listbox'                // 'menu' para acciones; 'listbox' lo fija Select/Combobox
}

interface MenuItemProps {
  label: string                                // requerido
  value?: string                               // identificador (en rol listbox)
  icon?: boolean                               // default: false
  iconNode?: React.ReactNode                   // requerido si icon=true
  state?: 'default' | 'hover' | 'active' | 'focus' | 'disabled'
  onSelect?: () => void                        // acción (en rol menu)
}
```

---

## Tokens

### Color

**menu/list (panel)**

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `panel` | — | background | `--surface--base--default` |
| `panel` | — | border | `--border--base--secondary` (sutil a propósito — **el límite del panel lo comunica la sombra `--neo-elevation-md`, no el borde**, por eso no necesita 3:1: es una excepción consciente y registrada) |
| `panel` | — | box-shadow | `--neo-elevation-md` |
| `scrollbar-track` | — | background | `--fill--base--default` |
| `scrollbar-thumb` | — | background | `--fill--base--medium` |
| `divider` | — | background | `--border--base--secondary` |

**\_menu/item (opción)**

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `option` | default | background | `--fill--tertiary--default` |
| `option` | hover | background | `--fill--tertiary--hover` |
| `option` | active | background | `--fill--tertiary--active` |
| `option` | focus | background + anillo | `--fill--tertiary--default` + **Anillo de focus** |
| `option` | disabled | background | `--fill--base--disabled` |
| `option-label` | default · hover · active · focus | color | `--text--base--default` |
| `option-label` | disabled | color | `--text--base--disabled` |
| `option-icon` | default · hover · active · focus | fill | `--icon--base--default` |
| `option-icon` | disabled | fill | `--icon--base--disabled` |

**Anillo de focus** (`state=focus` del item — navegación por teclado)

| Capa | Propiedad CSS | CSS custom property |
|---|---|---|
| anillo | box-shadow (inset, el panel clippea) | `--focus--ring--default` |
| gap | box-shadow (inset) | `--focus--gap--default` |
| grosor | border-width | `--neo-stroke-focus-ring-width` (2px) |

### Layout

**menu/list (panel)**

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `padding-block` | — | **0** — el panel no lleva padding: las filas llegan al borde |
| `border-radius` | `--neo-radius-sm` | 8px |
| `border-width` | `--neo-stroke-xs` | 1px |
| `max-height` (scroll) | — | 260px (6 filas de 40 + 50% de la 7ª) |
| `min-width` | — (constante de layout) | 200px |
| `scrollbar` (ancho) | — | 4px |
| `scrollbar` (radius) | `--neo-radius-pill` | — |

**\_menu/item (opción)**

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `height` (fila) | — | 40px (control-height, min-height) |
| `padding-block` | `--neo-space-sm` | 8px |
| `padding-inline` | `--neo-space-lg` | 16px |
| `gap` (icon · label) | `--neo-space-md` | 12px |
| `icon` (tamaño) | `--neo-icon-size-md` | 24px |

> Los dos paddings salen de medir el master: el panel va en **0** y la fila en **8**, no 8 y 12.
> Con 12 la fila mediría 48 (12+24+12) y el panel con scroll —260px— mostraría 5,4 filas en vez
> de 6 y media.

**divider**

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `height` | `--neo-stroke-xs` | 1px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `option-label` | `body/lg-regular` | 16px | 400 | 24px |

---

## HTML

```html
<!-- menu/list como menú de acciones (rol nativo menu/menuitem) -->
<!-- El trigger es externo: cualquier Button / Button-icon -->
<button id="acciones-trigger" class="btn btn--icon-only"
        aria-haspopup="menu" aria-expanded="true" aria-controls="acciones-menu"
        aria-label="Más acciones">⋮</button>

<ul class="menu-list" id="acciones-menu" role="menu" aria-labelledby="acciones-trigger">
  <li class="menu-item" role="menuitem" tabindex="-1">
    <svg class="menu-item__icon" aria-hidden="true">…</svg>
    <span class="menu-item__label">Editar</span>
  </li>
  <li class="menu-item" role="menuitem" tabindex="-1">
    <svg class="menu-item__icon" aria-hidden="true">…</svg>
    <span class="menu-item__label">Duplicar</span>
  </li>
  <li class="menu-item" role="menuitem" tabindex="-1">
    <svg class="menu-item__icon" aria-hidden="true">…</svg>
    <span class="menu-item__label">Compartir</span>
  </li>
  <li class="menu-divider" role="separator"></li>
  <li class="menu-item" role="menuitem" tabindex="-1">
    <svg class="menu-item__icon" aria-hidden="true">…</svg>
    <span class="menu-item__label">Eliminar</span>
  </li>
</ul>

<!-- menu/list con scroll (7+ opciones) -->
<ul class="menu-list menu-list--scroll" role="menu">
  <li class="menu-item" role="menuitem" tabindex="-1"><span class="menu-item__label">Acción 1</span></li>
  <!-- … 7+ opciones → scroll interno, 260px -->
</ul>
```

> En **Select**/**Combobox** la misma `menu/list` toma `role="listbox"` y los items `role="option"` + `aria-selected` — ver `select.md` / `combobox.md`.

---

## ARIA

`menu/list` es **dual-role** según el consumidor:

| Consumidor | Panel | Item | Atributos del item |
|---|---|---|---|
| **Menú de acciones** | `role="menu"` | `role="menuitem"` | `tabindex="-1"` (foco gestionado por el menú) |
| **Select / Combobox** | `role="listbox"` | `role="option"` | `aria-selected="true\|false"` |

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Trigger (externo) | `<button>` | `aria-haspopup="menu"` · `aria-expanded` · `aria-controls="[panel-id]"` |
| Panel (menu/list) | `<ul role="menu">` | `id` · `aria-labelledby="[trigger-id]"` |
| Opción (\_menu/item) | `<li role="menuitem">` | `tabindex="-1"` |
| Opción deshabilitada | `<li role="menuitem">` | `aria-disabled="true"` |
| Separador (divider) | `<li role="separator">` | — |
| Íconos decorativos | `<svg>` | `aria-hidden="true"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Enter` · `Space` (en el trigger) | Abre el menú y mueve el foco a la primera opción |
| `↓` | Mueve el foco a la siguiente opción |
| `↑` | Mueve el foco a la opción anterior |
| `Home` | Primera opción |
| `End` | Última opción |
| `Enter` · `Space` (en una opción) | Ejecuta la acción y cierra el menú |
| Escribir (letras) | Type-ahead: mueve el foco a la primera opción que coincide |
| `Escape` | Cierra el menú y devuelve el foco al trigger |
| `Tab` | Cierra el menú y mueve el foco al siguiente elemento |

---

## Reglas

- **`menu/list` y `divider` son públicos** — `_menu/item` es interno: no se instancia solo.
- **El trigger es externo:** `menu/list` se compone con cualquier Button/Button-icon/avatar. No bundlea un trigger fijo.
- El panel **flota** (`position: absolute`) — nunca empuja el layout. **Debe renderizarse en un portal (o con `z-index` alto)** para no quedar tapado por el contenido siguiente.
- **Scroll:** hasta 6 opciones → `scroll=none` (hug). Con 7+ → `scroll` con alto fijo **260px**.
- **Divisor:** para separar la(s) acción(es) terminal(es)/destructiva(s) del resto. Hug = 1 terminal abajo; scroll = 2.
- El label de opción **trunca a 1 línea con ellipsis** — nunca hace wrap.
- Si una opción tiene ícono, todas deben tenerlo — íconos mixtos crean jerarquía falsa.
- **Rol según uso:** acciones → `menu`/`menuitem`; selección de valor → `listbox`/`option` (Select/Combobox).

---

## Accesibilidad

- **WCAG 4.1.2** — panel con `role` correcto (`menu` o `listbox`), trigger con `aria-haspopup` + `aria-expanded` + `aria-controls`.
- **WCAG 2.1.1** — teclado completo: flechas para navegar, Enter/Space para ejecutar/seleccionar, Escape para cerrar, type-ahead.
- **WCAG 2.4.3 (Focus Order)** — al abrir, el foco entra al menú; al cerrar, vuelve al trigger.
- **WCAG 2.4.7 / 2.4.11 / 2.4.13 (Focus Appearance)** — el `state=focus` del item usa anillo ring + gap con grosor `--neo-stroke-focus-ring-width`, visible sobre cualquier fondo.
- **WCAG 1.4.13** — el menú no desaparece al mover el puntero hacia él; se cierra con Escape o foco fuera.
</content>
