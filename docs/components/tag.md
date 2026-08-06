# Tag

> **Figma (fuente de verdad):** [❖ Tag](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003601-163) — validación visual contra el master.

Etiqueta informativa de clasificación. Comunica a qué categoría pertenece un elemento. No comunica estado del sistema (`badge`) ni selección activa (`chip`).

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `type` | light · dark |
| `icon-left` | true · false (default: true) |
| `icon-right` | true · false (default: true) |
| `label` | texto corto (máximo ~15 caracteres) |

`type` es **peso visual, no semántica** — el tag no comunica estado (para eso está `badge/state`):

| type | Fondo | Texto |
|---|---|---|
| `light` | `--fill--base--light` | `--text--base--secondary` |
| `dark` | `--fill--base--inverse` | `--text--base--contrast` |

> Los valores `light` / `dark` **nombran la apariencia, no la intención** — el antipatrón que el DS evita en el resto del sistema. Deuda de naming registrada (no se corrige en 1.0.0: renombrar rompe el contrato).

---

## Props

```typescript
interface TagProps {
  label: string                  // requerido — máximo ~15 caracteres
  // `dark` NO es un prop: se activa con data-surface="inverse" sobre el <Chip variant="tag">,
  // el mismo mecanismo que usa Button para su tratamiento inverso.
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}
```

---

## Tokens

### Color

| Elemento | Propiedad CSS | CSS custom property |
|---|---|---|
| Tag (frame) | background | `--fill--base--light` |
| Tag (frame) | border | `--border--base--default` |
| `Label content` | color | `--text--base--secondary` |
| Iconos | fill | `--icon--base--secondary` |

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `padding-inline` | `--neo-space-sm` | 8px |
| `padding-block` | `--neo-space-xs` | 4px |
| `gap` (icon · label) | `--neo-space-xs` | 4px |
| `border-radius` | `--neo-radius-xs` | 4px |
| `border-width` | `--neo-stroke-xs` | 1px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `Label content` | `body/md-medium` | 14px | 500 | 20px |

---

## HTML

```html
<!-- Sin iconos -->
<span class="tag">Dental</span>

<!-- Con icono leading -->
<span class="tag">
  <svg aria-hidden="true">…</svg>
  Dental
</span>
```

---

## ARIA

| Elemento | Tag | Atributos requeridos |
|---|---|---|
| Tag | `<span>` | texto visible como contenido |
| Iconos | `<svg>` | `aria-hidden="true"` |

Si el tag es la única indicación de categoría, el elemento padre debe tener `aria-label` o texto adyacente que lo contextualice.

---

## Teclado

Este componente no es interactivo — no recibe foco.

---

## Reglas

- Texto máximo 1–2 palabras. Sin puntuación al final.
- Iconos solo cuando aporten claridad semántica al label.

---

## Accesibilidad

- El label es obligatorio — no depender solo del borde para comunicar la categoría.
- Iconos son decorativos: `aria-hidden="true"`.
- El tag no recibe foco ni requiere role de acción.
