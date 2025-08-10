/// <reference types="@rbxts/testez/globals" />
import { Button } from "../../../out";
/// <reference types="@rbxts/testez/globals" />

export default () => {
    describe("Button", () => {
        it("creates a Frame with InteractionButton", () => {
            const frame = Button({ text: "Click me" });
            expect(frame.IsA("Frame")).to.equal(true);
            expect(frame.FindFirstChild("InteractionButton")).to.be.ok();
            frame.Destroy();
        });
    });
};
