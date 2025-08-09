/**
 * Integration test file to verify all new components are properly exported and functional
 */

import { 
	IconButton, 
	CloseButton, 
	MessageBox, 
	TitleBar, 
	CooldownButton 
} from "./index";

// Test that all components can be imported and used
export function testIntegration() {
	// Test IconButton
	const iconButton = IconButton({
		icon: "rbxassetid://123456789",
		variant: "primary",
		size: "medium",
		onClick: () => print("IconButton clicked!")
	});

	// Test CloseButton
	const closeButton = CloseButton({
		variant: "error",
		onClick: () => print("Close clicked!")
	});

	// Test MessageBox
	const messageBox = MessageBox({
		message: "Test message",
		messageType: "success",
		autoHide: true,
		duration: 3
	});

	// Test TitleBar
	const titleBar = TitleBar({
		title: "Test Dialog",
		variant: "primary",
		onClose: () => print("Dialog closed!")
	});

	// Test CooldownButton
	const cooldownButton = CooldownButton({
		icon: "rbxassetid://987654321",
		cooldown: 5,
		variant: "accent",
		onClick: () => print("Cooldown button clicked!")
	});

	return {
		iconButton,
		closeButton,
		messageBox,
		titleBar,
		cooldownButton
	};
}
