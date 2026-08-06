// tokens/color.mjs — FUNDAMENTO: Color · palette MUI (CORE + augmentation).
// VISTA DEV: la estructura que MUI espera, con TODOS los valores DERIVADOS de la taxonomía
// (color-semantic.mjs). NO se tipean hex acá → single-source real. Cada slot MUI ← un token.
// Mapeo: fill/{intent}→.main · surface/fill-neutral→background · fill/semantic/{soft,solid}→.light/.main.
import { ramp, global } from './_primitives.mjs';
import { tokens as T } from './color-semantic.mjs';

const W = global.white;

export const palette = {
  // ── intenciones MUI. main = fill sólido · light = tenue · dark = texto · contrastText ──
  primary:   { main: T['fill/primary/default'],   light: T['fill/primary/hover'],  dark: T['fill/primary/active'],   contrastText: T['text/base/contrast'] },
  secondary: { main: T['fill/secondary/default'],  light: T['surface/base/secondary'],   dark: T['fill/secondary/active'], contrastText: T['text/base/default'] },
  error:     { main: T['fill/semantic/error/solid'], light: T['fill/semantic/error/soft'], dark: T['text/semantic/error'], contrastText: T['text/base/contrast'] },
  // warning: texto OSCURO (no blanco). Blanco sobre el ámbar solid da 3.53:1 → falla AA texto; slate-900 da 4.72:1.
  warning:   { main: T['fill/semantic/warning/solid'],  light: T['fill/semantic/warning/soft'],  dark: T['text/semantic/warning'],  contrastText: T['text/base/default'] },
  info:      { main: T['fill/semantic/info/solid'],     light: T['fill/semantic/info/soft'],     dark: T['text/semantic/info'],     contrastText: T['text/base/contrast'] },
  success:   { main: T['fill/semantic/success/solid'],  light: T['fill/semantic/success/soft'],  dark: T['text/semantic/success'],  contrastText: T['text/base/contrast'] },

  // ── neutrales / superficies / texto ──
  text:       { primary: T['text/base/default'], secondary: T['text/base/secondary'], disabled: T['text/base/disabled'] },
  background: { default: T['surface/base/default'], paper: T['fill/base/default'] },   // page = surface · card = fill/neutral
  divider:    T['border/base/secondary'],
  common:     { black: global.black, white: W },
  grey:       ramp.gray,

  // ── action = overlays de interacción de MUI (washes = tertiary) ──
  action: {
    active:             T['icon/base/default'],
    hover:              T['fill/tertiary/hover'],
    selected:           T['fill/tertiary/active'],
    disabled:           T['text/base/disabled'],
    disabledBackground: T['fill/base/disabled'],
    // focus: default MUI rgba(0,0,0,0.12) — decisión 2026-07-24: focus/gap (#F3F7FF, casi
    // blanco) hacía IMPERCEPTIBLE el ripple focusVisible de componentes nativos sin override. El foco
    // oficial del sistema sigue siendo el ring custom (components.mjs); este slot es solo el fallback MUI.
  },
};

// ═══ AUGMENTATION (lo nuestro que MUI no trae) — todo derivado de la taxonomía ═══

// brand — color custom (coral, 3 familias de botón)
palette.brand = { main: T['fill/brand/primary/default'], light: T['fill/brand/secondary/default'], dark: T['fill/brand/primary/active'], contrastText: T['text/base/contrast'], hover: T['fill/brand/primary/hover'], active: T['fill/brand/primary/active'], subtle: T['fill/brand/secondary/default'] };

// status multi-canal (Alert/Badge) — bg(tenue)/text/icon/border/solid por severidad
palette.status = {
  error:  { bg: T['fill/semantic/error/soft'], text: T['text/semantic/error'], icon: T['icon/semantic/error'], border: T['border/semantic/error-soft'], solid: T['fill/semantic/error/solid'] },
  info:    { bg: T['fill/semantic/info/soft'],    text: T['text/semantic/info'],    icon: T['icon/semantic/info'],    border: T['border/semantic/info'],    solid: T['fill/semantic/info/solid'] },
  success: { bg: T['fill/semantic/success/soft'], text: T['text/semantic/success'], icon: T['icon/semantic/success'], border: T['border/semantic/success'], solid: T['fill/semantic/success/solid'] },
  warning: { bg: T['fill/semantic/warning/soft'], text: T['text/semantic/warning'], icon: T['icon/semantic/warning'], border: T['border/semantic/warning'], solid: T['fill/semantic/warning/solid'] },
};

// deco — categorías numeradas, DOS tonos c/u (soft = área/fondo · solid = línea/marcador)
palette.deco = {
  1: { soft: T['fill/deco/1/soft'], solid: T['fill/deco/1/solid'] },
  2: { soft: T['fill/deco/2/soft'], solid: T['fill/deco/2/solid'] },
  3: { soft: T['fill/deco/3/soft'], solid: T['fill/deco/3/solid'] },
  4: { soft: T['fill/deco/4/soft'], solid: T['fill/deco/4/solid'] },
  5: { soft: T['fill/deco/5/soft'], solid: T['fill/deco/5/solid'] },
};

// focus — anillo (ring + gap, con inverse)
palette.focus = { ring: T['focus/ring/default'], gap: T['focus/gap/default'], inverse: T['focus/ring/inverse'], gapInverse: T['focus/gap/inverse'] };

// border (más allá de secondary)
palette.border = { default: T['border/base/default'], focus: T['border/base/focus'], disabled: T['border/base/disabled'], secondary: T['border/base/secondary'], brand: T['border/base/brand'], inverse: T['border/base/contrast'], errorSolid: T['border/semantic/error-solid'] };

// icon — system + brand
palette.icon = { default: T['icon/base/default'], secondary: T['icon/base/secondary'], disabled: T['icon/base/disabled'], inverse: T['icon/base/contrast'], brand: T['icon/base/brand-solid'], brandSoft: T['icon/base/brand-soft'] };

// extensiones de text/background
palette.text.inverse = T['text/base/contrast'];
palette.text.brand = T['text/base/brand'];
palette.background.inverse = T['surface/base/inverse'];

export const themeSlice = { palette };
