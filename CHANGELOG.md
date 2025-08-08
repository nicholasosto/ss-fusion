# Changelog

All notable changes to SS-Fusion will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2025-08-06

## [1.1.0] - 2025-08-08

### Added
- Tab system following Atomic design:
  - Atom: TabButton
  - Molecules: TabBar, TabPanels (keep-mounted and mount-only-active)
  - Organism: TabGroup, controlled via external Value<string>
- Types: TabSpec, TabGroupProps

### Internal
- Barrel exports updated and top-level index exports organisms and new types.


### Added
- Comprehensive project documentation and README
- Contributing guidelines for community contributors
- Full JSDoc documentation for all components
- TypeScript interface definitions with detailed comments

### Enhanced
- Improved component examples and usage patterns
- Better theming system documentation
- Enhanced project structure and architecture guidelines

### Documentation
- Added main README with quick start guide
- Created CONTRIBUTING.md with development standards
- Enhanced atoms README with detailed API documentation
- Added inline JSDoc comments for all public interfaces

## [1.0.2] - 2025-08-05

### Fixed
- Build process improvements
- Package publishing configuration
- TypeScript compilation issues

### Changed
- Updated package.json configuration for npm publishing
- Refined build output structure

## [1.0.1] - 2025-08-04

### Added
- Initial package setup and configuration
- Basic component structure

### Fixed
- Package manager configuration
- Initial build system setup

## [1.0.0] - 2025-08-03

### Added - Initial Release

#### 🎉 Core Components (Atoms)

- **Button Component**
  - Unified text and icon button implementation
  - Multiple variants: `primary`, `secondary`, `accent`, `danger`, `ghost`, `icon`
  - Three sizes: `small`, `medium`, `large`
  - Reactive state support with Fusion
  - Comprehensive theming integration
  - Custom styling options (background images, colors)
  - Hover and press states with visual feedback

- **Label Component**
  - Typography component with semantic variants
  - Variants: `heading`, `subheading`, `body`, `caption`
  - Text stroke support for game UI readability
  - Reactive text content support
  - Full theming integration with color schemes

- **TextBox Component**
  - Feature-rich text input with validation
  - Single-line and multiline support
  - Built-in validation system with visual feedback
  - Focus states and interaction handling
  - Character limits and input restrictions
  - Placeholder text and styling options

- **ProgressBar Component**
  - Flexible progress visualization system
  - Support for both percentage (0-1) and absolute values
  - Horizontal and vertical orientations
  - Customizable fill colors for different stats (health, mana, XP)
  - Optional text labels with custom formatting
  - Reactive progress updates

- **SlicedImage Component**
  - 9-slice image scaling for UI panels and borders
  - Configurable slice centers and scaling
  - Color tinting and background options
  - Perfect for scalable UI elements and decorative frames

#### 🧬 Composite Components (Molecules)

- **CooldownButton Component**
  - Advanced button with integrated cooldown timer
  - Visual progress bar showing cooldown status
  - Automatic click prevention during cooldown
  - Perfect for game abilities and timed actions
  - Combines Button and ProgressBar atoms

#### 🎨 Theming System

- **Comprehensive Color Scheme**
  - Primary, Secondary, and Accent colors
  - Semantic colors: Success, Error, Warning
  - Background and Surface color definitions
  - "On" colors for text contrast

- **Design Tokens**
  - Standardized spacing system (4px grid)
  - Typography scale with semantic font sizes
  - Border radius values for consistent styling
  - Z-index system for proper layering

- **Theme Integration**
  - All components use the centralized theme
  - Support for color overrides per component
  - Consistent spacing and sizing across components

#### 🔧 Developer Experience

- **TypeScript-First Development**
  - Comprehensive interface definitions
  - Full IntelliSense support
  - Strict type safety with no `any` types
  - Extensive JSDoc documentation

- **Fusion Integration**
  - Deep integration with Fusion's reactive system
  - Support for reactive props across all components
  - Efficient state management and updates
  - Performance-optimized rendering

- **Project Architecture**
  - Atomic Design methodology implementation
  - Scalable component hierarchy
  - Clean separation of concerns
  - Modular export system

#### 📚 Documentation & Examples

- **Comprehensive API Documentation**
  - Full JSDoc coverage for all public APIs
  - Usage examples for every component
  - Best practices and patterns
  - Type definitions with detailed descriptions

- **Example Implementation**
  - Complete example usage file demonstrating all components
  - Game-specific usage patterns
  - Reactive state management examples
  - Component composition demonstrations

#### 🏗️ Build System

- **Modern Build Pipeline**
  - TypeScript to Lua compilation with roblox-ts
  - Automated build process with rbxtsc
  - Watch mode for development
  - Optimized output for Roblox deployment

- **Package Management**
  - npm package publication as `@trembus/ss-fusion`
  - Semantic versioning
  - Public access configuration
  - Dependency management with pnpm

## [Unreleased]

### Planned Features

#### Organisms (Complex Components)
- **PlayerStatsPanel** - Complete player information display
- **InventoryGrid** - Item management interface
- **ChatWindow** - Game chat implementation
- **SettingsModal** - Configuration interface
- **NotificationSystem** - Toast and alert management

#### Templates (Layout Structures)
- **GameHUD** - Main game interface layout
- **MenuSystem** - Navigation and menu templates
- **DialogSystem** - Conversation and dialog layouts

#### Advanced Features
- **Animation System** - Smooth transitions and micro-interactions
- **Responsive Design** - Screen size adaptation
- **Accessibility** - Screen reader and input accessibility
- **Theme Variants** - Dark mode, high contrast, and custom themes
- **Performance Monitoring** - Component performance metrics

### Breaking Changes
- None planned for 1.x series

---

## Migration Guides

### Upgrading to 1.1.x (Planned)
When 1.1.x is released, this section will contain migration instructions for any new features or changes.

### Version Support
- **1.0.x**: Current stable release, fully supported
- **0.x.x**: Pre-release versions, no longer supported

---

## Contributing

See our [Contributing Guide](CONTRIBUTING.md) for information on how to contribute to SS-Fusion.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
