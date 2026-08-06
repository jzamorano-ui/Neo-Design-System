# Mapa de componentes — Neo → MUI → Figma

> Una fila por componente: qué componente de MUI viste el theme, qué hay que componer a mano cuando el
> theme no alcanza,
> la spec de comportamiento y el **master de Figma** (fuente de verdad — la validación visual se hace ahí).

| Componente | Base MUI | Hay que componer | Spec | Figma |
|---|---|---|---|---|
| alert | Alert | — | [alert.md](../components/alert.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=881-18695) |
| aspect-ratio | — (custom) | — | [aspect-ratio.md](../components/aspect-ratio.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003644-9939) |
| badge | Badge | — | [badge.md](../components/badge.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002369-4082) |
| banner | — (custom) | — | [banner.md](../components/banner.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003685-37499) |
| button | Button | — | [button.md](../components/button.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=557-1953) |
| checkbox | Checkbox | — | [checkbox.md](../components/checkbox.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002312-6388) |
| chips | Chip | — | [chips.md](../components/chips.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002386-4344) |
| combobox | Autocomplete | label estático | [combobox.md](../components/combobox.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003354-14160) |
| link | Link | — | [link.md](../components/link.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=564-2268) |
| menu | Menu | — | [menu.md](../components/menu.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003104-25695) |
| modal-dialog | Dialog | — | [modal-dialog.md](../components/modal-dialog.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003650-15191) |
| modal-fullscreen | Dialog | — | [modal-fullscreen.md](../components/modal-fullscreen.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003720-5194) |
| radio-button | Radio | — | [radio-button.md](../components/radio-button.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002291-3851) |
| select | Select | label estático | [select.md](../components/select.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003102-19653) |
| spinner | CircularProgress | — | [spinner.md](../components/spinner.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=774-29702) |
| tabs | Tabs | — | [tabs.md](../components/tabs.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002386-6744) |
| tag | Chip | — | [tag.md](../components/tag.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003601-163) |
| text-field | TextField (theme en OutlinedInput) | label estático | [text-field.md](../components/text-field.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002482-2745) |
| toggle | Switch | — | [toggle.md](../components/toggle.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002351-6594) |
| tooltip | Tooltip | — | [tooltip.md](../components/tooltip.md) | [abrir](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002339-1862) |

Notas:
- **aspect-ratio** — CSS aspect-ratio; default 16:9
- **badge** — number/dot = Badge · badge/estado = Chip variant="status"
- **banner** — composición con slot cover
- **modal-dialog** — anchos fijos por size (440/600/900/1200), no maxWidth de MUI
- **modal-fullscreen** — fullScreen
- **tag** — variant="tag"
