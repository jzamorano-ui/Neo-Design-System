# Ejemplos — recetas de uso

> Todo sale del theme o de los tokens exportados. Si necesitas un hex, algo anda mal.

## Componentes MUI (sin nada extra)

```jsx
import { Button, Alert, Chip, Tooltip, CircularProgress } from '@mui/material';

<Button variant="contained">Continuar</Button>            {/* primary navy */}
<Button variant="contained" color="brand">Cotizar</Button> {/* coral de marca (augmentation Neo) */}
<Button variant="outlined">Volver</Button>
<Alert severity="success">Guardado.</Alert>
<Chip label="Activo" variant="status" />                   {/* badge de estado */}
```

## Formulario — el label va ESTÁTICO

Es el único requisito que el theme no puede imponer solo. MUI trae el label **flotante** (se
encoge sobre el borde al escribir); Neo lo quiere **arriba y fijo**. Sale de componer
`FormControl + FormLabel + OutlinedInput`, con `notched={false}` para que el borde no deje el hueco
del label flotante:

```jsx
import { FormControl, FormLabel, OutlinedInput, FormHelperText, Select, MenuItem } from '@mui/material';

const id = useId();

<FormControl fullWidth variant="outlined">
  <FormLabel htmlFor={id}>Nombre</FormLabel>
  <OutlinedInput id={id} notched={false} aria-describedby={`${id}-helper`} />
  <FormHelperText id={`${id}-helper`}>Como aparece en su cédula</FormHelperText>
</FormControl>
```

En error, el mensaje va en el mismo `FormHelperText`: `error` lo pinta y es lo que queda
referenciado por `aria-describedby`, así el lector de pantalla lo anuncia junto al campo.

```jsx
<FormControl fullWidth variant="outlined" error>
  <FormLabel htmlFor={id}>Correo</FormLabel>
  <OutlinedInput id={id} notched={false} aria-describedby={`${id}-helper`} />
  <FormHelperText id={`${id}-helper`}>Formato inválido</FormHelperText>
</FormControl>
```

`Select` y `Autocomplete` se arman igual: el mismo `FormControl + FormLabel`, cambiando el control.

```jsx
<FormControl fullWidth>
  <FormLabel htmlFor={id}>Región</FormLabel>
  <Select id={id} displayEmpty value={v} onChange={onChange}>
    {regiones.map((r) => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
  </Select>
</FormControl>
```

Cómo se encapsule esto —un componente propio, un hook, nada— lo deciden ustedes. Acá está el
requisito, no la forma.

## Espaciado y layout — `sx` con el theme

```jsx
// theme.neo.* = la escala nombrada del sistema (px)
<Stack sx={{ gap: (t) => `${t.neo.space.md}px`, p: (t) => `${t.neo.space.lg}px` }}>

// theme.spacing() = factor MUI clásico (8px) — para código MUI idiomático
<Box sx={{ mt: 2 }} />   {/* 16px */}

// breakpoints Neo (incluye xxl 1536)
<Box sx={{ width: { xs: '100%', lg: 480, xxl: 560 } }} />
```

## Color puntual — tokens, nunca hex

```jsx
import { colorVars } from '@neo/mui';

<Box sx={{ background: colorVars['fill/semantic/info/soft'], borderRadius: 'var(--neo-radius-sm)' }}>
<Typography sx={{ color: colorVars['text/base/secondary'] }}>Texto de apoyo</Typography>
```

## Tipografía — variantes del sistema

```jsx
// 13 variantes MUI ya mapeadas (h1..caption) + 22 variantes Neo
<Typography variant="h1">Título</Typography>
<Typography variant="bodyMdRegular">Cuerpo estándar</Typography>
<Typography variant="titleSmBold">Encabezado de card</Typography>
```

## styled() — componente propio dentro del sistema

```jsx
import { styled } from '@mui/material/styles';

const Panel = styled('section')(({ theme }) => ({
  background: 'var(--surface--base--secondary)',
  border: '1px solid var(--border--base--secondary)',
  borderRadius: theme.neo.radius.md,
  padding: theme.neo.space.xl,
}));
```

## Anti-patrones (no hacer)

```jsx
// ❌ hex suelto                      → usar token
<Box sx={{ background: '#F4F7F9' }} />
// ❌ token de estado en elemento estático → hover/active los maneja el componente
<Box sx={{ background: colorVars['fill/primary/hover'] }} />
// ❌ texto secundario sobre fondo de color → default o contrast
<Typography sx={{ color: colorVars['text/base/secondary'], background: colorVars['fill/semantic/info/soft'] }} />
```
