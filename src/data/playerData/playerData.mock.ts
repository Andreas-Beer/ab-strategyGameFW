import { PlayerData } from '../../types/data.types';

export const playerDataMock: PlayerData = {
  id: 1234,
  email: 'bob@me.net',
  name: 'Bob',
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
      name: 'Funky Town',
      location: [1682, 2864],
      buildings: [
        {
          id: 15,
          typeId: 4,
          level: 3,
          location: 25,
          content: { unitsInCreation: [{ id: 1 }] },
          constructionProgress: 37,
        },
        {
          id: 8,
          level: 0,
          typeId: 6,
          location: 11,
          constructionProgress: 60,
        },
      ],
      effects: [
        {
          effectId: 1,
          expire: '3d',
        },
        {
          effectId: 2,
          expire: '17h',
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
