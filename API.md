# API Reference

Complete API documentation for all SS-Fusion components, interfaces, and utilities.

## Table of Contents

- [Components](#components)
  - [Atoms](#atoms)
  - [Molecules](#molecules)
- [Interfaces](#interfaces)
- [Theming](#theming)
- [Utilities](#utilities)

## Components

### Atoms

#### Button

Unified button component supporting text, icons, and multiple variants.

```typescript
function Button(props: ButtonProps): Frame
```

**Props:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `StateObject<string> \| string` | `""` | Button text content |
| `icon` | `string` | `undefined` | Icon asset ID for icon buttons |
| `backgroundImage` | `string` | `undefined` | Background image asset ID |
| `variant` | `ButtonVariant` | `"primary"` | Visual style variant |
| `size` | `ButtonSize` | `"medium"` | Button size |
| `disabled` | `StateObject<boolean> \| boolean` | `false` | Whether button is disabled |
| `onClick` | `() => void` | `undefined` | Click handler |
| `onMouseEnter` | `() => void` | `undefined` | Mouse enter handler |
| `onMouseLeave` | `() => void` | `undefined` | Mouse leave handler |
| `children` | `Instance[]` | `undefined` | Custom content |
| `iconColor` | `Color3` | Theme-based | Icon color override |
| `iconSize` | `number` | `0.8` | Icon size as percentage of button |

**Types:**
- `ButtonVariant`: `"primary" | "secondary" | "accent" | "danger" | "ghost" | "icon"`
- `ButtonSize`: `"small" | "medium" | "large"`

**Examples:**

```typescript
// Text button
const saveButton = Button({
  text: "Save",
  variant: "primary",
  onClick: () => saveData()
});

// Icon button
const settingsButton = Button({
  icon: "rbxassetid://123456789",
  variant: "icon",
  size: "large"
});
```

---

#### Label

Typography component with semantic variants and theming.

```typescript
function Label(props: LabelProps): TextLabel
```

**Props:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `StateObject<string> \| string` | **Required** | Text content to display |
| `variant` | `LabelVariant` | `"body"` | Typography variant |
| `textColor` | `Color3` | Theme-based | Text color override |
| `textStroke` | `boolean` | `false` | Enable text stroke |
| `textStrokeColor` | `Color3` | `Color3.fromRGB(0,0,0)` | Stroke color |
| `textStrokeTransparency` | `number` | `0` | Stroke transparency |
| `textWrapped` | `boolean` | `true` | Enable text wrapping |
| `richText` | `boolean` | `false` | Enable rich text |

**Types:**
- `LabelVariant`: `"heading" | "subheading" | "body" | "caption"`

**Variant Specifications:**
- **heading**: 24px, Bold, for page titles
- **subheading**: 20px, SemiBold, for section headers
- **body**: 16px, Regular, for standard content
- **caption**: 14px, Regular, for supplementary text

**Examples:**

```typescript
// Page title
const title = Label({
  text: "Welcome to My Game",
  variant: "heading"
});

// Status text with stroke
const statusText = Label({
  text: playerStatus,
  variant: "body",
  textStroke: true,
  textColor: Color3.fromRGB(255, 255, 255)
});
```

---

#### TextBox

Input component with validation, focus states, and theming.

```typescript
function TextBox(props: TextBoxProps): Frame
```

**Props:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `placeholder` | `string` | `""` | Placeholder text |
| `value` | `StateObject<string>` | `undefined` | Controlled value |
| `multiline` | `boolean` | `false` | Enable multiline input |
| `maxLength` | `number` | `200` | Maximum character count |
| `clearTextOnFocus` | `boolean` | `false` | Clear text when focused |
| `disabled` | `StateObject<boolean> \| boolean` | `false` | Whether input is disabled |
| `validate` | `(text: string) => boolean` | `undefined` | Validation function |
| `variant` | `TextBoxVariant` | `"default"` | Visual variant |
| `size` | `TextBoxSize` | `"medium"` | Input size |
| `onChanged` | `(text: string) => void` | `undefined` | Text change handler |
| `onFocused` | `() => void` | `undefined` | Focus handler |
| `onFocusLost` | `(enterPressed: boolean) => void` | `undefined` | Focus lost handler |

**Types:**
- `TextBoxVariant`: `"default" | "error" | "success"`
- `TextBoxSize`: `"small" | "medium" | "large"`

**Examples:**

```typescript
// Username input with validation
const usernameInput = TextBox({
  placeholder: "Enter username...",
  validate: (text) => text.length >= 3 && text.length <= 20,
  onChanged: (text) => setUsername(text)
});

// Multiline message input
const messageBox = TextBox({
  placeholder: "Type your message...",
  multiline: true,
  maxLength: 500,
  size: "large"
});
```

---

#### ProgressBar

Progress visualization component for health, mana, experience, etc.

```typescript
function ProgressBar(props: ProgressBarProps): Frame
```

**Props:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `progress` | `StateObject<number>` | **Required** | Current progress value |
| `maxValue` | `StateObject<number>` | `undefined` | Maximum value for percentage calculation |
| `fillColor` | `Color3` | Theme Primary | Progress fill color |
| `backgroundColor` | `Color3` | `Color3.fromRGB(40,40,40)` | Background color |
| `direction` | `ProgressDirection` | `"horizontal"` | Progress direction |
| `showLabel` | `boolean` | `false` | Show text label |
| `labelText` | `StateObject<string> \| string` | Auto-generated | Custom label text |
| `labelColor` | `Color3` | `Color3.fromRGB(255,255,255)` | Label text color |
| `minSize` | `number` | `2` | Minimum fill size in pixels |
| `animate` | `boolean` | `true` | Animate progress changes |
| `animationDuration` | `number` | `0.3` | Animation duration in seconds |

**Types:**
- `ProgressDirection`: `"horizontal" | "vertical"`

**Progress Calculation:**
- With `maxValue`: `progress / maxValue` (e.g., 75/100 = 0.75)
- Without `maxValue`: `progress` as percentage (0.0 to 1.0)

**Examples:**

```typescript
// Health bar
const healthBar = ProgressBar({
  progress: currentHealth,
  maxValue: maxHealth,
  fillColor: Color3.fromRGB(255, 100, 100),
  showLabel: true
});

// Experience bar with percentage
const xpBar = ProgressBar({
  progress: expPercentage, // 0.0 to 1.0
  fillColor: Color3.fromRGB(100, 255, 100),
  labelText: customExpText
});
```

---

#### SlicedImage

9-slice scalable image component for UI panels and borders.

```typescript
function SlicedImage(props: SlicedImageProps): ImageLabel
```

**Props:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `imageId` | `string` | **Required** | Image asset ID |
| `sliceCenter` | `Rect` | `Rect(64,64,64,64)` | 9-slice boundaries |
| `sliceScale` | `number` | `1.0` | Slice scaling factor |
| `imageColor` | `Color3` | `Color3.fromRGB(255,255,255)` | Image tint color |
| `backgroundColor` | `Color3` | `Color3.fromRGB(255,255,255)` | Background color |
| `backgroundTransparency` | `number` | `1` | Background transparency |

**Examples:**

```typescript
// Panel background
const panel = SlicedImage({
  imageId: "rbxassetid://123456789",
  sliceCenter: new Rect(32, 32, 32, 32),
  imageColor: Color3.fromRGB(200, 200, 255)
});

// Border frame
const border = SlicedImage({
  imageId: "rbxassetid://987654321",
  sliceScale: 0.5
});
```

---

### Molecules

#### CooldownButton

Button with integrated cooldown timer and progress visualization.

```typescript
function CooldownButton(props: CooldownButtonProps): Frame
```

**Props:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `icon` | `string` | **Required** | Icon asset ID |
| `cooldown` | `number` | **Required** | Cooldown duration in seconds |
| `onClick` | `() => void` | `undefined` | Click handler |
| `onHover` | `() => void` | `undefined` | Hover handler |

**Behavior:**
- Prevents clicks during cooldown period
- Shows visual progress bar during cooldown
- Automatically manages cooldown state
- Displays remaining time as text

**Examples:**

```typescript
// Ability button with 10-second cooldown
const abilityButton = CooldownButton({
  icon: "rbxassetid://ability-icon",
  cooldown: 10,
  onClick: () => {
    castSpell();
    // Cooldown starts automatically
  }
});
```

---

## Interfaces

### Base Interfaces

#### BaseProps

Foundation interface for all components.

```typescript
interface BaseProps {
  Children?: Instance[];
  Visible?: CanBeState<boolean>;
  Size?: CanBeState<UDim2>;
  Position?: CanBeState<UDim2>;
  AnchorPoint?: CanBeState<Vector2>;
  ZIndex?: CanBeState<number>;
  LayoutOrder?: CanBeState<number>;
}
```

#### InteractableProps

Extended interface for interactive components.

```typescript
interface InteractableProps extends BaseProps {
  Interactable?: CanBeState<boolean>;
  OnActivated?: () => void;
  OnMouseEnter?: () => void;
  OnMouseLeave?: () => void;
}
```

### Theming Interfaces

#### ColorScheme

Complete color scheme for theming.

```typescript
interface ColorScheme {
  Primary: Color3;
  Secondary: Color3;
  Accent: Color3;
  Background: Color3;
  Surface: Color3;
  OnPrimary: Color3;
  OnSecondary: Color3;
  OnBackground: Color3;
  OnSurface: Color3;
  Error: Color3;
  Success: Color3;
  Warning: Color3;
}
```

---

## Theming

### Default Color Scheme

```typescript
const defaultColorScheme: ColorScheme = {
  Primary: Color3.fromRGB(59, 130, 246),    // Blue-500
  Secondary: Color3.fromRGB(107, 114, 128),  // Gray-500
  Accent: Color3.fromRGB(168, 85, 247),     // Purple-500
  Background: Color3.fromRGB(255, 255, 255), // White
  Surface: Color3.fromRGB(249, 250, 251),   // Gray-50
  OnPrimary: Color3.fromRGB(255, 255, 255), // White
  OnSecondary: Color3.fromRGB(255, 255, 255), // White
  OnBackground: Color3.fromRGB(17, 24, 39), // Gray-900
  OnSurface: Color3.fromRGB(55, 65, 81),    // Gray-700
  Error: Color3.fromRGB(239, 68, 68),       // Red-500
  Success: Color3.fromRGB(34, 197, 94),     // Green-500
  Warning: Color3.fromRGB(245, 158, 11),    // Amber-500
};
```

### Design Tokens

#### Spacing

```typescript
const spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64
};
```

#### Typography

```typescript
const fontSizes = {
  xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24, xxxl: 32
};
```

#### Border Radius

```typescript
const borderRadiusValues = {
  none: 0, small: 4, medium: 8, large: 16, full: 9999
};
```

---

## Utilities

### UI Constants

#### Component Sizes

```typescript
const UI_SIZES = {
  BUTTON_COOLDOWN: new UDim2(0, 70, 0, 90),
  BUTTON_ICON: new UDim2(0, 50, 0, 50),
  PROGRESS_BAR: new UDim2(0, 70, 0, 20),
};
```

#### Layout Generators

```typescript
const LAYOUTS = {
  Vertical: (spacing?: number) => UIListLayout,
  Horizontal: (spacing?: number) => UIListLayout,
  Grid: (cellSize: UDim2, spacing?: number) => UIGridLayout,
};
```

### State Management Patterns

#### Reactive Values

```typescript
// Create reactive state
const health = Value(100);
const maxHealth = Value(100);

// Computed derived values
const healthPercentage = Computed(() => health.get() / maxHealth.get());

// Use in components
const healthBar = ProgressBar({
  progress: health,
  maxValue: maxHealth
});
```

#### Event Handling

```typescript
// Component with event handlers
const interactiveButton = Button({
  text: "Click me",
  onClick: () => {
    // Handle click
    print("Button clicked!");
  },
  onMouseEnter: () => {
    // Handle hover
    print("Hovering button");
  }
});
```

---

## Migration Guide

### From 0.x to 1.x

- No breaking changes - 1.0.0 is the initial stable release
- All APIs are stable and follow semantic versioning

### Future Compatibility

SS-Fusion follows semantic versioning:
- **Patch versions (1.0.x)**: Bug fixes, no breaking changes
- **Minor versions (1.x.0)**: New features, backward compatible
- **Major versions (x.0.0)**: Breaking changes, migration required

---

For more detailed examples and usage patterns, see:
- [Main README](../README.md)
- [Component Documentation](./atoms/README.md)
- [Contributing Guide](../CONTRIBUTING.md)
