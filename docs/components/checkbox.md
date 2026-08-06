# Checkbox

> **Figma (fuente de verdad):** [❖ Check box](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002312-6388) — validación visual contra el master.

Selección múltiple independiente. Para selección exclusiva usar `radio-button`; para on/off inmediato usar `toggle`.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `state` | default · selected · focus |
| `disabled` | true · false |
| `label` | string (requerido) |

**Combinatoria válida (5):** default/false · selected/false · focus/false · default/true · selected/true.
`focus + disabled` no existe — un campo deshabilitado no recibe foco.

### checkbox/group

| Propiedad | Valores |
|---|---|
| `option-1` … `option-5` | true · false — visibilidad de cada opción |

Solo soporta layout vertical en MVP.

---

## Props

```typescript
interface CheckboxProps {
  label: string                             // requerido
  checked?: boolean                         // default: false
  disabled?: boolean                        // default: false
  onChange?: (checked: boolean) => void
}

interface CheckboxGroupProps {
  options: Array<{
    id: string
    label: string
    checked?: boolean
    disabled?: boolean
  }>
  onChange?: (id: string, checked: boolean) => void
}
```

---

## Tokens

### Color

> **Modelo: la casilla es un ícono** (un solo vector). El color va en el `fill` del vector; el ✓ es **negativo** (calado — muestra la superficie a través). Caja sin marcar = token de **borde** (matchea el borde de los inputs); caja marcada = token de **icono**. Mapea a MUI `Checkbox` (SVG icons `CheckBoxOutlineBlank` / `CheckBox`).

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `checkbox` (ícono) | default — sin marcar | fill | `--border--base--default` |
| `checkbox` (ícono) | selected · focus — marcada | fill | `--icon--base--default` |
| `checkbox` (ícono) | disabled · sin marcar | fill | `--border--base--disabled` |
| `checkbox` (ícono) | disabled · marcada | fill | `--icon--base--disabled` |
| `checkmark` (✓) | selected | — | negativo (calado, muestra la superficie) |
| `label` | default · selected · focus | color | `--text--base--default` |
| `label` | disabled | color | `--text--base--disabled` |
| focus ring | focus | box-shadow (externo) | `--focus--ring--default` |
| focus gap | focus | box-shadow (relleno, entre caja y ring) | `--focus--gap--default` |

> **Hover** (estado CSS, no variante Figma): el borde de la casilla sin marcar pasa a `--border--base--focus` al hover.

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `gap` (control · label) | `--neo-space-lg` | 16px |
| Área touch (`checkbox-wrapper`) | — | 40×44px |
| Control visual (`checkbox-control`) | — | 24×24px |
| `border-radius` (`checkbox-control`) | `--neo-radius-xs` | 4px |
| `focus-ring-width` | `--neo-stroke-focus-ring-width` | 2px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/lg-regular` | 16px | 400 | 24px |

---

## HTML

```html
<!-- Checkbox aislado -->
<label class="checkbox">
  <input type="checkbox" id="terms">
  <span class="checkbox__label">Acepto los términos</span>
</label>

<!-- Checkbox deshabilitado -->
<label class="checkbox checkbox--disabled">
  <input type="checkbox" id="opt-off" disabled aria-disabled="true">
  <span class="checkbox__label">Opción no disponible</span>
</label>

<!-- Checkbox group -->
<fieldset>
  <legend>Coberturas adicionales</legend>
  <label class="checkbox">
    <input type="checkbox" id="opt1" name="coberturas" checked aria-checked="true">
    <span class="checkbox__label">Dental</span>
  </label>
  <label class="checkbox">
    <input type="checkbox" id="opt2" name="coberturas">
    <span class="checkbox__label">Farmacia</span>
  </label>
</fieldset>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Checkbox | `<input type="checkbox">` | `id` · `aria-checked="true/false"` |
| Label | `<label>` | `for="[checkbox-id]"` |
| Group container | `<fieldset>` | — |
| Group legend | `<legend>` | texto descriptivo del grupo |
| Disabled | `<input type="checkbox">` | `disabled` · `aria-disabled="true"` |
| Indeterminado | `<input type="checkbox">` | propiedad DOM `indeterminate = true` **y** `aria-checked="mixed"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Mueve el foco al checkbox (cada opción es un tab stop) |
| `Shift + Tab` | Foco al elemento anterior |
| `Space` | Activa o desactiva el checkbox con foco |

---

## Reglas

- `label` obligatorio — no ocultar para simular checkbox sin texto.
- Cada opción funciona de forma independiente — marcar una no afecta a las demás.
- El área clickeable incluye el control y el texto — ambos activan el checkbox.
- No usar para selección exclusiva — cuando solo una opción es válida, usar `radio-button`.
- Agrupar opciones relacionadas con `<fieldset>` + `<legend>` para dar contexto al grupo.
- `checkbox/group` solo layout vertical en MVP.
- **El estado indeterminado está implementado en las dos capas** (`.checkbox--indeterminate` y el
  ícono del theme). El glifo mixto se dibuja, pero sin la propiedad DOM `indeterminate` y sin
  `aria-checked="mixed"` el lector de pantalla lo anuncia como **desmarcado** (WCAG 4.1.2): se ve un
  estado y se escucha otro. Los dos van juntos, siempre.

---

## Accesibilidad

- Área de toque: `checkbox-wrapper` mide **40×44px** (control de 24 + padding-block de 10). Cumple
  con holgura el mínimo de **24×24 de WCAG 2.5.8 AA**, que es el nivel al que apunta el sistema.
  (El 44×44 es el criterio 2.5.5, que es AAA y no se exige acá — decirlo como "mínimo" y a la vez
  declarar 40×44 como cumplimiento era una contradicción.)
- Focus visible siempre — no suprimir el outline en ningún contexto.
- **WCAG 1.3.1** — usar `<fieldset>` + `<legend>` para grupos; el `<label>` asocia texto a cada control.
- **WCAG 2.5.3** — el texto del label describe la opción, no el estado.
- **WCAG 4.1.2** — `aria-checked` debe reflejar el estado real en todo momento.
