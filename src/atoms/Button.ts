/**
 * @file Button.ts
 * @module Button
 * @layer Client/UI/Atoms
 * @description Reusable button component with multiple variants and states.
 *
 * @author Soul Steel Alpha Development Team
 * @since 1.0.0
 */

import Fusion, { Children, Computed, New, OnEvent, Value } from "@rbxts/fusion";
import { defaultColorScheme, spacing } from "../utils/theme";

export interface ButtonProps extends Fusion.PropertyTable<Frame> {
	/** Button text content (for text buttons) */
	text?: Fusion.StateObject<string> | string;

	/** Icon asset ID (for icon buttons) */
	icon?: string;

	/** Background image asset ID (for styled buttons) */
	backgroundImage?: string;

	/** Visual variant of the button */
	variant?: "primary" | "secondary" | "accent" | "danger" | "ghost" | "icon";

	/** Size variant */
	size?: "small" | "medium" | "large";

	/** Whether the button is disabled */
	disabled?: Fusion.StateObject<boolean> | boolean;

	/** Click handler */
	onClick?: () => void;

	/** Hover handlers */
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;

	/** Custom content instead of text/icon */
	children?: Instance[];

	/** Icon color (for icon buttons) */
	iconColor?: Color3;

	/** Icon size as percentage of button size */
	iconSize?: number;
}

export function Button(props: ButtonProps): Frame {
	// State management
	const isHovered = Value(false);
	const isPressed = Value(false);

	// Default values
	const variant = props.variant ?? "primary";
	const size = props.size ?? "medium";
	const text = props.text ?? "";
	const iconSize = props.iconSize ?? 0.6;
	const iconColor = props.iconColor ?? Color3.fromRGB(255, 255, 255);

	// Determine if this is an icon button
	const isIconButton = !!props.icon || variant === "icon";

	// Compute disabled state
	const isDisabled = Computed(() => {
		if (typeIs(props.disabled, "boolean")) {
			return props.disabled;
		} else if (props.disabled) {
			return props.disabled.get();
		}
		return false;
	});

	// Get colors based on variant and state
	const getBackgroundColor = (): Color3 => {
		if (isDisabled.get()) {
			return Color3.fromRGB(100, 100, 100);
		}

		const baseColors = {
			primary: defaultColorScheme.Primary,
			secondary: defaultColorScheme.Secondary,
			accent: defaultColorScheme.Accent,
			danger: defaultColorScheme.Error,
			ghost: Color3.fromRGB(0, 0, 0),
			icon: defaultColorScheme.Surface,
		};

		return baseColors[variant] || baseColors.primary;
	};

	const getTextColor = (): Color3 => {
		if (isDisabled.get()) {
			return Color3.fromRGB(150, 150, 150);
		}

		if (variant === "ghost" || variant === "icon") {
			return defaultColorScheme.OnSurface;
		}

		return variant === "secondary" 
			? defaultColorScheme.OnSecondary 
			: defaultColorScheme.OnPrimary;
	};

	const getIconColor = (): Color3 => {
		if (isDisabled.get()) {
			return Color3.fromRGB(150, 150, 150);
		}

		if (variant === "icon") {
			return isHovered.get() ? iconColor : Color3.fromRGB(200, 200, 200);
		}

		return iconColor;
	};

	// Get size values
	const getSizeValues = () => {
		switch (size) {
			case "small":
				return { 
					height: isIconButton ? 32 : 32, 
					width: isIconButton ? 32 : 100,
					paddingX: spacing.sm, 
					fontSize: 14 
				};
			case "medium":
				return { 
					height: isIconButton ? 40 : 40, 
					width: isIconButton ? 40 : 120,
					paddingX: spacing.md, 
					fontSize: 16 
				};
			case "large":
				return { 
					height: isIconButton ? 48 : 48, 
					width: isIconButton ? 48 : 150,
					paddingX: spacing.lg, 
					fontSize: 18 
				};
			default:
				return { 
					height: isIconButton ? 40 : 40, 
					width: isIconButton ? 40 : 120,
					paddingX: spacing.md, 
					fontSize: 16 
				};
		}
	};

	const sizeValues = getSizeValues();

	// Computed styles
	const backgroundColor = Computed(() => getBackgroundColor());
	const backgroundTransparency = Computed(() => {
		if (variant === "ghost") {
			return isHovered.get() ? 0.9 : 1;
		}
		if (variant === "icon") {
			return isHovered.get() ? 0.8 : 1;
		}
		if (isPressed.get()) {
			return 0.1;
		}
		if (isHovered.get()) {
			return 0.2;
		}
		return 0;
	});

	const textColor = Computed(() => getTextColor());
	const computedIconColor = Computed(() => getIconColor());

	// Compute text content
	const displayText = Computed(() => {
		if (typeIs(text, "string")) {
			return text;
		} else {
			return text.get();
		}
	});

	// Create the button content
	const buttonContent: Instance[] = [];

	if (props.children) {
		buttonContent.push(...props.children);
	} else if (isIconButton && props.icon) {
		// Icon button content
		const iconLabel = New("ImageLabel")({
			Name: "Icon",
			Size: UDim2.fromScale(iconSize, iconSize),
			AnchorPoint: new Vector2(0.5, 0.5),
			Position: UDim2.fromScale(0.5, 0.5),
			Image: props.icon,
			ImageColor3: computedIconColor,
			BackgroundTransparency: 1,
			ZIndex: 2,
		});
		buttonContent.push(iconLabel);

		// Add aspect ratio constraint for icon buttons
		const aspectRatio = New("UIAspectRatioConstraint")({
			AspectRatio: 1,
		});
		buttonContent.push(aspectRatio);
	} else if (text) {
		// Text button content
		const textLabel = New("TextLabel")({
			Name: "Text",
			Size: new UDim2(1, -sizeValues.paddingX * 2, 1, 0),
			Position: new UDim2(0, sizeValues.paddingX, 0, 0),
			BackgroundTransparency: 1,
			Text: displayText,
			TextColor3: textColor,
			TextSize: sizeValues.fontSize,
			Font: Enum.Font.GothamMedium,
			TextXAlignment: Enum.TextXAlignment.Center,
			TextYAlignment: Enum.TextYAlignment.Center,
			ZIndex: 2,
		});
		buttonContent.push(textLabel);
	}

	// Create the main button frame
	const buttonFrame = New("Frame")({
		Name: props.Name ?? "Button",
		Size: props.Size ?? new UDim2(0, sizeValues.width, 0, sizeValues.height),
		Position: props.Position,
		AnchorPoint: props.AnchorPoint,
		BackgroundColor3: backgroundColor,
		BackgroundTransparency: backgroundTransparency,
		BorderSizePixel: (variant === "ghost" || variant === "icon") ? 1 : 0,
		BorderColor3: (variant === "ghost" || variant === "icon") ? defaultColorScheme.Secondary : Color3.fromRGB(0, 0, 0),
		ZIndex: props.ZIndex,
		LayoutOrder: props.LayoutOrder,

		[Children]: buttonContent,

		// Optional properties passthrough
		Visible: props.Visible,
		ClipsDescendants: props.ClipsDescendants,
	});

	// Add background image if provided
	if (props.backgroundImage) {
		const backgroundImageLabel = New("ImageLabel")({
			Name: "BackgroundImage",
			Size: new UDim2(1, 0, 1, 0),
			Image: props.backgroundImage,
			BackgroundTransparency: 1,
			ZIndex: 1,
		});
		backgroundImageLabel.Parent = buttonFrame;
	}

	// Create invisible button for interaction
	const interactionButton = New("TextButton")({
		Name: "InteractionButton",
		Size: new UDim2(1, 0, 1, 0),
		BackgroundTransparency: 1,
		Text: "",
		Active: Computed(() => !isDisabled.get()),
		ZIndex: 10,

		[OnEvent("MouseEnter")]: () => {
			if (!isDisabled.get()) {
				isHovered.set(true);
				props.onMouseEnter?.();
			}
		},

		[OnEvent("MouseLeave")]: () => {
			isHovered.set(false);
			isPressed.set(false);
			props.onMouseLeave?.();
		},

		[OnEvent("MouseButton1Down")]: () => {
			if (!isDisabled.get()) {
				isPressed.set(true);
			}
		},

		[OnEvent("MouseButton1Up")]: () => {
			isPressed.set(false);
		},

		[OnEvent("Activated")]: () => {
			if (!isDisabled.get()) {
				props.onClick?.();
			}
		},
	});

	interactionButton.Parent = buttonFrame;

	return buttonFrame;
}
