/**
 * @fileoverview SS-Fusion Atoms - Foundational UI Components
 * @description Exports all atomic components for the SS-Fusion design system.
 * 
 * Atoms are the smallest, most basic UI components that serve as building blocks
 * for more complex molecules, organisms, and templates. This library includes:
 * 
 * - **Button**: Unified text and icon button with multiple variants
 * - **Label**: Typography component with consistent theming
 * - **TextBox**: Input component with validation and focus states
 * - **ProgressBar**: Progress visualization for various metrics
 * - **SlicedImage**: Generic 9-slice image component for panels
 * 
 * All components are built with:
 * ✅ Fusion reactive state integration
 * ✅ Comprehensive TypeScript interfaces
 * ✅ Consistent theming system
 * ✅ Full JSDoc documentation
 * ✅ Performance optimizations
 * 
 * @example Basic Usage
 * ```typescript
 * import { Button, Label, TextBox } from "ss-fusion/atoms";
 * 
 * // Create a simple login form
 * const loginForm = [
 *   Label({ text: "Login", variant: "heading" }),
 *   TextBox({ placeholder: "Username" }),
 *   TextBox({ placeholder: "Password" }),
 *   Button({ text: "Sign In", variant: "primary" })
 * ];
 * ```
 * 
 * @see {@link ./README.md} For detailed usage documentation
 * @see {@link ./CHANGELOG.md} For version history and migration guides
 * @see {@link ./atoms.d.ts} For complete API reference
 * @version 2.0.0
 */

export * from "./Button";
export * from "./Label";
export * from "./TextBox";
export * from "./ProgressBar";
export * from "./SlicedImage";
