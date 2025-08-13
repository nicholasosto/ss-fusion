# Versions index

Quick lookup of what shipped in each release line. For detailed, chronological changes, see the CHANGELOG.

- Full changelog: [CHANGELOG.md](./CHANGELOG.md)
- Component status/tracking: [docs/COMPONENT_STATUS.md](./docs/COMPONENT_STATUS.md)

## 2.2.x (current)

Highlights:

- New components for drag-and-drop (experimental):
  - `DragHandle` — UIDragDetector-based handle for window/title-bar dragging. [Source](./src/atoms/DragHandle.ts)
  - `Draggable` — Wrap any UI with a UIDragDetector. [Source](./src/molecules/Draggable.ts)
  - `DropZone` — Declarative drop target integrated with DragManager. [Source](./src/molecules/DropZone.ts)
- New organism:
  - `PanelWindow` — Composes `TitleBar` + content area; optional close button. [Source](./src/organisms/PanelWindow.ts)
- Example:
  - Drag & drop demo showing window dragging, draggable item, and drop zone. [Example](./src/examples/drag-demo.ts)

Notes:

- Drag components rely on Roblox Studio's UIDragDetector (currently a Beta feature). Enable it in Studio to test locally.

## 2.1.x

Highlights:

- Introduced new UI atoms and molecules and refreshed theming:
  - `IconButton`, `CloseButton`, `MessageBox` (atoms)
  - `TitleBar` (molecule)
  - Enhanced `CooldownButton` with theming/size variants

## 1.1.x

Highlights:

- Tab system:
  - `TabButton` (atom)
  - `TabBar`, `TabPanels` (molecules)
  - `TabGroup` (organism)

## 1.0.x

Highlights:

- Initial atoms and core primitives: `Button`, `Label`, `TextBox`, `ProgressBar`, `SlicedImage`, `Avatar`, `Badge`, etc.

---

Maintenance note:

- This page is a lightweight index meant for quick orientation. The authoritative source for changes is [CHANGELOG.md](./CHANGELOG.md). If entries ever drift, prefer the changelog and component source.
