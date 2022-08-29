const data = {
  player: {
    id: 1234,
    email: "bob@me.net",
    name: "Bob",
    level: 4,
    avatarId: 6,
    groupId: 5397,
    xp: 304737,
    prestige: 73892,
    effects: [],
  },
  towns: [
    {
      id: 1,
      name: "Funky Town",
      location: [1682, 2864],
      buildings: [
        {
          id: 15,
          buildingTypeId: 4,
          level: 3,
          location: 25,
          content: { unitsInCreation: [] },
          constructionProgress: 37,
        },
        {
          id: 8,
          buildingTypeId: 6,
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
      resource: {},
      capacity: {},
    },
  ],
};

export default data;
