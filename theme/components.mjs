// theme/components.mjs — overrides de componentes (eje TRATAMIENTO).
// Consumen la taxonomía: var(--fill--primary--default)… + escala (var(--neo-*)). Sin tokens por componente.
import React from 'react';
import { alertIconMapping } from './alert-icons.mjs';
import { CheckboxCheckedIcon, CheckboxIndeterminateIcon } from './checkbox-icons.mjs';
import { SelectChevronIcon } from './select-icon.mjs';
const _h = React.createElement;

// Button color= → fill por intent. brand se trata aparte (hero). tertiary = ghost neutro.
const FILL = {
  primary:   { d: '--fill--primary--default', h: '--fill--primary--hover', a: '--fill--primary--active', on: '--text--base--contrast' },
  secondary: { d: '--fill--secondary--default', h: '--fill--secondary--hover', a: '--fill--secondary--active', on: '--text--base--default' },
};

// ── Alert: multicanal por severidad. bg tenue = fill/semantic/{i}/soft · texto default · ícono con el estado ──
const statusAlert = (i, theme) => ({
  backgroundColor: `var(--fill--semantic--${i}--soft)`, color: 'var(--text--base--default)',
  border: `var(--neo-stroke-xs) solid var(--border--semantic--${i === 'error' ? 'error-soft' : i})`, borderRadius: 'var(--neo-radius-sm)',
  paddingInline: 'var(--neo-space-lg)', paddingBlock: 'var(--neo-space-md)', gap: 0,
  // gap ícono↔texto = SOLO el marginRight del ícono (antes se sumaba con el gap del root = doble separación)
  '& .MuiAlert-icon': { color: `var(--icon--semantic--${i})`, width: 'var(--neo-icon-size-md)', height: 'var(--neo-icon-size-md)', padding: 0, marginRight: 'var(--neo-space-sm)' },
  // estructura Figma: título (semántico, bold) + descripción (texto base) + link separado + botón cerrar
  '& .MuiAlertTitle-root': { ...theme.typography.titleXsBold, color: `var(--text--semantic--${i})`, marginBottom: 'var(--neo-space-xs)' },
  '& .MuiAlert-message': { ...theme.typography.bodyMdRegular, padding: 0 },
  '& .MuiAlert-message .MuiLink-root': { display: 'inline-block', marginTop: 'var(--neo-space-sm)' }, // link "Ver más" en su propia línea, separado del texto (legibilidad)
  '& .MuiAlert-action': { color: 'var(--icon--base--default)', paddingTop: 0, marginRight: 0 },   // master (medido 2026-07-28)
});

// El foco del sistema son DOS capas: anillo + gap. El grosor se lee de SU token, no de `stroke/sm`
// —hoy ambos valen 2px, pero el contrato dice que el anillo se retunea con este—.
// El gap iba faltando: hasta el 2026-07-28 esta constante emitía solo el `outline`, así que
// checkbox, radio, switch, chip y link tenían la mitad del indicador. Los cuatro masters lo
// confirman con dos capas (medido): ring en focus/ring/default + gap en focus/gap/default.
const focusRing = {
  outline: 'var(--neo-stroke-focus-ring-width) solid var(--focus--ring--default)',
  outlineOffset: '2px',
  boxShadow: '0 0 0 var(--neo-stroke-focus-ring-width) var(--focus--gap--default)',
};

export const components = {
  // ═══ CONTAINER — el layout de Marketing hecho código (decisión 2026-07-15) ═══
  // Escalonado: fluid (xs–lg, padding lateral) → 1180 centrado (xl) → 1320 (xxl).
  // maxWidth:false apaga los caps por-breakpoint de MUI (no son nuestro modelo).
  // Bandas (header/hero/footer): fondo full-bleed en un Box al 100%; ADENTRO va
  //   <Container className="neo-wide"> → contenido de banda capado a 1320 desde xl.
  // Product (Sucursal Virtual) NO usa Container: es fluid + sidebar 304.
  // Breakpoints por LLAVE del theme — nunca px a mano (contrato del sistema).
  MuiContainer: {
    defaultProps: { maxWidth: false },
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: 'var(--neo-space-md)',                                   // 16 — mobile
        [theme.breakpoints.up('md')]: { paddingInline: 'var(--neo-space-lg)' }, // 24 — tablet+
        [theme.breakpoints.up('xl')]: {
          maxWidth: 'var(--neo-container-content)',                             // 1180 centrado
          paddingInline: 0,
        },
        [theme.breakpoints.up('xxl')]: { maxWidth: 'var(--neo-container-wide)' }, // 1320
        '&.neo-wide': {
          [theme.breakpoints.up('xl')]: { maxWidth: 'var(--neo-container-wide)' }, // banda: 1320 siempre
        },
      }),
    },
  },

  // ═══ TYPOGRAPHY — variantes públicas con HTML semántico ═══
  // variantMapping REEMPLAZA el default de MUI (no mergea) → incluye TODO: estándar + 22 custom Neo.
  // bold y no-bold del mismo tamaño comparten tag; el rol lo da el tamaño.
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        // estándar MUI (mantener el comportamiento nativo)
        h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
        subtitle1: 'h6', subtitle2: 'h6', body1: 'p', body2: 'p', inherit: 'p',
        button: 'span', caption: 'span', overline: 'span',
        // 22 custom Neo
        displayXlBold: 'h1',
        headlineLgBold: 'h2', headlineMdBold: 'h3', headlineSmBold: 'h4',
        titleLgBold: 'h5', titleLgMedium: 'h5',
        titleMdBold: 'h6', titleMdMedium: 'h6',
        titleSmBold: 'h6', titleSmMedium: 'h6',
        titleXsBold: 'p',
        bodyXlBold: 'p', bodyXlMedium: 'p', bodyXlRegular: 'p',
        bodyLgBold: 'p', bodyLgMedium: 'p', bodyLgRegular: 'p',
        bodyMdBold: 'p', bodyMdMedium: 'p', bodyMdRegular: 'p',
        captionSmMedium: 'span', captionSmRegular: 'span',
      },
    },
  },

  // ═══ BUTTON — sólido (contained) · tonal (secondary) · ghost (text/outlined→ghost) ═══
  // Formato Pigment-compatible: base estática + variants[{props,style}] — sin branching runtime sobre ownerState.
  MuiButton: {
    // variant=contained por defecto → <Button color="primary"> sale sólido (lo que el dev espera). Ghost = variant="text" explícito.
    defaultProps: { disableElevation: true, variant: 'contained' },
    styleOverrides: {
      root: ({ theme }) => {
        const size = (S, h, padX, padY, typo) => ({
          [`&.MuiButton-size${S}`]: { minHeight: `var(--neo-button-height-${h})`, paddingInline: `var(--neo-space-${padX})`, paddingBlock: `var(--neo-space-${padY})`, ...theme.typography[typo] },
        });
        // INVERSE — botón sobre fondo oscuro. El dev agrega data-surface="inverse" cuando es necesario.
        //   primary → botón blanco sólido · secondary → ghost con borde blanco · tertiary(ghost) → ghost blanco. (brand no tiene inverse)
        const ghostInverse = { color: 'var(--text--base--contrast)', '&:hover': { backgroundColor: 'var(--fill--tertiary--inverse--hover)' }, '&:active': { backgroundColor: 'var(--fill--tertiary--inverse--active)' } };
        // TERTIARY (ghost) — NEUTRO slate: texto slate900 + washes slate50/100 (fill/tertiary). Rest transparent.
        const ghost = { color: 'var(--text--base--default)', '&:hover': { backgroundColor: 'var(--fill--tertiary--hover)' }, '&:active': { backgroundColor: 'var(--fill--tertiary--active)' } };
        const contained = (f) => ({ backgroundColor: `var(${f.d})`, color: `var(${f.on})`, '&:hover': { backgroundColor: `var(${f.h})` }, '&:active': { backgroundColor: `var(${f.a})` } });
        return {
          gap: 'var(--neo-space-sm)', borderRadius: 'var(--neo-radius-pill)', textTransform: 'none',
          border: 'var(--neo-stroke-xs) solid transparent',
          ...theme.typography.bodyLgMedium,
          // tipografía por size = escala del master/spec (body-md/body-lg/title-sm · TODOS medium w500) · padBlock xs(Small)/sm(Med·Lg) para que la altura la fije min-height (Small 32 · Medium 40 · Large 48)
          ...size('Small', 'sm', 'md', 'xs', 'bodyMdMedium'), ...size('Medium', 'md', 'lg', 'sm', 'bodyLgMedium'), ...size('Large', 'lg', 'xl', 'sm', 'titleSmMedium'),
          '&.Mui-focusVisible': { outline: 'var(--neo-stroke-focus-ring-width) solid var(--focus--ring--default)', outlineOffset: '2px', boxShadow: '0 0 0 var(--neo-stroke-focus-ring-width) var(--focus--gap--default)' },
          '&.Mui-disabled': { backgroundColor: 'var(--fill--base--disabled)', color: 'var(--text--base--disabled)' },
          variants: [
            // inverse por tratamiento (mismo orden de emisión que antes: inverse primero, tratamiento después)
            { props: { variant: 'text' }, style: { '&[data-surface="inverse"]': ghostInverse } },
            { props: { variant: 'outlined' }, style: { '&[data-surface="inverse"]': ghostInverse } },
            { props: { variant: 'contained' }, style: { '&[data-surface="inverse"]': { backgroundColor: 'var(--fill--primary--inverse--default)', color: 'var(--text--base--default)', '&:hover': { backgroundColor: 'var(--fill--primary--inverse--hover)' }, '&:active': { backgroundColor: 'var(--fill--primary--inverse--active)' } } } },
            { props: { variant: 'contained', color: 'secondary' }, style: { '&[data-surface="inverse"]': { backgroundColor: 'var(--fill--secondary--inverse--default)', color: 'var(--text--base--contrast)', borderColor: 'var(--border--base--contrast)', '&:hover': { backgroundColor: 'var(--fill--secondary--inverse--hover)' }, '&:active': { backgroundColor: 'var(--fill--secondary--inverse--active)' } } } },
            // tratamiento por intención (solo primary/secondary tienen fill; otros colores quedan en base)
            { props: { variant: 'contained', color: 'primary' }, style: contained(FILL.primary) },
            { props: { variant: 'contained', color: 'secondary' }, style: contained(FILL.secondary) },
            { props: { variant: 'text', color: 'primary' }, style: ghost },
            { props: { variant: 'text', color: 'secondary' }, style: ghost },
            { props: { variant: 'outlined', color: 'primary' }, style: ghost },
            { props: { variant: 'outlined', color: 'secondary' }, style: ghost },
            // BRAND — hero: coral (brand/primary) + title-md-bold. Va al final: pisa cualquier tratamiento.
            { props: { color: 'brand' }, style: { ...theme.typography.titleMdBold, backgroundColor: 'var(--fill--brand--primary--default)', color: 'var(--text--base--contrast)',
              '&:hover': { backgroundColor: 'var(--fill--brand--primary--hover)' }, '&:active': { backgroundColor: 'var(--fill--brand--primary--active)' } } },
          ],
        };
      },
    },
  },

  // ═══ ICON BUTTON — el foco que MUI apaga ═══
  // `ButtonBase` de MUI fija `outline: 0` y deja el indicador de foco a cargo de la app (lo dice su
  // propio código: "the app should provide its own .Mui-focusVisible styles"). El theme no lo hacía,
  // así que TODO botón de solo ícono montado con Neo quedaba sin foco visible: la ✕ del diálogo, la
  // acción de cierre del alert, y el clear/popup del Autocomplete. WCAG 2.4.7. Encontrado el
  // 2026-07-28 — era la falla de accesibilidad más extendida del sistema, y no era de color.
  MuiIconButton: {
    styleOverrides: {
      root: {
        color: 'var(--icon--base--default)',
        borderRadius: 'var(--neo-radius-pill)',
        '&.Mui-focusVisible': focusRing,
        '&.Mui-disabled': { color: 'var(--icon--base--disabled)' },
      },
    },
  },

  // ═══ ALERT — multicanal ═══
  MuiAlert: {
    defaultProps: { iconMapping: alertIconMapping },
    styleOverrides: {
      standardError: ({ theme }) => statusAlert('error', theme), standardWarning: ({ theme }) => statusAlert('warning', theme),
      standardInfo: ({ theme }) => statusAlert('info', theme), standardSuccess: ({ theme }) => statusAlert('success', theme),
    },
  },

  // ═══ BACKDROP — scrim de modal/drawer/popover = surface/base/overlay (negro @60%) ═══
  MuiBackdrop: {
    styleOverrides: {
      root: { backgroundColor: 'var(--surface--base--overlay)' },
      invisible: { backgroundColor: 'transparent' },
    },
  },

  // ═══ DIALOG (modal) — paper surface + title(header) / content / actions(cta) ═══
  // Figma modal-dialog: header(title + ✕) · container(content) · cta(actions). 4 medidas = MUI maxWidth (xs/sm/md/lg).
  // fullScreen (Modal-Full) usa el mismo paper con <Dialog fullScreen>: MUI lo lleva a viewport completo.
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: 'var(--surface--base--default)', borderRadius: 'var(--neo-radius-xl)',   // 24, como Figma
        boxShadow: 'var(--neo-elevation-lg)', backgroundImage: 'none',
        // GUTTER horizontal ESCALA por size (= maxWidth de MUI), como el master: xs=16 · sm/md=24 · lg=32.
        // Se expone como custom prop y lo consumen title/content/actions → un solo punto de verdad.
        '--neo-dialog-gutter': 'var(--neo-space-xl)',                                  // sm · md = 24 (default)
        // ANCHOS Y ALTOS por medida — constantes del master, no la escala de breakpoints de MUI.
        // El CSS plano ya los fijaba en px y advertía «no usar la prop maxWidth de MUI: resuelve
        // contra los breakpoints del theme y daría otros anchos». El theme no los fijaba, así que
        // delegaba justo en lo que la otra capa desaconseja. Ahora las dos dicen lo mismo.
        '&.MuiDialog-paperWidthXs': { maxWidth: '440px', maxHeight: '600px', '--neo-dialog-gutter': 'var(--neo-space-lg)' },
        '&.MuiDialog-paperWidthSm': { maxWidth: '600px', maxHeight: '700px' },
        '&.MuiDialog-paperWidthMd': { maxWidth: '900px', maxHeight: '740px' },
        '&.MuiDialog-paperWidthLg': { maxWidth: '1200px', maxHeight: '840px', '--neo-dialog-gutter': 'var(--neo-space-2xl)' },
        // TIPOS CON COLOR — los 5 del master. Estaban implementados en el CSS plano y en ninguna
        // parte del theme, así que un `modal-dialog type=info` montado con MUI salía neutro.
        // Se expone con `data-type`, el mismo mecanismo que `data-surface` en Button y Chip.
        ...Object.fromEntries(['info', 'success', 'warning', 'error'].map((i) => [
          `&[data-type="${i}"]`, {
            '& .MuiDialogTitle-root': { color: `var(--text--semantic--${i})`, backgroundColor: `var(--fill--semantic--${i}--soft)`, textAlign: 'center', paddingTop: 'var(--neo-space-2xl)' },
            '& .MuiDialogContent-root': { textAlign: 'center' },
            // 56 — master. El ícono del header lo pone el consumidor dentro del DialogTitle.
            '& .MuiDialogTitle-root .MuiSvgIcon-root': { width: 'var(--neo-icon-size-3xl)', height: 'var(--neo-icon-size-3xl)' },
          },
        ])),
        '&[data-type="brand"]': {
          '& .MuiDialogTitle-root': { color: 'var(--text--base--brand)', backgroundColor: 'var(--fill--base--default)', textAlign: 'center', paddingTop: 'var(--neo-space-2xl)' },
          '& .MuiDialogContent-root': { textAlign: 'center' },
        },
        // título UNIFORME en las 4 medidas: title-sm-bold (lo pone MuiDialogTitle, sin excepción por size).
        // Antes `xs` bajaba a body-lg-bold; el master lo subió a title/sm-bold (2026-07-27) → se eliminó el override.
      }),
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      // header: título + ✕ (el consumidor pone un <IconButton> con aria-label="Cerrar"). R=sm deja aire al ✕.
      // default = title-sm-bold (sm/md/lg); xs lo pisa desde MuiDialog.paper (más específico).
      root: ({ theme }) => ({
        ...theme.typography.titleSmBold, color: 'var(--text--base--default)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--neo-space-md)',
        paddingBlock: 'var(--neo-space-lg)', paddingLeft: 'var(--neo-dialog-gutter, var(--neo-space-xl))', paddingRight: 'var(--neo-space-sm)',
      }),
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.bodyLgRegular, color: 'var(--text--base--default)',
        display: 'flex', flexDirection: 'column', gap: 'var(--neo-space-lg)',
        paddingTop: 'var(--neo-space-sm)', paddingInline: 'var(--neo-dialog-gutter, var(--neo-space-xl))', paddingBottom: 'var(--neo-space-lg)',
      }),
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: { gap: 'var(--neo-space-md)', paddingTop: 'var(--neo-space-lg)', paddingInline: 'var(--neo-dialog-gutter, var(--neo-space-xl))', paddingBottom: 'var(--neo-space-xl)' },
    },
  },

  // ═══ CHECKBOX — box 24px, fill primary al marcar ═══
  MuiCheckbox: {
    defaultProps: { disableRipple: true, checkedIcon: _h(CheckboxCheckedIcon), indeterminateIcon: _h(CheckboxIndeterminateIcon) },
    styleOverrides: {
      root: {
        padding: 'var(--neo-space-sm)',
        // 44×44 = área de toque del master (WCAG 2.5.8). Con padding sm el ícono de 24 da 40; el 44
        // va como constante de layout porque no existe un token de 10 y agregarlo es 🔴 (FREEZE).
        minWidth: '44px', minHeight: '44px',
        '& .MuiSvgIcon-root': {
          width: 'var(--neo-icon-size-md)', height: 'var(--neo-icon-size-md)', borderRadius: 'var(--neo-radius-xs)',
          border: 'var(--neo-stroke-xs) solid var(--border--base--default)', backgroundColor: 'var(--fill--base--default)', color: 'transparent', boxSizing: 'border-box',
        },
        '&:hover .MuiSvgIcon-root': { borderColor: 'var(--border--base--focus)' },
        '&.Mui-checked .MuiSvgIcon-root, &.MuiCheckbox-indeterminate .MuiSvgIcon-root': { /* rc-skip: glifo checked = ícono (icon token, como Figma) */ backgroundColor: 'var(--icon--base--default)', borderColor: 'var(--icon--base--default)', color: 'var(--text--base--contrast)' },
        '&.Mui-focusVisible .MuiSvgIcon-root': focusRing,
        '&.Mui-disabled .MuiSvgIcon-root': { backgroundColor: 'var(--fill--base--disabled)', borderColor: 'var(--border--base--disabled)' },
        // disabled + checked = GLIFO neutro gray200 (icon/base/disabled) + check blanco → visible. El control se trata como ícono en disabled.
        '&.Mui-disabled.Mui-checked .MuiSvgIcon-root, &.Mui-disabled.MuiCheckbox-indeterminate .MuiSvgIcon-root': { /* rc-skip: glifo disabled = icon-neutral */ backgroundColor: 'var(--icon--base--disabled)', borderColor: 'var(--icon--base--disabled)', color: 'var(--text--base--contrast)' },
      },
    },
  },

  // ═══ RADIO — ring + dot dibujados en CSS ═══
  MuiRadio: {
    defaultProps: { disableRipple: true },
    styleOverrides: {
      root: {
        position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--neo-space-sm)',
        minWidth: '44px', minHeight: '44px',   // área de toque del master, igual que checkbox
        '& svg': { display: 'none' },
        '&::before': { content: '""', boxSizing: 'border-box', width: 'var(--neo-icon-size-md)', height: 'var(--neo-icon-size-md)', borderRadius: 'var(--neo-radius-pill)', border: 'var(--neo-stroke-xs) solid var(--border--base--default)', backgroundColor: 'var(--fill--base--default)' },
        '&::after': { content: '""', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'var(--neo-radio-dot)', height: 'var(--neo-radio-dot)', borderRadius: 'var(--neo-radius-pill)', backgroundColor: 'var(--fill--base--default)', opacity: 0 },  // dot = círculo relleno blanco → fill
        '&:hover::before': { borderColor: 'var(--border--base--focus)' },
        '&.Mui-checked::before': { /* rc-skip: glifo checked = ícono */ backgroundColor: 'var(--icon--base--default)', borderColor: 'var(--icon--base--default)' },
        '&.Mui-checked::after': { opacity: 1 },
        '&.Mui-focusVisible::before': focusRing,
        '&.Mui-disabled::before': { backgroundColor: 'var(--fill--base--disabled)', borderColor: 'var(--border--base--disabled)' },
        // disabled + checked = GLIFO neutro gray200 (icon/base/disabled); el dot blanco (::after) contrasta → visible
        '&.Mui-disabled.Mui-checked::before': { /* rc-skip: glifo disabled = icon-neutral */ backgroundColor: 'var(--icon--base--disabled)', borderColor: 'var(--icon--base--disabled)' },
      },
    },
  },

  // ═══ SWITCH (toggle) — track 48×24, success al encender ═══
  MuiSwitch: {
    defaultProps: { disableRipple: true },
    styleOverrides: {
      root: { width: 'var(--neo-switch-width)', height: 'var(--neo-switch-height)', padding: 0, display: 'inline-flex', alignItems: 'center', overflow: 'visible' },
      switchBase: {
        padding: 'var(--neo-space-xs)', top: '50%', transform: 'translateY(-50%)',
        '&.Mui-checked': { transform: 'translateX(var(--neo-switch-thumb-travel)) translateY(-50%)' },
        '&.Mui-checked + .MuiSwitch-track': { backgroundColor: 'var(--fill--semantic--success--solid)', opacity: 1 },   // ON = verde sólido
        // disabled (como Figma): track fill/base/disabled + BORDE border/base/disabled · thumb fill/base/medium (no strong)
        '&.Mui-disabled + .MuiSwitch-track': { backgroundColor: 'var(--fill--base--disabled)', opacity: 1, border: 'var(--neo-stroke-xs) solid var(--border--base--disabled)' },
        '&.Mui-disabled .MuiSwitch-thumb': { backgroundColor: 'var(--fill--base--medium)' },
        '&.Mui-focusVisible + .MuiSwitch-track': focusRing,
      },
      thumb: { width: 'var(--neo-icon-size-xs)', height: 'var(--neo-icon-size-xs)', borderRadius: 'var(--neo-radius-pill)', backgroundColor: 'var(--fill--base--default)', boxShadow: 'none' },
      track: { width: 'var(--neo-switch-width)', height: 'var(--neo-switch-track-height)', borderRadius: 'var(--neo-radius-pill)', backgroundColor: 'var(--fill--base--strong)', opacity: 1 },  // OFF = gris medio (neutral/strong)
    },
  },

  // ═══ CHIP — 3 variants: interactivo · tag · status ═══
  // Formato Pigment-compatible: variants[{props,style}] — sin branching runtime sobre ownerState.
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => {
        const label = { '& .MuiChip-label': { padding: 0 } };
        // CHIP interactivo — default ghost (tertiary). filled (default MUI) y outlined reciben el mismo tratamiento.
        const interactive = {
          // `label` resetea el padding propio de MUI en `.MuiChip-label`. Sin esto el horizontal se
          // DUPLICA: 12 nuestros + 12 de MUI = 24, contra los 12 del master (medido 2026-07-28).
          // `tag` y `status` ya lo aplicaban; el interactivo se había quedado afuera.
          ...label,
          ...theme.typography.bodyMdMedium, height: 'auto', borderRadius: 'var(--neo-radius-pill)', gap: 'var(--neo-space-xs)',
          paddingInline: 'var(--neo-space-md)', paddingBlock: 'var(--neo-space-sm)',
          backgroundColor: 'var(--fill--base--default)', border: 'var(--neo-stroke-xs) solid var(--border--base--default)', color: 'var(--text--base--default)',
        };
        // estados focus/disabled del interactivo — van DESPUÉS de hover/selected (mismo orden de emisión que antes)
        const interactiveStates = {
          '&.Mui-focusVisible': focusRing,
          '&.Mui-disabled': { opacity: 1, backgroundColor: 'var(--fill--base--disabled)', borderColor: 'var(--border--base--disabled)', color: 'var(--text--base--disabled)' },
        };
        // hover SOLO para NO seleccionados — el selected lo pisa después con su propio :hover.
        // Relleno PRIMARY (oscuro) con label e íconos en contrast: el master cambió de la rampa
        // secondary a primary el 2026-08-03, y con eso el hover pasó de 1.63:1 a 8.93:1 contra el
        // chip disponible. El borde iguala al relleno para fundirse (el master no le pone stroke).
        const hoverWash = { '&:hover': {
          backgroundColor: 'var(--fill--primary--hover)', /* rc-skip: chip borderless en hover — el borde iguala al relleno, no es un borde funcional */ borderColor: 'var(--fill--primary--hover)',
          color: 'var(--text--base--contrast)', '& .MuiChip-icon': { color: 'var(--icon--base--contrast)' },
        } };
        // selected = ESTADO ACTIVO (primary). El :hover se fija en el MISMO valor → no cambia (tapa el hover default de MUI).
        // MUI Chip NO emite Mui-selected → el estado va por el ATRIBUTO `data-selected="true"` (válido en el DOM, como data-surface).
        // (Antes iba por una prop custom `selected` que se FILTRABA al <div> raíz como atributo espurio — H1 pre-freeze.)
        // 2026-08-03: era `fill/secondary/active` (#9BB3C3) y daba 2.18:1 contra el chip disponible —
        // la excepción E3 que el owner tenía aceptada. Con `fill/primary/active` da 16.64:1 y E3 se cierra.
        const selected = { backgroundColor: 'var(--fill--primary--active)', /* rc-skip: chip borderless — el borde iguala al relleno (fill) para fundirse, no es un borde funcional */ borderColor: 'var(--fill--primary--active)', color: 'var(--text--base--contrast)', '& .MuiChip-icon': { color: 'var(--icon--base--contrast)' }, '&:hover': { backgroundColor: 'var(--fill--primary--active)', borderColor: 'var(--fill--primary--active)' } };
        // STATUS — pill de color por estado (soft). Prop MUI 'error' → token 'error'.
        const statusColor = (c) => ({ border: `var(--neo-stroke-xs) solid var(--border--semantic--${c === 'error' ? 'error-soft' : c})`, backgroundColor: `var(--fill--semantic--${c}--soft)`, color: `var(--text--semantic--${c})` });
        return {
          variants: [
            { props: { variant: 'filled' }, style: interactive },
            { props: { variant: 'outlined' }, style: interactive },
            { props: { variant: 'filled', clickable: true }, style: hoverWash },
            { props: { variant: 'outlined', clickable: true }, style: hoverWash },
            { props: { variant: 'filled' }, style: { '&[data-selected="true"]': selected } },
            { props: { variant: 'outlined' }, style: { '&[data-selected="true"]': selected } },
            { props: { variant: 'filled' }, style: interactiveStates },
            { props: { variant: 'outlined' }, style: interactiveStates },
            // TAG — estático neutral (gray)
            { props: { variant: 'tag' }, style: {
              ...theme.typography.bodyMdMedium, height: 'auto', borderRadius: 'var(--neo-radius-xs)',
              paddingInline: 'var(--neo-space-sm)', paddingBlock: 'var(--neo-space-xs)', gap: 'var(--neo-space-xs)',
              backgroundColor: 'var(--fill--base--light)', border: 'var(--neo-stroke-xs) solid var(--border--base--default)', color: 'var(--text--base--secondary)',  // borde y label: master (medido 2026-07-28)
              // type=dark del master (fill/base/inverse + text/base/contrast). Existía en Figma y en la
              // spec, y no estaba en ninguna capa. Se expone con `data-surface="inverse"`, el mismo
              // mecanismo que ya usa Button — no una API nueva.
              '&[data-surface="inverse"]': {
                backgroundColor: 'var(--fill--base--inverse)', borderColor: 'var(--fill--base--inverse)',
                color: 'var(--text--base--contrast)',
                '& .MuiChip-icon': { color: 'var(--icon--base--contrast)' },
              },
              ...label, '& .MuiChip-icon': { color: 'var(--icon--base--secondary)', margin: 0, width: 'var(--neo-icon-size-sm)', height: 'var(--neo-icon-size-sm)' },   // 20 — master `tag.icono` (el theme tenía 16; el CSS plano ya decía 20)
            } },
            // STATUS — base neutral (colores sin token semántico) + un variant por estado
            { props: { variant: 'status' }, style: {
              ...theme.typography.bodyMdMedium, height: 'auto', borderRadius: 'var(--neo-radius-pill)',
              paddingInline: 'var(--neo-space-md)', paddingBlock: 'var(--neo-space-xs)', border: 'var(--neo-stroke-xs) solid var(--border--base--secondary)',
              backgroundColor: 'var(--fill--base--light)', color: 'var(--text--base--default)', ...label,
            } },
            { props: { variant: 'status', color: 'success' }, style: statusColor('success') },
            { props: { variant: 'status', color: 'error' }, style: statusColor('error') },
            { props: { variant: 'status', color: 'info' }, style: statusColor('info') },
            { props: { variant: 'status', color: 'warning' }, style: statusColor('warning') },
          ],
        };
      },
    },
  },

  // ═══ BADGE — indicador numérico / punto. bg fill/brand/primary/default (master 2026-07-27). Los estados de color van en Chip variant=status. ═══
  MuiBadge: {
    styleOverrides: {
      badge: ({ theme }) => ({
        ...theme.typography.captionSmMedium, backgroundColor: 'var(--fill--semantic--error--solid)', color: 'var(--text--base--contrast)',
        minWidth: 'var(--neo-icon-size-sm)', height: 'var(--neo-icon-size-sm)', borderRadius: 'var(--neo-radius-pill)', paddingInline: 'var(--neo-space-xs)',
      }),
      dot: { minWidth: 'var(--neo-space-sm)', width: 'var(--neo-space-sm)', height: 'var(--neo-space-sm)', padding: 0, borderRadius: 'var(--neo-radius-pill)', backgroundColor: 'var(--fill--semantic--error--solid)' },
    },
  },

  // ═══ LINK — subrayado 1px propio, slate ═══
  // Formato Pigment-compatible: root estático + variant para underline="none" (sin branching runtime sobre ownerState).
  MuiLink: {
    defaultProps: { underline: 'always', color: 'inherit' },
    styleOverrides: {
      root: {
        display: 'inline-flex', alignItems: 'center', gap: 'var(--neo-space-xs)', cursor: 'pointer', position: 'relative',
        // LINK sin token propio (2026-07-24): color:inherit = toma el color del texto que lo rodea (oscuro sobre claro, blanco sobre inverse → default+inverse se resuelven solos, como MUI). El subrayado (::after) lo distingue. Sin hover/active de color.
        borderRadius: 'var(--neo-radius-xs)', textDecoration: 'none', color: 'inherit',
        // Subrayado SÓLIDO y sin estados — esto ES el comportamiento de MUI para nuestra config.
        // MUI atenúa el subrayado a alpha(color, .4) SOLO en la rama `color !== 'inherit'` (Link.js v5.18);
        // con `color: 'inherit'` deja `text-decoration` sólido y el hover no cambia nada. Verificado
        // renderizando el componente real. Antes copiábamos el 0.4 de la rama equivocada: además de no ser
        // MUI-literal, dejaba el subrayado en 2.47:1 sobre blanco — y como el link no se distingue por color,
        // el subrayado es su único identificador (WCAG 1.4.11 pide 3:1). Sólido da 16.64:1.
        '&::after': { content: '""', position: 'absolute', bottom: 0, left: 0, right: 0, height: 'var(--neo-stroke-xs)', background: 'currentColor' },
        '&:focus-visible': focusRing,
        '&[aria-disabled="true"]': { color: 'var(--text--base--disabled)', pointerEvents: 'none', cursor: 'not-allowed' },
        variants: [
          { props: { underline: 'none' }, style: { '&::after': { display: 'none' } } },
        ],
      },
    },
  },

  // ═══ TOOLTIP — info-azul, system-wide (decisión final confirmada 2026-07-27 = master Figma; fill/semantic/info/solid + texto contrast, WCAG 7.79) ═══
  MuiTooltip: {
    defaultProps: {
      arrow: true,
      // Margen trigger → tooltip = 8 (space/sm), lo que la spec declara y ninguna capa fijaba: sin
      // esto queda el offset por defecto de MUI. El eje transversal va en 0; el 8 es la separación.
      slotProps: { popper: { modifiers: [{ name: 'offset', options: { offset: [0, 8] } }] } },
    },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...theme.typography.bodyMdRegular, backgroundColor: 'var(--fill--semantic--info--solid)', color: 'var(--text--base--contrast)',
        paddingInline: 'var(--neo-space-sm)', paddingBlock: 'var(--neo-space-xs)', borderRadius: 'var(--neo-radius-xs)', maxWidth: '40ch',   // ~40 caracteres por línea: 80 de contenido entran en 2 líneas legibles
      }),
      // Flecha 12×6 (spec). MUI la dimensiona en `em` y la rota, así que el tamaño quedaba atado al
      // font-size en vez de al contrato. Se fija en px y se gira con la colocación: 12 de base × 6
      // de altura arriba y abajo, y al revés a los costados.
      arrow: {
        /* rc-skip: la flecha del Tooltip de MUI se pinta con `color`, no con `background` — es idiom del framework, no un rol mal usado */ color: 'var(--fill--semantic--info--solid)',
        '[data-popper-placement*="top"] &, [data-popper-placement*="bottom"] &': { width: '12px', height: '6px' },
        '[data-popper-placement*="left"] &, [data-popper-placement*="right"] &': { width: '6px', height: '12px' },
      },
    },
  },

  // ═══ SPINNER ═══
  // Formato Pigment-compatible: base estática (md = fallback para cualquier size no mapeado) + variants sm/lg.
  MuiCircularProgress: {
    styleOverrides: {
      root: {
        color: 'var(--icon--base--default)', width: 'var(--neo-icon-size-md) !important', height: 'var(--neo-icon-size-md) !important', flexShrink: 0,
        '& .MuiCircularProgress-circle': { strokeWidth: 3.6667 },
        variants: [
          { props: { size: 'sm' }, style: { width: 'var(--neo-icon-size-sm) !important', height: 'var(--neo-icon-size-sm) !important', '& .MuiCircularProgress-circle': { strokeWidth: 4.4 } } },
          { props: { size: 'lg' }, style: { width: 'var(--neo-icon-size-lg) !important', height: 'var(--neo-icon-size-lg) !important', '& .MuiCircularProgress-circle': { strokeWidth: 4.125 } } },
        ],
      },
    },
  },

  // ═══ TABS — indicador inferior 2px ═══
  MuiTabs: {
    styleOverrides: {
      // línea base gris vía ::after (bottom:0) + indicador navy ENCIMA (mismo bottom, zIndex) → NO se duplican/montan.
      // Ambos 2px en el mismo lugar: el activo tapa el gris; los inactivos muestran el gris. Una sola línea continua (como Figma).
      root: { minHeight: 'auto', position: 'relative', '&::after': { content: '""', position: 'absolute', left: 0, right: 0, bottom: 0, height: 'var(--neo-stroke-sm)', /* rc-skip: línea base = border, va como backgroundColor de la pseudo */ backgroundColor: 'var(--border--base--default)' } },  // divisor: master (medido 2026-07-28)
      // indicador = LÍNEA → token border (no fill), como Figma. navy/dark, tapa la línea base gris.
      indicator: { height: 'var(--neo-stroke-sm)', /* rc-skip: indicador = línea = border, va como backgroundColor de un span */ backgroundColor: 'var(--border--base--focus)', zIndex: 1 },
    },
  },
  MuiTab: {
    defaultProps: { disableRipple: true },
    styleOverrides: {
      root: ({ theme }) => ({
        // medido contra el master: fila 40 (lh24 + padBlock sm×2) · label 16px body-lg-MEDIUM en todos los estados (la diferencia activo↔inactivo es SOLO color, no peso)
        minHeight: 'auto', textTransform: 'none', gap: 'var(--neo-space-sm)', paddingInline: 'var(--neo-space-lg)', paddingBlock: 'var(--neo-space-sm)',
        ...theme.typography.bodyLgMedium, color: 'var(--text--base--secondary)',
        '&:hover': { backgroundColor: 'var(--fill--tertiary--hover)' },
        '&.Mui-selected': { color: 'var(--text--base--default)' },
        '&.Mui-focusVisible': { outline: 'var(--neo-stroke-focus-ring-width) solid var(--focus--ring--default)', outlineOffset: '-2px' },
        '&.Mui-disabled': { color: 'var(--text--base--disabled)' },
      }),
    },
  },

  // ═══ FORM (text-field / select) — label ESTÁTICO arriba ═══
  MuiFormControl: { styleOverrides: { root: { display: 'flex', flexDirection: 'column', gap: 'var(--neo-space-xs)' } } },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.bodyLgMedium, color: 'var(--text--base--default)',
        '&.Mui-focused': { color: 'var(--text--base--default)' },
        '&&.Mui-error': { color: 'var(--text--semantic--error)' },
        '&.Mui-disabled': { color: 'var(--text--base--disabled)' },
        '& .MuiFormLabel-asterisk': { color: 'var(--text--semantic--error)' },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        minHeight: 'var(--neo-input-height)', // 44 = touch-target del master (padBlock 8 + lh 24 = 40 quedaba corto)
        borderRadius: 'var(--neo-radius-sm)', backgroundColor: 'var(--fill--base--default)', gap: 'var(--neo-space-xs)',
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border--base--default)', borderWidth: 'var(--neo-stroke-xs)' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border--base--focus)' },  // hover explícito (token Neo) — MUI default oscurecía a slate900, inconsistente con el focus
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border--base--focus)', borderWidth: 'var(--neo-stroke-sm)' },
        '&.Mui-focused': { boxShadow: '0 0 0 var(--neo-stroke-focus-ring-width) var(--focus--gap--default), 0 0 0 calc(var(--neo-stroke-focus-ring-width) * 2) var(--focus--ring--default)' },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border--semantic--error-solid)', borderWidth: 'var(--neo-stroke-sm)' },
        '&.Mui-disabled': { backgroundColor: 'var(--fill--base--disabled)', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border--base--disabled)' } },
        '&.MuiInputBase-readOnly': { backgroundColor: 'var(--fill--base--medium)', '& .MuiOutlinedInput-input': { color: 'var(--text--base--default)' } },
      },
      input: ({ theme }) => ({
        ...theme.typography.bodyLgRegular, color: 'var(--text--base--default)', paddingInline: 'var(--neo-space-md)', paddingBlock: 'var(--neo-space-sm)',
        '&::placeholder': { color: 'var(--text--base--secondary)', opacity: 1 },
        '&.Mui-disabled': { WebkitTextFillColor: 'var(--text--base--disabled)' },
      }),
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.bodyMdRegular, color: 'var(--text--base--secondary)', marginInline: 0,
        // error = texto crítico + ícono de alerta que viene del THEME (token-coloreado vía mask); el consumidor no lo dibuja.
        // `&&` sube especificidad para ganarle SIEMPRE al rojo default de MUI (misma clase, mismo peso → sería frágil).
        '&&.Mui-error': {
          color: 'var(--text--semantic--error)', display: 'flex', alignItems: 'center', gap: 'var(--neo-space-xs)',
          '&::before': {
            content: '""', flex: '0 0 auto', width: 'var(--neo-icon-size-xs)', height: 'var(--neo-icon-size-xs)', /* rc-skip: ícono con mask, el bg ES el color del glifo */ backgroundColor: 'var(--icon--semantic--error)',
            maskImage: `url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill-rule='evenodd' d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11 12V8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12ZM12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15Z'/></svg>")}")`,
            WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill-rule='evenodd' d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11 12V8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12ZM12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15Z'/></svg>")}")`,
            maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
          },
        },
        '&.Mui-disabled': { color: 'var(--text--base--disabled)' },
      }),
    },
  },

  // ═══ MENU — panel flotante ═══
  MuiMenu: {
    defaultProps: { anchorOrigin: { vertical: 'bottom', horizontal: 'left' }, transformOrigin: { vertical: 'top', horizontal: 'left' } },
    styleOverrides: {
      paper: {
        marginTop: 'var(--neo-space-sm)', minWidth: 'var(--neo-menu-min-width)', backgroundColor: 'var(--surface--base--default)',
        // Master (medido 2026-07-28): borde SUTIL —la elevación la da la sombra— y el panel SIN
        // padding, con las filas llegando al borde. El alto con scroll son 6 filas de 40 + 50% de
        // la séptima = 260, no un valor libre.
        border: 'var(--neo-stroke-xs) solid var(--border--base--secondary)', borderRadius: 'var(--neo-radius-sm)',
        boxShadow: 'var(--neo-elevation-md)', overflow: 'hidden',
        '& .MuiMenu-list': { paddingBlock: 0 },
        maxHeight: '260px',   // constante de layout, NO token: los tokens nacen en Figma, no acá
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        // paddingBlock sm (8), NO md (12): con 12 la fila mide 48 (12+24+12) y el panel con scroll
        // —que son 6 filas de 40 + media séptima = 260— mostraría 5,4 filas. El master dice 8.
        gap: 'var(--neo-space-md)', minHeight: 'var(--neo-menu-item-min-height)', paddingBlock: 'var(--neo-space-sm)', paddingInline: 'var(--neo-space-lg)',
        ...theme.typography.bodyLgRegular, color: 'var(--text--base--default)', backgroundColor: 'var(--fill--base--default)',
        '&:hover': { backgroundColor: 'var(--fill--tertiary--hover)' },
        '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: 'var(--fill--tertiary--active)' },
        // FOCO = anillo + gap, y NADA más: no toca el fondo, así que la opción seleccionada se
        // sigue viendo debajo (antes lo pisaba con fill/base/default y se perdía la selección).
        // El orden importa: las box-shadow se pintan de adelante hacia atrás, así que el ANILLO va
        // primero y el gap detrás. Invertido —como estaba— la banda de 4px tapaba el anillo de 2px
        // y el foco quedaba invisible (1.07:1 contra el fondo).
        '&.Mui-focusVisible': { boxShadow: 'inset 0 0 0 var(--neo-stroke-focus-ring-width) var(--focus--ring--default), inset 0 0 0 calc(var(--neo-stroke-focus-ring-width) * 2) var(--focus--gap--default)' },
        '&.Mui-disabled': { opacity: 1, backgroundColor: 'var(--fill--base--disabled)', color: 'var(--text--base--disabled)' },
      }),
    },
  },

  // ═══ SELECT ═══
  MuiSelect: {
    defaultProps: { IconComponent: SelectChevronIcon },
    styleOverrides: {
      // paddingBlock sm (8), NO md (12): esta regla tiene más especificidad que la de
      // MuiOutlinedInput.input, así que con 12 el control quedaba en 48 (24 de línea + 12 + 12) y
      // se descalzaba 4px del TextField en el mismo formulario. El master fija el alto en 44.
      select: ({ theme }) => ({ ...theme.typography.bodyLgRegular, color: 'var(--text--base--default)', textAlign: 'left', paddingBlock: 'var(--neo-space-sm)' }),
      icon: { width: 'var(--neo-icon-size-md)', height: 'var(--neo-icon-size-md)', top: 'calc(50% - (var(--neo-icon-size-md) / 2))', color: 'var(--icon--base--secondary)', transition: 'transform 150ms ease' },
      iconOpen: { transform: 'rotate(180deg)' },
    },
  },

  // ═══ COMBOBOX — Autocomplete ═══
  MuiAutocomplete: {
    styleOverrides: {
      // El panel del combobox ES el mismo `menu/list` del master, así que espeja a MuiMenu.paper:
      // borde SUTIL (la elevación la da la sombra), sin padding-block y con el alto de 260.
      // Estaba divergiendo en las tres cosas — borde default, padding 8 y sin tope de alto — así que
      // el select y el combobox mostraban dos paneles distintos para la misma anatomía.
      paper: {
        backgroundColor: 'var(--surface--base--default)', border: 'var(--neo-stroke-xs) solid var(--border--base--secondary)',
        borderRadius: 'var(--neo-radius-sm)', boxShadow: 'var(--neo-elevation-md)', marginTop: 'var(--neo-space-sm)',
        overflow: 'hidden', maxHeight: '260px',
      },
      listbox: { paddingBlock: 0, maxHeight: '260px' },
      option: ({ theme }) => ({
        // paddingBlock sm (8), NO md (12): con 12 la fila mide 48 (12+24+12) y el panel con scroll
        // —que son 6 filas de 40 + media séptima = 260— mostraría 5,4 filas. El master dice 8.
        gap: 'var(--neo-space-md)', minHeight: 'var(--neo-menu-item-min-height)', paddingBlock: 'var(--neo-space-sm)', paddingInline: 'var(--neo-space-lg)',
        ...theme.typography.bodyLgRegular, color: 'var(--text--base--default)',
        '&:hover': { backgroundColor: 'var(--fill--tertiary--hover)' },
        // foco y selección son DOS cosas: el foco lo comunica el anillo, la selección el fondo.
        // Antes compartían fondo y navegar con flechas sobre la opción ya seleccionada no cambiaba nada.
        '&[aria-selected="true"]': { backgroundColor: 'var(--fill--tertiary--active)' },
        '&.Mui-focused': { boxShadow: 'inset 0 0 0 var(--neo-stroke-focus-ring-width) var(--focus--ring--default), inset 0 0 0 calc(var(--neo-stroke-focus-ring-width) * 2) var(--focus--gap--default)' },
        // Disabled: MuiMenuItem ya lo tenía y la opción del combobox no, así que una opción
        // deshabilitada se veía igual que una disponible.
        '&.Mui-disabled': { backgroundColor: 'var(--fill--base--disabled)', color: 'var(--text--base--disabled)', opacity: 1 },
        // El ícono de la opción mide 24 en el master (`menuItem.icono`); no lo fijaba ninguna capa.
        '& .MuiSvgIcon-root': { width: 'var(--neo-icon-size-md)', height: 'var(--neo-icon-size-md)' },
      }),
      clearIndicator: { color: 'var(--icon--base--secondary)' },
      // `filled` = con valor elegido → el chevron sube a icon/base/default (spec). Antes era
      // siempre secondary, así que un select con valor y uno vacío se veían igual.
      popupIndicator: { color: 'var(--icon--base--secondary)' },
    },
  },
};
