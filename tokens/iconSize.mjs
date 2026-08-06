// tokens/iconSize.mjs — FUNDAMENTO: Icon size.
// Escala nombrada del sistema (--icon-size-*). Escala nombrada mapeada de primitivos.
// Slot MUI: 🆓 sin slot nativo → theme.neo.iconSize + --neo-icon-size-* (px + rem).
import { iconSize as P } from './_primitives.mjs';
import { dualPxVars } from './_util.mjs';

export const iconSize = {
  xs:    P[200],  // 16
  sm:    P[250],  // 20
  md:    P[300],  // 24
  lg:    P[400],  // 32
  xl:    P[500],  // 40
  '2xl': P[600],  // 48
  '3xl': P[700],  // 56
  '4xl': P[800],  // 64
};

export const themeSlice = { neo: { iconSize } };

export const cssVars = dualPxVars('icon-size', iconSize);
