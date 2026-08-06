// tokens/shadows.mjs — FUNDAMENTO: Shadows / elevation.
// Escala nombrada del sistema (--elevation-*). 5 niveles nombrados.
// Slot MUI (mixto):
//   · theme.shadows[25]  → 🔒 MUI EXIGE exactamente 25 (0..24). 0='none' (convención MUI);
//                          ladder sm(1-4) · md(5-12) · lg(13-24). 'top-md' NO entra a la ladder.
//   · theme.neo.elevation → los 5 niveles nombrados (incl. top-md) para acceso JS/sx
//   · --neo-elevation-*   → CSS vars (paridad con dist)
import { shadow as P } from './_primitives.mjs';
import { P as PFX } from './_brand.mjs';

export const elevation = { none: P[0], sm: P[1], md: P[2], lg: P[3], 'top-md': P[4] };

const fill = (n, v) => Array(n).fill(v);
// 1 + 4 + 8 + 12 = 25 slots
export const shadows = ['none', ...fill(4, P[1]), ...fill(8, P[2]), ...fill(12, P[3])];

export const themeSlice = { shadows, neo: { elevation } };

export const cssVars = Object.fromEntries(
  Object.entries(elevation).map(([k, v]) => [`--${PFX}-elevation-${k}`, v]),
);
