# Contributing to SS-Fusion

Thank you for your interest in contributing to SS-Fusion! This guide will help you get started with contributing to our Roblox TypeScript UI component library.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn
- [Roblox Studio](https://create.roblox.com/docs/studio) for testing
- [roblox-ts](https://roblox-ts.com/) knowledge

### Development Setup

1. **Fork the repository**

   ```bash
   git clone https://github.com/yourusername/ss-fusion.git
   cd ss-fusion
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development**

   ```bash
   pnpm run watch  # Watches for changes and auto-compiles
   ```

## 🏗️ Project Architecture

SS-Fusion follows the **Atomic Design** methodology:

```text
src/
├── atoms/          # Basic UI components (Button, Label, etc.)
├── molecules/      # Composite components (CooldownButton, etc.)
├── organisms/      # Complex UI sections (planned)
├── templates/      # Layout structures (planned)
├── types/          # TypeScript interfaces and definitions
├── utils/          # Theme, constants, and utilities
└── examples/       # Usage demonstrations
```

## 📝 Contribution Guidelines

### Types of Contributions

We welcome the following types of contributions:

1. **🐛 Bug Fixes** - Fix issues in existing components
2. **✨ New Components** - Add new atoms, molecules, or organisms
3. **📚 Documentation** - Improve docs, examples, or JSDoc comments
4. **🎨 Theming** - Enhance the theming system or add new themes
5. **🧪 Testing** - Add tests for existing components
6. **🔧 Tooling** - Improve build process or development tools

### Component Development Standards

#### 1. Component Structure

All components should follow this structure:

```typescript
/**
 * @file ComponentName.ts
 * @module ComponentName
 * @layer Client/UI/[Atoms|Molecules|Organisms]
 * @description Brief description of what the component does
 * 
 * Detailed description with use cases and examples.
 *
 * @example
 * // Basic usage example
 * const component = ComponentName({
 *   prop: "value",
 *   onClick: () => doSomething()
 * });
 *
 * @author Your Name
 * @since Version number
 */

import Fusion from "@rbxts/fusion";
// Other imports...

/**
 * Props interface for the ComponentName component.
 * Detailed description of the props interface.
 */
export interface ComponentNameProps extends Fusion.PropertyTable<FrameType> {
  // Well-documented props with JSDoc comments
}

/**
 * Creates a ComponentName with the given props.
 * 
 * Detailed description of what the function does.
 * 
 * @param props - Configuration object
 * @returns The created component instance
 */
export function ComponentName(props: ComponentNameProps): FrameType {
  // Implementation...
}
```

#### 2. Props Interface Requirements

- **Extend Fusion.PropertyTable** for the appropriate Roblox Instance type
- **Document every property** with JSDoc comments
- **Provide examples** in JSDoc when helpful
- **Use optional properties** with sensible defaults
- **Support both reactive and static values** where appropriate

#### 3. Theme Integration

- Use colors from `defaultColorScheme` when possible
- Support theme overrides through props
- Use spacing values from the theme system
- Follow the established design tokens

#### 4. TypeScript Standards

- **Strict type safety** - no `any` types
- **Comprehensive interfaces** for all props
- **Generic types** where appropriate
- **Export all public interfaces**

### Adding New Components

#### Atoms (Basic Components)

1. Create the component file in `src/atoms/ComponentName.ts`
2. Add comprehensive JSDoc documentation
3. Export from `src/atoms/index.ts`
4. Add usage examples to `src/examples/ExampleUsage.ts`
5. Update the atoms README with the new component

#### Molecules (Composite Components)

1. Create the component file in `src/molecules/ComponentName.ts`
2. Compose existing atoms where possible
3. Add complex interaction logic
4. Export from `src/molecules/index.ts`
5. Document the composition pattern

#### Example New Atom Component

```typescript
/**
 * @file Badge.ts
 * @module Badge
 * @layer Client/UI/Atoms
 * @description Small status indicator component for displaying counts, status, or categories.
 * 
 * @example
 * const notificationBadge = Badge({
 *   text: "3",
 *   variant: "error",
 *   position: "top-right"
 * });
 */

import Fusion, { New, Computed } from "@rbxts/fusion";
import { defaultColorScheme } from "../utils/theme";

export interface BadgeProps extends Fusion.PropertyTable<Frame> {
  /** Badge text content */
  text: Fusion.StateObject<string> | string;
  /** Visual variant */
  variant?: "primary" | "secondary" | "success" | "error" | "warning";
  /** Badge size */
  size?: "small" | "medium" | "large";
}

export function Badge(props: BadgeProps): Frame {
  // Implementation...
}
```

## 🧪 Testing Guidelines

### Manual Testing

1. **Create test scenarios** in Roblox Studio
2. **Test all variants and states** of your component
3. **Verify responsiveness** across different screen sizes
4. **Test with reactive state** to ensure proper updates

### Component Testing Checklist

- [ ] Component renders correctly with default props
- [ ] All variants work as expected
- [ ] Reactive props update the UI properly
- [ ] Event handlers fire correctly
- [ ] Component integrates well with other components
- [ ] Theme colors and spacing are respected
- [ ] No runtime errors in console

## 📚 Documentation Standards

### JSDoc Requirements

- **@file** - File description
- **@module** - Module name
- **@layer** - Architecture layer
- **@description** - Component purpose and use cases
- **@example** - At least one usage example
- **@author** - Your name
- **@since** - Version when component was added

### README Updates

When adding new components:

1. Update the main README.md
2. Update the relevant section README (atoms, molecules, etc.)
3. Add usage examples
4. Update the component count and feature list

## 🔄 Pull Request Process

### Before Submitting

1. **Test thoroughly** in Roblox Studio
2. **Run the build** to ensure no compilation errors
3. **Update documentation** as needed
4. **Follow the coding standards**

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New component
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (please describe)

## Testing
- [ ] Tested in Roblox Studio
- [ ] All variants tested
- [ ] Reactive behavior verified
- [ ] No runtime errors

## Documentation
- [ ] JSDoc comments added/updated
- [ ] README updated if needed
- [ ] Examples added/updated
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing verification** in Studio
4. **Documentation review**
5. **Merge** when approved

## 🎨 Design Guidelines

### Visual Consistency

- Follow the established color scheme
- Use consistent spacing and sizing
- Maintain visual hierarchy
- Ensure accessibility considerations

### Animation and Interactions

- Use smooth transitions for state changes
- Provide visual feedback for interactions
- Keep animations performant
- Follow game UI conventions

## 💡 Getting Help

- **Issues**: Create a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Discord**: Join our community Discord (link in main README)

## 📄 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's coding standards

---

Thank you for contributing to SS-Fusion! Every contribution helps make game UI development better for the Roblox community. 🚀
