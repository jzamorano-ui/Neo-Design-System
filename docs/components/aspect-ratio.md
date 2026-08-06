# Aspect Ratio

> **Figma (fuente de verdad):** [❖ Aspect Ratio](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003644-9939) — validación visual contra el master.

Contenedor que fija la proporción (ancho : alto) del contenido y la mantiene al cambiar de tamaño. El ancho se adapta al espacio disponible y el alto sigue la proporción. Reserva el espacio antes de que la imagen cargue, así la página no salta. No es interactivo.

Tiene dos perillas, y son independientes: **`ratio` dice cuánto espacio ocupa** · **el slot dice qué se ve ahí** (foto, ilustración o video).

## Cuándo usarlo

Hazte una sola pregunta: **¿quién decide el alto?**

| Quién manda | Qué usas |
|---|---|
| **El contenido** — el alto es libre y la proporción lo define | **`aspect-ratio`**, con el contenido en el slot. Es el caso de la media de una card. |
| **El contenedor** — el alto ya viene fijado por fuera | **No lo uses.** El contenido hace `cover` y se recorta. Es el caso de un banner, donde el alto lo fija el tamaño del banner. |

Y hay un caso que decide solo: **si el slot lleva video, `aspect-ratio` es obligatorio.** Un video trae su proporción puesta y no se puede recortar. Una foto sí.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `ratio` | **16:9** (default) · 1:1 · 4:3 · 3:4 · 21:9 |
| `↪ media` | El contenido: foto, ilustración o video. En código es `children`. |

| Ratio | Uso |
|---|---|
| `16:9` | **Default** — estándar, video e imagen destacada (alineado con MUI Joy `AspectRatio`) |
| `1:1` | Cuadrado — grillas, miniaturas, avatares |
| `4:3` | Horizontal — fotos de contenido |
| `3:4` | Retrato — imagen vertical |
| `21:9` | Panorámico — franjas anchas |

En Figma el contenido entra por el `_slot` del sistema — el mismo que usa `modal-dialog`. Trae tres piezas listas para intercambiar: **`_media/photo` · `_media/illustration` · `_media/video`**.

Las dos perillas son independientes: cambiar el `ratio` no pierde el contenido, y cambiar el contenido no altera la proporción.

### Al usarlo en Figma

**Ponlo en `Fill` de ancho.** El alto se recalcula solo desde el ratio, pero **solo si el ancho es `Fill`**. En `Fixed` el alto queda congelado y la proporción no responde.

El slot acepta **cualquier contenido** — las tres piezas del DS o el tuyo propio, igual que el slot de un modal. No hay que envolver nada.

---

## Props

```typescript
interface AspectRatioProps {
  ratio?: '1/1' | '16/9' | '4/3' | '3/4' | '21/9'   // default: '16/9'
  objectFit?: 'cover' | 'contain'                    // default: 'cover'
  children: React.ReactNode                          // el slot: <img>, <video> o <svg>
}
```

---

## Tokens

### Layout

| Propiedad | Valor | Nota |
|---|---|---|
| `aspect-ratio` | 1/1 · 16/9 · 4/3 · 3/4 · 21/9 | constante de layout — no se tokeniza |
| `width` | fluido (100%) | se adapta al contenedor |
| `object-fit` | `cover` | la imagen llena sin deformar |

El placeholder del slot usa `--surface--base--default` como fondo.

No lleva tokens de color ni tipografía — es un contenedor. El estilo lo aporta el contenido (imagen) o el componente que lo consume (card, hero).

---

## HTML

```html
<div class="aspect-ratio" style="aspect-ratio: 16 / 9;">
  <img src="…" alt="…" style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Contenedor | `<div>` | presentacional — sin `role` |
| Imagen | `<img>` | `alt="[descripción]"` · `alt=""` si es decorativa |
| Video | `<video>` | subtítulos / `aria-label` |

---

## Teclado

Este componente no es interactivo — no recibe foco.

---

## Reglas

- El ancho es fluido; el alto SIEMPRE deriva del `ratio`. No fijar alto manual.
- Solo los 5 ratios: 1:1, 16:9, 4:3, 3:4, 21:9. No usar otros valores.
- La imagen llena el espacio sin deformarse; centrar el sujeto para que no quede cortado.
- Un ratio panorámico (21:9) se aplasta en pantallas angostas: ahí conviene uno más alto (4:3 o 3:4) en vez de forzar el mismo.
- Envolver la imagen siempre, incluso mientras carga — es lo que reserva el espacio y evita que la página salte.

---

## Accesibilidad

- Toda imagen con contenido informativo lleva `alt` descriptivo; la decorativa lleva `alt=""`.
- El recorte (`cover`) no debe ocultar información esencial — rostros clave, texto embebido.
- **WCAG 1.4.3** — texto superpuesto sobre la imagen debe mantener contraste AA; usar overlay si el fondo no lo garantiza.
