import Fusion, { Children, Computed, New, OnEvent, Value } from "@rbxts/fusion";
import { defaultColorScheme } from "../utils/theme";

/**
 * Properties for the Avatar component
 */
export interface AvatarProps {
	/**
	 * The image to display in the avatar
	 */
	Image?: Fusion.StateObject<string> | string;

	/**
	 * User ID for automatic player thumbnail loading
	 */
	UserId?: Fusion.StateObject<number> | number;

	/**
	 * Shape of the avatar
	 * @default "Circle"
	 */
	Shape?: Fusion.StateObject<"Circle" | "Square" | "Rounded"> | "Circle" | "Square" | "Rounded";

	/**
	 * Size of the avatar
	 */
	Size?: Fusion.StateObject<UDim2> | UDim2;

	/**
	 * Position of the avatar
	 */
	Position?: Fusion.StateObject<UDim2> | UDim2;

	/**
	 * Anchor point of the avatar
	 */
	AnchorPoint?: Fusion.StateObject<Vector2> | Vector2;

	/**
	 * Fallback text to display when image is not available
	 */
	FallbackText?: Fusion.StateObject<string> | string;

	/**
	 * Background color for fallback display
	 */
	BackgroundColor?: Fusion.StateObject<Color3> | Color3;

	/**
	 * Text color for fallback text
	 */
	TextColor?: Fusion.StateObject<Color3> | Color3;

	/**
	 * Font for fallback text
	 */
	Font?: Fusion.StateObject<Enum.Font> | Enum.Font;

	/**
	 * Text size for fallback text
	 */
	TextSize?: Fusion.StateObject<number> | number;

	/**
	 * Whether to show a status indicator
	 * @default false
	 */
	ShowStatus?: Fusion.StateObject<boolean> | boolean;

	/**
	 * Status color (typically for online/offline indicators)
	 */
	StatusColor?: Fusion.StateObject<Color3> | Color3;

	/**
	 * Border color
	 */
	BorderColor?: Fusion.StateObject<Color3> | Color3;

	/**
	 * Border thickness
	 * @default 0
	 */
	BorderThickness?: Fusion.StateObject<number> | number;

	/**
	 * Whether the avatar is visible
	 */
	Visible?: Fusion.StateObject<boolean> | boolean;

	/**
	 * Z-index for layering
	 */
	ZIndex?: Fusion.StateObject<number> | number;

	/**
	 * Layout order for automatic layouts
	 */
	LayoutOrder?: Fusion.StateObject<number> | number;

	/**
	 * Callback fired when the avatar is clicked
	 */
	onClick?: () => void;

	/**
	 * Callback fired when the mouse enters the avatar
	 */
	onMouseEnter?: () => void;

	/**
	 * Callback fired when the mouse leaves the avatar
	 */
	onMouseLeave?: () => void;
}

/**
 * Avatar component for displaying user profile images, player thumbnails, or fallback text
 * 
 * @example
 * ```typescript
 * // Basic avatar with image
 * const avatar = Avatar({
 *   Image: "rbxasset://textures/face.png",
 *   Size: new UDim2(0, 64, 0, 64)
 * });
 * 
 * // Player thumbnail avatar
 * const playerAvatar = Avatar({
 *   UserId: 1,
 *   Size: new UDim2(0, 48, 0, 48),
 *   Shape: "Circle"
 * });
 * 
 * // Fallback text avatar
 * const textAvatar = Avatar({
 *   FallbackText: "JD",
 *   BackgroundColor: Color3.fromHex("#6366f1"),
 *   TextColor: Color3.new(1, 1, 1),
 *   Size: new UDim2(0, 40, 0, 40)
 * });
 * ```
 */
export function Avatar(props: AvatarProps): Frame {
	const theme = defaultColorScheme;
	
	// Helper function to get state values
	const getValue = <T>(stateOrValue: Fusion.StateObject<T> | T | undefined, defaultValue: T): T => {
		if (stateOrValue === undefined) return defaultValue;
		if (typeIs(stateOrValue, "table") && typeIs((stateOrValue as any).get, "function")) {
			return (stateOrValue as Fusion.StateObject<T>).get();
		}
		return stateOrValue as T;
	};

	const imageUrl = props.UserId 
		? `https://www.roblox.com/headshot-thumbnail/image?userId=${getValue(props.UserId, 0)}&width=150&height=150&format=png`
		: undefined;

	const cornerRadius = Computed(() => {
		const shape = getValue(props.Shape, "Circle");
		const size = getValue(props.Size, new UDim2(0, 48, 0, 48));
		
		if (shape === "Circle") {
			// Use half the smaller dimension for perfect circle
			const pixelSize = math.min(size.X.Offset, size.Y.Offset);
			return new UDim(0, pixelSize / 2);
		} else if (shape === "Rounded") {
			return new UDim(0, 8);
		} else {
			return new UDim(0, 0);
		}
	});

	const avatarFrame = New("Frame")({
		Name: "Avatar",
		Size: props.Size ?? new UDim2(0, 48, 0, 48),
		Position: props.Position,
		AnchorPoint: props.AnchorPoint,
		BackgroundColor3: props.BackgroundColor ?? theme.Surface,
		BackgroundTransparency: 0,
		BorderSizePixel: getValue(props.BorderThickness, 0),
		BorderColor3: props.BorderColor,
		Visible: props.Visible,
		ZIndex: props.ZIndex,
		LayoutOrder: props.LayoutOrder,

		[Children]: {
			UICorner: New("UICorner")({
				CornerRadius: cornerRadius
			}),

			UIAspectRatioConstraint: New("UIAspectRatioConstraint")({
				AspectRatio: 1,
				AspectType: Enum.AspectType.FitWithinMaxSize
			}),

			// Invisible button for interaction
			ClickHandler: (props.onClick || props.onMouseEnter || props.onMouseLeave) ? New("TextButton")({
				Name: "ClickHandler",
				Size: new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				Text: "",
				ZIndex: 10,

				[OnEvent("MouseButton1Click")]: props.onClick,
				[OnEvent("MouseEnter")]: props.onMouseEnter,
				[OnEvent("MouseLeave")]: props.onMouseLeave,
			}) : undefined,

			// Main image or fallback
			Content: props.Image || imageUrl ? New("ImageLabel")({
				Name: "Image",
				Size: new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				Image: getValue(props.Image, "") || imageUrl || "",
				ScaleType: Enum.ScaleType.Crop,

				[Children]: {
					UICorner: New("UICorner")({
						CornerRadius: cornerRadius
					})
				}
			}) : New("TextLabel")({
				Name: "FallbackText",
				Size: new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				Text: getValue(props.FallbackText, ""),
				TextColor3: props.TextColor ?? theme.OnSurface,
				TextScaled: true,
				Font: getValue(props.Font, Enum.Font.SourceSans),
				TextSize: getValue(props.TextSize, 14),

				[Children]: {
					UITextSizeConstraint: New("UITextSizeConstraint")({
						MaxTextSize: 24,
						MinTextSize: 8
					})
				}
			}),

			// Status indicator
			StatusIndicator: getValue(props.ShowStatus, false) ? New("Frame")({
				Name: "StatusIndicator",
				Size: new UDim2(0.25, 0, 0.25, 0),
				Position: new UDim2(0.8, 0, 0.8, 0),
				AnchorPoint: new Vector2(0.5, 0.5),
				BackgroundColor3: props.StatusColor ?? Color3.fromRGB(34, 197, 94),
				BorderSizePixel: 2,
				BorderColor3: theme.Surface,

				[Children]: {
					UICorner: New("UICorner")({
						CornerRadius: new UDim(0.5, 0)
					}),

					UIAspectRatioConstraint: New("UIAspectRatioConstraint")({
						AspectRatio: 1
					})
				}
			}) : undefined
		}
	});

	return avatarFrame;
}
