/// <reference types="@rbxts/testez/globals" />
import TestEZ from "@rbxts/testez";

const results = TestEZ.TestBootstrap.run([script]);
print(`[ss-fusion] Test run: success=${results.successCount} failure=${results.failureCount} skipped=${results.skippedCount}`);
