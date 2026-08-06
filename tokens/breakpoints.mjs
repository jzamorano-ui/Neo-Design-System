// tokens/breakpoints.mjs — FUNDAMENTO: Breakpoints.
// DECISIÓN 2026-07-15 (divergencia CONSCIENTE vs la escala anterior, registrada): escala compartida
// con los frameworks en producción — sm/md/lg/xl = Bootstrap 5 (el sitio público los consume
// stock por CDN) · xxl 1536 = el xl stock de MUI (los productos MUI ya cortan ahí hoy).
// El breakpoint marca dónde ARRANCA el rango real (analytics: desktop 1280–1536), no el ancho
// de diseño: se dibuja a 1440 (estado xl, container 1180) y 1920 (estado xxl, container 1320).
// Slot MUI: 🔒 theme.breakpoints.values — llaves xs–xl de MUI + xxl vía BreakpointOverrides
//           (augmentation en theme/neo.d.ts). Migración desde defaults MUI: los cortes 1200 y
//           1536 YA existen en producción (su lg→xl, su xl→xxl); solo se mueven 600→576,
//           900→768 y se agrega 992 → validar rangos 768–899 y 992–1199 en el piloto.
import { dualPxVars } from './_util.mjs';

// 1 · valores (single-source)
export const breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1536 };

// 2 · slice MUI (createTheme clásico) — MUI usa números px
export const themeSlice = { breakpoints: { values: { ...breakpoints } } };

// 3 · CSS vars px + rem (MUI usa los valores JS, no estas vars; las emitimos para CSS plano)
export const cssVars = dualPxVars('breakpoint', breakpoints);
