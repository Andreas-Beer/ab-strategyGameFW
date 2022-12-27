import { BuildingsConfig } from '../../systems/buildings/building.types';
import { ItemConfig } from '../../types/item.types';
import { UnitConfig } from '../../types/units.types';
import { ConfigData } from './config.types';

const buildingsConfigMock: BuildingsConfig = {
  buildingsBuildParallel: 1,
  buildings: [
    {
      typeId: 4,
      levels: {
        1: {
          requirements: [
            { type: 'playerLevel', level: 2 },
            { type: 'building', buildingTypeId: 13, level: 5 },
          ],
          price: [
            { resourceId: 2, amount: 300 },
            { resourceId: 1, amount: 100 },
          ],
          duration: '10s',
          effects: [],
        },
        10: {
          requirements: [{ type: 'item', itemTypeId: 29 }],
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
      typeId: 2,
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
      typeId: 3,
      levels: {
        1: {
          price: [
            { resourceId: 1, amount: 720 },
            { resourceId: 2, amount: 2000 },
          ],
          duration: '20s',
          requirements: [{ type: 'not-building', buildingTypeId: 3 }],
          effects: [],
        },
      },
      controller: {
        name: '#CommandCenter',
      },
    },
  ],
};

const itemsConfigMock: ItemConfig[] = [
  {
    typeId: 0,
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
    typeId: 1,
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
    typeId: 2,
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
    typeId: 3,
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
    typeId: 4,
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
    typeId: 5,
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
];

const unitConfigMock: UnitConfig[] = [
  {
    typeId: 2,
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
      { type: 'building', buildingTypeId: 5, level: 3 },
    ],
    effects: [{ resourceId: 3, amount: 30, repeat: '1h' }],
  },
];

export const configDataMock: ConfigData = {
  buildings: buildingsConfigMock,
  units: unitConfigMock,
  items: itemsConfigMock,
};
