# Component TODO Tracker (Companion to COMPONENT_STATUS)

Last Updated: 2025-08-10

Purpose:

- Central place to track work items per component.
- You can add checks or notes after battle testing; I’ll maintain and update as we implement fixes or enhancements.
- Use this alongside docs/COMPONENT_STATUS.md.

Conventions:

- Use checkboxes to mark items done. Add new bullets freely; I’ll preserve and triage them.
- When a component is fully battle-tested, promote it to VERIFIED in the Status file.

---

## Atoms

### Avatar

- [ ] Audit props vs README/API.md; align names and defaults
- [ ] Theming check (borders/backgrounds) and token usage
- [ ] parts of the border are not being rendered at the top

### Badge

- [ ] Variant colors ensure adequate contrast
- [ ] Count formatting for large numbers (1k/10k) or overflow handling
- [ ] Size presets (small/medium/large) spacing consistency
- [ ] Docs: intent examples (status, count, dot)

### Button

- [ ] Hover/press/disabled states parity across variants
- [ ] Text truncation vs autosize; min button size guarantees
- [ ] Icon+text spacing; left/right icon support
- [ ] Keyboard/gamepad navigation and pressed feedback
- [ ] Docs: variant matrix, accessibility notes

### Label

- [ ] Variant scale and font tokens; readability at small sizes
- [ ] Optional RichText support and TextScaled guidance
- [ ] Ellipsis/clipping behavior in constrained containers
- [ ] Docs: typography scale reference

### TextBox

- [ ] Focus/hover/invalid visuals; error message pattern
- [ ] MaxLength enforcement, paste/IME behavior
- [ ] Password mode; multiline autosize performance
- [ ] Mobile keyboard overlap considerations
- [ ] Docs: validation example, submit/cancel patterns

### ProgressBar

- [ ] Edge cases: maxValue=0, NaN, negative values
- [ ] Vertical orientation parity with horizontal
- [ ] Label formatting (percent vs absolute) toggle
- [ ] Theming tokens for background/fill; contrast ratio
- [ ] Docs: health/mana/xp examples

### SlicedImage

- [ ] Validate SliceCenter inputs and 1px seams at scales
- [ ] Support for tinted/alpha variants
- [ ] Docs: guidelines for asset preparation

### TabButton

- [ ] Selected state sync with TabBar current index
- [ ] Hover/press visuals and disabled handling
- [ ] Keyboard/gamepad navigation between tabs
- [ ] Docs: integration with TabBar/TabPanels

### IconButton (Beta)

- [ ] Selected/toggleable state polish; expose aria-like hint
- [ ] Ensure hit area min size and tooltip pattern (optional)
- [ ] Theming of ghost/secondary/danger where applicable
- [ ] Gamepad/keyboard focus visuals
- [ ] Docs: compact vs large visual examples

### CloseButton (Beta)

- [ ] Hit target size and safe margin around glyph
- [ ] Hover/press feedback; disabled style
- [ ] Optional custom icon path docs
- [ ] Keyboard/gamepad activation mapping (Esc/X)

### MessageBox (Beta)

- [ ] Auto-hide + queueing behavior (multiple messages)
- [ ] Info/success/warning/error color mapping vs theme
- [ ] Drop shadow performance; zIndex layering
- [ ] Optional action buttons (Confirm/Dismiss) pattern
- [ ] Docs: inline vs toast usage guidance

---

## Molecules

### CooldownButton (Beta)

- [ ] Cooldown accuracy under low FPS; fractional progress
- [ ] Prevent click-spam during cooldown; disabled visuals
- [ ] Overlay rendering order and icon visibility
- [ ] Size presets parity with Button/IconButton
- [ ] Docs: ability bar example with multiple buttons

### TabBar

- [ ] Overflow handling (scroll or wrap) and indicators
- [ ] Keyboard left/right navigation and Home/End
- [ ] ARIA-like guidance for assistive patterns (docs only)
- [ ] Docs: vertical tabs note if supported

### TabPanels

- [ ] Mounting modes: keepMounted vs unmountOnHide memory
- [ ] Performance with large panels; cleanup on unmount
- [ ] Docs: lifecycle notes and when to use each mode

### TitleBar (Beta)

- [ ] Variant color mapping; light/dark surfaces
- [ ] Optional drag region pattern (if/when implemented)
- [ ] CloseButton prop passthrough and placement spacing
- [ ] Docs: embed within panels/windows examples

---

## Organisms

### TabGroup

- [ ] Controlled vs uncontrolled current tab API
- [ ] Deep-linking strategy (id strings) across TabBar/TabPanels
- [ ] Performance with many tabs; virtualization guidance (docs)
- [ ] Docs: complete example wiring all parts

---

Notes:

- Feel free to add ad-hoc bullets under any component with details from your testing. I’ll convert recurring themes into reusable utilities/patterns.
- When we complete items, I’ll check them off here and, if appropriate, update docs/COMPONENT_STATUS.md.

---

## Layout

### Stack (HStack/VStack/Spacer)

- [x] Default cross-axis AutomaticSize fixed (HStack -> Y, VStack -> X)
- [x] Alignment mapping corrected for vertical FillDirection (justify vs align per axis)
- [ ] Optional crossAutoSize prop to opt out of cross-axis autosize
- [ ] Consider dedicated SpaceBetweenStack (UIListLayout can’t truly do space-between)
- [ ] Examples: alignment matrix and autosize behaviors

### Grid/AutoGrid

- [x] AutoGrid passes binding to CellSize for true reactivity
- [x] Defer initial AbsoluteSize read and hook destroy to disconnect signal
- [ ] Consider rectangular cell support (minCellX/minCellY) or aspect ratio
- [ ] Consider padding scale components in column math (currently X.Offset only)
- [ ] Example: responsive inventory grid with ScrollingFrame CanvasSize wiring
