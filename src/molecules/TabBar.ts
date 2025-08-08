import Fusion, { Children, ForPairs, New } from "@rbxts/fusion";
import { TabSpec } from "../types/tabs";
import { TabButton } from "../atoms/TabButton";

export interface TabBarProps {
	tabs: TabSpec[];
	active: Fusion.Value<string>;
	vertical?: boolean;
}

export function TabBar(props: TabBarProps) {
	return New("Frame")({
		Name: "TabBar",
		BackgroundTransparency: 1,
		Size: props.vertical ? new UDim2(0, 140, 1, 0) : new UDim2(1, 0, 0, 36),
		AutomaticSize: props.vertical ? Enum.AutomaticSize.X : Enum.AutomaticSize.Y,
		[Children]: [
			New("UIListLayout")({
				FillDirection: props.vertical ? Enum.FillDirection.Vertical : Enum.FillDirection.Horizontal,
				HorizontalAlignment: Enum.HorizontalAlignment.Left,
				VerticalAlignment: Enum.VerticalAlignment.Center,
				Padding: new UDim(0, 6),
				SortOrder: Enum.SortOrder.LayoutOrder,
			}),

			ForPairs(props.tabs, (_i, tab) => $tuple(tab.id, TabButton(tab, props.active))),
		],
	});
}
