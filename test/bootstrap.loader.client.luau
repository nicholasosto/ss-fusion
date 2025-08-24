-- Calls the compiled TS loader module after TS.import initializes
local Players = game:GetService("Players")
local player = Players.LocalPlayer or Players.PlayerAdded:Wait()
local playerScripts = player:WaitForChild("PlayerScripts")
local tsFolder = playerScripts:WaitForChild("TS")

local ok, err = pcall(function()
	local loader = tsFolder:WaitForChild("client"):FindFirstChild("loader")
	if loader and loader:IsA("ModuleScript") then
		require(loader)()
	end
end)

if not ok then
	warn("[ss-fusion] Could not start TS loader:", err)
end
