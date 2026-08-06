# Radio Button

> **Figma (fuente de verdad):** [❖ Radio button](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002291-3851) — validación visual contra el master.

Selección exclusiva entre opciones mutuamente excluyentes. Siempre dentro de un `radio-button/group`. Para selección múltiple usar `checkbox`.

---

## Propiedades

### radio-button

| Propiedad | Valores |
|---|---|
| `state` | default · selected · focus |
| `disabled` | true · false |
| `label` | texto visible (obligatorio) |

**Combinatoria válida (5):** default/false · selected/false · focus/false · default/true · selected/true.
`focus + disabled` no existe.

### radio-button/group

| Propiedad | Valores |
|---|---|
| `direction` | vertical · horizontal |
| `option-1` … `option-5` | true · false |

---

## Props

```typescript
interface RadioButtonProps {
  name: string                   // requerido — identifica el grupo
  value: string                  // requerido
  label: string                  // requerido
  checked?: boolean              // default: false
  disabled?: boolean             // default: false
  onChange?: (value: string) => void
}

interface RadioGroupProps {
  name: string                   // requerido
  direction?: 'vertical' | 'horizontal'   // default: 'vertical'
  options: Array<{
    value: string
    label: string
    disabled?: boolean
  }>
  value?: string                 // valor actualmente seleccionado
  legend: string                 // requerido — texto del <legend>
  onChange?: (value: string) => void
}
```

---

## Tokens

### Color

> **Modelo: el radio es un ícono** (un solo vector: anillo + punto). El color va en el `fill` del vector. Anillo sin marcar = token de **borde** (matchea el borde de los inputs); anillo+punto marcado = token de **icono**. Mapea a MUI `Radio` (SVG icons `RadioButtonUnchecked` / `RadioButtonChecked`).

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `radio` (ícono) | default — sin marcar | fill | `--border--base--default` |
| `radio` (ícono) | selected · focus — marcado | fill | `--icon--base--default` |
| `radio` (ícono) | disabled · sin marcar | fill | `--border--base--disabled` |
| `radio` (ícono) | disabled · marcado | fill | `--icon--base--disabled` |
| `label` | default · selected · focus | color | `--text--base--default` |
| `label` | disabled | color | `--text--base--disabled` |
| focus ring | focus | box-shadow (externo) | `--focus--ring--default` |
| focus gap | focus | box-shadow (relleno, entre anillo y ring) | `--focus--gap--default` |

> **Hover** (estado CSS, no variante Figma): el borde del anillo sin marcar pasa a `--border--base--focus` al hover.

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `gap` (control · label) | `--neo-space-lg` | 16px |
| Área touch (control-wrapper) | — | 40×44px |
| Control visual (radio-control) | — | 24×24px |
| `border-radius` (radio-control) | `--neo-radius-pill` | 999px (círculo — radio efectivo 12px en control de 24px) |
| `focus-ring-width` | `--neo-stroke-focus-ring-width` | 2px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/lg-regular` | 16px | 400 | 24px |

---

## HTML

```html
<fieldset>
  <legend>Frecuencia de pago</legend>
  <div>
    <input type="radio" id="mensual" name="freq" value="mensual">
    <label for="mensual">Mensual</label>
  </div>
  <div>
    <input type="radio" id="anual" name="freq" value="anual" checked>
    <label for="anual">Anual</label>
  </div>
</fieldset>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Radio group | `<fieldset>` o `<div role="radiogroup">` | `aria-labelledby="[legend-id]"` |
| Group legend | `<legend>` | texto descriptivo del grupo |
| Radio individual | `<input type="radio">` | `id` · `name="[grupo]"` · `aria-checked="true/false"` |
| Label | `<label>` | `for="[radio-id]"` |
| Disabled | `<input type="radio">` | `disabled` · `aria-disabled="true"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Entra al grupo; foco en el radio seleccionado (o el primero si ninguno) |
| `Shift + Tab` | Sale del grupo |
| `→` · `↓` | Mueve el foco y selecciona el siguiente radio |
| `←` · `↑` | Mueve el foco y selecciona el radio anterior |

El grupo es un único tab stop. Las flechas navegan y seleccionan dentro del grupo.

---

## Reglas

- Solo una opción puede estar `selected` por grupo — seleccionar una deselecciona las demás.
- No usar de forma aislada — un radio button sin grupo pierde su semántica de exclusividad.
- `label` obligatorio en cada opción — no ocultar para simular radio sin texto.
- El área clickeable incluye el control y el texto — ambos activan la selección.
- La selección se indica con el dot interior, no solo con color — no depender únicamente del relleno.
- Máximo ~6 opciones por grupo — más opciones sugieren un `<select>`.

---

## Accesibilidad

- Área de toque: la fila mide 44 de alto, muy por encima del mínimo de **24×24 de WCAG 2.5.8 AA**,
  que es el nivel al que apunta el sistema (los 44×44 son la 2.5.5, nivel AAA).
- Focus visible siempre.
- **WCAG 1.3.1** — usar `<fieldset>` + `<legend>` para agrupar radios relacionados.
- **WCAG 4.1.2** — `aria-checked` refleja el estado real; solo un radio por grupo puede tener `aria-checked="true"`.
