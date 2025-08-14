/**
 * @file examples/drag-demo.ts
 * Demo: Draggable PanelWindow (via DragHandle), a Draggable item using DragManager payload, and a DropZone.
 */
import Fusion, { New, OnEvent, Value } from "@rbxts/fusion";
import { PanelWindow } from "../organisms/PanelWindow";
import { DragHandle } from "../atoms/DragHandle";
import { Draggable, DropZone } from "../molecules";
import * as Drag from "../utils/drag";
import { spacing, defaultColorScheme } from "../utils/theme";

// Root ScreenGui for the demo
const screenGui = New("ScreenGui")({
  Name: "DragDemo",
  ResetOnSpawn: false,
  ZIndexBehavior: Enum.ZIndexBehavior.Global,
  Parent: game.GetService("Players").LocalPlayer!.WaitForChild("PlayerGui") as PlayerGui,
});

// A simple window with a title bar drag handle
const windowFrame = PanelWindow({
  Name: "DemoWindow",
  titleLabel: "Draggable Window",
  closeButton: true,
  Size: new UDim2(0, 360, 0, 240),
  Position: new UDim2(0.5, -180, 0.5, -120),
  AnchorPoint: new Vector2(0.5, 0.5),
});
windowFrame.Parent = screenGui;

// Inject a handle overlay on the TitleBar region that moves the window
const titleBarHandle = DragHandle({
  Size: new UDim2(1, -spacing.md * 2, 0, 32),
  Position: new UDim2(0, spacing.md, 0, spacing.sm),
  BackgroundTransparency: 1,
  onDelta: (delta) => {
    const p = windowFrame.Position;
    windowFrame.Position = new UDim2(
      p.X.Scale + delta.X.Scale,
      p.X.Offset + delta.X.Offset,
      p.Y.Scale + delta.Y.Scale,
      p.Y.Offset + delta.Y.Offset
    );
  },
});
titleBarHandle.Parent = windowFrame;

// A draggable item that publishes a payload via DragManager and is visually draggable via UIDragDetector
const item = Draggable({
  Name: "RedGem",
  Size: new UDim2(0, 64, 0, 64),
  Position: new UDim2(0, 24, 0, 24),
  responseStyle: Enum.UIDragDetectorResponseStyle.Offset,
  boundingUI: screenGui,
  payload: { type: "item", data: { id: "red-gem" } },
  children: [
    New("UICorner")({ CornerRadius: new UDim(0, 8) }),
    New("UIStroke")({ Color: Color3.fromRGB(255, 0, 0), Thickness: 2 }),
    New("TextLabel")({
      Size: UDim2.fromScale(1, 1),
      BackgroundTransparency: 1,
      Text: "Gem",
      TextColor3: defaultColorScheme.OnSurface,
      TextScaled: true,
      Font: Enum.Font.GothamBold,
    }),
  ],
});
item.Parent = windowFrame;

// A drop zone which accepts items
const drop = DropZone({
  Name: "DropTarget",
  Size: new UDim2(0, 120, 0, 120),
  Position: new UDim2(1, -140, 1, -140),
  AnchorPoint: new Vector2(1, 1),
  BackgroundColor3: Color3.fromRGB(35, 35, 35),
  BorderSizePixel: 0,
  accepts: ["item"],
  onEnter: () => (drop.BackgroundColor3 = Color3.fromRGB(60, 60, 90)),
  onLeave: () => (drop.BackgroundColor3 = Color3.fromRGB(35, 35, 35)),
  onDrop: (payload) => print("Dropped payload:", payload.type, payload.data),
  children: [
    New("UICorner")({ CornerRadius: new UDim(0, 8) }),
    New("TextLabel")({
      Size: UDim2.fromScale(1, 1),
      BackgroundTransparency: 1,
      Text: "Drop Here",
      TextColor3: defaultColorScheme.OnSurface,
      TextScaled: true,
      Font: Enum.Font.Gotham,
    }),
  ],
});
drop.Parent = windowFrame;

export {}; // example side-effect module
