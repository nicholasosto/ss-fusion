-- TestPlace bootstrap: initialize roblox-ts runtime, then import the compiled main client module

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

-- Load roblox-ts RuntimeLib
local RuntimeLib = ReplicatedStorage:WaitForChild("rbxts_runtime"):WaitForChild("RuntimeLib")
local TS = require(RuntimeLib)

-- Optional Promise polyfill (roblox-ts ships one)
local PromiseModule = ReplicatedStorage.rbxts_runtime:FindFirstChild("Promise")
if PromiseModule then
	TS.Promise = require(PromiseModule)
end

-- StarterPlayerScripts contains the compiled "TS" folder
local player = Players.LocalPlayer or Players.PlayerAdded:Wait()
local playerScripts = player:WaitForChild("PlayerScripts")
local tsFolder = playerScripts:WaitForChild("TS")

-- Import the compiled TS loader and execute it
local ok, err = pcall(function()
	local loader = tsFolder:FindFirstChild("loader")
	if loader and loader:IsA("ModuleScript") then
		local start = TS.import(script, loader)
		if type(start) == "function" then
			start()
		end
	end
end)

if not ok then
	warn("[ss-fusion] Test bootstrap error:", err)
end
