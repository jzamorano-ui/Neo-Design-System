# Neo — Design System

El material completo del sistema, versión **1.0.1**: cada componente especificado y en CSS, los
tokens, los íconos y el theme de Material UI que los aplica.

> **Figma es la fuente de verdad.** Todo esto es su espejo, generado desde el sistema.
> Ante cualquier duda visual manda el master; cada spec tiene el link al suyo.

---

## Qué hay acá

| | |
|---|---|
| `docs/components/` | 20 specs, una por componente: anatomía, medidas, radios, trazos, gaps, tipografía por capa, tokens de color por estado, ARIA y teclado |
| `components/` | 21 hojas de CSS plano — la misma anatomía, ejecutable y sin depender de MUI |
| `tokens/` | la fuente de los fundamentos: color, espaciado, radios, trazos, tipografía, breakpoints |
| `neo-color.css` · `neo-foundations.css` | esos mismos tokens como variables CSS listas para usar |
| `icons/` | 164 íconos en tres familias, con su hoja de estilos, el sprite y un índice visual |
| `theme/` | el theme de MUI que aplica todo lo anterior |
| `docs/dev/` | layout y breakpoints · qué token usar cuándo · mapa de props Figma↔MUI · integración · ejemplos |
| `docs/MODEL.md` · `docs/MUI-RULES.md` | la gramática de tokens (rol + variante) y las reglas de uso de MUI |

## Cómo se usa

Una spec y su CSS son el **mismo** componente descrito dos veces: en prosa medida y en código. La
spec dice *qué*, y el CSS muestra *una forma* de hacerlo — no la única.

El CSS de `components/` resuelve sus variables contra `neo-color.css` y `neo-foundations.css`:
cargando esas dos hojas primero, cualquier archivo de `components/` funciona tal cual.

Los valores no son aproximaciones: salen de medir el master de Figma capa por capa, y una suite de
gates prueba que siguen coincidiendo.

El theme de `theme/` es fuente ESM y se consume con bundler, como cualquier theme de MUI: importarlo
con `node` directamente falla porque `@mui/material` no publica mapa de `exports`.

Para montar los fundamentos en una app hay un paquete aparte, `@neo/mui`, que trae el theme ya
compilado con sus tipos. Acá está todo abierto, para leerlo y para tomar lo que sirva.

## Esto es un espejo generado

No se edita acá. Cada archivo se genera desde el sistema, así que un cambio local se pierde en la
próxima entrega — y peor, deja de coincidir con lo que el theme hace. Si algo no cuadra con el
master o con el comportamiento real, avísennos: es un defecto del espejo y se corrige en la fuente.
