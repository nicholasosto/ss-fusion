/// <reference types="@rbxts/testez/globals" />
import { Button } from "atoms/Button";

export = () => {
	describe("Button", () => {
		it("creates a Frame with InteractionButton", () => {
			const frame = Button({ text: "Click me" });
			expect(frame.IsA("Frame")).to.equal(true);
			expect(frame.FindFirstChild("InteractionButton")).to.be.ok();
			frame.Destroy();
		});
	});
};
