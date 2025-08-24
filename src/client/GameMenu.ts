// /**
//  * Client UI: GameMenu ScreenGui with a simple PanelWindow.
//  */
// import Fusion, { Children, New, Value } from "@rbxts/fusion";
// import { PanelWindow } from "../organisms/PanelWindow";
// import { Label } from "../atoms/Label";
// import { Button } from "../atoms/Button";
// import { spacing } from "../utils/theme";

// /**
//  * Build the GameMenu ScreenGui instance (not parented).
//  */
// export function GameMenu(): ScreenGui {
//   const visible = Value(true);

//   const panel = PanelWindow({
//     Name: "GameMenuWindow",
//     Size: new UDim2(0, 420, 0, 280),
//     AnchorPoint: new Vector2(0.5, 0.5),
//     Position: UDim2.fromScale(0.5, 0.5),
//     titleLabel: "Game Menu",
//     closeButton: true,
//     onClose: () => visible.set(false),
//     panelVariant: "surface",
//     rounded: "large",
//   shadow: "md",
//     stroke: true,
//     contentPadding: spacing.md,
//     children: [
//       Label({
//         Name: "WelcomeLabel",
//         Size: new UDim2(1, 0, 0, 28),
//         text: "Welcome!",
//         variant: "heading",
//       }),
//       Label({
//         Name: "HintLabel",
//         Size: new UDim2(1, 0, 0, 24),
//         text: "This is a starter Game Menu using SS-Fusion PanelWindow.",
//         variant: "caption",
//         textWrapped: true,
//       }),
//       New("Frame")({
//         Name: "ButtonsRow",
//         BackgroundTransparency: 1,
//         Size: new UDim2(1, 0, 0, 40),
//         [Children]: [
//           New("UIListLayout")({
//             FillDirection: Enum.FillDirection.Horizontal,
//             HorizontalAlignment: Enum.HorizontalAlignment.Center,
//             VerticalAlignment: Enum.VerticalAlignment.Center,
//             Padding: new UDim(0, spacing.md),
//           }),
//           Button({ text: "Resume", onClick: () => visible.set(false) }),
//           Button({ text: "Settings", variant: "secondary" }),
//           Button({ text: "Quit", variant: "danger" }),
//         ],
//       }),
//     ],
//   });

//   const root = New("ScreenGui")({
//     Name: "GameMenu",
//     IgnoreGuiInset: true,
//     ResetOnSpawn: false,
//     Enabled: visible,
//     [Children]: [panel],
//   });

//   return root;
// }

// /**
//  * Convenience helper to mount the menu to PlayerGui.
//  */
// export function mountGameMenu(playerGui?: PlayerGui): ScreenGui {
//   const Players = game.GetService("Players");
//   const pg = playerGui ?? (Players.LocalPlayer!.WaitForChild("PlayerGui") as PlayerGui);
//   const gui = GameMenu();
//   gui.Parent = pg;
//   return gui;
// }
