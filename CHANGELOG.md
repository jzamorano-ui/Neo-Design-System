# CHANGELOG — Neo

> **Este changelog arranca en `1.0.0`.** Es una decisión del owner: la release **es** la línea base.
> Todo lo anterior —el diseño del sistema, las fases F1→F5, el rename a Neo, los ajustes de cierre—
> es historia del repositorio (`git log`), no versiones. Desde `1.0.0` en adelante, **cada ajuste se
> documenta acá como versión nueva**.
>
> Formato: [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) · versionado [SemVer](https://semver.org/lang/es/).
> **Qué significa cada nivel en un sistema de diseño:**
> **MAJOR** = rompe el contrato (renombrar o eliminar un token, cambiar el prefijo, quitar un componente).
> **MINOR** = agrega sin romper (token nuevo, componente nuevo, ícono nuevo).
> **PATCH** = corrige sin cambiar el contrato (un valor mal transcrito, un fix de a11y, docs).

---

## [1.0.1] — cortada, **no se entrega como pack**

> **La base hacia desarrollo es y sigue siendo `1.0.0`**, enviada el 2026-07-28.
>
> **No habrá más entregas de pack** (decisión del owner, 2026-08-06). Los fundamentos ya están
> montados; de acá en adelante **cada ajuste se comunica directo**, y la fuente desde la que se
> construye es **Figma** —el master y su ficha—, con este changelog y el material de apoyo como
> respaldo. `entregas.json` registra solo 1.0.0, que es lo que la mantiene congelada.
>
> Entonces qué es esta versión: **el registro de todo lo que cambió después de esa base.** El tag
> existe y el pack se sigue armando, pero como **prueba** de que el sistema monta y renderiza, no
> como envío.

### Corregido

- **Dev Mode mandaba a escribir variables que no existen.** 16 `codeSyntax` de la librería Tokens
  nombraban mal su variable CSS: los 6 `breakpoint/*` decían `--breakpoint-lg` cuando el código emite
  `--neo-breakpoint-lg`, y `container/max-width` decía `--container-max-width`, que en código son dos
  vars distintas. Los 9 `grid/*` nombraban variables que **no existen por decisión** (layout no baja
  al código, ver `LAYOUT.md`) y se les quitó el `codeSyntax`: un nombre que no resuelve es peor que
  ninguno. Corregido en Figma y **gateado**: cada nombre que Dev Mode muestra tiene que existir en el
  CSS emitido. Es la segunda vez que aparece este defecto —en julio, 37 quedaron nombrando el prefijo
  anterior después de un rename—, y ahora no puede volver en silencio.

- **La ficha de Modal Full-screen daba medidas que el master no tiene.** Decía barra de acción de
  **136px** con botones de **44**; el master mide **128** con botones de **40** — y 44 no es ninguna
  de las alturas de botón del sistema (48/40/32). Manda Figma: se corrigió la ficha y la medida quedó
  anclada, porque ningún gate la cubría.

- **La ✕ de Modal Full-screen: la ficha daba `56×56` con glifo `32`.** El master usa un
  `button/icon` **`size=large` de 48 con glifo de 24** en web, y **`size=medium` de 40 con glifo de
  20** en mobile. El 56 salía de medir la caja del **← , que viene oculto**, inflada por el padding
  del anillo de foco. Igual que en la fila del `cta`, el tell fue que **ni 56 ni 32 existen en las
  escalas del sistema** (botón 48/40/32 · ícono 24/20/16). Corregido en la ficha y en el CSS plano,
  y anclado: ahora un gate lo compara y otro exige que el número sea una talla real.

- **La ficha de Alert se contradecía sola** sobre el largo de la descripción (2 líneas en un lugar,
  3 en otro). Queda en **3 líneas**, que es la definición vigente.

- **El theme no fijaba el margen ni la flecha del tooltip.** Los dos valores están en la spec desde
  el principio y el theme no los aplicaba, así que un `<Tooltip>` de MUI montado con Neo quedaba con
  los defaults de MUI. El margen al trigger pasa a **8px** (`space/sm`) y la flecha a **12×6** — MUI
  la dimensiona en `em` y la rota, con lo cual su tamaño dependía del `font-size` en vez del
  contrato.

- **El chip seleccionado y en hover pasan a la rampa `primary`** (2026-08-03). El master cambió de
  `fill/secondary/active` a **`fill/primary/active`**, con label e íconos en `text/base/contrast` /
  `icon/base/contrast`; el hover va a `fill/primary/hover` con el mismo tratamiento. En los dos
  estados el borde iguala al relleno, como en el master.
  Con esto **se cierra la excepción E3**: el seleccionado pasa de **2.18:1 a 16.64:1** contra el chip
  disponible, y el hover —que nadie estaba mirando— de 1.63:1 a **8.93:1**. Los dos pares salen de la
  lista de excepciones de `a11y` y se exigen como cualquier otro.

### Añadido

- **Dos íconos nuevos: `brand/pelota` y `system/cerrar-sesion`** (2026-08-06). Estaban publicados en
  la librería Icons y el repo no los tenía: entregaba 162 de 164. `cerrar-sesion` venía en Figma con
  el nombre **`cerrar sesion`, con espacio** —el único de los 159 fuera de la gramática
  `source/{familia}/{kebab}`—; se renombró en la librería antes de bajarlo, así que el espacio nunca
  llegó al nombre de archivo ni a la clase CSS.

- **La geometría se actualizó a la de Figma.** El aplanado de los 99 `system` del 2026-07-30 movía
  cada trazo unas diezmilésimas de píxel: invisible, pero el repo venía entregando la forma vieja.
  139 archivos cambiaron de hash. `drift-icons` se puso **rojo con 94 redibujados** antes de refrescar
  el snapshot, que es exactamente lo que debía pasar.

- **Dos bugs de `build-icons` que salieron al correrlo por primera vez desde julio:**
  - **El guard de color literal marcaba también los íconos bien tokenizados.** Su regex cazaba
    cualquier `fill="…"` distinto de `currentColor`/`none`, y la salida correcta conserva el `fill`
    original sumándole `style="fill:var(--token, #fallback)"`. Con ese regex **todo ícono de marca
    fallaba siempre**: el guard se agregó como endurecimiento después de la última corrida y nunca
    se ejercitó.
  - **`normalize` ponía DOS atributos `style` en el mismo path.** El segundo reemplazo volvía a
    tomar el blanco que el primero ya había bindeado. En SVG gana el primer `style`, así que el
    glifo blanco de los 5 `semantic` se habría pintado con el token de estado —rojo sobre rojo,
    invisible—. Lo disparó que Figma ahora exporta `fill="white"` donde antes `#fff`.

- **El `_demo.html` mostraba los 5 `-inverse` sobre fondo blanco**, y son blancos por diseño: no se
  veían. Ahora van sobre `#1F3644`, que es el contexto en el que existen.



- **Gate de color por estado.** `masters-snapshot.json` anclaba del chip solo la anatomía, así que el
  cambio de rampa **no puso rojo ningún gate**: el espejo estuvo roto con `npm test` en verde.
  `pixel-perfect` compara ahora `colores{}` del snapshot contra el CSS plano, atando **token ↔
  propiedad ↔ estado**. Cubre `chips`; extenderlo al resto está en `PENDIENTES.md`.

### Cambiado — en Figma, no en el paquete

Lo de abajo **no toca el pack**: son los masters y su documentación, que es de donde dev saca cada
componente. Si construís leyendo Figma por MCP, esto es lo que cambia de lo que recibís.

- **Cada master y cada variante tienen descripción.** Antes 12 de 30 sets no tenían ninguna, y las
  que había hablaban en dos idiomas distintos. Ahora el set dice **para qué sirve** y la variante,
  **solo lo que la distingue**. No se escriben a mano: se generan desde la ficha del componente, para
  que no se despeguen de ella.

- **Los nombres de variante se homologaron.** El mismo estado se llamaba `Default` en un componente
  y `default` en otro; el eje semántico era `variant` en Alert y `type` en otros cinco. Quedó:
  minúscula en toda la familia `button` y en `link` · `alert.variant` → **`alert.type`** ·
  `device` unificado en `desktop` · `full photo` → `full-photo` · `text area` → `text-area` ·
  `Banner` → `banner` · `Modal/full-screen` → `modal-fullscreen`.
  **Las instancias no se rompen** —la referencia de Figma es por key, no por nombre—: se midió en el
  archivo piloto y quedó en **0 rotas de 1017**.
  Dos asimetrías quedan **a propósito**: los emojis de `tooltip.type` (son ayuda visual) y la palabra
  extendida de `size` en `button`.

- **Se completó la documentación de los masters**: los 7 marcos de inspección que faltaban, los
  `documentationLinks` (3 apuntaban a la página equivocada, 3 no existían), y un solo `_slot` para
  los cuatro componentes que lo usan.

### Los gates dejaron de mentir

Nada de esto cambia un valor del paquete; cambia **qué tan cierto es decir que el paquete espeja a
Figma**.

- **`drift-figma` era tautológico para 31 de los 92 colores.** El snapshot guardaba el *alias*
  (`slate/700`) y el gate lo resolvía contra el mismo archivo del que sale el valor del código: los
  dos lados de la comparación salían de la misma fuente. **Probado**: cambiando `slate/700` de navy
  a rojizo, el hover del botón primario cambiaba de color y los 324 checks seguían verdes. Ahora el
  snapshot trae los **92 hex leídos de la librería publicada** y ese mismo cambio se pone rojo.

- **`mirror` medía 8 masters que ningún check abría** y **`prop-map` no comprobaba de qué variante
  de Figma parte cada regla**. Al cerrarlo salieron 24 reglas que mapeaban desde ejes inexistentes.

- **La suite pasó de 324 a 383 comprobaciones**, y los 24 gates tienen piso: si la fuente se achica,
  fallan en vez de felicitar con menos cobertura.

**Sin cambios de contrato.** Mismos tokens, mismos nombres, misma API: ningún token cambió de valor
ni de nombre — el chip pasa a consumir otros que ya existían. Actualizar es reemplazar la carpeta.

> Recordar qué es este paquete: **los fundamentos para montar el theme** (theme + tokens + íconos).
> Los componentes los construye el equipo de desarrollo cuando los necesita; lo que el theme hace es
> que salgan con el aspecto del sistema sin trabajo extra. Las specs de cada componente están en el
> repo de apoyo, para construir sin abrir Figma.

---

## [1.0.0] — 2026-07-28

Primera release estable. El sistema se entrega a desarrollo como **pack** (`npm run pack`), no como repo.

### El contrato

- **92 tokens semánticos de color** con gramática role-first `--{rol}--{grupo}--{variante}[--{estado}]`,
  sobre **116 primitivos**. Roles: `surface · fill · text · icon · border · focus`.
- **239 tokens dimensionales** (`--neo-*`): spacing · radius · stroke · elevation · icon-size ·
  tipografía · breakpoints · container.
- **Theme de Material UI** (`createTheme` clásico, estable v5.18→v7) con **28 overrides `Mui*`**.
  Se consume con `<ThemeProvider>` + `<CssBaseline/>`: las 331 CSS vars se inyectan en `:root`.
  Cero runtime, sin dark mode.
- **162 íconos** en tres familias: `system` (currentColor), `semantic` (bicolor, self-colored) y
  `brand` (multicolor propio).
- **20 componentes** especificados en `docs/components/`, cada uno con link a su master de Figma.
**El pack trae solo lo necesario para montar el theme.** No incluye componentes: cómo se estructuren
encima es decisión de quien implementa. El único requisito que el theme no puede imponer por sí solo
—el label **estático** de los formularios, contra el **flotante** que trae MUI— va dicho en el README
del paquete como requisito de diseño.

### Fuente de verdad

**Figma manda; el código la espeja.** Tres librerías publicadas —Neo Design System, Neo Icons,
Neo Tokens— y una suite de gates que prueba que el espejo es fiel: nombres, valores, transcripción por
componente, coherencia entre capas, contraste WCAG, verdad de la prosa (`doc-truth`) y —dentro de
`npm run pack`— que el pack cumpla lo que promete (`pack-contract`).

### Accesibilidad

Contraste verificado por gate sobre **pares reales** (no combinaciones teóricas): texto AA 4.5:1,
íconos y bordes 3:1. Las excepciones son conscientes y están registradas en el propio gate.

Tres cosas se corrigieron durante la auditoría previa a esta entrega, y quedaron gateadas:

- **El indicador de foco del menú, select y combobox era imperceptible.** Las `box-shadow` estaban
  en orden invertido y el gap de 4px tapaba el anillo de 2px: lo único visible daba **1.07:1**.
  Corregido en las dos capas, ahora **7.79:1**. El foco además ya no pisa el fondo, así que la
  opción seleccionada se sigue viendo debajo del anillo.
- **El número del badge daba 3.09:1.** Va en 12px, o sea texto normal, que exige 4.5. El master
  pasó a `fill/semantic/error/solid` y da **4.97:1**.
- **El botón de cierre del alert medía 20×20**, bajo el mínimo de 24×24 de WCAG 2.5.8. El master
  usa un `button/icon` de **32 con ícono de 16**.

### La documentación de componentes

`docs/components/` y `components/` son **el contrato**, no material de apoyo: describen cada
componente completo —anatomía, medidas, radios, trazos, gaps, tipografía por capa, tokens de color
por estado, ARIA y teclado— para poder construirlo **sin abrir Figma**, por ejemplo sin acceso a
dev mode.

Que sean espejo exacto no es una afirmación: lo verifica el gate `mirror` contra la anatomía de los
masters medida capa por capa. En la verificación completa de los 20 componentes aparecieron **nueve
divergencias, y en las nueve el código era el equivocado** — ninguna visible a simple vista.

### Cómo se verificó

Antes de esta entrega el sistema pasó por una auditoría de cinco lentes independientes. Lo que
encontró se resolvió **midiendo los masters de Figma**, no eligiendo: hubo nueve medidas en disputa
entre las specs y el código —el alto del panel de menú, el padding del chip, la altura del select,
el cierre del alert, el badge, el tag, el divisor de tabs, el área de toque de checkbox y radio— y
en las nueve el código era el equivocado. También apareció un `tag type=dark` que existía en el
master y no estaba implementado en ninguna capa.

La suite creció de 212 a **290 checks** en su momento en el proceso, con dos gates nuevos que cubren los puntos
ciegos que permitieron esa deriva: `doc-truth` (todo token citado en un doc existe, y toda tabla
token↔px dice el valor real) y `pack-contract` (el pack cumple lo que promete: tipos ↔ bundle,
versión, rutas alcanzables, imports del README).

### Notas para quien consume

- El paquete es **`@neo/mui`**. `@mui/material`, `@emotion/*` y `react` quedan como peer deps.
- **Los tokens de color no llevan el nombre del sistema** (`--fill--primary--default`): son
  role-first y agnósticos. Los dimensionales sí lo llevan (`--neo-space-md`) porque conviven con
  las variables de la app.
- **Nada se edita a mano downstream.** Los CSS, el diccionario y el DTCG se generan desde
  `tokens/*.mjs` con `npm run emit`.

<!-- 1.0.0 — la versión se identifica por el `version` del paquete; no hay release público que enlazar. -->
