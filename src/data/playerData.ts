const playerData: PlayerData = {
  id: 1234,
  email: "bob@me.net",
  name: "Bob",
  level: 4,
  avatarId: 6,
  groupId: 5397,
  xp: 304737,
  prestige: 73892,
  effects: [{ effectId: 2 }],
  items: { 1: 3 },
  resources: {
    0: 20,
    1: 100,
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
          content: { unitsInCreation: [{ id: 1 }] },
          constructionProgress: 37,
        },
        {
          id: 8,
          level: 0,
          buildingTypeId: 6,
          location: 11,
          constructionProgress: 60,
        },
      ],
      effects: [
        {
          effectId: 1,
          expire: "3d",
        },
        {
          effectId: 2,
          expire: "17h",
        },
      ],
      units: {
        3: 398,
        6: 100,
        20: 12,
      },
      resources: {
        1: 20,
      },
      capacity: {},
    },
  ],
};

function getData(data: any, selector: NestedSelector<typeof data>) {
  const firstDot = selector.indexOf(".");
  const nextSelector = selector.slice(0, firstDot);
  const restSelectors = selector.slice(firstDot + 1);

  if (firstDot === -1) {
    return data[restSelectors];
  }
  return getData(data[nextSelector], restSelectors);
}

function setData(
  data: any,
  selector: NestedSelector<typeof data>,
  newValue: any
) {
  const LastDot = selector.lastIndexOf(".");
  const firstSelectors = selector.slice(0, LastDot);
  const restSelector = selector.slice(LastDot + 1);
  const context = LastDot === -1 ? data : getData(data, firstSelectors);
  context[restSelector] = newValue;
}

function fetchPlayerData(playerId: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(playerData), 10);
  });
}

export async function getPlayerData(playerId: number, data?: any) {
  data = data || (await fetchPlayerData(playerId));

  return {
    get(selector: NestedSelector<PlayerData>) {
      return getData(data, selector);
    },
    set(selector: NestedSelector<PlayerData>, value: any) {
      setData(data, selector, value);
    },
  };
}
