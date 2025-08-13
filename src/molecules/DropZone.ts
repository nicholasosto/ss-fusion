/**
 * @file molecules/DropZone.ts
 * Declarative target area for drops, with accept rules and feedback hooks.
 */
import Fusion, { New, Children as FChildren } from "@rbxts/fusion";
import * as Drag from "../utils/drag";

export interface DropZoneProps extends Fusion.PropertyTable<Frame> {
  accepts?: string[] | ((payload: Drag.DragPayload) => boolean);
  onEnter?: (payload: Drag.DragPayload) => void;
  onLeave?: (payload: Drag.DragPayload) => void;
  onDrop?: (payload: Drag.DragPayload) => void;
  children?: Instance[];
}

function acceptsPayload(accepts: DropZoneProps["accepts"], payload?: Drag.DragPayload) {
  if (!payload) return false;
  if (!accepts) return true;
  if (typeIs(accepts, "function")) return (accepts as (p: Drag.DragPayload) => boolean)(payload);
  return (accepts as string[]).includes(payload.type);
}

export function DropZone(props: DropZoneProps): Frame {
  const frame = New("Frame")({
    Name: props.Name ?? "DropZone",
    BackgroundTransparency: props.BackgroundTransparency ?? 1,
    BackgroundColor3: props.BackgroundColor3,
    BorderSizePixel: props.BorderSizePixel ?? 0,
    Size: props.Size ?? UDim2.fromOffset(100, 100),
    Position: props.Position,
    AnchorPoint: props.AnchorPoint,
    ZIndex: props.ZIndex,
    LayoutOrder: props.LayoutOrder,
    Visible: props.Visible,
    [FChildren]: props.children ?? [],
  });

  // Subscribe to global drag state to detect enter/leave/drop
  let inside = false;
  let lastPayload: Drag.DragPayload | undefined;
  const conn = Drag.onChanged((s) => {
    const absPos = frame.AbsolutePosition;
    const absSize = frame.AbsoluteSize;
    if (!s.active || !s.position) {
      inside = false;
      return;
    }
    const p = s.position;
    const within = p.X >= absPos.X && p.X <= absPos.X + absSize.X && p.Y >= absPos.Y && p.Y <= absPos.Y + absSize.Y;
    const ok = within && acceptsPayload(props.accepts, s.payload);

    if (ok && !inside) {
      inside = true;
      lastPayload = s.payload;
      if (lastPayload) props.onEnter?.(lastPayload);
    } else if (!ok && inside) {
      inside = false;
      if (lastPayload) props.onLeave?.(lastPayload);
      lastPayload = undefined;
    }
  });

  const endConn = Drag.onEnded((s) => {
    if (inside && lastPayload) props.onDrop?.(lastPayload);
    inside = false;
    lastPayload = undefined;
  });

  frame.AncestryChanged.Connect((_, p) => {
    if (!p) {
      conn.Disconnect();
      endConn.Disconnect();
    }
  });

  return frame;
}
