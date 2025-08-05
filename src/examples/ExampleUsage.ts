/**
 * @file ExampleUsage.ts
 * @description Example demonstrating how to use the unified atoms
 */

import Fusion, { Value } from "@rbxts/fusion";
import { Label, Button, TextBox, ProgressBar, SlicedImage } from "../atoms";
import { ImageConstants, MenuButtonImageMap } from "../types/image-assets";

// Example of using the new atoms together
export function CreateExampleUI() {
	const inputText = Value("");
	const displayText = Value("Hello, World!");
	const progressValue = Value(0.75);

	const container = new Instance("Frame");
	container.Size = new UDim2(1, 0, 1, 0);
	container.BackgroundColor3 = Color3.fromRGB(50, 50, 50);

	// Header label
	const header = Label({
		Name: "Header",
		text: "SS-Fusion Component Demo",
		variant: "heading",
		Size: new UDim2(1, 0, 0, 50),
		Position: new UDim2(0, 0, 0, 10),
	});

	// Progress bar example
	const progressBar = ProgressBar({
		Name: "ExampleProgress",
		progress: progressValue,
		showLabel: true,
		Size: new UDim2(0.8, 0, 0, 20),
		Position: new UDim2(0.1, 0, 0, 70),
	});

	// Text input
	const textInput = TextBox({
		Name: "TextInput",
		placeholder: "Enter some text...",
		value: inputText,
		Size: new UDim2(0.8, 0, 0, 40),
		Position: new UDim2(0.1, 0, 0, 100),
		onChanged: (text) => {
			print("Text changed:", text);
		},
	});

	// Display label
	const displayLabel = Label({
		Name: "DisplayLabel",
		text: displayText,
		variant: "body",
		Size: new UDim2(0.8, 0, 0, 30),
		Position: new UDim2(0.1, 0, 0, 150),
	});

	// Primary button (text)
	const primaryButton = Button({
		Name: "PrimaryButton",
		text: "Update Display",
		variant: "primary",
		Size: new UDim2(0, 150, 0, 40),
		Position: new UDim2(0.1, 0, 0, 190),
		onClick: () => {
			displayText.set(inputText.get() || "Nothing entered!");
		},
	});

	// Secondary button (text)
	const secondaryButton = Button({
		Name: "SecondaryButton",
		text: "Clear All",
		variant: "secondary",
		Size: new UDim2(0, 150, 0, 40),
		Position: new UDim2(0.1, 200, 0, 190),
		onClick: () => {
			inputText.set("");
			displayText.set("Cleared!");
		},
	});

	// Icon button example
	const iconButton = Button({
		Name: "IconButton",
		icon: MenuButtonImageMap.Settings,
		variant: "icon",
		size: "medium",
		Position: new UDim2(0.1, 370, 0, 190),
		onClick: () => {
			print("Icon button clicked!");
		},
	});

	// Sliced image background example
	const backgroundPanel = SlicedImage({
		Name: "BackgroundPanel",
		imageId: ImageConstants.Borders.GothicMetal,
		Size: new UDim2(0.8, 0, 0, 100),
		Position: new UDim2(0.1, 0, 0, 250),
		sliceCenter: new Rect(130, 130, 130, 130),
		sliceScale: 0.5,
	});

	// Add components to container
	header.Parent = container;
	progressBar.Parent = container;
	textInput.Parent = container;
	displayLabel.Parent = container;
	primaryButton.Parent = container;
	secondaryButton.Parent = container;
	iconButton.Parent = container;
	backgroundPanel.Parent = container;

	return container;
}
