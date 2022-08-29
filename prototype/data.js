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
    resources: {
      0: 20,
      1: 100,
    },
  },
  towns: [
    {
      id: 1,
      name: "Funky Town",
      location: { cords: [1682, 2864] },
      buildings: [
        {
          id: 15,
          buildingTypeId: 4,
          level: 3,
          location: { slotId: 25 },
          content: { unitsInCreation: [] },
          constructionProgress: 37,
        },
        {
          id: 8,
          level: 0,
          buildingTypeId: 6,
          location: { slotId: 11 },
          constructionProgress: 60,
        },
      ],
      effects: [
        {
          type: "buff/resource/2",
          repeat: "5h",
          expire: "3t",
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
      resource: {
        1: 20,
      },
      capacity: {},
    },
  ],
};

export default data;
