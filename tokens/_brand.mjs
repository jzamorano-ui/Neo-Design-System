// tokens/_brand.mjs — NOMBRE del sistema, CENTRALIZADO (single-source).
// Cambiar acá y re-emitir renombra en todo el sistema:
//   · P    → prefijo de los tokens DIMENSIONALES: --{P}-space, --{P}-radius, --{P}-type, --{P}-button-height…
//            (los tokens de COLOR son role-first: --fill--/--text--/--border--… — NO llevan el nombre, no cambian.)
//   · PKG  → nombre del paquete npm (usado por pack).
//   · FILE → base de los CSS emitidos: {FILE}-color.css · {FILE}-foundations.css.
//
// El namespace del theme `theme.{P}.*` (space/radius/…) NO se deriva de acá: las themeSlices usan la clave
// `neo:` hardcodeada y un gate lo consume como `t2.neo.space`. El rename lo cubre el
// script de rename (def `neo: {` + acceso `.neo`), no _brand. Los tokens de color son role-first.
export const P = 'neo';
export const PKG = '@neo/mui';
export const FILE = 'neo';
