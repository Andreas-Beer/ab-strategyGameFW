const config: ConfigData = {
  buildings: {
    buildingsBuildParallel: 2,
    buildings: [
      {
        id: 4,
        levels: {
          1: {
            requirements: [
              { type: 'playerLevel', level: 2 },
              { type: 'building', buildingId: 13, level: 5 },
            ],
            price: [
              { resourceId: 2, amount: 300 },
              { resourceId: 1, amount: 100 },
            ],
            duration: '10s',
            effects: [],
          },
          10: {
            requirements: [{ type: 'item', itemId: 29 }],
            effects: [],
            price: [
              { resourceId: 2, amount: 300 },
              { resourceId: 1, amount: 100 },
            ],
            duration: '20s',
          },
        },
        // abilities: [{ type: "create/units", kinds: "all" }],
        controller: {
          name: '#Barrack',
          config: {
            slots: {
              1: 2,
              2: '+4',
              3: '+6',
            },
          },
        },
      },
      {
        id: 2,
        levels: {
          1: {
            price: [{ resourceId: 1, amount: 100 }],
            duration: '30s',
            effects: [
              {
                type: 'modify/resource/2',
                amount: +200,
                repeat: '5s',
              },
              {
                type: 'modify/capacity/2',
                amount: +2000,
              },
              {
                type: 'modify/xp',
                amount: +500,
              },
            ],
            requirements: [],
          },
        },
      },
      {
        id: 3,
        levels: {
          1: {
            price: [
              { resourceId: 1, amount: 720 },
              { resourceId: 2, amount: 2000 },
            ],
            duration: '20s',
            requirements: [{ type: 'not-building', buildingId: 3 }],
            effects: [],
          },
        },
        controller: {
          name: '#CommandCenter',
        },
      },
    ],
  },
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
      duration: '500ms',
      price: [
        { resourceId: 2, amount: 300 },
        { resourceId: 1, amount: 100 },
      ],
      requirements: [
        { type: 'playerLevel', level: 6 },
        { type: 'building', buildingId: 5, level: 3 },
      ],
      effects: [{ resourceId: 3, amount: 30, repeat: '1h' }],
    },
  ],
  items: [
    {
      id: 0,
      category: 1,
      price: [{ resourceId: 0, amount: 300 }],
      effects: [
        {
          type: 'townBuff/peace',
          expire: '10d',
        },
      ],
    },
    {
      id: 1,
      category: 3,
      price: [
        { resourceId: 0, amount: 10 },
        { resourceId: 1, amount: 30 },
      ],
      effects: [
        {
          type: 'modify/resource/2',
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
          type: 'buff/buildParallel',
          expire: '10d',
        },
      ],
    },
    {
      id: 3,
      category: 8,
      isUnusableInInventory: true,
      price: [{ resourceId: 0, amount: 10 }],
      effects: [
        {
          type: 'speedup/building',
          amount: '2h',
        },
      ],
      chances: {
        gambling: 1300,
        battle: 1000,
        scavenging: 1000,
      },
    },
    {
      id: 4,
      category: 3,
      isUnusableInInventory: true,
      price: [{ resourceId: 0, amount: 250 }],
      effects: [
        {
          type: 'package/items',
          items: [
            { itemId: 2, amount: 3 },
            { itemId: 1, amount: 10 },
            { itemId: 15, amount: 1 },
          ],
        },
      ],
    },
    {
      id: 5,
      category: 5,
      isUnusableInInventory: true,
      price: [{ resourceId: 0, amount: 10 }],
      effects: [
        {
          type: 'townBuff/resource/2',
          amount: '+40%',
          expire: '10d',
        },
      ],
    },
  ],
};

function getConfig() {
  return Object.freeze(config);
}

export { getConfig };
