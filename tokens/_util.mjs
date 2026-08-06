// tokens/_util.mjs — helpers de emisión de tokens.
// Regla B1: todo token con px emite TAMBIÉN su equivalente en rem (base 16).
//   px  → respiro fijo, bordes, focus-ring (no debe crecer)
//   rem → alturas, font-size, line-height, lo que acompaña texto (escala con la pref del usuario)
// El consumidor elige cuál usar; ambos salen de una sola definición numérica.
import { P } from './_brand.mjs';

export const REM_BASE = 16;

export const rem = (px) => `${+(px / REM_BASE).toFixed(4)}rem`; // 16→1rem · 12→0.75rem · 0→0rem

// Para cada token px de la escala, emite AMBAS vars: --{P}-group-key (px) y --{P}-group-key-rem (rem).
// El prefijo del sistema (P) se prepende acá → los call sites pasan solo el grupo ('space', 'radius', …).
export const dualPxVars = (group, scale) =>
  Object.fromEntries(Object.entries(scale).flatMap(([k, v]) => [
    [`--${P}-${group}-${k}`, `${v}px`],
    [`--${P}-${group}-${k}-rem`, rem(v)],
  ]));
