# New Component Integration - Usage Examples

This document provides usage examples for the newly integrated components in the ss-fusion package.

## IconButton

Enhanced icon button with selection states and theming integration.

```typescript
import { IconButton } from "@trembus/ss-fusion";

// Basic icon button
const saveButton = IconButton({
  icon: "rbxassetid://123456789",
  onClick: () => save()
});

// Themed icon button with selection
const toggleButton = IconButton({
  icon: "rbxassetid://987654321",
  variant: "primary",
  size: "large",
  toggleable: true,
  initialSelected: false,
  onSelectionChanged: (selected) => handleToggle(selected)
});

// Custom styled button
const customButton = IconButton({
  icon: "rbxassetid://555666777",
  backgroundImage: "rbxassetid://custom_bg",
  variant: "accent",
  size: "medium"
});
```

## CloseButton

Simple close control with consistent theming.

```typescript
import { CloseButton } from "@trembus/ss-fusion";

// Basic close button (text-based)
const closeBtn = CloseButton({
  onClick: () => closeDialog()
});

// Custom themed close button
const dangerCloseBtn = CloseButton({
  variant: "error",
  size: "large",
  onClick: () => closeWithWarning()
});

// Custom icon close button
const iconCloseBtn = CloseButton({
  closeIcon: "rbxassetid://custom_close_icon",
  variant: "primary",
  onClick: () => handleClose()
});
```

## MessageBox

Notification system with automatic type-based styling.

```typescript
import { MessageBox } from "@trembus/ss-fusion";
import { Value } from "@rbxts/fusion";

// Static message
const successMessage = MessageBox({
  message: "Operation completed successfully!",
  messageType: "success",
  autoHide: true,
  duration: 3
});

// Reactive message with state
const messageState = Value("Loading...");
const messageType = Value("info");

const dynamicMessage = MessageBox({
  message: messageState,
  messageType: "info",
  visible: true,
  onDismiss: () => handleDismiss()
});

// Error message with custom colors
const errorMessage = MessageBox({
  message: "Something went wrong!",
  messageType: "error",
  backgroundColor: Color3.fromRGB(200, 50, 50),
  textColor: Color3.fromRGB(255, 255, 255)
});
```

## TitleBar

Window header component with title and close functionality.

```typescript
import { TitleBar } from "@trembus/ss-fusion";
import { Value } from "@rbxts/fusion";

// Basic title bar
const titleBar = TitleBar({
  title: "Settings",
  onClose: () => closeDialog()
});

// Themed title bar
const primaryTitleBar = TitleBar({
  title: "Advanced Options",
  variant: "primary",
  height: 40,
  showCloseButton: true,
  onClose: () => handleClose()
});

// Dynamic title with reactive state
const titleState = Value("User Profile");
const dynamicTitleBar = TitleBar({
  title: titleState,
  variant: "accent",
  backgroundColor: Color3.fromRGB(100, 100, 150)
});
```

## Enhanced CooldownButton

Improved cooldown button with theming and better visual feedback.

```typescript
import { CooldownButton } from "@trembus/ss-fusion";

// Basic cooldown button
const abilityButton = CooldownButton({
  icon: "rbxassetid://ability_icon",
  cooldown: 5, // 5 seconds
  onClick: () => castAbility()
});

// Themed cooldown button
const primaryAbility = CooldownButton({
  icon: "rbxassetid://primary_ability",
  cooldown: 10,
  variant: "primary",
  size: "large",
  onClick: () => usePrimaryAbility(),
  onCooldownComplete: () => playReadySound()
});

// Disabled cooldown button
const lockedAbility = CooldownButton({
  icon: "rbxassetid://locked_ability",
  cooldown: 15,
  variant: "secondary",
  initiallyDisabled: true,
  onClick: () => tryUseLockedAbility()
});
```

## Complete Dialog Example

Here's how to combine the new components to create a complete dialog:

```typescript
import { 
  TitleBar, 
  MessageBox, 
  IconButton, 
  CloseButton 
} from "@trembus/ss-fusion";
import { Value, New, Children } from "@rbxts/fusion";

function createSettingsDialog() {
  const isVisible = Value(true);
  const message = Value("");
  const messageType = Value("info");

  const dialog = New("Frame")({
    Name: "SettingsDialog",
    Size: new UDim2(0, 400, 0, 300),
    Position: new UDim2(0.5, 0, 0.5, 0),
    AnchorPoint: new Vector2(0.5, 0.5),
    BackgroundColor3: Color3.fromRGB(40, 40, 40),
    BorderSizePixel: 0,
    Visible: isVisible,
    [Children]: {
      // Title bar
      TitleBar: TitleBar({
        title: "Settings",
        variant: "primary",
        onClose: () => isVisible.set(false)
      }),
      
      // Content area with action buttons
      Content: New("Frame")({
        Size: new UDim2(1, 0, 1, -32),
        Position: new UDim2(0, 0, 0, 32),
        BackgroundTransparency: 1,
        [Children]: {
          SaveButton: IconButton({
            icon: "rbxassetid://save_icon",
            variant: "success",
            Position: new UDim2(0, 20, 1, -60),
            onClick: () => {
              message.set("Settings saved!");
              messageType.set("success");
            }
          }),
          
          ResetButton: IconButton({
            icon: "rbxassetid://reset_icon", 
            variant: "warning",
            Position: new UDim2(0, 80, 1, -60),
            onClick: () => {
              message.set("Settings reset to defaults!");
              messageType.set("warning");
            }
          })
        }
      }),
      
      // Message overlay
      MessageOverlay: MessageBox({
        message: message,
        messageType: messageType,
        Position: new UDim2(0.5, 0, 0, 50),
        Size: new UDim2(0.8, 0, 0, 40),
        autoHide: true,
        duration: 3
      })
    }
  });

  return dialog;
}
```

## Theme Integration

All new components fully integrate with the ss-fusion theme system:

```typescript
import { defaultColorScheme } from "@trembus/ss-fusion/utils/theme";

// Components automatically use theme colors based on variant
const themedButton = IconButton({
  icon: "rbxassetid://123",
  variant: "primary", // Uses defaultColorScheme.Primary
});

// Custom color overrides still work
const customButton = CloseButton({
  variant: "error", // Base theme
  // Custom overrides applied on top
});
```

## Size Variants

All components support consistent size variants:

```typescript
// Small, medium (default), large
const smallButton = IconButton({ size: "small", icon: "..." });
const mediumButton = IconButton({ size: "medium", icon: "..." });
const largeButton = IconButton({ size: "large", icon: "..." });

// Size variants work across all components
const smallClose = CloseButton({ size: "small" });
const largeTitleBar = TitleBar({ size: "large", title: "..." });
```
