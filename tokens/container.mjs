// tokens/container.mjs — FUNDAMENTO: Container (decisión 2026-07-15).
// El container ESCALA con el breakpoint: fluid (xs–lg) → 1180 (xl 1200–1535) → 1320 (xxl ≥1536).
//   · content 1180 = conducta real del sitio público en producción (su .container custom).
//   · wide 1320    = contenido de BANDAS (header/hero/footer) y container en xxl; cierra la
//                    grilla exacta (12 col × 88px + 11 gutters × 24 = 1320) y coincide con el
//                    container xxl stock de Bootstrap.
// Bandas full-bleed: el FONDO ocupa 100% del viewport; solo el contenido interno se acota.
// Solo aplica a Marketing Layout — Product (Sucursal Virtual) es fluid + sidebar 304.
import { dualPxVars } from './_util.mjs';

// 1 · valores (single-source)
export const container = { content: 1180, wide: 1320 };

// 2 · slice MUI — expone theme.neo.container (el override de MuiContainer vive en theme/components.mjs)
export const themeSlice = { neo: { container: { ...container } } };

// 3 · CSS vars px + rem
export const cssVars = dualPxVars('container', container);
