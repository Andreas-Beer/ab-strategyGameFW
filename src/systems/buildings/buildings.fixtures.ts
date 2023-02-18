import { BuildingConfig } from './buildings.types';

export const buildingConfig1: BuildingConfig = {
  typeId: 1,
  levels: {
    1: {
      actions: {
        upgrading: {
          duration: '1ms',
          requirements: [
            { type: 'has/resources', data: { resourceTypeId: 1, amount: 10 } },
            { type: 'has/playerLevel', data: { playerLevel: 1 } },
          ],
          effects: {
            start: [
              {
                type: 'modify/resources',
                data: { resourceTypeId: 1, amount: '-10' },
              },
            ],
            finish: [
              {
                type: 'modify/capacity',
                data: { resourceTypeId: 2, amount: '+10' },
              },
            ],
          },
        },
        downgrading: {
          duration: '1ms',
          requirements: [],
          effects: { start: [], finish: [] },
        },
      },
    },
    2: {
      actions: {
        upgrading: {
          duration: '1ms',
          requirements: [
            { type: 'has/resources', data: { resourceTypeId: 1, amount: 11 } },
            { type: 'has/playerLevel', data: { playerLevel: 1 } },
          ],
          effects: {
            start: [
              {
                type: 'modify/resources',
                data: { resourceTypeId: 1, amount: '-10' },
              },
            ],
            finish: [
              {
                type: 'modify/capacity',
                data: { resourceTypeId: 2, amount: '+10' },
              },
            ],
          },
        },
        downgrading: {
          requirements: [],
          duration: '1ms',
          effects: { start: [], finish: [] },
        },
      },
    },
    3: {
      actions: {
        upgrading: {
          duration: '1ms',
          requirements: [
            {
              type: 'has/resources',
              data: { resourceTypeId: 1, amount: 99999999999999 },
            },
            { type: 'has/playerLevel', data: { playerLevel: 1 } },
          ],
          effects: {
            start: [
              {
                type: 'modify/resources',
                data: { resourceTypeId: 1, amount: '-99999999999999' },
              },
            ],
            finish: [
              {
                type: 'modify/capacity',
                data: { resourceTypeId: 2, amount: '+10' },
              },
            ],
          },
        },
        downgrading: {
          requirements: [],
          duration: '1ms',
          effects: { start: [], finish: [] },
        },
      },
    },
  },
};

export const buildingConfig2: BuildingConfig = {
  typeId: 2,
  levels: {
    1: {
      actions: {
        upgrading: {
          duration: '1ms',
          requirements: [
            {
              type: 'has/resources',
              data: { resourceTypeId: 1, amount: 9999999999999 },
            },
            { type: 'has/playerLevel', data: { playerLevel: 1 } },
          ],
          effects: {
            start: [
              {
                type: 'modify/resources',
                data: { resourceTypeId: 1, amount: '-9999999999999' },
              },
            ],
            finish: [
              {
                type: 'modify/capacity',
                data: { resourceTypeId: 2, amount: '+10' },
              },
            ],
          },
        },
        downgrading: {
          requirements: [],
          duration: '1ms',
          effects: { start: [], finish: [] },
        },
      },
    },

    2: {
      actions: {
        upgrading: {
          duration: '1ms',
          requirements: [
            {
              type: 'has/resources',
              data: { resourceTypeId: 1, amount: 9999999999999 },
            },
            { type: 'has/playerLevel', data: { playerLevel: 1 } },
          ],
          effects: {
            start: [
              {
                type: 'modify/resources',
                data: { resourceTypeId: 1, amount: '-9999999999999' },
              },
            ],
            finish: [
              {
                type: 'modify/capacity',
                data: { resourceTypeId: 2, amount: '+10' },
              },
            ],
          },
        },
        downgrading: {
          requirements: [],
          duration: '1ms',
          effects: { start: [], finish: [] },
        },
      },
    },
  },
};

export const buildingConfig3: BuildingConfig = {
  typeId: 3,
  levels: {
    1: {
      actions: {
        upgrading: {
          duration: '1ms',
          requirements: [
            {
              type: 'has/resources',
              data: { resourceTypeId: 1, amount: 9999999999999 },
            },
            { type: 'has/playerLevel', data: { playerLevel: 1 } },
          ],
          effects: {
            start: [
              {
                type: 'modify/resources',
                data: { resourceTypeId: 1, amount: '-9999999999999' },
              },
            ],
            finish: [
              {
                type: 'modify/capacity',
                data: { resourceTypeId: 2, amount: '+10' },
              },
            ],
          },
        },
        downgrading: {
          requirements: [],
          duration: '1ms',
          effects: { start: [], finish: [] },
        },
      },
    },

    2: {
      actions: {
        upgrading: {
          duration: '1ms',
          requirements: [
            {
              type: 'has/resources',
              data: { resourceTypeId: 1, amount: 9999999999999 },
            },
            { type: 'has/playerLevel', data: { playerLevel: 1 } },
          ],
          effects: {
            start: [
              {
                type: 'modify/resources',
                data: { resourceTypeId: 1, amount: '-9999999999999' },
              },
            ],
            finish: [
              {
                type: 'modify/capacity',
                data: { resourceTypeId: 2, amount: '+10' },
              },
            ],
          },
        },
        downgrading: {
          requirements: [],
          duration: '1ms',
          effects: { start: [], finish: [] },
        },
      },
    },
  },
};
