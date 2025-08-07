/**
 * @file ExampleUsage.ts
 * @description Comprehensive example demonstrating all SS-Fusion atoms with proper usage patterns.
 * 
 * This example showcases:
 * - Unified Button component (text, icon, and styled variants)
 * - Label component with different typography variants
 * - TextBox component with validation and state management
 * - ProgressBar component with reactive progress tracking
 * - SlicedImage component for scalable UI panels
 * - Proper reactive state management with Fusion
 * - Theme integration and consistent styling
 * 
 * @example
 * // To use this example in your game:
 * const demoUI = CreateExampleUI();
 * demoUI.Parent = PlayerGui.ScreenGui;
 * 
 * @author Soul Steel Alpha Development Team
 * @since 1.0.0
 */

import Fusion, { Value } from "@rbxts/fusion";
import { Label, Button, TextBox, ProgressBar, SlicedImage } from "../atoms";
import { ImageConstants, MenuButtonImageMap } from "../types/image-assets";

/**
 * Creates a comprehensive UI demo showcasing all SS-Fusion atoms.
 * 
 * This function demonstrates proper usage patterns including:
 * - Reactive state management with Fusion Values
 * - Component composition and layout
 * - Event handling and user interactions
 * - Theme integration and consistent styling
 * 
 * @returns A Frame containing the complete demo UI
 */
export function CreateExampleUI() {
	// Reactive state values for demo interactivity
	const inputText = Value("");
	const displayText = Value("Hello, World!");
	const progressValue = Value(0.75); // 75% progress

	// Main container with dark background
	const container = new Instance("Frame");
	container.Size = new UDim2(1, 0, 1, 0);
	container.BackgroundColor3 = Color3.fromRGB(50, 50, 50);

	// === TYPOGRAPHY DEMONSTRATION ===
	
	// Main heading using Label component
	const header = Label({
		Name: "Header",
		text: "SS-Fusion Component Demo",
		variant: "heading",
		Size: new UDim2(1, 0, 0, 50),
		Position: new UDim2(0, 0, 0, 10),
	});

	// === PROGRESS VISUALIZATION ===
	
	// Progress bar demonstrating reactive progress tracking
	const progressBar = ProgressBar({
		Name: "ExampleProgress",
		currentValue: progressValue,
		maxValue: Value(1), // 100% max
		showLabel: true,
		Size: new UDim2(0.8, 0, 0, 20),
		Position: new UDim2(0.1, 0, 0, 70),
	});

	// === TEXT INPUT DEMONSTRATION ===
	
	// Text input with placeholder and change handling
	const textInput = TextBox({
		Name: "TextInput",
		placeholder: "Enter some text...",
		value: inputText,
		Size: new UDim2(0.8, 0, 0, 40),
		Position: new UDim2(0.1, 0, 0, 100),
		onChanged: (text) => {
			// Update display text in real-time as user types
			print("Text changed:", text);
		},
	});

	// === REACTIVE TEXT DISPLAY ===
	
	// Label that displays reactive text content
	const displayLabel = Label({
		Name: "DisplayLabel",
		text: displayText,
		variant: "body",
		Size: new UDim2(0.8, 0, 0, 30),
		Position: new UDim2(0.1, 0, 0, 150),
	});

	// === BUTTON DEMONSTRATIONS ===
	
	// Primary action button (text button)
	const primaryButton = Button({
		Name: "PrimaryButton",
		text: "Update Display",
		variant: "primary",
		Size: new UDim2(0, 150, 0, 40),
		Position: new UDim2(0.1, 0, 0, 190),
		onClick: () => {
			// Update display text with input content or default message
			displayText.set(inputText.get() || "Nothing entered!");
		},
	});

	// Secondary action button (text button)
	const secondaryButton = Button({
		Name: "SecondaryButton",
		text: "Clear All",
		variant: "secondary",
		Size: new UDim2(0, 150, 0, 40),
		Position: new UDim2(0.1, 200, 0, 190),
		onClick: () => {
			// Reset all demo values to defaults
			inputText.set("");
			displayText.set("Cleared!");
		},
	});

	// Icon button demonstration (unified button in icon mode)
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

	// === SLICED IMAGE DEMONSTRATION ===
	
	// Background panel using 9-slice scaling for scalable borders
	const backgroundPanel = SlicedImage({
		Name: "BackgroundPanel",
		imageId: ImageConstants.Borders.GothicMetal,
		Size: new UDim2(0.8, 0, 0, 100),
		Position: new UDim2(0.1, 0, 0, 250),
		sliceCenter: new Rect(130, 130, 130, 130),
		sliceScale: 0.5,
	});

	// === ASSEMBLY ===
	
	// Add all components to the main container
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
