// theme/index.mjs — COMPOSER: UN solo theme Neo (entrypoint para apps con bundler).
// Junta todas las rebanadas de fundamento (mergeadas en themeOptions) en un único createTheme.
// Esta es la pieza que el dev monta UNA vez. (color y componentes se suman en su fase.)
import { createTheme } from '@mui/material/styles';
import { themeOptions } from './slices.mjs';

export { themeOptions };
export const theme = createTheme(themeOptions);
export default theme;
