# Toggle

> **Figma (fuente de verdad):** [❖ Toggle](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002351-6594) — validación visual contra el master.

Control on/off con efecto inmediato. No incluye label propio — el texto visible es obligatorio en el layout consumidor.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `state` | default · selected · focus |
| `disabled` | true · false |

**Combinatoria válida (5):** default/false · selected/false · focus/false · default/true · selected/true.
`focus + disabled` no existe.

---

## Props

```typescript
interface ToggleProps {
  label: string                  // requerido — el componente renderiza un <span> externo con este texto, referenciado con aria-labelledby
  checked?: boolean              // default: false
  disabled?: boolean             // default: false
  onChange?: (checked: boolean) => void
}
```

---

## Tokens

### Color

> **Nota:** el "on" usa `fill/semantic/success/solid` (verde, estilo iOS — decisión de diseño confirmada). El on/off **no depende solo del color**: la posición del thumb (izq/der) también lo comunica. Mapea a MUI `Switch` (el theme pinta el track verde por default).

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `track` | default (off) | background | `--fill--base--strong` |
| `track` | selected · focus (on) | background | `--fill--semantic--success--solid` |
| `track` | disabled | background | `--fill--base--disabled` |
| `track` | disabled | border | `--border--base--disabled` |
| `thumb` | default · selected · focus | background | `--fill--base--default` |
| `thumb` | disabled | background | `--fill--base--medium` |
| focus ring | focus | box-shadow (externo) | `--focus--ring--default` |
| focus gap | focus | box-shadow (relleno, entre track y ring) | `--focus--gap--default` |

`disabled` aplica igual a `state=default` y `state=selected`.

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| Área touch (componente) | — | 48×44px |
| Track | — | 48×24px |
| `border-radius` (track) | `--neo-radius-pill` | 999px |
| Thumb | — | 16×16px |
| `border-radius` (thumb) | `--neo-radius-pill` | 999px |
| `focus-ring-width` | `--neo-stroke-focus-ring-width` | 2px |

---

## HTML

```html
<div class="toggle">
  <span id="notif-label">Activar notificaciones</span>
  <button role="switch" aria-checked="false" aria-labelledby="notif-label">
    <span class="toggle__track" aria-hidden="true">
      <span class="toggle__thumb"></span>
    </span>
  </button>
</div>

<!-- Disabled -->
<button role="switch" aria-checked="false" aria-labelledby="notif-label"
        disabled aria-disabled="true">
  <span class="toggle__track" aria-hidden="true">
    <span class="toggle__thumb"></span>
  </span>
</button>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Toggle | `<button role="switch">` | `aria-checked="true/false"` · `aria-labelledby="[id]"` o `aria-label` |
| Label externo | `<label>` o `<span>` | `id` — referenciado por `aria-labelledby` |
| Disabled | `<button role="switch">` | `disabled` · `aria-disabled="true"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Mueve el foco al toggle |
| `Shift + Tab` | Foco al elemento anterior |
| `Space` | Activa o desactiva el toggle |

---

## Reglas

- Es un control binario — activa o desactiva una única opción.
- El cambio se aplica inmediatamente, sin confirmación — no usar para acciones destructivas o irreversibles.
- `label` obligatorio en el layout consumidor — el componente no incluye texto propio.
- El área clickeable incluye el control y el label — ambos activan el toggle.
- No usar para selección entre más de dos opciones → `radio-button`.

---

## Accesibilidad

- Área de toque: 48×44, muy por encima del mínimo de **24×24 de WCAG 2.5.8 AA**, que es el nivel
  al que apunta el sistema (los 44×44 son la 2.5.5, nivel AAA).
- Focus visible siempre.
- **WCAG 4.1.2** — `aria-checked` refleja el estado real (`true` activo / `false` inactivo).
- **WCAG 1.3.1** — label asociado programáticamente vía `aria-labelledby` o `aria-label`.
