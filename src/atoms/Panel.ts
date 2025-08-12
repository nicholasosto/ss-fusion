/**
 * @file Panel.ts
 * @module Panel
 * @layer Client/UI/Atoms
 * @description Themed container Frame for panels, cards, and sections with consistent padding, corner radius, optional border, and shadow.
 *
 * A lightweight building-block container you can drop inside larger panels/windows or use standalone
 * as a themed box. It follows the library theme colors and spacing by default and exposes common
 * options like variant, rounded corners, stroke, padding, and shadow.
 *
 * @example
 * // Basic surface panel with default padding
 * const panel = Panel({ Size: UDim2.fromOffset(300, 160) });
 *
 * @example
 * // Accent header strip container
 * const accent = Panel({ variant: "accent", rounded: "small", padding: 8 });
 *
 * @example
 * // Card-like panel with shadow and border
 * const card = Panel({ shadow: "md", stroke: true, rounded: "medium" });
 */

import Fusion, { Children, Computed, New } from "@rbxts/fusion";
import { defaultColorScheme, spacing, borderRadiusValues } from "../utils/theme";
import { BorderRadius } from "../types/common";

export type PanelVariant =
  | "surface"
  | "background"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error";

export type PanelShadow = "none" | "sm" | "md" | "lg";

export interface PanelProps extends Fusion.PropertyTable<Frame> {
  /** Theme variant for the panel background */
  variant?: PanelVariant;
  /** Corner radius preset */
  rounded?: BorderRadius;
  /** Include a subtle border stroke (default true) */
  stroke?: boolean;
  /** Override stroke color */
  strokeColor?: Color3;
  /** Stroke thickness in pixels (default 1) */
  strokeThickness?: number;
  /** Stroke transparency (0 = opaque, 1 = hidden). Default 0.2 */
  strokeTransparency?: number;
  /** Padding inside the panel in pixels (default spacing.md) */
  padding?: number;
  /** Optional drop shadow size */
  shadow?: PanelShadow;
  /** Optional children to render inside */
  children?: Instance[];
}

function variantToBackground(v: PanelVariant): Color3 {
  switch (v) {
    case "primary":
      return defaultColorScheme.Primary;
    case "secondary":
      return defaultColorScheme.Secondary;
    case "accent":
      return defaultColorScheme.Accent;
    case "success":
      return defaultColorScheme.Success;
    case "warning":
      return defaultColorScheme.Warning;
    case "error":
      return defaultColorScheme.Error;
    case "background":
      return defaultColorScheme.Background;
    case "surface":
    default:
      return defaultColorScheme.Surface;
  }
}

function shadowConfig(shadow: PanelShadow): { offset: number; transparency: number } | undefined {
  switch (shadow) {
    case "sm":
      return { offset: 4, transparency: 0.75 };
    case "md":
      return { offset: 8, transparency: 0.6 };
    case "lg":
      return { offset: 12, transparency: 0.5 };
    default:
      return undefined;
  }
}

export function Panel(props: PanelProps): Frame {
  const variant = props.variant ?? "surface";
  const rounded = props.rounded ?? "medium";
  const padding = props.padding ?? spacing.md;
  const withStroke = props.stroke ?? true;
  const strokeThickness = props.strokeThickness ?? 1;
  const strokeTransparency = props.strokeTransparency ?? 0.2;
  const shadow = props.shadow ?? "none";

  const backgroundColor = Computed(() => variantToBackground(variant));

  const borderColor = Computed(() => {
    if (props.strokeColor) return props.strokeColor;
    // Subtle darkened border derived from the background
    return backgroundColor.get().Lerp(Color3.fromRGB(0, 0, 0), 0.2);
  });

  const children: Instance[] = [];

  // Rounded corners
  children.push(
    New("UICorner")({
      CornerRadius: new UDim(0, borderRadiusValues[rounded]),
    })
  );

  // Inner padding
  if (padding > 0) {
    children.push(
      New("UIPadding")({
        PaddingTop: new UDim(0, padding),
        PaddingBottom: new UDim(0, padding),
        PaddingLeft: new UDim(0, padding),
        PaddingRight: new UDim(0, padding),
      })
    );
  }

  // Stroke
  if (withStroke) {
    children.push(
      New("UIStroke")({
        Color: borderColor,
        Thickness: strokeThickness,
        Transparency: strokeTransparency,
        ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
      })
    );
  }

  // Optional drop shadow using Roblox built-in image
  const sc = shadowConfig(shadow);
  if (sc) {
    const { offset, transparency } = sc;
    const shadowZ = Computed(() => {
      const base = props.ZIndex;
      if (base === undefined) return 0;
      if (typeIs(base, "number")) return math.max(0, base - 1);
      return math.max(0, base.get() - 1);
    });
    children.push(
      New("ImageLabel")({
        Name: "DropShadow",
        Size: new UDim2(1, offset * 2, 1, offset * 2),
        Position: new UDim2(0, -offset, 0, -offset),
        BackgroundTransparency: 1,
        Image: "rbxasset://textures/ui/Controls/DropShadow.png",
        ImageColor3: Color3.fromRGB(0, 0, 0),
        ImageTransparency: transparency,
        ScaleType: Enum.ScaleType.Slice,
        SliceCenter: new Rect(12, 12, 244, 244),
        ZIndex: shadowZ,
      })
    );
  }

  // Inject user children last so they render on top of styling helpers
  for (const c of props.children ?? []) children.push(c);

  return New("Frame")({
    Name: props.Name ?? "Panel",
    Size: props.Size ?? new UDim2(0, 300, 0, 150),
    AutomaticSize: props.AutomaticSize,
    Position: props.Position,
    AnchorPoint: props.AnchorPoint,
    BackgroundColor3: backgroundColor,
    BackgroundTransparency: props.BackgroundTransparency ?? 0,
    BorderSizePixel: 0,
    ZIndex: props.ZIndex,
    LayoutOrder: props.LayoutOrder,
    Visible: props.Visible,
    ClipsDescendants: props.ClipsDescendants,
    [Children]: children,
  });
}
