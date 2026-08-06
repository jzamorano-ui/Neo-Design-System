// theme/baseline.mjs — junta TODAS las CSS vars (dimensionales + color) y las inyecta en :root
// vía MuiCssBaseline. Así el theme es SELF-CONTAINED: el consumidor monta <CssBaseline /> y las vars
// (--neo-* y --{intent}--{role}--{intensity}) quedan disponibles sin importar ningún .css aparte.
// Pura (sin MUI) → la compone slices.mjs y la valida el gate en Node.
import { cssVars as breakpoints } from '../tokens/breakpoints.mjs';
import { cssVars as container } from '../tokens/container.mjs';
import { cssVars as spacing } from '../tokens/spacing.mjs';
import { cssVars as radius } from '../tokens/radius.mjs';
import { cssVars as stroke } from '../tokens/stroke.mjs';
import { cssVars as iconSize } from '../tokens/iconSize.mjs';
import { cssVars as elevation } from '../tokens/shadows.mjs';
import { cssVars as type } from '../tokens/typography.mjs';
import { cssVars as color } from '../tokens/color-semantic.mjs';
import { cssVars as component } from '../tokens/component-tokens.mjs';

export const rootVars = { ...breakpoints, ...container, ...spacing, ...radius, ...stroke, ...iconSize, ...elevation, ...type, ...color, ...component };

export const themeSlice = {
  components: { MuiCssBaseline: { styleOverrides: { ':root': rootVars } } },
};
