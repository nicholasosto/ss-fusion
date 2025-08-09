/**
 * Stack.ts
 * Simple horizontal/vertical stacks using UIListLayout + UIPadding with gap and alignment.
 */
import Fusion, { Children, New } from "@rbxts/fusion";
import { spacing } from "../utils/theme";

export type StackDirection = "row" | "column";
export type Align = "start" | "center" | "end";
export type Justify = "start" | "center" | "end" | "spaceBetween";

export interface StackProps extends Fusion.PropertyTable<Frame> {
  direction?: StackDirection;
  gap?: number;
  padding?: number;
  align?: Align;    // cross-axis alignment
  justify?: Justify; // main-axis distribution
  children?: Instance[];
}

function toHorizontalAlignment(justify: Justify) {
  switch (justify) {
    case "center":
      return Enum.HorizontalAlignment.Center;
    case "end":
      return Enum.HorizontalAlignment.Right;
    default:
      return Enum.HorizontalAlignment.Left;
  }
}

function toVerticalAlignment(align: Align) {
  switch (align) {
    case "center":
      return Enum.VerticalAlignment.Center;
    case "end":
      return Enum.VerticalAlignment.Bottom;
    default:
      return Enum.VerticalAlignment.Top;
  }
}

export function Stack(props: StackProps) {
  const direction = props.direction ?? "row";
  const gap = props.gap ?? spacing.sm;
  const pad = props.padding ?? 0;
  const align = props.align ?? "center";
  const justify = props.justify ?? "start";

  const horizontal = direction === "row";

  const layout = New("UIListLayout")({
    FillDirection: horizontal ? Enum.FillDirection.Horizontal : Enum.FillDirection.Vertical,
    Padding: new UDim(0, gap),
    SortOrder: Enum.SortOrder.LayoutOrder,
    HorizontalAlignment: horizontal ? toHorizontalAlignment(justify) : Enum.HorizontalAlignment.Left,
    VerticalAlignment: toVerticalAlignment(align),
  });

  const container = New("Frame")({
    Name: props.Name ?? (horizontal ? "HStack" : "VStack"),
    BackgroundTransparency: props.BackgroundTransparency ?? 1,
    BackgroundColor3: props.BackgroundColor3,
    BorderSizePixel: props.BorderSizePixel ?? 0,
    Size: props.Size ?? UDim2.fromScale(1, 0),
    AutomaticSize: horizontal ? Enum.AutomaticSize.X : Enum.AutomaticSize.Y,
    Position: props.Position,
    AnchorPoint: props.AnchorPoint,
    ZIndex: props.ZIndex,
    LayoutOrder: props.LayoutOrder,
    Visible: props.Visible,
    [Children]: [
      New("UIPadding")({
        PaddingLeft: new UDim(0, pad),
        PaddingRight: new UDim(0, pad),
        PaddingTop: new UDim(0, pad),
        PaddingBottom: new UDim(0, pad),
      }),
      layout,
      ...(props.children ?? []),
    ],
  });

  // spaceBetween emulation: add flexible spacers before/after children
  if (justify === "spaceBetween" && props.children && props.children.size() > 1) {
    const spacerBefore = Spacer({ direction });
    const spacerAfter = Spacer({ direction });
    spacerBefore.LayoutOrder = -1;
    spacerAfter.LayoutOrder = 1_000_000; // large to sort after
    spacerBefore.Parent = container;
    spacerAfter.Parent = container;
  }

  return container;
}

export interface SpacerProps extends Fusion.PropertyTable<Frame> {
  direction?: StackDirection; // match stack for correct axis
  size?: number; // optional fixed px on main axis
}

export function Spacer(props: SpacerProps) {
  const direction = props.direction ?? "row";
  const isRow = direction === "row";
  return New("Frame")({
    Name: props.Name ?? "Spacer",
    BackgroundTransparency: 1,
    BorderSizePixel: 0,
    Size: props.size
      ? (isRow ? new UDim2(0, props.size, 1, 0) : new UDim2(1, 0, 0, props.size))
      : (isRow ? new UDim2(1, 0, 0, 0) : new UDim2(0, 0, 1, 0)),
    AutomaticSize: Enum.AutomaticSize.None,
  });
}

export function HStack(props: Omit<StackProps, "direction">) {
  return Stack({ ...props, direction: "row" });
}

export function VStack(props: Omit<StackProps, "direction">) {
  return Stack({ ...props, direction: "column" });
}
