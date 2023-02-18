import { PlayerData } from './playerData.types';

export const playerDataMock: PlayerData = {
  id: 1234,
  email: 'bob@me.net',
  name: 'Bob',
  level: 4,
  avatarId: 6,
  groupId: 5397,
  xp: 304737,
  prestige: 73892,
  items: { 1: 3 },
  resources: {
    0: { amount: 20 },
    1: { amount: 100, max: 1000 },
  },
  currentActiveTownId: 1,
  towns: [
    {
      id: 1,
      name: 'Funky Town',
      buildParallelCapacity: 1,
      location: [1682, 2864],
      buildings: [
        {
          id: 15,
          buildingTypeId: 4,
          level: 3,
          location: 25,
          constructionProgress: 37,
        },
        {
          id: 8,
          level: 1,
          buildingTypeId: 6,
          location: 11,
          constructionProgress: 60,
        },
      ],
      effects: [
        {
          type: 'buff/buildParallel',
          expire: '3d',
        },
        {
          type: 'townBuff/peace',
          expire: '17h',
        },
      ],
      units: {
        3: 398,
        6: 100,
        20: 12,
      },
      resources: {
        1: { amount: 200, max: 202 },
      },
      buildingSlots: [],
    },
  ],
};
