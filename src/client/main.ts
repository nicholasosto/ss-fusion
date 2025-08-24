import { Players } from "@rbxts/services";
import { PanelWindow, PanelWindowProps } from "organisms";

/** Client demo entry. */
export default function runClientDemo() {
  const player = Players.LocalPlayer;
  const playerGui = player.WaitForChild("PlayerGui") as PlayerGui;

  const panelWindowProps: PanelWindowProps = {
    titleLabel: "My Panel",
    AnchorPoint: new Vector2(0.5, 0.5),
    Position: new UDim2(0.5, -200, 0.5, -150),
    Draggable: true,
    shadow: "lg",
  };

  const TestWindowPanel = PanelWindow(panelWindowProps);
  TestWindowPanel.Parent = playerGui;
}
