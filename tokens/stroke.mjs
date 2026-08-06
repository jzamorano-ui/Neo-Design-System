// tokens/stroke.mjs — FUNDAMENTO: Stroke (border-width).
// Escala nombrada del sistema (--stroke-*). Escala nombrada mapeada de primitivos.
// Slot MUI: 🆓 MUI no tiene slot de stroke → theme.neo.stroke + --neo-stroke-* (px + rem).
import { stroke as P } from './_primitives.mjs';
import { dualPxVars } from './_util.mjs';

export const stroke = {
  none:               P[0],   // 0
  xs:                 P[25],  // 1
  sm:                 P[50],  // 2
  md:                 P[75],  // 4
  'focus-ring-width': P[50],  // 2 (alias del anillo de foco)
};

export const themeSlice = { neo: { stroke } };

export const cssVars = dualPxVars('stroke', stroke);
