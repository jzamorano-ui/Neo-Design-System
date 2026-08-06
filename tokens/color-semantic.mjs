// tokens/color-semantic.mjs — FUENTE ÚNICA de color. Taxonomía co-diseñada (role-based).
// Gramática: {rol}/{grupo}/{variante}. Cada rol ABRE con su grupo `base` (default/secondary/disabled + brand).
//   INVERSE vs CONTRAST: contenedores (surface, fill) usan `inverse` (el contenedor oscuro); primer plano
//   (text, icon, border) usa `contrast` (el blanco que contrasta sobre fondo oscuro, = contrastText de MUI). focus=inverse (su gap es oscuro).
//   Familias aparte: semantic (status) · link (text).
//   surface = SOLO lienzo (página/sección). fill = TODO componente (card, botón, banner…), por intent.
//   brand vive DENTRO de base en text/icon/border (text/base/brand…); en fill es un GRUPO de tema: brand/primary·secondary·tertiary.
//   Estados de botón: default/hover/active. disabled = estado (comparte valor con light).
//   DOS VOCABULARIOS DE INTENSIDAD, ejes distintos (no unificar): `light/medium/strong` = RAMPA de prominencia
//   del neutro (fill/base) · `soft/solid` = ROL de status (soft=fondo tintado, le va texto; solid=marcador saturado, badge/dot).
// 2 CAPAS (primitivos → semántico), SIN tokens por componente (lo específico usa un semántico reusable).
// GENERADO desde acá: neo-color.css, figma-vars.js (Figma), dist. NUNCA se edita el downstream a mano.
import { ramp, global } from './_primitives.mjs';

const W = global.white, TR = global.transparent, WA8 = global.whiteAlpha8, WA16 = global.whiteAlpha16, OV = global.overlay;
const s = ramp.slate, g = ramp.gray, co = ramp.brand, cr = ramp.red, gr = ramp.green, y = ramp.yellow, b = ramp.blue;

export const tokens = {
  // ══ surface — lienzo (página / sección) ══
  'surface/base/default': W, 'surface/base/secondary': s[50], 'surface/base/inverse': s[900], 'surface/base/overlay': OV,

  // ══ fill — todo componente ══
  // neutral: escala de prominencia + estado disabled + transparent
  'fill/base/default': W, 'fill/base/light': g[50], 'fill/base/medium': g[100], 'fill/base/strong': g[500], 'fill/base/disabled': g[50], 'fill/base/transparent': TR, 'fill/base/inverse': s[900],
  // acciones (por intent × estado). tertiary = ghost. brand = 3 familias.
  'fill/primary/default': s[800], 'fill/primary/hover': s[700], 'fill/primary/active': s[900],
  'fill/primary/inverse/default': W, 'fill/primary/inverse/hover': s[50], 'fill/primary/inverse/active': s[100],
  'fill/secondary/default': s[100], 'fill/secondary/hover': s[200], 'fill/secondary/active': s[300],
  'fill/secondary/inverse/default': TR, 'fill/secondary/inverse/hover': WA8, 'fill/secondary/inverse/active': WA16,
  'fill/tertiary/default': TR, 'fill/tertiary/hover': s[50], 'fill/tertiary/active': s[100],
  'fill/tertiary/inverse/default': TR, 'fill/tertiary/inverse/hover': WA8, 'fill/tertiary/inverse/active': WA16,
  'fill/brand/primary/default': co[500], 'fill/brand/primary/hover': co[600], 'fill/brand/primary/active': co[700],
  'fill/brand/secondary/default': co[100], 'fill/brand/secondary/hover': co[200], 'fill/brand/secondary/active': co[300],
  'fill/brand/tertiary/default': TR, 'fill/brand/tertiary/hover': co[50], 'fill/brand/tertiary/active': co[100],
  // semantic (status): soft = alert bg · solid = badge/dot/toggle. orden intent: info→success→warning→error
  // solid = 500 (más vivo, aún AA con texto blanco: r/g/b ≥4.8:1). warning NO baja: amarillo a 500 = 2.15, falla hasta el 3:1 del dot → se queda en 600 (su piso accesible).
  'fill/semantic/info/soft': b[50], 'fill/semantic/info/solid': b[500],
  'fill/semantic/success/soft': gr[50], 'fill/semantic/success/solid': gr[500],
  'fill/semantic/warning/soft': y[50], 'fill/semantic/warning/solid': y[600],
  'fill/semantic/error/soft': cr[50], 'fill/semantic/error/solid': cr[500],
  // deco (decorativo, banners/charts) — DOS tonos por categoría (patrón semantic): soft = área/fondo tenue · solid = línea/marcador saturado.
  // REGLA del paso solid: el MENOR paso de la rampa que pase 3:1 sobre blanco (tuning perceptual por saturación:
  // aqua/purple/slate necesitan 600 · pink/sky ya pasan en 500). Próxima categoría deco: aplicar el mismo criterio.
  'fill/deco/1/soft': ramp.aqua[100],   'fill/deco/1/solid': ramp.aqua[600],
  'fill/deco/2/soft': ramp.purple[100], 'fill/deco/2/solid': ramp.purple[600],
  'fill/deco/3/soft': s[100],           'fill/deco/3/solid': s[600],
  'fill/deco/4/soft': ramp.pink[100],   'fill/deco/4/solid': ramp.pink[500],
  'fill/deco/5/soft': ramp.sky[100],    'fill/deco/5/solid': ramp.sky[500],

  // ══ text ══
  // secondary: gray/600 (no 500) — AA sobre TODOS los fondos de su regla de uso: blanco 6.69 · gris sutil 6.2 · fill medium 5.4 (2026-07-24; gray/500 daba 4.41-4.43 sobre gris sutil, bajo AA)
  'text/base/default': s[900], 'text/base/secondary': g[600], 'text/base/disabled': g[300], 'text/base/contrast': W,
  'text/base/brand': co[500], 'text/base/brand-strong': co[700],
  'text/semantic/info': b[700], 'text/semantic/success': gr[700], 'text/semantic/warning': y[700], 'text/semantic/error': cr[700],

  // ══ icon — semantic TODOS 600 (a11y ícono = 3:1; crimson600 da 6.53:1). text va 700 (necesita 4.5:1). ══
  'icon/base/default': s[900], 'icon/base/secondary': g[500], 'icon/base/disabled': g[200], 'icon/base/contrast': W,
  // brand de icon = PAR soft/solid dentro de base (único ícono con 2 tonos — arte duotono de la librería Icons):
  // brand-solid = trazo/acento coral · brand-soft = zonas tintadas. text/border mantienen su base/brand de 1 tono.
  'icon/base/brand-solid': co[500], 'icon/base/brand-soft': co[200], 'icon/base/brand-strong': co[700],
  'icon/semantic/info': b[600], 'icon/semantic/success': gr[600], 'icon/semantic/warning': y[600], 'icon/semantic/error': cr[600],

  // ══ border ══
  'border/base/default': g[400], 'border/base/secondary': g[100], 'border/base/disabled': g[100], 'border/base/contrast': W, 'border/base/focus': s[900],
  'border/base/brand': co[500],
  'border/semantic/info': b[200], 'border/semantic/success': gr[200], 'border/semantic/warning': y[200], 'border/semantic/error-soft': cr[200], 'border/semantic/error-solid': cr[700],

  // ══ focus — indicador a11y (ring + gap) ══
  'focus/ring/default': b[500], 'focus/ring/inverse': W, 'focus/gap/default': b[50], 'focus/gap/inverse': s[800],
};

// nombre → CSS var:  fill/base/default → --fill--base--default  ·  fill/brand/primary/hover → --fill--brand--primary--hover
export const cssVar = (name) => '--' + name.split('/').join('--');
export const cssVars = Object.fromEntries(Object.entries(tokens).map(([n, v]) => [cssVar(n), v]));
