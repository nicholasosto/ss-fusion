/**
 * @file atoms/DragHandle.ts
 * A drag handle area that emits deltas without moving its parent (Custom response style).
 */
import Fusion, { New, OnEvent } from "@rbxts/fusion";

export interface DragHandleProps extends Fusion.PropertyTable<Frame> {
  target?: GuiObject; // if omitted, we create a Frame
  boundingUI?: GuiBase2d;
  dragRelativity?: Enum.UIDragDetectorDragRelativity; // default Relative
  onDelta?: (delta: UDim2) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

export function DragHandle(props: DragHandleProps): GuiObject {
  const area = props.target ?? New("Frame")({
    Name: props.Name ?? "DragHandle",
    BackgroundTransparency: props.BackgroundTransparency ?? 1,
    BackgroundColor3: props.BackgroundColor3,
    BorderSizePixel: props.BorderSizePixel ?? 0,
    Size: props.Size ?? UDim2.fromScale(1, 0),
    Position: props.Position,
    AnchorPoint: props.AnchorPoint,
    ZIndex: props.ZIndex,
    LayoutOrder: props.LayoutOrder,
    Visible: props.Visible,
  });

  const detector = New("UIDragDetector")({
    DragStyle: Enum.UIDragDetectorDragStyle.TranslatePlane,
    ResponseStyle: Enum.UIDragDetectorResponseStyle.CustomOffset,
    DragRelativity: props.dragRelativity ?? Enum.UIDragDetectorDragRelativity.Relative,
    DragSpace: Enum.UIDragDetectorDragSpace.Parent,
    BoundingUI: props.boundingUI,
    [OnEvent("DragStart")]: () => props.onStart?.(),
    [OnEvent("DragContinue")]: () => props.onDelta?.((detector as UIDragDetector).DragUDim2),
    [OnEvent("DragEnd")]: () => props.onEnd?.(),
  });

  detector.Parent = area;
  return area;
}
