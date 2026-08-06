// tokens/component-tokens.mjs — CAPA 2c: tokens de componente (valores NO-escalares).
// Regla: existe un token de componente SOLO para dimensiones propias del componente que la escala no provee
// (alturas de control, ancho de switch, punto del radio…). Evita literales y escala-prestada (el acoplamiento
// que se le critica a producción). px + rem, prefijo --neo-{comp}-{prop}. theme.neo.component.{comp}.{prop}.
import { rem } from './_util.mjs';
import { P } from './_brand.mjs';

// dimensiones por componente (px). Button 32/40/48 = escala control-height medida contra el master (2026-07-24). 44 = touch target de inputs (TextField/Select/Combobox) y switch.
export const component = {
  button: { height: { sm: 32, md: 40, lg: 48 } },
  switch: { width: 48, height: 44, trackHeight: 24, thumbTravel: 24 }, // thumb=icon-size-xs (16); travel = ancho - thumb - pad
  input: { height: 44 }, // touch-target compartido text-field/select/combobox (master 44)
  radio: { dot: 10 },
  menu: { minWidth: 200 },
  menuItem: { minHeight: 40 },
};

export const themeSlice = { neo: { component } };

// aplana el árbol a [nombre-kebab, px] → --neo-button-height-sm, --neo-switch-track-height, --neo-menu-min-width…
const kebab = (s) => s.replace(/([A-Z])/g, '-$1').toLowerCase();
const flat = [];
const walk = (obj, path) => { for (const [k, v] of Object.entries(obj)) { const p = [...path, kebab(k)]; typeof v === 'object' ? walk(v, p) : flat.push([p.join('-'), v]); } };
walk(component, []);

export const cssVars = Object.fromEntries(flat.flatMap(([name, v]) => [
  [`--${P}-${name}`, `${v}px`],
  [`--${P}-${name}-rem`, rem(v)],
]));
