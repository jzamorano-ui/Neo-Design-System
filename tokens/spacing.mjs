// tokens/spacing.mjs — FUNDAMENTO: Spacing.
// Escala nombrada del sistema (--space-*). Escala nombrada (t-shirt) mapeada de primitivos.
// Slot MUI (mixto):
//   · theme.spacing = 8   → factor base que usan los componentes NATIVOS de MUI
//   · theme.neo.space     → escala nombrada, acceso JS/sx (lo que usan NUESTROS componentes)
//   · --neo-space-* (px + rem) → CSS vars para consumo en CSS plano
import { space as P } from './_primitives.mjs';
import { dualPxVars } from './_util.mjs';

// Escala re-etiquetada en Figma (2026-07-02): MISMOS valores (0→64), labels corridos +1 (arranca en xs, +4xl).
export const space = {
  none:  P.none,  // 0
  xs:    P[50],   // 4
  sm:    P[100],  // 8
  md:    P[150],  // 12
  lg:    P[200],  // 16
  xl:    P[300],  // 24
  '2xl': P[400],  // 32
  '3xl': P[600],  // 48
  '4xl': P[800],  // 64
  '5xl': P[900],  // 72 — extensión Neo (más allá de la propuesta, max 64)
  '6xl': P[1000], // 80 — extensión Neo
};

export const themeSlice = { spacing: 8, neo: { space } };

export const cssVars = dualPxVars('space', space);
