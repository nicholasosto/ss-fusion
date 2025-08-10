# Component Status Tracker

Companion: See also the Component TODO Tracker — [docs/COMPONENT_TODOS.md](./COMPONENT_TODOS.md)

Use this tracker to see the status of every exported component in the library. You can promote any item to VERIFIED after your own battle testing.

Status levels (highest to lowest):

- VERIFIED (reserved for maintainers to mark after battle testing)
- Stable (API unlikely to change, recommended for general use)
- Beta (feature-complete, API may change based on feedback)
- Experimental (early API, subject to change)

How to verify:

- After battle testing a component, replace its Status with VERIFIED or check it in the Verified column.

---

## Atoms

| Component | Status | Verified | Introduced | Last Updated | Docs | Notes |
|---|---|---:|---:|---:|---|---|
| Avatar | Stable |  | — | — | [Source](../src/atoms/Avatar.ts) | User thumbnails; shape/size variants |
| Badge | Stable |  | — | — | [Source](../src/atoms/Badge.ts) | Counts, variants, shapes |
| Button | Stable |  | — | — | [Source](../src/atoms/Button.ts) | Unified text/icon button |
| Label | Stable |  | — | — | [Source](../src/atoms/Label.ts) | Typography component |
| TextBox | Stable |  | — | — | [Source](../src/atoms/TextBox.ts) | Input with focus/validation |
| ProgressBar | Stable |  | — | 2.1.0 | [Source](../src/atoms/ProgressBar.ts) | Absolute and percentage |
| SlicedImage | Stable |  | — | — | [Source](../src/atoms/SlicedImage.ts) | 9-slice image panel |
| TabButton | Stable |  | 1.1.0 | 1.1.0 | [Source](../src/atoms/TabButton.ts) | Part of tab system |
| IconButton | Beta |  | 2.1.0 | 2.1.0 | [Source](../src/atoms/IconButton.ts) • [Examples](./NEW_COMPONENTS.md#iconbutton) | Migrated; theming + states |
| CloseButton | Beta |  | 2.1.0 | 2.1.0 | [Source](../src/atoms/CloseButton.ts) • [Examples](./NEW_COMPONENTS.md#closebutton) | Migrated; minimalist control |
| MessageBox | Beta |  | 2.1.0 | 2.1.0 | [Source](../src/atoms/MessageBox.ts) • [Examples](./NEW_COMPONENTS.md#messagebox) | Verified; notification system |

---

## Molecules

| Component | Status | Verified | Introduced | Last Updated | Docs | Notes |
|---|---|---:|---:|---:|---|---|
| CooldownButton | Beta |  | ≤1.0.x | 2.1.0 | [Source](../src/molecules/CooldownButton.ts) • [Examples](./NEW_COMPONENTS.md#enhanced-cooldownbutton) | Rewritten, themed, size variants |
| TabBar | Stable |  | 1.1.0 | 1.1.0 | [Source](../src/molecules/TabBar.ts) | Tab navigation |
| TabPanels | Stable |  | 1.1.0 | 1.1.0 | [Source](../src/molecules/TabPanels.ts) | Tab content mounting modes |
| TitleBar | Beta |  | 2.1.0 | 2.1.0 | [Source](../src/molecules/TitleBar.ts) • [Examples](./NEW_COMPONENTS.md#titlebar) | Migrated; with CloseButton |

---

## Organisms

| Component | Status | Verified | Introduced | Last Updated | Docs | Notes |
|---|---|---:|---:|---:|---|---|
| TabGroup | Stable |  | 1.1.0 | 1.1.0 | [Source](../src/organisms/TabGroup.ts) | Complete tab system |

---

## Migration Notes

- 2.1.0 introduced new migrated components: IconButton, CloseButton, MessageBox, TitleBar, and enhanced CooldownButton.
- Tab system (TabButton, TabBar, TabPanels, TabGroup) was introduced in 1.1.0.
- You can mark components as VERIFIED here after battle testing.
