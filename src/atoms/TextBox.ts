/**
 * @file TextBox.ts
 * @module TextBox
 * @layer Client/UI/Atoms
 * @description Reusable text input component with validation and theming.
 *
 * @author Soul Steel Alpha Development Team
 * @since 1.0.0
 */

import Fusion, { Children, Computed, New, OnEvent, Value } from "@rbxts/fusion";
import { defaultColorScheme, spacing } from "../utils/theme";

export interface TextBoxProps extends Fusion.PropertyTable<Frame> {
	/** Placeholder text when empty */
	placeholder?: string;

	/** Current text value */
	value?: Fusion.StateObject<string>;

	/** Whether this is a multiline text box */
	multiline?: boolean;

	/** Maximum number of characters allowed */
	maxLength?: number;

	/** Whether to clear text when focused */
	clearTextOnFocus?: boolean;

	/** Whether the text box is disabled */
	disabled?: Fusion.StateObject<boolean> | boolean;

	/** Input validation function */
	validate?: (text: string) => boolean;

	/** Text change handler */
	onChanged?: (text: string) => void;

	/** Focus handlers */
	onFocused?: () => void;
	onFocusLost?: (enterPressed: boolean) => void;

	/** Visual variant */
	variant?: "default" | "error" | "success";

	/** Size variant */
	size?: "small" | "medium" | "large";
}

export function TextBox(props: TextBoxProps): Frame {
	// State management
	const isFocused = Value(false);
	const hasError = Value(false);
	const currentText = props.value ?? Value("");

	// Default values
	const placeholder = props.placeholder ?? "";
	const multiline = props.multiline ?? false;
	const maxLength = props.maxLength ?? 200;
	const clearTextOnFocus = props.clearTextOnFocus ?? false;
	const variant = props.variant ?? "default";
	const size = props.size ?? "medium";

	// Compute disabled state
	const isDisabled = Computed(() => {
		if (typeIs(props.disabled, "boolean")) {
			return props.disabled;
		} else if (props.disabled) {
			return props.disabled.get();
		}
		return false;
	});

	// Get size values
	const getSizeValues = () => {
		switch (size) {
			case "small":
				return { height: 32, paddingX: spacing.sm, fontSize: 14 };
			case "medium":
				return { height: 40, paddingX: spacing.md, fontSize: 16 };
			case "large":
				return { height: 48, paddingX: spacing.lg, fontSize: 18 };
			default:
				return { height: 40, paddingX: spacing.md, fontSize: 16 };
		}
	};

	const sizeValues = getSizeValues();

	// Get colors based on variant and state
	const getBorderColor = (): Color3 => {
		if (isDisabled.get()) {
			return Color3.fromRGB(150, 150, 150);
		}
		if (variant === "error" || hasError.get()) {
			return defaultColorScheme.Error;
		}
		if (variant === "success") {
			return defaultColorScheme.Success;
		}
		if (isFocused.get()) {
			return defaultColorScheme.Primary;
		}
		return defaultColorScheme.Secondary;
	};

	const getBackgroundColor = (): Color3 => {
		if (isDisabled.get()) {
			return Color3.fromRGB(240, 240, 240);
		}
		return defaultColorScheme.Surface;
	};

	const getTextColor = (): Color3 => {
		if (isDisabled.get()) {
			return Color3.fromRGB(150, 150, 150);
		}
		return defaultColorScheme.OnSurface;
	};

	// Computed styles
	const borderColor = Computed(() => getBorderColor());
	const backgroundColor = Computed(() => getBackgroundColor());
	const textColor = Computed(() => getTextColor());
	const placeholderColor = Computed(() => 
		isDisabled.get() 
			? Color3.fromRGB(180, 180, 180)
			: Color3.fromRGB(120, 120, 120)
	);

	// Text validation
	const validateText = (text: string): boolean => {
		if (props.validate) {
			return props.validate(text);
		}
		return true;
	};

	// Create the actual TextBox instance
	const textBoxInstance = New("TextBox")({
		Name: "TextInput",
		Size: new UDim2(1, -sizeValues.paddingX * 2, 1, 0),
		Position: new UDim2(0, sizeValues.paddingX, 0, 0),
		BackgroundTransparency: 1,
		BorderSizePixel: 0,

		// Text properties
		Text: Computed(() => currentText.get()),
		PlaceholderText: placeholder,
		TextColor3: textColor,
		PlaceholderColor3: placeholderColor,
		TextSize: sizeValues.fontSize,
		Font: Enum.Font.Gotham,
		TextXAlignment: Enum.TextXAlignment.Left,
		TextYAlignment: multiline ? Enum.TextYAlignment.Top : Enum.TextYAlignment.Center,
		TextWrapped: multiline,
		MultiLine: multiline,

		// Input properties
		MaxVisibleGraphemes: maxLength,
		ClearTextOnFocus: clearTextOnFocus,
		TextEditable: Computed(() => !isDisabled.get()),

		[OnEvent("Focused")]: () => {
			isFocused.set(true);
			props.onFocused?.();
		},

		[OnEvent("FocusLost")]: (enterPressed: boolean) => {
			isFocused.set(false);
			props.onFocusLost?.(enterPressed);
		},
	});

	// Handle text changes
	textBoxInstance.GetPropertyChangedSignal("Text").Connect(() => {
		const newText = textBoxInstance.Text;
		
		// Validate text
		const isValid = validateText(newText);
		hasError.set(!isValid);
		
		// Update state if it's our internal state
		if (!props.value && "set" in currentText) {
			(currentText as any).set(newText);
		}
		
		// Call change handler
		props.onChanged?.(newText);
	});

	// Return container frame with TextBox inside
	return New("Frame")({
		Name: props.Name ?? "TextBox",
		Size: props.Size ?? new UDim2(1, 0, 0, multiline ? sizeValues.height * 3 : sizeValues.height),
		Position: props.Position,
		AnchorPoint: props.AnchorPoint,
		BackgroundColor3: backgroundColor,
		BackgroundTransparency: 0,
		BorderSizePixel: 2,
		BorderColor3: borderColor,
		ZIndex: props.ZIndex,
		LayoutOrder: props.LayoutOrder,

		[Children]: [textBoxInstance],

		// Optional properties passthrough
		Visible: props.Visible,
		ClipsDescendants: props.ClipsDescendants,
	});
}
