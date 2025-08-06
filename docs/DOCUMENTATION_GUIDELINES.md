# Documentation Update Guidelines

This document outlines the process for maintaining up-to-date documentation when creating or modifying SS-Fusion components.

## When Creating New Components

### 1. Component Documentation Requirements

Every new component must include:

#### **Comprehensive JSDoc Comments**
```typescript
/**
 * Component description explaining purpose and use cases
 * 
 * @example
 * ```typescript
 * // Basic usage example
 * const component = ComponentName({
 *   prop1: "value",
 *   prop2: 123
 * });
 * 
 * // Advanced usage example
 * const advanced = ComponentName({
 *   prop1: reactiveValue,
 *   prop2: 456,
 *   onCallback: () => handleAction()
 * });
 * ```
 */
export function ComponentName(props: ComponentProps): ReturnType {
  // Implementation
}
```

#### **Complete TypeScript Interfaces**
```typescript
/**
 * Properties for the ComponentName component
 */
export interface ComponentProps {
  /** Description of required prop */
  requiredProp: Fusion.StateObject<string> | string;
  
  /** 
   * Description of optional prop with default
   * @default "defaultValue"
   */
  optionalProp?: Fusion.StateObject<number> | number;
  
  /**
   * Callback description
   */
  onCallback?: () => void;
}
```

### 2. Required Documentation Updates

When creating a **new component**, update these files in order:

#### **Step 1: Add to Component Category Index**
- **File**: `src/atoms/index.ts` (or molecules/organisms)
- **Action**: Add export statement
- **Action**: Update JSDoc description to include new component

Example:
```typescript
// Add export
export * from "./NewComponent";

// Update description
* - **NewComponent**: Brief description of what it does
```

#### **Step 2: Update Category README**
- **File**: `src/atoms/README.md` (or respective category)
- **Action**: Add new component section in "Available Atoms" (maintain alphabetical order by emoji/name)
- **Action**: Update usage examples to include new component where appropriate

Template:
```markdown
### 🆕 NewComponent
Brief description with key features.

```typescript
import { NewComponent } from "ss-fusion";

// Basic example
const basic = NewComponent({
  prop1: "value"
});

// Advanced example
const advanced = NewComponent({
  prop1: reactiveValue,
  prop2: options,
  onCallback: () => handleAction()
});
```

**Features**: List key features | separated | by pipes
```

#### **Step 3: Update Main Project README**
- **File**: `README.md` (project root)
- **Action**: Add to architecture overview list (maintain order)
- **Action**: Add component section in "Components Overview" (maintain order)

Example:
```markdown
// In architecture section
- **`NewComponent`** - Brief description

// In components overview section
### NewComponent Component

Detailed description with use cases and benefits.

```typescript
// Usage examples (2-3 examples showing different use cases)
```

**Available Options:** option1 | option2 | option3
**Features:** Feature list
```

#### **Step 4: Update API Documentation**
- **File**: `docs/API.md`
- **Action**: Add comprehensive API reference
- **Action**: Include all props, methods, and types

#### **Step 5: Update CHANGELOG**
- **File**: `CHANGELOG.md`
- **Action**: Add entry under "Unreleased" or current version
- **Format**: `### Added - **ComponentName**: Description and key features`

## When Modifying Existing Components

### Public API Changes (Breaking or Additive)

If changes affect the **public API** (props, methods, return types):

#### **Required Updates:**
1. **Component JSDoc**: Update examples if behavior changes
2. **TypeScript Interfaces**: Update prop definitions and defaults
3. **Category README**: Update examples and feature lists
4. **Main README**: Update component overview if significantly changed
5. **API Documentation**: Update prop descriptions and examples
6. **CHANGELOG**: Add entry describing the changes

#### **Change Categories:**

**Breaking Changes** (require major version bump):
- Removing props
- Changing prop types
- Changing default behavior
- Renaming components

**Additive Changes** (minor version bump):
- Adding new props
- Adding new variants/options
- New features that don't break existing usage

**Internal Changes** (patch version):
- Bug fixes
- Performance improvements
- Internal refactoring (no public API changes)

### Documentation Update Checklist

#### **For New Components:**
- [ ] Component has comprehensive JSDoc with examples
- [ ] TypeScript interfaces are complete and documented
- [ ] Added to category index.ts with export and description
- [ ] Added section to category README.md
- [ ] Added to main README.md architecture list
- [ ] Added component overview to main README.md
- [ ] Added to API.md documentation
- [ ] Added to CHANGELOG.md

#### **For Modified Components:**
- [ ] Updated JSDoc examples if behavior changed
- [ ] Updated TypeScript interfaces if props changed
- [ ] Updated category README examples if needed
- [ ] Updated main README examples if needed
- [ ] Updated API.md if public interface changed
- [ ] Added CHANGELOG entry describing changes

## Documentation Standards

### Example Quality Requirements

All examples must be:
- **Functional**: Copy-paste ready code that works
- **Realistic**: Show real-world usage scenarios
- **Progressive**: Start simple, show advanced features
- **Typed**: Include proper TypeScript types where relevant

### Description Guidelines

Component descriptions should:
- **Start with purpose**: What problem does it solve?
- **List key features**: What makes it useful?
- **Show use cases**: When would you use it?
- **Highlight benefits**: Why choose this over alternatives?

### Consistency Requirements

Maintain consistency in:
- **Naming conventions**: Component names, prop names, variants
- **Documentation structure**: Same sections in same order
- **Example patterns**: Similar code style and complexity
- **Feature lists**: Use consistent formatting (pipe-separated)

## Automation Opportunities

Consider automating:
- **API documentation generation** from TypeScript interfaces
- **Example validation** to ensure code examples compile
- **Link checking** to verify cross-references work
- **Changelog format validation** for consistent entries

## Review Process

Before marking documentation complete:
1. **Self-review**: Read through all updated docs
2. **Cross-reference check**: Verify all links and references work
3. **Example validation**: Test that code examples actually work
4. **Consistency check**: Compare with existing component documentation
5. **User perspective**: Would a new user understand how to use this?

This process ensures that SS-Fusion documentation remains comprehensive, accurate, and helpful for all users.
