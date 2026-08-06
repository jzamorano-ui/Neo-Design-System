// theme/slices.mjs — las rebanadas (themeSlice) de cada fundamento + su merge a UN solo
// objeto de opciones. SIN dependencia de MUI → el gate lo valida en Node puro.
// Importante: hay que mergear las rebanadas en UN options y llamar createTheme UNA vez.
// (createTheme(...args) variádico mergea DESPUÉS de construir el theme y pisaría funciones
//  computadas como theme.spacing — por eso mergeamos antes.)
import { themeSlice as breakpoints } from '../tokens/breakpoints.mjs';
import { themeSlice as container } from '../tokens/container.mjs';
import { themeSlice as spacing } from '../tokens/spacing.mjs';
import { themeSlice as radius } from '../tokens/radius.mjs';
import { themeSlice as stroke } from '../tokens/stroke.mjs';
import { themeSlice as iconSize } from '../tokens/iconSize.mjs';
import { themeSlice as shadows } from '../tokens/shadows.mjs';
import { themeSlice as typography } from '../tokens/typography.mjs';
import { themeSlice as color } from '../tokens/color.mjs';
import { themeSlice as componentTokens } from '../tokens/component-tokens.mjs';
import { components } from './components.mjs';
import { themeSlice as baseline } from './baseline.mjs';

export const slices = [breakpoints, container, spacing, radius, stroke, iconSize, shadows, typography, color, componentTokens, { components }, baseline];

const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
const deepMerge = (a, b) => {
  const out = { ...a };
  for (const k of Object.keys(b)) out[k] = isObj(a[k]) && isObj(b[k]) ? deepMerge(a[k], b[k]) : b[k];
  return out;
};

// UN solo objeto de opciones (theme.neo reúne space+radius+stroke+iconSize+elevation).
export const themeOptions = slices.reduce((acc, s) => deepMerge(acc, s), {});
