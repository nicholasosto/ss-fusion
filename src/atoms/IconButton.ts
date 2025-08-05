import Fusion, { Value, Children, New, Computed, OnEvent } from "@rbxts/fusion";
import { ImageConstants } from "../types/image-assets";
import { UI_SIZES } from "../types/ui-constants";

// Example IconButton component function
export interface IconButtonProps extends Fusion.PropertyTable<ImageButton> {
	icon: string;
	BackgroundImageId?: string;
	onClick?: () => void;
}

export function IconButton(props: IconButtonProps) {
	const isSelected = Value(false);
	const isHovered = Value(false);

	/* Background Image for IconButtons */
	const IconImage = New("ImageLabel")({
		Name: "IconImage",
		Size: UDim2.fromScale(0.75, 0.75),
		AnchorPoint: new Vector2(0.5, 0.5),
		Position: UDim2.fromScale(0.5, 0.5),
		Image: props.icon,
		ImageColor3: Computed(() => (isHovered.get() ? Color3.fromRGB(255, 255, 255) : Color3.fromRGB(200, 200, 200))),
		BackgroundTransparency: 1,
		ZIndex: 2, // Ensure the icon is above the background
	});

	/* Main Button Component */
	const buttonComponent = New("ImageButton")({
		Name: props.Name ?? "IconButton",
		Size: props.Size ?? UI_SIZES.BUTTON_ICON, // Default size, can be overridden
		Image: props.BackgroundImageId ?? ImageConstants.IconButtonBackground,
		BackgroundTransparency: Computed(() => {
			if (isSelected.get()) {
				return 0; // Semi-transparent when selected
			} else if (isHovered.get()) {
				return 0.5; // Semi-transparent when hovered
			} else {
				return 1; // Fully opaque otherwise
			}
		}),
		BackgroundColor3: Computed(() =>
			isSelected.get() ? Color3.fromRGB(46, 209, 237) : Color3.fromRGB(217, 227, 71),
		),
		[Children]: {
			IconImage: IconImage,
			AspectRatioConstraint: New("UIAspectRatioConstraint")({
				AspectRatio: 1, // Maintain square aspect ratio
			}),
		},
		[OnEvent("MouseEnter")]: () => isHovered.set(true),
		[OnEvent("MouseLeave")]: () => isHovered.set(false),
		[OnEvent("Activated")]: () => {
			isSelected.set(!isSelected.get());
			props.onClick?.();
		},
	});

	return buttonComponent;
}
