# Integración — theme Neo en una app MUI

> 10 minutos. Al final: toda tu app MUI viste Neo sin tocar ningún componente.

## 1 · Instalar

Neo es un theme sobre MUI v5.18 (peer dependencies):

```sh
npm i @mui/material@^5.18 @emotion/react @emotion/styled
```

### Fuente: Noto Sans (obligatoria)

El theme **pide** `Noto Sans` pero **no la incluye**. Si tu app no la carga, cae a `system-ui` sin avisar. Instálala y **impórtala una vez** en el entry de tu app — el sistema usa tres pesos: **400** (regular), **500** (medium), **700** (bold):

```sh
npm i @fontsource/noto-sans
```

```jsx
// junto al montaje del theme (main.tsx / _app.tsx)
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/500.css';
import '@fontsource/noto-sans/700.css';
```

> Sin bundler (o SSR con `<head>` propio): un `<link>` a Google Fonts con los pesos `400;500;700`. Lo que importa es que Noto Sans esté disponible antes del primer render.

## 2 · Montar el theme (una sola vez)

```jsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@neo/mui';

export default function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />   {/* obligatorio: inyecta las variables CSS y la base tipográfica */}
      {children}
    </ThemeProvider>
  );
}
```

Con eso, `<Button>`, `<Alert>`, `<TextField>`, `<Dialog>`… salen con el estilo Neo. No hay paso 3.

## 3 · Verificar que quedó bien (checklist)

| Chequeo | Esperado |
|---|---|
| Inspeccionar `:root` en DevTools | variables `--fill--primary--default`, `--neo-space-md`, … presentes |
| Tipografía | `Noto Sans` en todo el árbol (si ves `system-ui`, falta cargar la fuente — paso 1) |
| `<Button variant="contained">` | navy `#1F3644` (no el azul MUI) |
| `<Alert severity="error">` | fondo rosado `#FEF2F2`, ícono crimson |
| Foco con teclado (Tab) | anillo azul con halo (gap) — nunca invisible |

## Formulario: lo que el theme no puede imponer solo

El theme resuelve la apariencia, pero hay una cosa que depende de cómo se arme el marcado: **el
label va estático y arriba**, no flotante como trae MUI por defecto. Se consigue componiendo
`FormControl + FormLabel + OutlinedInput` con `notched={false}`, y cableando `htmlFor`/`id` y
`aria-describedby` hacia el helper.

El ejemplo completo, con el caso de error, está en [EJEMPLOS.md](./EJEMPLOS.md). Cómo se encapsule
—componente propio, hook, nada— es decisión de ustedes.

Para el resto de los componentes se usa MUI directo. El detalle por componente: [MAPA-COMPONENTES.md](./MAPA-COMPONENTES.md).

## Notas

- **ESM**: el paquete es ES modules (`type: module`). En Jest usar `transformIgnorePatterns` o Vitest.
- **TypeScript**: los tipos cargan solos (augmentations incluidas: `color="brand"` en Button, variantes de Typography, breakpoint `xxl`).
- **Sin dark mode** por decisión de sistema — un solo modo.
- La **fuente de verdad visual es Figma**: cada spec de componente linkea su master.
