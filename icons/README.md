# Neo — Íconos

164 íconos en 3 familias, generados desde la librería Figma **Icons**, que es la fuente de verdad.
No se editan a mano: se regeneran desde ahí.

**El set no define colores propios: consume las variables de color del sistema de tokens.**

| Familia | Cuántos | Qué es | Color |
|---|---|---|---|
| `system` | 122 | íconos de **interfaz**: acciones, navegación, estados neutros | `icon/base/default` por defecto — **puede variar** dentro de la base `icon/base/*` |
| `semantic` | 10 (5 + 5 `-inverse`) | íconos de **feedback**: info, alerta, éxito, advertencia, error | ya definido, `icon/semantic/*`. **No se modifica** |
| `brand` | 32 | íconos de **identidad de marca** | dualidad propia ya definida. **No se modifica** |

> `danger` ("✕") y `alert` ("!") son **dos versiones del estado error** — ambas usan `icon/semantic/error`.

## Consumo

Requiere que las CSS vars estén en `:root` — las inyecta `<CssBaseline/>` del theme, o se cargan los dos CSS de `tokens/`. Dos formas:

```html
<!-- sprite (recomendado): 1 request, id = familia-nombre -->
<svg class="icon"><use href="icons.svg#system-cerrar"/></svg>
<svg class="icon icon--lg"><use href="icons.svg#brand-salud"/></svg>

<!-- SVG individual -->
<img src="svg/system/inicio.svg" alt="" aria-hidden="true">  <!-- ojo: <img> no hereda currentColor -->
```

```css
/* icons.css trae la clase base y los tamaños */
.icon          /* 24px · color icon/base/default */
.icon--xs|sm|md|lg|xl
.icon--secondary|disabled|inverse
```

### Cuál puede cambiar de color y cuál no

**Solo los `system`.** Vienen en `icon/base/default` y pueden tomar otro token **de la misma
familia base** según lo que pida el contexto — `secondary` para jerarquía menor, `disabled` en un
control apagado, `contrast` sobre fondo oscuro. El handoff indica cuál va en cada pantalla.

Como se exportan con `fill="currentColor"`, se aplica poniendo `color` en el contenedor:

```css
.mi-componente__icono { color: var(--icon--base--secondary); }
```

Las clases `.icon--secondary|disabled|inverse` cubren esos casos.

> **`semantic` y `brand` no se recolorean.** Traen su color adentro a propósito: un ícono de error
> es rojo esté donde esté, y los de marca mantienen su dualidad. Ni `color` ni `currentColor` los
> afectan — y cambiarlos rompería el significado que el ícono comunica.

> Un `system` **no toma colores semánticos**: si algo tiene que comunicar error o éxito, el ícono
> correcto es el de la familia `semantic`, no un `system` pintado de rojo.

`index.json` lista los 164 íconos por familia, con su `viewBox` y su tipo de color — sirve para
poblar un selector o validar nombres en build time.
