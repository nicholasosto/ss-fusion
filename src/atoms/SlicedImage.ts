/**
 * @file SlicedImage.ts
 * @module SlicedImage
 * @layer Client/UI/Atoms
 * @description Reusable sliced image component for borders, panels, and UI elements.
 *
 * @author Soul Steel Alpha Development Team
 * @since 1.0.0
 */

import Fusion, { New } from "@rbxts/fusion";
import { defaultColorScheme } from "../utils/theme";

export interface SlicedImageProps extends Fusion.PropertyTable<ImageLabel> {
	/** The image asset ID to display */
	imageId: string;

	/** The slice center rectangle (defines the 9-slice area) */
	sliceCenter?: Rect;

	/** Scale factor for the slice */
	sliceScale?: number;

	/** Image color tint */
	imageColor?: Color3;

	/** Background color behind the image */
	backgroundColor?: Color3;

	/** Background transparency */
	backgroundTransparency?: number;
}

export function SlicedImage(props: SlicedImageProps): ImageLabel {
	// Default values
	const sliceCenter = props.sliceCenter ?? new Rect(64, 64, 64, 64);
	const sliceScale = props.sliceScale ?? 1;
	const imageColor = props.imageColor ?? Color3.fromRGB(255, 255, 255);
	const backgroundColor = props.backgroundColor ?? defaultColorScheme.Surface;
	const backgroundTransparency = props.backgroundTransparency ?? 1;

	return New("ImageLabel")({
		Name: props.Name ?? "SlicedImage",
		Size: props.Size ?? new UDim2(1, 0, 1, 0),
		Position: props.Position,
		AnchorPoint: props.AnchorPoint,
		BackgroundColor3: backgroundColor,
		BackgroundTransparency: backgroundTransparency,
		BorderSizePixel: props.BorderSizePixel ?? 0,
		ZIndex: props.ZIndex ?? 1,
		LayoutOrder: props.LayoutOrder,

		// Image properties
		Image: props.imageId,
		ImageColor3: imageColor,
		SliceCenter: sliceCenter,
		SliceScale: sliceScale,
		ScaleType: Enum.ScaleType.Slice,

		// Optional properties passthrough
		Visible: props.Visible,
		ClipsDescendants: props.ClipsDescendants,
	});
}
