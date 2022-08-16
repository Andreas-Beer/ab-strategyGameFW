// ----- Config -----

const config = {
  buildingsBuildParallel: 2,
  buildings: [
    {
      id: 4,
      texts: l10n.building("barracks"),
      gfx: gfx.building("barracks"),
      requirements: {
        level1: [
          { type: "playerLevel", level: 2 },
          { type: "building", id: 13, level: 5 },
        ],
        level10: [{ type: "item", itemId: 29 }],
      },
      price: {
        level1: [
          { resourceId: 2, amount: 300 },
          { resourceId: 1, amount: 100 },
        ],
      },
      effects: [
        {
          type: "create units",
          slots: {
            level1: 2,
            level2: "+4",
            level3: "+6",
          },
        },
      ],
    },
    {
      id: 2,
      texts: l10n.building("greenhouse"),
      gfx: gfx.building("greenhouse"),
      price: [{ resourceId: 1, amount: 100 }],
      effects: [
        {
          type: "increase/resource",
          repeat: "1h",
          resourceId: 2,
          amount: {
            level1: 200,
            level3: 600,
            level10: "*2",
          },
        },
        {
          type: "increase/capacity",
          resourceId: 2,
          amount: {
            level1: 75,
            level2: 150,
            level3: 240,
            level4: 360,
            level10: 2400,
          },
        },
      ],
    },
    {
      id: 3,
      texts: l10n.building("greenhouse"),
      gfx: gfx.building("commandCenter"),
      price: [
        { resourceId: 1, amount: 720 },
        { resourceId: 2, amount: 2000 },
      ],
      requirements: {
        level1: [{ type: "not-building", id: 3 }],
      },
      effects: [
        {
          type: "sendTroops",
          amount: {
            level1: 1,
            level2: 2,
          },
        },
      ],
    },
  ],
  units: [
    {
      id: 2,
      texts: l10n.unit("mercenary"),
      gfx: gfx.unit("mercenary"),
      stats: {
        damage: 200,
        range: 20,
        shield: 100,
        capacity: 2000,
        life: 200,
        speed: 500,
        maintenance: 200,
      },
      price: [
        { resourceId: 2, amount: 300 },
        { resourceId: 1, amount: 100 },
      ],
      requirements: [
        { type: "playerLevel", level: 6 },
        { type: "building", id: 5, level: 3 },
      ],
      consume: [{ resourceId: 3, amount: 30, repeat: "1h" }],
    },
  ],
  items: [
    {
      id: 0,
      texts: l10n.item("dove"),
      gfx: gfx.item("dove"),
      category: 1,
      price: [{ resourceId: 0, amount: 300 }],
      effects: [
        {
          type: "buff/peace",
          expire: "10t",
        },
      ],
    },
    {
      id: 1,
      texts: l10n.item("resourcePack").config({ resourceId: 2, amount: 20 }),
      gfx: gfx.item("resourcePack").config({ resourceId: 2, amount: 20 }),
      category: 3,
      price: [{ resourceId: 0, amount: 10 }],
      effects: [
        {
          type: "increase/resource",
          resourceId: 2,
          amount: 20,
        },
      ],
    },
    {
      id: 2,
      texts: l10n.item("hammers"),
      gfx: gfx.item("hammers"),
      category: 5,
      price: [{ resourceId: 0, amount: 10 }],
      effects: [
        {
          type: "buff/buildParallel",
          expire: "10t",
        },
      ],
    },
    {
      id: 3,
      texts: l10n.item("buildingSpeedup").config({ time: "2h" }),
      gfx: gfx.item("buildingSpeedup").config({ time: "2h" }),
      category: 8,
      price: [{ resourceId: 0, amount: 10 }],
      effects: [
        {
          type: "speedup",
          amount: "2h",
        },
      ],
    },
    {
      id: 4,
      texts: l10n.item("beginnerPackage"),
      gfx: gfx.item("beginnerPackage"),
      price: [{ resourceId: 0, amount: 250 }],
      items: [
        { itemId: 2, amount: 3 },
        { itemId: 1, amount: 10 },
        { itemId: 15, amount: 1 },
      ],
    },
  ],
};

const data = {
  player: {
    name: "Bob",
    level: 4,
    avatarId: 6,
    groupId: 5397,
    xp: 304737,
    prestige: 73892,
  },
  towns: [
    {
      name: "Funky Town",
      location: [1682, 2864],
      buildings: [
        {
          id: 15,
          buildingId: 4,
          level: 3,
          location: 25,
          content: { unitsInCreation: [] },
          updateProgress: 37,
        },
        {
          id: 8,
          buildingId: 6,
          location: 11, // Slot ID
          constructionProgress: 60,
        },
      ],
      effects: [
        {
          type: "buff/resource",
          expire: "3t",
          resourceId: 2,
          amount: "*2.4",
        },
        {
          type: "buff/peace",
          expire: "17h",
        },
      ],
      units: {
        3: 398,
        6: 100,
        20: 12,
      },
      resources: {
        0: 200,
        1: 3027,
        2: 2803,
      },
    },
  ],
};

// ----- Game Code -----

// create a new game
const game = new Game(config, data).on("error", onGameError);

// Example create a barracks building
const buildingTypeId_01 = 4;
const buildingSlotId_01 = 10;
const unitBuilding_01 = game
  .createBuilding(buildingTypeId_01, buildingSlotId_01)
  .on("finish", onCreateBuildingFinished)
  .on("progress", onCreateBuildingProgress);

// Example create units
const unitTypeId = 2;
game
  .createUnit(unitBuilding_01, unitTypeId, 30)
  .on("unitProgress", () => onUnitProgress)
  .on("unitFinish", () => onUnitFinished);

// Example create a resourceBuilding
const buildingTypeId_02 = 4;
const buildingSlotId_02 = 10;
const resourceBuilding_01 = game
  .createBuilding(buildingTypeId_02, buildingSlotId_02)
  .on("finish", onCreateBuildingFinished)
  .on("progress", onCreateBuildingProgress)
  .on("cycle", onResourceBuildingCycling);
