/// <reference types="@rbxts/testez/globals" />
import TestEZ from "@rbxts/testez";

// Run all tests discovered under this script's descendants (Rojo maps tests under StarterPlayerScripts)
const results = TestEZ.TestBootstrap.run(
	game.GetService("StarterPlayer").StarterPlayerScripts!.GetDescendants()
);

print("[ss-fusion] Test run complete", results.success and "SUCCESS" or "FAIL");
