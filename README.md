# SS-Fusion

> A modern, reactive UI component library for Roblox built with TypeScript and Fusion

[![npm version](https://img.shields.io/npm/v/@trembus/ss-fusion?color=blue)](https://www.npmjs.com/package/@trembus/ss-fusion)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Fusion](https://img.shields.io/badge/Fusion-0.2+-purple)](https://github.com/Elttob/Fusion)
[![License](https://img.shields.io/npm/l/@trembus/ss-fusion)](LICENSE)

SS-Fusion is a comprehensive UI component library designed specifically for Roblox games, built with modern development practices and following the Atomic Design methodology. It provides a set of reusable, themeable, and type-safe components that make building consistent game UIs effortless.

## ✨ Features

- 🎨 **Consistent Theming** - Built-in color schemes and design tokens
- ⚡ **Reactive State Management** - Powered by Fusion's reactive system
- 🔧 **TypeScript-First** - Comprehensive type safety and IntelliSense
- 🎯 **Atomic Design** - Scalable component architecture (Atoms → Molecules → Organisms)
- 📱 **Responsive Components** - Flexible sizing and layout options
- 🎮 **Game-Specific Components** - Progress bars, cooldowns, and RPG UI elements
- 🚀 **Performance Optimized** - Efficient rendering and memory usage
- 📚 **Comprehensive Documentation** - Full JSDoc coverage and usage examples

## 🚀 Quick Start

### Installation

```bash
npm install @trembus/ss-fusion
# or
pnpm add @trembus/ss-fusion
# or
yarn add @trembus/ss-fusion
```

### Basic Usage

```typescript
import { Button, Label, ProgressBar } from "@trembus/ss-fusion";
import Fusion, { Value } from "@rbxts/fusion";

// Create reactive state
const playerHealth = Value(75);
const maxHealth = Value(100);

// Create components
const healthBar = ProgressBar({
  progress: playerHealth,
  maxValue: maxHealth,
  fillColor: Color3.fromRGB(255, 100, 100),
  showLabel: true
});

const healButton = Button({
  text: "Heal",
  variant: "primary",
  onClick: () => {
    playerHealth.set(math.min(playerHealth.get() + 25, maxHealth.get()));
  }
});

const title = Label({
  text: "Player Stats",
  variant: "heading"
});
```

## 🏗️ Architecture

SS-Fusion follows the **Atomic Design** methodology, providing components at different levels of complexity:

### Atoms (Basic Building Blocks)

- **`Avatar`** - User profile images, player thumbnails, and fallback displays
- **`Button`** - Unified text/icon button with multiple variants
- **`Label`** - Typography component with consistent theming
- **`TextBox`** - Input component with validation and focus states
- **`ProgressBar`** - Progress visualization for health, mana, XP, etc.
- **`SlicedImage`** - 9-slice scalable images for panels and borders

### Molecules (Component Combinations)

- **`CooldownButton`** - Button with integrated cooldown timer and progress bar

### Organisms & Templates (Coming Soon)

- Complex UI sections and layout templates

## 📋 Components Overview

### Avatar Component

User profile images, player thumbnails, and fallback displays with customizable shapes and status indicators.

```typescript
// Player thumbnail with status
const playerAvatar = Avatar({
  UserId: 123456,
  Size: new UDim2(0, 64, 0, 64),
  Shape: "Circle",
  ShowStatus: true,
  StatusColor: Color3.fromRGB(34, 197, 94), // Green for online
  onClick: () => openPlayerProfile(123456)
});

// Custom image avatar
const customAvatar = Avatar({
  Image: "rbxasset://textures/face.png",
  Shape: "Rounded",
  BorderThickness: 2,
  BorderColor: Color3.fromRGB(99, 102, 241)
});

// Fallback text avatar
const initialsAvatar = Avatar({
  FallbackText: "JD",
  BackgroundColor: Color3.fromHex("#6366f1"),
  TextColor: Color3.new(1, 1, 1)
});
```

**Available Shapes:** `Circle` | `Square` | `Rounded`
**Features:** Player thumbnails, custom images, fallback text, status indicators, click handling

### Button Component

Versatile button component supporting text, icons, and multiple visual variants.

```typescript
// Text button
const saveButton = Button({
  text: "Save Game",
  variant: "primary",
  onClick: () => savePlayerData()
});

// Icon button
const settingsButton = Button({
  icon: "rbxassetid://123456789",
  variant: "icon",
  size: "large",
  onClick: () => openSettings()
});

// Styled button with background
const epicButton = Button({
  text: "Epic Action!",
  backgroundImage: "rbxassetid://987654321",
  variant: "accent"
});
```

**Available Variants:** `primary` | `secondary` | `accent` | `danger` | `ghost` | `icon`
**Available Sizes:** `small` | `medium` | `large`

### Label Component

Typography component with semantic variants and full theming support.

```typescript
const title = Label({
  text: "Game Title",
  variant: "heading",
  textColor: Color3.fromRGB(255, 255, 255)
});

const description = Label({
  text: "Your adventure begins here...",
  variant: "body",
  textStroke: true
});
```

**Available Variants:** `heading` | `subheading` | `body` | `caption`

### TextBox Component

Feature-rich input component with validation, focus states, and theming.

```typescript
const usernameInput = TextBox({
  placeholder: "Enter username...",
  validate: (text) => text.length >= 3,
  onChanged: (text) => setUsername(text),
  maxLength: 20
});

const messageBox = TextBox({
  placeholder: "Type your message...",
  multiline: true,
  maxLength: 500,
  size: "large"
});
```

### ProgressBar Component

Flexible progress visualization supporting both percentage and absolute values.

```typescript
// Health bar with absolute values
const healthBar = ProgressBar({
  progress: currentHealth,
  maxValue: maxHealth,
  fillColor: Color3.fromRGB(255, 100, 100),
  showLabel: true,
  direction: "horizontal"
});

// XP bar with percentage
const xpBar = ProgressBar({
  progress: expPercentage, // 0.0 to 1.0
  fillColor: Color3.fromRGB(100, 255, 100),
  showLabel: true,
  labelText: customExpText
});
```

### CooldownButton Component

Advanced button with integrated cooldown functionality - perfect for abilities and actions.

```typescript
const abilityButton = CooldownButton({
  icon: "rbxassetid://ability-icon",
  cooldown: 10, // 10 seconds
  onClick: () => {
    castAbility();
    // Cooldown automatically starts
  }
});
```

## 🎨 Theming

SS-Fusion comes with a comprehensive theming system that ensures visual consistency.

### Default Color Scheme

```typescript
export const defaultColorScheme = {
  Primary: Color3.fromRGB(59, 130, 246),    // Blue-500
  Secondary: Color3.fromRGB(107, 114, 128),  // Gray-500
  Accent: Color3.fromRGB(168, 85, 247),     // Purple-500
  Background: Color3.fromRGB(255, 255, 255), // White
  Surface: Color3.fromRGB(249, 250, 251),   // Gray-50
  Error: Color3.fromRGB(239, 68, 68),       // Red-500
  Success: Color3.fromRGB(34, 197, 94),     // Green-500
  Warning: Color3.fromRGB(245, 158, 11),    // Amber-500
};
```

### Design Tokens

```typescript
// Spacing (4px grid system)
export const spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64
};

// Typography
export const fontSizes = {
  xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24, xxxl: 32
};

// Border radius
export const borderRadiusValues = {
  none: 0, small: 4, medium: 8, large: 16, full: 9999
};
```

## 🎮 Game Development Patterns

SS-Fusion is designed with game development in mind, providing common patterns for RPG and action games:

### Player Stats UI

```typescript
import { ProgressBar, Label } from "@trembus/ss-fusion";

const createPlayerStatsUI = (player: Player) => {
  const stats = player.stats;
  
  return [
    Label({ text: `${player.name} - Level ${stats.level.get()}` }),
    ProgressBar({
      progress: stats.health,
      maxValue: stats.maxHealth,
      fillColor: Color3.fromRGB(255, 100, 100),
      showLabel: true
    }),
    ProgressBar({
      progress: stats.mana,
      maxValue: stats.maxMana,
      fillColor: Color3.fromRGB(100, 100, 255),
      showLabel: true
    })
  ];
};
```

### Ability Hotbar

```typescript
import { CooldownButton } from "@trembus/ss-fusion";

const createAbilityHotbar = (abilities: Ability[]) => {
  return abilities.map((ability, index) => 
    CooldownButton({
      icon: ability.icon,
      cooldown: ability.cooldownTime,
      onClick: () => ability.cast(),
      Size: new UDim2(0, 60, 0, 60)
    })
  );
};
```

## 📚 API Reference

For detailed API documentation, see:

- [Atoms Documentation](./src/atoms/README.md) - Basic components
- [Types Documentation](./src/types/README.md) - TypeScript interfaces
- [Theme Documentation](./src/utils/README.md) - Theming and utilities

## 🔧 Development

### Building the Library

```bash
# Install dependencies
pnpm install

# Build the library
pnpm run build

# Watch for changes during development
pnpm run watch
```

### Project Structure

```text
ss-fusion/
├── src/
│   ├── atoms/          # Basic UI components
│   ├── molecules/      # Composite components
│   ├── organisms/      # Complex UI sections (planned)
│   ├── templates/      # Layout structures (planned)
│   ├── types/          # TypeScript definitions
│   ├── utils/          # Theming and utilities
│   └── examples/       # Usage examples
├── out/                # Compiled Lua output
└── package.json
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Fusion](https://github.com/Elttob/Fusion) by Elttob
- Inspired by modern UI libraries and Atomic Design principles
- Designed for the Roblox TypeScript community

---

**SS-Fusion** - *Building better game UIs, one component at a time* 🚀
