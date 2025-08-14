/**
 * @file molecules/Draggable.ts
 * Wrap a child with a UIDragDetector and expose handy props/events.
 */
import Fusion, { New, Children as FChildren, OnEvent } from "@rbxts/fusion";
import * as Drag from "../utils/drag";

export interface DraggableProps extends Fusion.PropertyTable<Frame> {
  /** The element to make draggable (detector parent); if omitted, we create a container Frame. */
  target?: GuiObject;
  /** Optional content to mount inside the target container. */
  children?: Instance[];
  /** UIDragDetector configuration */
  dragStyle?: Enum.UIDragDetectorDragStyle;
  responseStyle?: Enum.UIDragDetectorResponseStyle;
  dragRelativity?: Enum.UIDragDetectorDragRelativity;
  dragSpace?: Enum.UIDragDetectorDragSpace;
  dragAxis?: Vector2;
  boundingUI?: GuiBase2d;
  enabled?: boolean;
  /** Optional payload to auto-publish via utils/drag. If provided, Draggable will call Drag.start/update/end for you. */
  payload?: Drag.DragPayload;
  /** Events */
  onDragStart?: (input: Vector2) => void;
  onDrag?: (input: Vector2) => void;
  onDragEnd?: (input: Vector2) => void;
  /** Optional constraints and scripted styles */
  constraints?: Array<{ priority: number; fn: (pos: UDim2, rot: number) => LuaTuple<[UDim2, number]> }>;
  /**
   * Custom drag style function for Scriptable drag. The current typings for
   * UIDragDetector expect a UDim2 input and UDim2 | void return; keep it broad
   * for compatibility across type versions.
   */
  scriptableFn?: (input: UDim2) => UDim2 | void;
}

export function Draggable(props: DraggableProps): GuiObject {
  const target = props.target ?? New("Frame")({
    Name: props.Name ?? "Draggable",
    BackgroundTransparency: props.BackgroundTransparency ?? 1,
    BackgroundColor3: props.BackgroundColor3,
    BorderSizePixel: props.BorderSizePixel ?? 0,
    Size: props.Size ?? UDim2.fromOffset(100, 40),
    Position: props.Position,
    AnchorPoint: props.AnchorPoint,
    ZIndex: props.ZIndex,
    LayoutOrder: props.LayoutOrder,
    Visible: props.Visible,
    [FChildren]: props.children ?? [],
  });

  const detector = New("UIDragDetector")({
    DragStyle: props.dragStyle ?? Enum.UIDragDetectorDragStyle.TranslatePlane,
    ResponseStyle: props.responseStyle ?? Enum.UIDragDetectorResponseStyle.Offset,
    DragRelativity: props.dragRelativity ?? Enum.UIDragDetectorDragRelativity.Relative,
    DragSpace: props.dragSpace ?? Enum.UIDragDetectorDragSpace.Parent,
    DragAxis: props.dragAxis,
    BoundingUI: props.boundingUI,
    Enabled: props.enabled ?? true,
    [OnEvent("DragStart")]: (pos: Vector2) => {
      // Auto-publish payload if provided
      if (props.payload) Drag.startDrag(props.payload, pos, target);
      props.onDragStart?.(pos);
    },
    [OnEvent("DragContinue")]: (pos: Vector2) => {
      if (props.payload) Drag.update(pos);
      props.onDrag?.(pos);
    },
    [OnEvent("DragEnd")]: (pos: Vector2) => {
      if (props.payload) Drag.endDrag();
      props.onDragEnd?.(pos);
    },
  });

  // Register constraints/scripted behavior
  if (props.scriptableFn) detector.DragStyle = Enum.UIDragDetectorDragStyle.Scriptable;
  if (props.scriptableFn)
    detector.SetDragStyleFunction((inputPosition: UDim2) => props.scriptableFn!(inputPosition));
  for (const c of props.constraints ?? []) detector.AddConstraintFunction(c.priority, c.fn);

  detector.Parent = target;
  return target;
}
