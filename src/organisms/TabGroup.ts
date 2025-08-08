import Fusion, { Children, New, Value } from "@rbxts/fusion";
import { TabGroupProps } from "../types/tabs";
import { TabBar } from "../molecules/TabBar";
import { TabPanels } from "../molecules/TabPanels";

export function TabGroup(props: TabGroupProps) {
	const vertical = props.layout === "Left";

	// Ensure active is valid (fall back to first tab)
	if (props.tabs.size() > 0 && !props.tabs.some((t) => t.id === props.active.get())) {
		props.active.set(props.tabs[0].id);
	}

	const barSize = vertical ? new UDim2(0, 140, 1, 0) : new UDim2(1, 0, 0, 36);
	const panelsPos = vertical ? new UDim2(0, 140, 0, 0) : new UDim2(0, 0, 0, 36);
	const panelsSize = vertical ? new UDim2(1, -140, 1, 0) : new UDim2(1, 0, 1, -36);

	return New("Frame")({
		Name: props.Name ?? "TabGroup",
		BackgroundTransparency: 1,
		Size: props.Size ?? UDim2.fromScale(1, 1),
		Position: props.Position ?? UDim2.fromOffset(0, 0),
		AnchorPoint: props.AnchorPoint,
		ZIndex: props.ZIndex,
		LayoutOrder: props.LayoutOrder,
		Visible: props.Visible,

		[Children]: [
			New("Frame")({
				Name: "Bar",
				BackgroundTransparency: 1,
				Size: barSize,
				[Children]: [TabBar({ tabs: props.tabs, active: props.active, vertical })],
			}),

			New("Frame")({
				Name: "Content",
				BackgroundTransparency: 1,
				Position: panelsPos,
				Size: panelsSize,
				[Children]: [
					TabPanels({ tabs: props.tabs, active: props.active, mountOnlyActive: props.mountOnlyActive }),
				],
			}),
		],
	});
}
