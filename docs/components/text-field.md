# Text Field

> **Figma (fuente de verdad):** [❖ Text Field](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002482-2745) — validación visual contra el master.

Dos componentes, un mismo sistema: `input` para texto corto en una línea; `text-area` para texto largo en múltiples líneas.

---

## Propiedades

| Propiedad | Valores | Aplica a |
|---|---|---|
| `type` | input · text-area | — |
| `state` | default · active · focus · writing · filled · error · read-only · disabled | input · text-area |
| `label` | texto visible (obligatorio) | input · text-area |
| `placeholder` | ejemplo del formato esperado | input · text-area |
| `helper-text` | instrucciones o mensaje de ayuda | input · text-area |
| `feedback` | mensaje de error — requerido si `state=error` | input · text-area |
| `icon-left` | visible · oculto — decorativo | solo input |
| `icon-right` | visible · oculto — funcional (limpiar, mostrar contraseña) | solo input |
| `prefix` | visible · oculto — muestra el afijo de texto fijo (leading) | solo input |
| `prefix-text` | contenido del prefijo (ej: "+56") | solo input |
| `suffix` | visible · oculto — muestra el afijo de texto fijo (trailing) | solo input |
| `suffix-text` | contenido del sufijo (ej: "UF") | solo input |
| `↪ counter` | visible · oculto — conteo de caracteres | solo text-area |
| `icon-tooltip` | visible · oculto — ícono de ayuda junto al label | input · text-area |
| `↪ tooltip` | visible · oculto — el tooltip que muestra ese ícono | input · text-area |

---

## Props

```typescript
interface InputProps {
  label: string                   // requerido
  placeholder?: string
  helperText?: string             // texto informativo — CONVIVE con el mensaje de error
  feedbackMessage?: string        // mensaje de error — requerido si state='error'
  state?: 'default' | 'active' | 'focus' | 'writing' | 'filled' | 'error' | 'disabled' | 'read-only'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  value?: string
  onChange?: (value: string) => void
}

interface TextAreaProps {
  label: string                   // requerido
  placeholder?: string
  helperText?: string             // texto informativo — CONVIVE con el mensaje de error
  feedbackMessage?: string        // mensaje de error — requerido si state='error'
  state?: 'default' | 'active' | 'focus' | 'writing' | 'filled' | 'error' | 'disabled' | 'read-only'
  counter?: boolean               // default: false
  maxLength?: number              // requerido si counter=true
  rows?: number
  value?: string
  onChange?: (value: string) => void
}
```

---

## Tokens

### Color

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `input-container` | default · active · focus · writing · filled · error | background | `--fill--base--default` |
| `input-container` | read-only | background | `--fill--base--medium` |
| `input-container` | disabled | background | `--fill--base--disabled` |
| `input-container` | default · filled · read-only | border | `--border--base--default` (1px) |
| `input-container` | active · writing | border | `--border--base--focus` (2px) |
| `input-container` | error | border | `--border--semantic--error-solid` (2px) |
| `input-container` | disabled | border | `--border--base--disabled` (1px) |
| `input-container` | focus | border + anillo | ver **Anillo de focus** |
| `label` | default · active · focus · writing · filled · read-only | color | `--text--base--default` |
| `label` | error | color | `--text--semantic--error` |
| `label` | disabled | color | `--text--base--disabled` |
| `input-text` (valor) | default | color | `--text--base--default` |
| `input-text` (placeholder) | — | color | `--text--base--secondary` |
| `input-text` | disabled | color | `--text--base--disabled` |
| `helper-text` | default · active · focus · writing · filled · read-only · **error** | color | `--text--base--secondary` |
| `helper-text` | disabled | color | `--text--base--disabled` |
| `feedback-message` | error | color | `--text--semantic--error` |

> **En error, el helper NO se apaga ni se vuelve rojo.** El master muestra las dos cosas: el
> `helper-text` sigue en `--text--base--secondary` y el mensaje de error es una **capa aparte**
> (`feedback-message`). Son dos elementos con dos funciones: uno instruye, el otro corrige.
>
> **En MUI hay un solo slot.** `TextField` expone un único `helperText`, así que ahí las dos capas
> no coexisten: cuando el campo va en `error`, ese slot lleva el **mensaje de error** y el theme lo
> pinta como tal —rojo, con el ícono de alerta— porque eso es lo que es. Para mostrar además la
> instrucción, hace falta un segundo `FormHelperText` propio. La capa de CSS plano sí trae los dos
> elementos separados (`.field__helper` y `.field__feedback`), que es el modelo del master.
| `left-slot` · `right-slot` | default | fill | `--icon--base--default` |
| `left-slot` · `right-slot` | disabled | fill | `--icon--base--disabled` |
| `icon-tooltip` (ⓘ) | **todos los estados, disabled incluido** | fill (disco) | `--icon--semantic--info` |
| `icon-tooltip` (ⓘ) | **todos los estados, disabled incluido** | fill (glifo) | `--icon--base--contrast` |
| `tooltip` (body · arrow) | — | background/fill | `--fill--semantic--info--solid` · label `--text--base--contrast` (ver `tooltip.md`) |
| `counter` | default | color | `--text--base--secondary` |
| `counter` | error | color | `--text--semantic--error` |

> **El ícono de ayuda es el semántico ⓘ (`semantic/info`), no un "?".** Unificado en los 32 variants
> de `text-field · select · combobox` el 2026-07-27. Es **bicolor y self-colored**: el SVG ya trae el
> disco en `--icon--semantic--info` y el glifo en `--icon--base--contrast` (ver `icons/icons.css`),
> así que el CSS del componente **solo fija el tamaño** — un `fill:` ahí no aplica. Por lo mismo
> **no se apaga en `disabled`**: el color vive dentro del ícono. El resto de los íconos del campo
> (leading/trailing) sí siguen el estado, porque usan `currentColor`.

**Anillo de focus** (`state=focus` — navegación por teclado)

| Capa | Propiedad CSS | CSS custom property |
|---|---|---|
| anillo externo | border (outside) | `--focus--ring--default` |
| gap (separador) | border (inside del `input-container`) | `--focus--gap--default` |
| grosor (ambos) | border-width | `--neo-stroke-focus-ring-width` (2px) |

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `padding-inline` (container) | `--neo-space-md` | 12px |
| `padding-block` (container · **input**) | `--neo-space-sm` | 8px |
| `padding-block` (container · **text-area**) | `--neo-space-md` | 12px |
| `gap` (label · container · helper) | `--neo-space-xs` | 4px |
| `border-radius` | `--neo-radius-sm` | 8px |
| `border-width` (default · filled · read-only · disabled) | `--neo-stroke-xs` | 1px |
| `border-width` (active · writing · error) | `--neo-stroke-sm` | 2px |
| `border-width` (anillo de focus) | `--neo-stroke-focus-ring-width` | 2px |
| `min-height` (container) | — (constante de layout) | 44px — touch target compartido con select y combobox |
| `icon-size` (leading · trailing) | `--neo-icon-size-md` | 24px |
| `icon-size` (ayuda ⓘ) | `--neo-icon-size-xs` | 16px |

> **`input` y `text-area` no llevan el mismo aire vertical.** El de una línea es una caja de
> **8 + 24 + 8 = 40**, que se expande a **44** por touch target (`min-height`, contenido centrado).
> El `text-area` lleva **12** y su alto lo define el contenido, sin touch target de por medio.

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/lg-medium` | 16px | 500 | 24px |
| `input-text` (valor · prefix · suffix) | `body/lg-regular` | 16px | 400 | 24px |
| `input-text` (placeholder) | `body/lg-regular` | 16px | 400 | 24px |
| `helper-text` · `feedback-message` | `body/md-regular` | 14px | 400 | 20px |
| `counter` | `body/md-regular` | 14px | 400 | 20px |

---

## HTML

```html
<!-- Input -->
<div class="field">
  <label for="email">Correo electrónico</label>
  <input type="email" id="email" placeholder="nombre@ejemplo.com"
         aria-describedby="email-helper">
  <span id="email-helper">Usaremos este correo para confirmaciones.</span>
</div>

<!-- Input con ícono de ayuda + tooltip -->
<div class="field">
  <div class="field__label">
    <label for="rut">RUT</label>
    <!-- El disparador es un BOTÓN, no el <svg>: tiene que ser focuseable por teclado.
         El glifo mide 16px; el área de clic la aporta el botón, mínimo 24×24 (WCAG 2.5.8). -->
    <button type="button" class="field__icon--tooltip"
            aria-label="Qué es el RUT" aria-describedby="rut-tip">
      <svg class="field__icon--tooltip" aria-hidden="true">…</svg>
    </button>
    <div id="rut-tip" role="tooltip" class="tooltip">Sin puntos y con guion.</div>
  </div>
  <input type="text" id="rut">
</div>

<!-- Input en error -->
<div class="field field--error">
  <label for="email-err">Correo electrónico</label>
  <input type="email" id="email-err" aria-invalid="true"
         aria-describedby="email-error">
  <span id="email-error" role="alert">Ingresa un correo válido.</span>
</div>

<!-- Text area con counter -->
<div class="field">
  <label for="desc">Descripción</label>
  <textarea id="desc" aria-describedby="desc-counter"></textarea>
  <span id="desc-counter">0 / 200</span>
</div>
```

---

## ARIA

| Elemento | Tag | Atributos requeridos |
|---|---|---|
| Input | `<input type="text">` | `id` · `aria-labelledby` o `aria-label` |
| Text area | `<textarea>` | `id` · `aria-labelledby` o `aria-label` |
| Label | `<label>` | `for="[input-id]"` |
| Ícono de ayuda ⓘ | **`<button type="button">`** | `aria-label` que nombre la ayuda ("Qué es el RUT") · `aria-describedby` al tooltip cuando está visible · el `<svg>` interno va `aria-hidden="true"` |
| Tooltip | `<div role="tooltip">` | `id` referenciado por el `aria-describedby` del botón · se muestra en `hover`, `focus` y `Escape` lo cierra |
| Helper text | `<span>` | `id` · referenciado en `aria-describedby` del input (coexiste con `aria-labelledby`) |
| Error message | `<span>` | `role="alert"` · referenciado en `aria-describedby` (coexiste con `aria-labelledby`) |
| Campo con error | `<input>` | `aria-invalid="true"` · `aria-describedby="[error-id]"` |
| Disabled | `<input>` | `disabled` |
| Read-only | `<input>` | `readonly` · `aria-readonly="true"` |
| Right icon funcional | `<button>` | `aria-label="[acción]"` |
| Iconos decorativos | `<svg>` | `aria-hidden="true"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Mueve el foco al campo → `state=focus` (anillo de focus, navegación por teclado) |
| `Shift + Tab` | Foco al elemento anterior |
| Caracteres | Ingresa texto |
| `Backspace` · `Delete` | Borra caracteres |
| `Enter` | En input: puede disparar submit · En text-area: inserta salto de línea |

---

## Reglas

- `label` siempre visible — el placeholder no lo reemplaza.
- **`active` vs `focus`:** al seleccionar el campo se activa para escribir (`active`, borde focus 2px); la **navegación por teclado** muestra además el **anillo de focus** (`focus`, ring+gap). `writing` = escritura en curso. A diferencia de `select`, el input no requiere abrir nada.
- **Anillo = exclusivo de teclado.** El anillo de focus aparece **solo** cuando el foco llega por teclado (`Tab`) — **con mouse no se muestra** (ahí comunica el borde `active` 2px). No depender de `:focus-visible` para esto: en un `<input>` de texto también dispara con mouse (ver Accesibilidad).
- **`writing` es ilustrativo, no un estado de dev.** Es **visualmente idéntico a `active`** (mismo borde focus 2px) — existe para ejemplificar en diseño "el usuario está escribiendo". El consumidor **no implementa una clase aparte**: surge solo del valor que se ingresa en el input.
- **Combinatoria de estados:** `filled` (dato ingresado) es **ortogonal** a la interacción (`active`/`focus`/`writing`) y a `error` — coexisten (ej. `filled` + `focus`, `error` + `focus`). `disabled` y `read-only` **anulan** la interacción.
- `read-only` ≠ `disabled`: read-only permite leer y copiar; disabled excluye el campo del formulario.
- En `state=error` siempre incluir mensaje de texto — no depender solo del color de borde.
- Iconos con rol definido — decorativo (`aria-hidden`) o funcional (`<button>` con `aria-label`). Nunca ambiguo.
- Para texto libre únicamente — para elegir entre opciones usar `select` o `radio-button`.

---

## Accesibilidad

- **WCAG 1.3.1** — label asociado programáticamente vía `<label for>` o `aria-labelledby`.
- **WCAG 2.4.6** — el texto del label identifica el propósito; no usar solo placeholder.
- **WCAG 2.4.7 (Focus Visible)** — `state=focus` muestra el anillo de focus en navegación por teclado, y **solo** ahí. **Contrato de implementación:** el anillo se gobierna por la clase `.field--focus`, **no** por `:focus-visible` — en un `<input>` de texto `:focus-visible` también se activa con mouse y rompería el "solo teclado". El consumidor enciende `.field--focus` detectando la modalidad de entrada (`keydown` → teclado · `pointerdown` → puntero).
- **WCAG 2.4.11 / 2.4.13 (Focus Appearance)** — el anillo usa dos capas (ring + gap de contraste) con grosor `--neo-stroke-focus-ring-width`, visible sobre cualquier fondo.
- **WCAG 3.3.1** — en error: `aria-invalid="true"` + mensaje visible referenciado con `aria-describedby`.
- **WCAG 3.3.2** — labels o instrucciones visibles siempre que se requieran datos del usuario.
- **El ícono de ayuda y su tooltip son UN patrón, no dos propiedades sueltas.** En Figma son dos booleanos independientes (`icon-tooltip` y `↪ tooltip`) porque el master no prototipa la interacción; en la implementación van juntos: el botón dispara el tooltip en `hover` y en `focus`, y `Escape` lo cierra. Encender el ícono sin conectar el tooltip deja un control que no hace nada.
- **WCAG 2.5.8 (Target Size, AA) — el ícono de ayuda ⓘ mide 16px, así que el área de clic la pone el trigger.** El glifo es 16 (`--neo-icon-size-xs`, lo que dice el master); el elemento que lo envuelve y dispara el tooltip debe llegar a **24×24 mínimo** vía padding, sin agrandar el ícono. Mismo criterio en `select` y `combobox`.
- **WCAG 1.4.11 (Contraste no textual)** — el ⓘ resuelve un solo par, `--icon--semantic--info` (#0036AF) ↔ blanco: **9.78:1** tanto para el disco sobre `--surface--base--default` como para el glifo sobre el disco. Muy por encima del 3:1 exigido.
