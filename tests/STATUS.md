# ss-fusion test status

- Runner: @rbxts/testez
- Scope: unit (atoms, molecules, utils), integration (organisms), and visual (manual gallery)

Planned coverage
- atoms
  - [ ] Button
  - [ ] IconButton (covered via Button variants)
  - [ ] Label
  - [ ] Badge
  - [ ] TextBox
  - [ ] ProgressBar
- molecules
  - [ ] TabBar
  - [ ] TabPanels
  - [ ] CooldownButton
- organisms
  - [ ] TabGroup
- layout
  - [ ] Stack
  - [ ] Grid
- utils
  - [ ] theme

Scenarios to verify
- Disabled states, hover/press transitions
- Long text overflow, icon-only sizing
- Theme switching
- Rapid mount/unmount cleanup

How to run
- Build tests: pnpm run build:tests
- Build test place: pnpm run test:place
- Open TestPlace.rbxlx in Studio; tests run on client via TestBootstrap.client.ts
