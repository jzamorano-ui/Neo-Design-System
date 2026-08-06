# Neo — el modelo en 1 página

> Un solo idioma para **diseño** y **dev**. Todo color en el sistema se describe con **rol + variante**.

---

## La regla

**Una cosa = un ROL + una VARIANTE.**

| Pregunta | Eje | Valores |
|---|---|---|
| ¿qué *parte* es? | **rol** | `surface` · `fill` · `text` · `icon` · `border` · `focus` · `deco` |
| ¿de qué *tipo*? | **variante** | neutra (`default`·`subtle`·`primary`·`secondary`·`inverse`…) **o** intent (`brand`·`error`·`warning`·`info`·`success`) |
| ¿en qué *intensidad/estado*? | sufijo | `soft`·`strong` · `default`·`hover`·`active` *(donde aplica)* |

Naming: `--{rol}--{variante}[--{intensidad|estado}]`. Nada más que memorizar.

---

## Los roles, en una frase

| Rol | Es… | Ejemplo |
|---|---|---|
| **surface** | fondo **neutro** de lienzo (página·card·panel·modal). SOLO neutro. | `--surface--base--default` · `--surface--base--secondary` |
| **fill** | fondo de **componente** (botón·badge·chip·alert). Intent + intensidad. | `--fill--primary--default` · `--fill--semantic--error--soft` |
| **text** | color como **texto**. El link hereda el color del texto que lo rodea (`color: inherit`), sin token propio. | `--text--base--default` · `--text--base--secondary` |
| **icon** | color del **ícono**. | `--icon--base--default` · `--icon--semantic--error` |
| **border** | el **borde**. | `--border--base--default` · `--border--semantic--error-solid` |
| **focus** | anillo a11y (ring + gap). | `--focus--ring--default` |
| **deco** | paleta **decorativa** (marketing), sin semántica. Numerada, no por color. | `--fill--deco--1--soft` |

**La regla de oro (recognizable):** **TODO fondo de componente es `fill/*`** — intent (`fill/primary`, `fill/brand`) o neutro (`fill/base/{default,light,medium}` = blanco · gray50 · gray100, para controles y washes de ghost/chip/menu). **`surface/*` es SOLO el lienzo:** página · card · modal · paper flotante (menu/tooltip/select). Ni un componente toma `surface/*`. → ¿es el fondo de algo que se hace clic o se llena? `fill`. ¿es la hoja detrás del contenido? `surface`.

---

## Cómo se dice lo mismo en los dos lados

| Diseñador dice… | Dev escribe… |
|---|---|
| botón **primario** | `<Button color="primary">` → `--fill--primary--default` |
| botón de **marca** | `<Button color="brand">` → `--fill--brand--primary--default` |
| el mismo, **tonal/secundario** | `color="secondary"` → `--fill--secondary--default` |
| **peligro** | `<Button color="error">` → `--fill--semantic--error--soft` (alert) / `--text--semantic--error` |
| fondo de **página** | `--surface--base--secondary` |
| color en CSS plano | `var(--fill--brand--primary--default)` |

→ **El nombre que ve diseño en el panel es el que escribe dev.** Misma fuente (`color-semantic.mjs`), dos vistas (Figma / CSS · MUI).

---

## Reglas de oro

- **El rol dice qué parte; la variante dice intent + intensidad; el estado es automático.**
- **surface = neutro, siempre.** Todo lo que tiene color de intent es `fill` (suave o sólido), `text`, `icon` o `border`.
- Para escalar: un intent nuevo toma `fill/{intent}`, `text/{intent}`, etc. — los mismos roles. No se reinventa nada.

Detalle de valores: hay una sola fuente, y de ahí se generan las hojas de tokens y el theme. Ningún valor se escribe dos veces.
