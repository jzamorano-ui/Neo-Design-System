// tokens/typography.mjs — FUNDAMENTO: Typography.
// Escala nombrada del sistema (--type-*). 22 variantes nombradas (propuesta).
// Slot MUI (mixto):
//   · theme.typography  → 🔒 13 variants estándar (h1..overline) que MUI EXIGE,
//                          mapeadas a nuestra escala + 🆓 las 22 variantes custom (variant="bodyMdRegular").
//   · --neo-type-*       → CSS vars atomizadas (size/weight/line-height/letter-spacing), paridad con dist.
import { type as T } from './_primitives.mjs';
import { rem } from './_util.mjs';
import { P } from './_brand.mjs';

// [ camelCase (variant MUI) , kebab (dist) , size , weight , lineHeight ]  — letter-spacing = 0
const V = [
  ['displayXlBold',   'display-xl-bold',   64, 700, 72],
  ['headlineLgBold',  'headline-lg-bold',  48, 700, 64],
  ['headlineMdBold',  'headline-md-bold',  40, 700, 48],
  ['headlineSmBold',  'headline-sm-bold',  32, 700, 40],
  ['titleLgBold',     'title-lg-bold',     24, 700, 32],
  ['titleLgMedium',   'title-lg-medium',   24, 500, 32],
  ['titleMdBold',     'title-md-bold',     20, 700, 28],
  ['titleMdMedium',   'title-md-medium',   20, 500, 28],
  ['titleSmBold',     'title-sm-bold',     18, 700, 26],
  ['titleSmMedium',   'title-sm-medium',   18, 500, 26],
  ['titleXsBold',     'title-xs-bold',     14, 700, 20],
  ['bodyXlBold',      'body-xl-bold',      20, 700, 28],
  ['bodyXlMedium',    'body-xl-medium',    20, 500, 28],
  ['bodyXlRegular',   'body-xl-regular',   20, 400, 28],
  ['bodyLgBold',      'body-lg-bold',      16, 700, 24],
  ['bodyLgMedium',    'body-lg-medium',    16, 500, 24],
  ['bodyLgRegular',   'body-lg-regular',   16, 400, 24],
  ['bodyMdBold',      'body-md-bold',      14, 700, 20],
  ['bodyMdMedium',    'body-md-medium',    14, 500, 20],
  ['bodyMdRegular',   'body-md-regular',   14, 400, 20],
  ['captionSmMedium', 'caption-sm-medium', 12, 500, 16],
  ['captionSmRegular','caption-sm-regular',12, 400, 16],
];
export const _V = V; // para el gate

// fontSize/lineHeight en REM (a11y · escala con la pref del usuario, como MUI por defecto)
const variant = (s, w, l) => ({ fontFamily: T.family, fontWeight: w, fontSize: rem(s), lineHeight: rem(l), letterSpacing: 0 });

// 22 variantes custom
export const variants = Object.fromEntries(V.map(([name, , s, w, l]) => [name, variant(s, w, l)]));

// 13 estándar MUI ← la escala del sistema
const std = {
  h1: variant(64, 700, 72), h2: variant(48, 700, 64), h3: variant(40, 700, 48), h4: variant(32, 700, 40),
  h5: variant(24, 500, 32), h6: variant(20, 500, 28),
  subtitle1: variant(18, 500, 26), subtitle2: variant(14, 500, 20),
  body1: variant(16, 400, 24), body2: variant(14, 400, 20),
  button: { ...variant(14, 500, 20), textTransform: 'none' },
  caption: variant(12, 400, 16),
  overline: { ...variant(12, 500, 16), textTransform: 'uppercase' },
};

export const typography = { fontFamily: T.family, ...std, ...variants };

export const themeSlice = { typography };

export const cssVars = Object.fromEntries(V.flatMap(([, d, s, w, l]) => [
  [`--${P}-type-${d}-size`, `${s}px`],
  [`--${P}-type-${d}-size-rem`, rem(s)],
  [`--${P}-type-${d}-weight`, `${w}`],
  [`--${P}-type-${d}-line-height`, `${l}px`],
  [`--${P}-type-${d}-line-height-rem`, rem(l)],
  [`--${P}-type-${d}-letter-spacing`, `0`],
]));
