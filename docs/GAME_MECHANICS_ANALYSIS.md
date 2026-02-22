# Game Mechanics Deep Dive & Package Extraction Plan

**Date:** 2026-02-22
**Repo:** ss-fusion (`@trembus/ss-fusion` v2.3.0-alpha.0)

---

## 1. What This Repo Actually Is

SS-Fusion is a **UI component library**, not a game with mechanics. It provides the
**presentation layer** for a Roblox RPG game (Soul Steel) using TypeScript + Fusion reactive
framework. There are no combat systems, inventory logic, quest engines, or
progression calculations here — only the UI widgets that *display* those systems.

This is actually **good news** for the package extraction goal: the UI is already
cleanly separated from game logic, so game mechanics can be built as independent
packages from the start rather than untangled from spaghetti code.

---

## 2. Current Assets Inventory — What's Already Here

### 2.1 Components (the UI package — keep as `@trembus/ss-fusion`)

| Layer | Components | Notes |
|-------|-----------|-------|
| **Atoms** | Avatar, Badge, Button, Label, TextBox, ProgressBar, SlicedImage, TabButton, IconButton, CloseButton, MessageBox, DragHandle, Panel | Low-level building blocks |
| **Molecules** | CooldownButton, TitleBar, Draggable, DropZone, TabBar, TabPanels | Composed from atoms |
| **Organisms** | PanelWindow, CharacterInfoCard, TabGroup | Full UI sections |
| **Layout** | HStack, VStack, Spacer, Grid, AutoGrid | Layout primitives |

**Verdict:** This is already a well-structured npm package. Keep it as the UI layer.

### 2.2 Data Catalogs Already Present (in `src/types/image-assets.ts`)

This file is the closest thing to a "game data API" in the repo:

| Category | Items | LLM-Useful? |
|----------|-------|-------------|
| **Ability Icons** | Flame_Sythe, HallowHold, Fireball, Ice_Rain, Lightning_Bolt, Earthquake, Melee, Blood_Siphon, Blood_Horror, Blood_Elemental, Soul_Drain | **Yes** — ability catalog seed |
| **Attribute Icons** | Strength, Agility, Intellect, Vitality, Luck | **Yes** — stat system schema |
| **Beam Textures** | Constrictor, SoulDrain, IceChain (2 variants each) | **Yes** — VFX catalog |
| **Border Styles** | GothicMetal, RedThick, CommonSet, RareSet, EpicSet, LegendarySet | **Yes** — rarity tier system |
| **Currency Icons** | Coins, Shards, Tombs | **Yes** — economy catalog |
| **Gem Icons** | Common, Uncommon, Rare, Epic, Legendary | **Yes** — item rarity tiers |
| **Equipment Slots** | Helmet, Armor, Weapon, Accessory | **Yes** — equipment system schema |
| **Status Icons** | DarkEnergy, LightEnergy, Might, Chill, FlightChill, Shattered | **Yes** — status effect catalog |
| **Menu Buttons** | Settings, Inventory, Character, Quests, Shop, Teleport, GemForge, Developer | **Yes** — game feature catalog |

### 2.3 Type System / Interfaces (in `src/types/common.ts`)

| Interface | Fields | LLM-Useful? |
|-----------|--------|-------------|
| `ColorScheme` | 12 color tokens (Primary through Warning) | Theme API |
| `SizeVariant` | small, medium, large | Sizing API |
| `ColorVariant` | primary, secondary, accent, error, success, warning | Variant API |
| `BaseProps` | Visible, Size, Position, AnchorPoint, ZIndex, LayoutOrder | Component schema |
| `InteractableProps` | Interactable, OnActivated, OnMouseEnter, OnMouseLeave | Interaction schema |
| `ResourceBarProps` | currentValue, maxValue, fillColor, labelText | Game stat display schema |

### 2.4 Embedded Game Logic (small, extractable)

| Location | Logic | Extractable? |
|----------|-------|-------------|
| `CooldownButton.ts:156-176` | Timer-based cooldown with interval ticking | **Yes** — generic cooldown manager |
| `utils/drag.ts` | Drag state machine (start/update/end + events) | **Yes** — generic drag/drop system |
| `DropZone.ts:16-21` | Payload type-matching acceptance rules | **Yes** — generic type-matching system |

---

## 3. Recommended Package Architecture

Here's the package split optimized for **you + an LLM working together** on Roblox game creation:

```
@trembus/ss-fusion          (EXISTING - UI components, keep as-is)
     │
     ├── @trembus/game-data       (NEW - Pure data/types, zero runtime deps)
     ├── @trembus/game-mechanics  (NEW - Core game logic, no UI)
     └── @trembus/game-builder    (NEW - LLM-facing declarative API)
```

### 3.1 `@trembus/game-data` — The Catalog Package

**Purpose:** Pure TypeScript types and data definitions. No runtime logic. This is the
**shared vocabulary** that you, the LLM, and all other packages reference.

**Why separate?** An LLM can consume this package's type definitions as context and
generate valid game configurations without needing access to any runtime code.

```
game-data/
├── src/
│   ├── abilities/
│   │   ├── types.ts          # AbilityDefinition, AbilityTier, DamageType, etc.
│   │   └── catalog.ts        # All ability definitions (Fireball, Ice_Rain, etc.)
│   │
│   ├── npcs/
│   │   ├── types.ts          # NPCDefinition, NPCBehavior, DialogNode, etc.
│   │   └── catalog.ts        # NPC templates (enemies, merchants, quest givers)
│   │
│   ├── items/
│   │   ├── types.ts          # ItemDefinition, Rarity, EquipSlot, etc.
│   │   ├── weapons.ts        # Weapon catalog
│   │   ├── armor.ts          # Armor catalog
│   │   └── gems.ts           # Gem catalog (already have rarity tiers in image-assets)
│   │
│   ├── zones/
│   │   ├── types.ts          # ZoneDefinition, SpawnPoint, EnvironmentConfig
│   │   └── catalog.ts        # Zone templates
│   │
│   ├── status-effects/
│   │   ├── types.ts          # StatusEffect, BuffDefinition, DebuffDefinition
│   │   └── catalog.ts        # All effects (already have icons: DarkEnergy, Chill, etc.)
│   │
│   ├── currency/
│   │   ├── types.ts          # CurrencyType, ShopPricing
│   │   └── catalog.ts        # Currency definitions (Coins, Shards, Tombs)
│   │
│   ├── attributes/
│   │   ├── types.ts          # AttributeDefinition, StatBlock
│   │   └── catalog.ts        # Strength, Agility, Intellect, Vitality, Luck
│   │
│   ├── quests/
│   │   ├── types.ts          # QuestDefinition, QuestObjective, QuestReward
│   │   └── catalog.ts        # Quest templates
│   │
│   ├── assets.ts             # MIGRATED from ss-fusion image-assets.ts
│   └── index.ts              # Barrel export
```

**Key types an LLM would consume:**

```typescript
// abilities/types.ts
export interface AbilityDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;                    // rbxassetid://...
  cooldown: number;                // seconds
  manaCost: number;
  damageType: "fire" | "ice" | "lightning" | "earth" | "blood" | "soul" | "physical";
  baseDamage: number;
  scaling: { attribute: string; coefficient: number }[];
  statusEffects?: string[];        // IDs of status effects to apply
  beamTexture?: string;            // for projectile/beam abilities
  tier: "basic" | "advanced" | "ultimate";
  unlockLevel: number;
}

// npcs/types.ts
export interface NPCDefinition {
  id: string;
  name: string;
  role: "enemy" | "merchant" | "quest_giver" | "guard" | "boss";
  level: number;
  stats: StatBlock;
  abilities: string[];             // ability IDs
  lootTable: LootEntry[];
  dialog?: DialogTree;
  spawnZones: string[];            // zone IDs
  modelId?: string;                // Roblox model asset ID
  behavior: NPCBehavior;
}

// zones/types.ts
export interface ZoneDefinition {
  id: string;
  name: string;
  description: string;
  levelRange: [number, number];
  environment: EnvironmentConfig;
  spawnPoints: SpawnPoint[];
  npcs: { npcId: string; count: number; respawnTime: number }[];
  loot: { itemId: string; spawnChance: number }[];
  connections: string[];           // IDs of adjacent zones
  music?: string;                  // sound asset ID
}
```

### 3.2 `@trembus/game-mechanics` — The Engine Package

**Purpose:** Pure game logic. No UI, no Roblox GUI instances. Runs on server or client.
This is the package where game rules live.

```
game-mechanics/
├── src/
│   ├── combat/
│   │   ├── CombatResolver.ts     # Damage calculation, hit/miss, crit
│   │   ├── DamageFormula.ts      # Configurable damage formulas
│   │   └── CombatState.ts        # Combat state machine (idle/attacking/defending/dead)
│   │
│   ├── cooldown/
│   │   └── CooldownManager.ts    # EXTRACTED from CooldownButton — pure timer logic
│   │                              # track multiple named cooldowns, check ready state
│   │
│   ├── inventory/
│   │   ├── Inventory.ts          # Add/remove/stack/split items
│   │   ├── Equipment.ts          # Equip/unequip with slot validation
│   │   └── LootRoller.ts         # Roll loot from loot tables using RNG
│   │
│   ├── progression/
│   │   ├── LevelSystem.ts        # XP thresholds, level-up logic
│   │   ├── AttributeAllocator.ts # Stat point distribution with validation
│   │   └── XPFormula.ts          # Configurable XP curves
│   │
│   ├── status-effects/
│   │   ├── StatusManager.ts      # Apply/remove/tick status effects
│   │   └── EffectProcessor.ts    # Process effect ticks (DOT, HOT, etc.)
│   │
│   ├── economy/
│   │   ├── Wallet.ts             # Currency management per player
│   │   ├── Shop.ts               # Buy/sell with price validation
│   │   └── Trade.ts              # Player-to-player trading
│   │
│   ├── spawning/
│   │   ├── SpawnManager.ts       # Spawn NPCs based on zone config
│   │   └── WaveSystem.ts         # Wave-based spawning (if applicable)
│   │
│   ├── quests/
│   │   ├── QuestTracker.ts       # Track quest progress per player
│   │   └── ObjectiveChecker.ts   # Validate quest objective completion
│   │
│   └── index.ts
```

**What gets extracted from current ss-fusion code:**

| Current Location | Extracted To | What Changes |
|-----------------|-------------|--------------|
| `CooldownButton.ts:156-176` (timer loop) | `CooldownManager.ts` | Pure logic, no UI; CooldownButton imports from game-mechanics |
| `image-assets.ts` (ability/attribute/gem/currency data) | `game-data/assets.ts` | ss-fusion re-exports for backward compat |
| `utils/drag.ts` (state machine pattern) | Stays in ss-fusion | UI-specific, but the pattern informs game state machines |

### 3.3 `@trembus/game-builder` — The LLM API Package

**Purpose:** Declarative, JSON-friendly API that an LLM (or you) can call to create
game content. This is the **bridge between intent and implementation**.

```
game-builder/
├── src/
│   ├── builders/
│   │   ├── ZoneBuilder.ts        # Fluent API to define zones
│   │   ├── NPCBuilder.ts         # Fluent API to define NPCs
│   │   ├── QuestBuilder.ts       # Fluent API to define quest chains
│   │   ├── AbilityBuilder.ts     # Fluent API to define abilities
│   │   ├── ItemBuilder.ts        # Fluent API to define items
│   │   └── EncounterBuilder.ts   # Fluent API to define combat encounters
│   │
│   ├── templates/
│   │   ├── zone-templates.ts     # Pre-built zone archetypes (dungeon, forest, town, etc.)
│   │   ├── npc-templates.ts      # Pre-built NPC archetypes (melee, ranged, healer, boss)
│   │   ├── encounter-templates.ts # Pre-built encounter patterns
│   │   └── quest-templates.ts    # Common quest patterns (fetch, kill, escort, etc.)
│   │
│   ├── validators/
│   │   ├── BalanceChecker.ts     # Validate game balance (DPS vs HP, economy loops)
│   │   └── SchemaValidator.ts    # Validate definition objects against schemas
│   │
│   ├── generators/
│   │   ├── PlaceGenerator.ts     # Generate Roblox place structure from zone defs
│   │   ├── UIGenerator.ts        # Generate ss-fusion UI from game-data defs
│   │   └── ScriptGenerator.ts    # Generate server/client scripts from defs
│   │
│   ├── schema/                   # JSON schemas for LLM consumption
│   │   ├── zone.schema.json
│   │   ├── npc.schema.json
│   │   ├── quest.schema.json
│   │   ├── ability.schema.json
│   │   └── item.schema.json
│   │
│   └── index.ts
```

**Example LLM interaction pattern:**

```typescript
// An LLM generates this JSON:
const zoneConfig = {
  id: "dark_forest",
  name: "The Whispering Woods",
  levelRange: [5, 10],
  environment: { lighting: "dim", ambience: "forest_night", fog: 0.3 },
  npcs: [
    { templateId: "wolf", count: 8, respawnTime: 30 },
    { templateId: "shadow_archer", count: 4, respawnTime: 60 },
    { npcId: "forest_guardian", count: 1, respawnTime: 300 }  // mini-boss
  ],
  loot: [
    { itemId: "shadow_gem", spawnChance: 0.05 },
    { itemId: "healing_herb", spawnChance: 0.2 }
  ],
  connections: ["starter_village", "abandoned_mine"]
};

// The builder validates and instantiates:
const zone = ZoneBuilder.fromJSON(zoneConfig)
  .validate()      // checks level ranges, NPC existence, balance
  .build();        // returns a deployable zone definition

// The generator creates Roblox assets:
PlaceGenerator.generate(zone);  // creates Models, Scripts, SpawnLocations
UIGenerator.generateMinimap(zone);  // creates ss-fusion minimap component
```

---

## 4. What to Extract FROM ss-fusion (Minimal Refactoring)

These are the specific items to move out of ss-fusion into the new packages:

### 4.1 Move `ImageConstants` → `@trembus/game-data`

**File:** `src/types/image-assets.ts`

This file contains the seed of your entire game catalog. The image asset IDs for
abilities, attributes, currencies, gems, borders (rarity tiers), status effects,
and equipment slots are all game data, not UI concerns.

**Migration strategy:**
1. Move the file to `game-data/src/assets.ts`
2. In ss-fusion, re-export from game-data for backward compatibility
3. Enrich each entry with full game data (damage, cooldown, description, etc.)

### 4.2 Extract Cooldown Logic → `@trembus/game-mechanics`

**File:** `src/molecules/CooldownButton.ts` lines 156-176

The timer loop logic is a game mechanic embedded in a UI component:

```typescript
// This is game logic — extract it
function startCooldown() {
  cooldownRemaining.set(props.cooldown);
  task.spawn(() => {
    while (cooldownRemaining.get() > 0) {
      task.wait(0.1);
      cooldownRemaining.set(math.max(0, cooldownRemaining.get() - 0.1));
    }
  });
}
```

**Extracted version in game-mechanics:**
```typescript
export class CooldownManager {
  private cooldowns = new Map<string, { remaining: number; duration: number }>();

  start(id: string, duration: number): void { /* ... */ }
  isReady(id: string): boolean { /* ... */ }
  getRemaining(id: string): number { /* ... */ }
  getRatio(id: string): number { /* ... */ }  // 0-1 for progress bars
  tick(dt: number): void { /* ... */ }          // call from game loop
  onComplete(id: string, callback: () => void): void { /* ... */ }
}
```

### 4.3 Extract Drag State Machine Pattern → Document as Pattern

The `utils/drag.ts` state machine (active/payload/position + events) is a clean
pattern that should be documented as a reusable pattern for game state machines
(combat state, dialog state, quest state, etc.) but can stay in ss-fusion since
it's inherently UI-specific.

---

## 5. LLM-Ready API Surface — What to Expose

For an LLM to effectively create game content (supervised or unsupervised), it needs:

### 5.1 Schemas (JSON Schema format)

Every game data type should have a JSON Schema that the LLM can reference:

```json
{
  "$id": "ability.schema.json",
  "type": "object",
  "required": ["id", "name", "cooldown", "damageType", "baseDamage"],
  "properties": {
    "id": { "type": "string", "pattern": "^[a-z_]+$" },
    "name": { "type": "string" },
    "cooldown": { "type": "number", "minimum": 0 },
    "damageType": { "enum": ["fire", "ice", "lightning", "earth", "blood", "soul", "physical"] },
    "baseDamage": { "type": "number", "minimum": 0 },
    "icon": { "type": "string", "description": "Key from ImageConstants.Ability" }
  }
}
```

### 5.2 Template Library

Pre-built archetypes that an LLM can reference and modify:

| Template Category | Examples | Purpose |
|-------------------|----------|---------|
| **Zone Templates** | Dungeon, Forest, Town, Arena, Boss_Room | Starting points for zone creation |
| **NPC Templates** | Melee_Warrior, Ranged_Caster, Healer, Tank, Boss | Stat/behavior presets |
| **Quest Templates** | Kill_X, Fetch_Item, Escort, Defend, Boss_Fight | Common quest structures |
| **Encounter Templates** | Patrol_Group, Ambush, Wave_Defense, Boss_Phases | Combat encounter patterns |
| **Loot Tables** | Common_Drop, Rare_Drop, Boss_Drop, Dungeon_Chest | Reward distribution patterns |

### 5.3 Catalog Registry

A queryable catalog so the LLM can discover what's available:

```typescript
// Example: LLM asks "what fire abilities exist?"
Catalog.abilities.filter(a => a.damageType === "fire")
// → [Fireball, Flame_Sythe]

// Example: LLM asks "what zones are level 5-10?"
Catalog.zones.filter(z => z.levelRange[0] <= 5 && z.levelRange[1] >= 10)

// Example: LLM asks "what status effects involve cold?"
Catalog.statusEffects.filter(s => s.tags.includes("cold"))
// → [Chill, FlightChill]
```

### 5.4 Validation API

So the LLM (or you reviewing LLM output) can check correctness:

```typescript
const result = Validator.validateZone(zoneConfig);
// → { valid: false, errors: ["NPC 'dragon_lord' not found in catalog", "levelRange[1] exceeds max (100)"] }
```

---

## 6. Existing Code That Maps to the New Architecture

| Current ss-fusion Code | Maps To | New Package |
|------------------------|---------|-------------|
| `ImageConstants.Ability.*` | `AbilityDefinition.icon` | game-data |
| `ImageConstants.Attributes.*` | `AttributeDefinition.icon` | game-data |
| `ImageConstants.Currency.*` | `CurrencyDefinition.icon` | game-data |
| `ImageConstants.Gems.*` | `ItemDefinition.icon` (gems) | game-data |
| `ImageConstants.Borders.*` | `RarityTier.borderAsset` | game-data |
| `ImageConstants.StatusIcon.*` | `StatusEffect.icon` | game-data |
| `ImageConstants.SlotImage.*` | `EquipSlot.icon` | game-data |
| `ImageConstants.Beam.*` | `AbilityDefinition.beamTexture` | game-data |
| `MenuButtonImageMap` | `GameFeature.menuIcon` | game-data |
| `CooldownButton` timer logic | `CooldownManager` | game-mechanics |
| `ProgressBar` + `ResourceBarProps` | UI for `StatBlock` display | ss-fusion (stays) |
| `CharacterInfoCard` | UI template for `PlayerData` | ss-fusion (stays) |
| `Draggable` + `DropZone` | UI for `InventorySystem` | ss-fusion (stays) |
| `ColorScheme` / theme | UI theming, LLM can reference | ss-fusion (stays) |

---

## 7. Priority Implementation Order

### Phase 1: `@trembus/game-data` (Foundation)
1. Create the package with TypeScript + roblox-ts config
2. Migrate `image-assets.ts` and enrich with full definitions
3. Define all core types (Ability, NPC, Item, Zone, StatusEffect, Currency, Attribute)
4. Build initial catalogs from the data already in `ImageConstants`
5. Add JSON schemas for every type

### Phase 2: `@trembus/game-mechanics` (Logic)
1. Extract `CooldownManager` from CooldownButton
2. Implement `CombatResolver` with configurable damage formulas
3. Implement `Inventory` and `Equipment` systems
4. Implement `LevelSystem` with XP curves
5. Implement `StatusManager` for buff/debuff processing
6. Implement `Wallet` and `Shop` for economy

### Phase 3: `@trembus/game-builder` (LLM API)
1. Create builder classes for each game data type
2. Create template library (zone archetypes, NPC archetypes, etc.)
3. Create validation layer
4. Create JSON schema files for LLM consumption
5. Create generator functions that produce Roblox-ready output
6. Write comprehensive documentation (this IS the LLM's instruction manual)

### Phase 4: Integration
1. Update ss-fusion to depend on game-data for image constants
2. Update CooldownButton to use game-mechanics CooldownManager
3. Create example: full zone built from game-builder output rendered with ss-fusion UI
4. Test unsupervised LLM generation pipeline (JSON in → playable zone out)

---

## 8. Unsupervised LLM Game Creation Flow

The end-to-end pipeline for an LLM creating game content without human intervention:

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐     ┌────────────┐
│  LLM Prompt │ ──> │ game-builder │ ──> │ game-mechanics│ ──> │  ss-fusion │
│  (JSON)     │     │ (validate +  │     │ (wire up      │     │ (generate  │
│             │     │  build)      │     │  game logic)  │     │  UI)       │
└─────────────┘     └──────────────┘     └───────────────┘     └────────────┘
                          │                      │                     │
                          ▼                      ▼                     ▼
                    game-data               Server Scripts        Client UI
                    (catalogs,              (combat, loot,        (HUD, menus,
                     schemas)               spawning)             inventory)
```

**LLM Input Example:**
> "Create a level 15-20 ice cave zone with 3 types of frost enemies,
> a frost giant boss, and a quest to collect 5 ice shards."

**LLM Output (validated JSON):**
```json
{
  "zone": { "id": "frost_cave", "levelRange": [15, 20], ... },
  "npcs": [
    { "id": "frost_imp", "role": "enemy", "level": 15, ... },
    { "id": "ice_golem", "role": "enemy", "level": 18, ... },
    { "id": "frost_archer", "role": "enemy", "level": 17, ... },
    { "id": "frost_giant", "role": "boss", "level": 20, ... }
  ],
  "quest": {
    "id": "ice_shard_collection",
    "objectives": [{ "type": "collect", "itemId": "ice_shard", "count": 5 }],
    "rewards": [{ "type": "xp", "amount": 500 }, { "type": "item", "itemId": "frost_gem" }]
  }
}
```

**Pipeline validates → builds → deploys.**

---

## 9. Summary

| Package | Purpose | Depends On | Size Estimate |
|---------|---------|-----------|---------------|
| `@trembus/ss-fusion` | UI components (keep as-is) | game-data | ~20 files |
| `@trembus/game-data` | Types, schemas, catalogs | none | ~15 files |
| `@trembus/game-mechanics` | Game logic (combat, inventory, etc.) | game-data | ~20 files |
| `@trembus/game-builder` | LLM-facing declarative API | game-data, game-mechanics | ~25 files |

The key insight: **ss-fusion is already clean** — it's a UI library with no game logic
mixed in. The game data in `image-assets.ts` is the seed for the catalog package.
The architecture above gives you a clean separation where:

- **game-data** is the shared vocabulary (LLM reads this)
- **game-mechanics** is the rule engine (LLM doesn't need to touch this)
- **game-builder** is the LLM's interface (LLM writes to this)
- **ss-fusion** is the display layer (game-builder generates calls to this)
