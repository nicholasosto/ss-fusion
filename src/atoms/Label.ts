/**
 * @file Label.ts
 * @module Label
 * @layer Client/UI/Atoms
 * @description Reusable text label component with consistent theming and typography.
 *
 * @author Soul Steel Alpha Development Team
 * @since 1.0.0
 */

import Fusion, { Computed, New } from "@rbxts/fusion";
import { defaultColorScheme, fontSizes } from "../utils/theme";

export interface LabelProps extends Fusion.PropertyTable<TextLabel> {
	/** The text content to display */
	text: Fusion.StateObject<string> | string;

	/** Typography variant affecting size and weight */
	variant?: "heading" | "body" | "caption" | "small";

	/** Text color - defaults to theme OnSurface color */
	textColor?: Color3;

	/** Whether text should scale to fit the container */
	textScaled?: boolean;

	/** Font family to use */
	font?: Enum.Font;

	/** Text alignment */
	textXAlignment?: Enum.TextXAlignment;
	textYAlignment?: Enum.TextYAlignment;

	/** Whether text should wrap to new lines */
	textWrapped?: boolean;

	/** Enable text stroke (outline) */
	textStroke?: boolean;
	textStrokeColor?: Color3;
	textStrokeTransparency?: number;
}

export function Label(props: LabelProps): TextLabel {
	// Default values based on variant
	const variant = props.variant ?? "body";
	const textColor = props.textColor ?? defaultColorScheme.OnSurface;
	const textScaled = props.textScaled ?? false;
	const font = props.font ?? Enum.Font.Gotham;
	const textXAlignment = props.textXAlignment ?? Enum.TextXAlignment.Center;
	const textYAlignment = props.textYAlignment ?? Enum.TextYAlignment.Center;
	const textWrapped = props.textWrapped ?? false;
	const textStroke = props.textStroke ?? false;
	const textStrokeColor = props.textStrokeColor ?? Color3.fromRGB(0, 0, 0);
	const textStrokeTransparency = props.textStrokeTransparency ?? 0.5;

	// Get text size based on variant
	const getTextSize = (variant: string): number => {
		switch (variant) {
			case "heading":
				return fontSizes.xxl;
			case "body":
				return fontSizes.md;
			case "caption":
				return fontSizes.sm;
			case "small":
				return fontSizes.xs;
			default:
				return fontSizes.md;
		}
	};

	// Compute text content
	const displayText = Computed(() => {
		if (typeIs(props.text, "string")) {
			return props.text;
		} else {
			return props.text.get();
		}
	});

	return New("TextLabel")({
		Name: props.Name ?? "Label",
		Size: props.Size ?? new UDim2(1, 0, 0, getTextSize(variant) + 8), // Add padding
		Position: props.Position,
		AnchorPoint: props.AnchorPoint,
		BackgroundTransparency: props.BackgroundTransparency ?? 1,
		BackgroundColor3: props.BackgroundColor3,
		BorderSizePixel: props.BorderSizePixel ?? 0,
		ZIndex: props.ZIndex,
		LayoutOrder: props.LayoutOrder,

		// Text properties
		Text: displayText,
		TextColor3: textColor,
		TextSize: textScaled ? 14 : getTextSize(variant),
		TextScaled: textScaled,
		Font: font,
		TextXAlignment: textXAlignment,
		TextYAlignment: textYAlignment,
		TextWrapped: textWrapped,

		// Text stroke
		TextStrokeTransparency: textStroke ? textStrokeTransparency : 1,
		TextStrokeColor3: textStrokeColor,

		// Optional properties passthrough
		Visible: props.Visible,
		ClipsDescendants: props.ClipsDescendants,
	});
}
