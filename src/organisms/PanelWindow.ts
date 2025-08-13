/**
 * @file PanelWindow.ts
 * @module PanelWindow
 * @layer Client/UI/Organisms
 * @description Window-like panel that composes a TitleBar and a content area inside a themed Panel.
 *
 * Required: titleLabel. Optional: closeButton (puts a close button in the TitleBar when true).
 * Children are rendered in a dedicated content area below the title bar.
 */

import Fusion, { Children as FChildren, New, Value } from "@rbxts/fusion";
import { spacing } from "../utils/theme";
import { TitleBar } from "../molecules/TitleBar";
import { Panel, PanelVariant, PanelShadow } from "../atoms/Panel";
import { ColorVariant, BorderRadius } from "../types/common";

export interface PanelWindowProps extends Fusion.PropertyTable<Frame> {
  /** Required window title text or Fusion state */
  titleLabel: string | Value<string>;
  /** If true, shows a close button in the TitleBar */
  closeButton?: boolean;
  /** Callback invoked when the close button is pressed */
  onClose?: () => void;

  /** Panel visual options */
  panelVariant?: PanelVariant;
  rounded?: BorderRadius;
  shadow?: PanelShadow;
  stroke?: boolean;

  /** TitleBar options */
  titleBarVariant?: ColorVariant;
  titleBarHeight?: number; // default 32

  /** Content area options */
  contentPadding?: number; // default spacing.md
  scrollContent?: boolean; // default false

  /** Children to render in the content area (support both conventions) */
  children?: Instance[];
  Children?: Instance[];
}

export function PanelWindow(props: PanelWindowProps): Frame {
  const panelVariant = props.panelVariant ?? "surface";
  const rounded = props.rounded ?? "medium";
  const shadow = props.shadow ?? "none";
  const stroke = props.stroke ?? true;

  const titleBarVariant = props.titleBarVariant ?? "secondary";
  const titleBarHeight = props.titleBarHeight ?? 32;
  const wantClose = props.closeButton ?? false;
  // TitleBar only renders a close button when onClose is provided; inject a no-op to honor the flag.
  const effectiveOnClose = wantClose ? props.onClose ?? (() => {}) : undefined;

  const contentPad = props.contentPadding ?? spacing.md;
  const contentChildren = new Array<Instance>();
  for (const c of props.Children ?? []) contentChildren.push(c);
  for (const c of props.children ?? []) contentChildren.push(c);

  // Header
  const header = TitleBar({
    title: props.titleLabel,
    variant: titleBarVariant,
    height: titleBarHeight,
    showCloseButton: wantClose,
    onClose: effectiveOnClose,
  });

  // Content area (either Frame or ScrollingFrame)
  const content: Frame | ScrollingFrame = props.scrollContent
    ? New("ScrollingFrame")({
        Name: "Content",
        Size: new UDim2(1, 0, 1, -titleBarHeight - spacing.sm),
        Position: new UDim2(0, 0, 0, titleBarHeight + spacing.sm),
        BackgroundTransparency: 1,
        BorderSizePixel: 0,
        ScrollBarImageTransparency: 0.5,
        ScrollBarThickness: 6,
        CanvasSize: new UDim2(0, 0, 0, 0),
        AutomaticCanvasSize: Enum.AutomaticSize.Y,
        [FChildren]: [
          New("UIPadding")({
            PaddingTop: new UDim(0, contentPad),
            PaddingBottom: new UDim(0, contentPad),
            PaddingLeft: new UDim(0, contentPad),
            PaddingRight: new UDim(0, contentPad),
          }),
          New("UIListLayout")({
            FillDirection: Enum.FillDirection.Vertical,
            Padding: new UDim(0, spacing.sm),
            SortOrder: Enum.SortOrder.LayoutOrder,
          }),
          ...contentChildren,
        ],
      })
    : New("Frame")({
        Name: "Content",
        Size: new UDim2(1, 0, 1, -titleBarHeight - spacing.sm),
        Position: new UDim2(0, 0, 0, titleBarHeight + spacing.sm),
        BackgroundTransparency: 1,
        BorderSizePixel: 0,
        AutomaticSize: Enum.AutomaticSize.Y,
        [FChildren]: [
          New("UIPadding")({
            PaddingTop: new UDim(0, contentPad),
            PaddingBottom: new UDim(0, contentPad),
            PaddingLeft: new UDim(0, contentPad),
            PaddingRight: new UDim(0, contentPad),
          }),
          New("UIListLayout")({
            FillDirection: Enum.FillDirection.Vertical,
            Padding: new UDim(0, spacing.sm),
            SortOrder: Enum.SortOrder.LayoutOrder,
          }),
          ...contentChildren,
        ],
      });

  // Outer container using Panel chrome
  return Panel({
    Name: props.Name ?? "PanelWindow",
    Size: props.Size ?? new UDim2(0, 360, 0, 240),
    Position: props.Position,
    AnchorPoint: props.AnchorPoint,
    ZIndex: props.ZIndex,
    LayoutOrder: props.LayoutOrder,
    Visible: props.Visible,
    BackgroundTransparency: props.BackgroundTransparency,
    BorderSizePixel: 0,
    variant: panelVariant,
    rounded,
    shadow,
    stroke,
    // Inner padding handled by Panel; provide a tight default window chrome
    padding: spacing.sm,
    children: [
      // Title bar docked at top
      New("Frame")({
        BackgroundTransparency: 1,
        Size: new UDim2(1, 0, 0, titleBarHeight),
        [FChildren]: [header],
      }),
      // Content fills remainder
      content,
    ],
  });
}
