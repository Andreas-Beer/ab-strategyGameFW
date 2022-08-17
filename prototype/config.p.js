const config = {
  buildingsBuildParallel: 2,
  buildings: [
    {
      id: 4,
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
      buildTime: "10s",
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
      price: [{ resourceId: 1, amount: 100 }],
      buildTime: "1min",
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
      price: [
        { resourceId: 1, amount: 720 },
        { resourceId: 2, amount: 2000 },
      ],
      buildTime: "1min",
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
      price: [{ resourceId: 0, amount: 250 }],
      items: [
        { itemId: 2, amount: 3 },
        { itemId: 1, amount: 10 },
        { itemId: 15, amount: 1 },
      ],
    },
  ],
};

export default config;
