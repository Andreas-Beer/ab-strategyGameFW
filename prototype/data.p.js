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
      id: 1,
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

export default data;
