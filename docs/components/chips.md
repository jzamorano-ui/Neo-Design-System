# Chips

> **Figma (fuente de verdad):** [❖ Chips](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002386-4344) — validación visual contra el master.

Filtro o selección interactiva compacta dentro de la misma vista. Para navegar entre secciones usar `tabs`; para estados del sistema usar `badge`.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `state` | default · hover · selected · focus · disabled |
| `icon-left` | true · false — ícono referencial |
| `icon-right` | true · false — la **✕** en los chips removibles |
| `label` | 1–2 palabras, ~20 caracteres |

> **Eje único `state`** — el estado define el look: `default` / `hover` / `focus` se ven **outline** (disponible); `selected` se ve **filled** (seleccionado); `disabled` = muteado, no interactivo. En el DOM el estado seleccionado se marca con el atributo **`data-selected="true"`** (válido, no se filtra; una prop `selected` cruda sí se filtraba al `<div>`) + `disabled: boolean` (MUI: `<Chip disabled>`). No hay un eje `type` independiente.

---

## Props

```typescript
interface ChipProps {
  label: string
  selected?: boolean           // default: false — true = filled, false = outline. En el DOM → atributo `data-selected="true"` (no prop cruda: se filtraba al <div>)
  disabled?: boolean           // default: false — no interactivo, muteado
  leadingIcon?: React.ReactNode
  onRemove?: () => void        // si se provee, muestra trailing-action (remove)
  onClick?: () => void
}

interface ChipGroupProps {
  mode: 'multi' | 'single'    // multi = aria-pressed, single = aria-selected
  chips: Array<ChipProps & { id: string }>
  ariaLabel: string            // requerido para el grupo
  onChange?: (selectedIds: string[]) => void
}
```

---

## Tokens

### Color

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `chip` | default | background | `--fill--base--default` |
| `chip` | default | border | `--border--base--default` |
| `chip` | hover | background | `--fill--primary--hover` |
| `chip` | hover | border | — (iguala al relleno) |
| `chip` | selected | background | `--fill--primary--active` |
| `chip` | selected | border | — (iguala al relleno) |
| `chip` | focus | background | `--fill--base--default` (chip disponible + anillo) |
| `chip` | focus | border | `--border--base--default` |
| `chip` | disabled | background | `--fill--base--disabled` |
| `chip` | disabled | border | `--border--base--disabled` |
| `label` | default · focus | color | `--text--base--default` |
| `label` | **hover · selected** | color | `--text--base--contrast` |
| `label` | disabled | color | `--text--base--disabled` |
| `icon` | default · focus | fill | `--icon--base--default` |
| `icon` | **hover · selected** | fill | `--icon--base--contrast` |
| `icon` | disabled | fill | `--icon--base--disabled` |

> **Hover y selected van en la rampa `primary` (oscuro) desde el 2026-08-03.** Antes usaban
> `secondary`: el seleccionado daba **2.18:1** contra el chip disponible —la excepción E3 que el owner
> tenía aceptada— y el hover **1.63:1**. Con `primary` dan **16.64:1** y **8.93:1**. El borde iguala al
> relleno en los dos estados porque el master no les pone stroke: lo que distingue al chip activo es
> el relleno, no el contorno.
| focus ring | focus | box-shadow (externo) | `--focus--ring--default` |
| focus gap | focus | box-shadow (relleno, entre chip y ring) | `--focus--gap--default` |

> **Foco** — mismo patrón que Button/inputs: `gap` (rellena, adyacente al chip) + `ring` (externo), ambos por fuera → el chip crece 4px, sin separación entre gap y ring. Se muestra sobre el chip **disponible** (outline), porque el teclado recorre sobre todo chips sin seleccionar.

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `border-radius` | `--neo-radius-pill` | 999px |
| `padding-inline` | `--neo-space-md` | 12px |
| `padding-block` | `--neo-space-sm` | 8px |
| `gap` (icon · label · trailing) | `--neo-space-xs` | 4px |
| `border-width` (outline) | `--neo-stroke-xs` | 1px |
| `focus-ring-width` | `--neo-stroke-focus-ring-width` | 2px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `Label chip` | `body/md-medium` | 14px | 500 | 20px |

---

## HTML

```html
<!-- multi-select: cada chip es un toggle independiente -->
<button type="button" aria-pressed="true" class="chip chip--selected">Dental</button>
<button type="button" aria-pressed="false" class="chip">Farmacia</button>

<!-- single-select: un chip activo a la vez -->
<div role="listbox" aria-label="Categoría de producto">
  <div role="option" aria-selected="true" tabindex="0" class="chip chip--selected">Dental</div>
  <div role="option" aria-selected="false" tabindex="-1" class="chip">Farmacia</div>
</div>

<!-- chip removible — usar div+tabindex para evitar button anidado (HTML inválido) -->
<div class="chip chip--selected chip" role="option" aria-selected="true" tabindex="0">
  <span>Dental</span>
  <button type="button" aria-label="Eliminar Dental">
    <svg aria-hidden="true">…</svg>
  </button>
</div>
```

---

## ARIA

| Contexto | Elemento | Tag · Role | Atributos requeridos |
|---|---|---|---|
| Multi-select | Chip | `<button>` | `aria-pressed="true/false"` |
| Single-select | Chip | `<div role="option">` | `aria-selected="true/false"` · `tabindex` |
| Single-select | Grupo (`chips/group` en Figma) | `<div role="listbox">` | `aria-label="[nombre del grupo]"` |
| Trailing action | Botón remove | `<button>` | `aria-label="Eliminar [label]"` |
| Iconos | `<svg>` | — | `aria-hidden="true"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Foco al grupo (a la opción seleccionada, o a la primera) |
| `Shift + Tab` | Foco al elemento anterior |
| `←` `→` | **Single-select (`role="listbox"`)**: mueve entre opciones |
| `Home` · `End` | **Single-select**: primera · última opción |
| `Enter` · `Space` | Activa o desactiva el chip |
| `Delete` · `Backspace` | Elimina el chip (si tiene trailing-action) |

> **En single-select el grupo es UN solo tab stop.** Al declarar `role="listbox"` + `role="option"`,
> APG pide *roving tabindex*: la opción activa lleva `tabindex="0"` y las demás `-1`, y el
> desplazamiento va por flechas. Sin eso cada chip sería un tab stop, que es exactamente lo que el
> patrón evita. En multi-select (`aria-pressed`) cada chip **sí** es un tab stop y las flechas no
> aplican.

---

## Reglas

- `state=selected` = chip activo (se ve filled). `state=default` / `hover` = chip disponible (se ve outline). El visual lo **deriva** `selected`, no es un eje aparte.
- Multi-select y single-select no se mezclan en el mismo grupo.
- El trailing-action (remove) tiene su propio `aria-label` — no hereda el del chip padre.
- **En el master el trailing es un ícono de 16 dentro del chip**, no un control aparte: el área de
  toque es la del chip completo (32 de alto), que cumple el mínimo de 24×24 de WCAG 2.5.8 AA — el
  nivel al que apunta el sistema. Si se implementa como botón independiente, hay que darle su
  propia caja de 24 como mínimo.
- Labels máximo 1–2 palabras, ~20 caracteres.

---

## Accesibilidad

- Estado activo se comunica vía `aria-pressed` (multi-select) o `aria-selected` (single-select) — nunca ambos en el mismo grupo.
- No depender solo del color para comunicar el estado seleccionado.
