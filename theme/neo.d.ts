// theme/neo.d.ts — Tipos de TypeScript de Neo. Dos cosas:
//  1) AUGMENTATIONS sobre MUI (paleta/props custom): sin esto `<Button color="brand">` marcaría error de tipo.
//  2) La API del paquete `@neo/mui` (theme, tokens y los campos accesibles) — al final del archivo.
// Nota: `data-surface="inverse"` en Button NO necesita augmentation (los data-* se aceptan siempre).
import '@mui/material/styles';
import '@mui/material/Button';
import '@mui/material/Chip';
import '@mui/material/CircularProgress';
import '@mui/material/Typography';
import type { Theme, ThemeOptions } from '@mui/material/styles';

type ColorSet = { main: string; light?: string; dark?: string; contrastText?: string };

declare module '@mui/material/styles' {
  // Breakpoints: escala compartida Bootstrap+MUI (decisión 2026-07-15). `xxl` (1536) requiere
  // esta augmentation — sin ella, `sx={{ xxl: … }}` y `theme.breakpoints.up('xxl')` marcan error de tipo.
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
  interface Palette {
    brand: ColorSet & { hover?: string; active?: string; subtle?: string };
    status: Record<'error' | 'info' | 'success' | 'warning', { bg: string; text: string; icon: string; border: string; solid: string }>;
    deco: Record<1 | 2 | 3 | 4 | 5, { soft: string; solid: string }>;
    focus: { ring: string; gap: string; inverse: string; gapInverse: string };
    border: { default: string; focus: string; disabled: string; secondary: string; brand: string; inverse: string; errorSolid: string };
    icon: { default: string; secondary: string; disabled: string; inverse: string; brand: string };
  }
  interface PaletteOptions {
    brand?: Palette['brand'];
    status?: Palette['status'];
    deco?: Palette['deco'];
    focus?: Palette['focus'];
    border?: Palette['border'];
    icon?: Palette['icon'];
  }
  interface TypeText { inverse: string; brand: string }
  interface TypeBackground { inverse: string }
  // theme.neo.* — escalas nombradas del sistema (acceso JS/sx/styled). Ej: theme.neo.space.md, theme.neo.radius.pill.
  // Record<string,…> a propósito: NO duplicamos las keys (viven en el source .mjs) para no crear drift entre .d.ts y source.
  interface Theme {
    neo: {
      space: Record<string, number>;
      radius: Record<string, number>;
      stroke: Record<string, number>;
      iconSize: Record<string, number>;
      elevation: Record<string, string>;
      container: Record<string, number>;          // content 1180 · wide 1320 (tokens/container.mjs)
      component: {
        button: { height: Record<string, number> };
        input: { height: number };                // 44 — touch target compartido text-field/select/combobox
        switch: { width: number; height: number; trackHeight: number; thumbTravel: number };
        radio: { dot: number };
        menu: { minWidth: number };
        menuItem: { minHeight: number };
      };
    };
  }
  interface ThemeOptions {
    neo?: Theme['neo'];
  }
}

// Button: color="brand"
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides { brand: true }
}
// Chip: variant="tag" | "status"
declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides { tag: true; status: true }
}
// CircularProgress: size="sm" | "md" | "lg"
declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsSizeOverrides { sm: true; md: true; lg: true }
}
// Typography: las 22 variantes Neo son API pública — <Typography variant="bodyMdBold"> tipa OK.
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    displayXlBold: true; headlineLgBold: true; headlineMdBold: true; headlineSmBold: true;
    titleLgBold: true; titleLgMedium: true; titleMdBold: true; titleMdMedium: true;
    titleSmBold: true; titleSmMedium: true; titleXsBold: true;
    bodyXlBold: true; bodyXlMedium: true; bodyXlRegular: true;
    bodyLgBold: true; bodyLgMedium: true; bodyLgRegular: true;
    bodyMdBold: true; bodyMdMedium: true; bodyMdRegular: true;
    captionSmMedium: true; captionSmRegular: true;
  }
}

// ─────────────────────────────────────────────────────────────
// API del paquete `@neo/mui` (lo que se importa desde index.mjs)
// ─────────────────────────────────────────────────────────────
export declare const theme: Theme;                    // <ThemeProvider theme={theme}>
export declare const themeOptions: ThemeOptions;       // para createTheme(themeOptions) si se quiere componer
export declare const color: Record<string, string>;    // color['fill/primary/default'] → hex
export declare const colorVars: Record<string, string>;// colorVars['fill/primary/default'] → 'var(--fill--primary--default)'
export declare const scale: Record<string, Record<string, number>>; // scale.space.md, scale.radius.pill, …
export declare function cssVar(name: string): string;  // 'fill/primary/default' → '--fill--primary--default'

