// tokens/radius.mjs — FUNDAMENTO: Radius.
// Escala nombrada del sistema (--radius-*). Escala nombrada mapeada de primitivos.
// Slot MUI (mixto):
//   · theme.shape.borderRadius = 8  → base que leen los componentes NATIVOS de MUI (Card, etc.)
//   · theme.neo.radius              → escala nombrada completa (JS/sx)
//   · --neo-radius-* (px + rem)     → CSS vars
import { radius as P } from './_primitives.mjs';
import { dualPxVars } from './_util.mjs';

export const radius = {
  none:  P[0],    // 0
  xs:    P[50],   // 4
  sm:    P[100],  // 8
  md:    P[150],  // 12
  lg:    P[200],  // 16
  xl:    P[300],  // 24
  '2xl': P[400],  // 32
  pill:  P.full,  // 999
};

export const themeSlice = { shape: { borderRadius: radius.sm }, neo: { radius } };

export const cssVars = dualPxVars('radius', radius);
