import { BuildingsConfig } from '../../src/systems/buildings/buildings.types';

/**
 * ResourceTypeIds
 *
 * 1: diamonds,
 * 2: food,
 * 3: junk,
 * 4: stone,
 * 5: energy,
 */

/**
 * ItemTypeIds
 *
 * 1: blueprint
 */

const conf: BuildingsConfig = {
  buildingsBuildParallel: 1,
  buildings: [
    // techScavenger
    {
      typeId: 1,
      levels: {
        1: {
          duration: '480s',
          actions: {
            upgrading: {
              requirements: [
                {
                  not: true,
                  type: 'has/building',
                  data: { buildingTypeId: 1, buildingLevel: 1, amount: 1 },
                },
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 1, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 1750 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 2500 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-1750' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-2500' },
                  },
                ],
                finish: [],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        2: {
          duration: '960s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 2, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 3500 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 5000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 960 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-3500' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-5000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-960' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+30' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        3: {
          duration: '1920s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 3, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 7000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 10000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 1920 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-7000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-10000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-1920' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+45' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        4: {
          duration: '3840s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 4, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 14000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 20000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 3840 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-14000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-20000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-3840' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+80' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        5: {
          duration: '7680s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 5, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 28000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 40000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 7680 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-28000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-40000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-7680' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+95' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        6: {
          duration: '15360s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 6, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 56000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 80000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 15360 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-56000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-80000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-15360' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+110' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        7: {
          duration: '30720s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 7, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 112000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 160000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 30720 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-112000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-160000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-30720' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+155' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        8: {
          duration: '61440s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 8, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 224000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 320000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 61440 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-224000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-320000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-61440' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+170' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        9: {
          duration: '122880s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 9, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 448000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 640000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 122880 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-448000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-640000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-122880' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+185' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        10: {
          duration: '245760s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 10, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 896000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 128000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 245760 },
                },
                {
                  type: 'has/item',
                  data: {
                    itemTypeId: 1,
                    amount: 1,
                  },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-896000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-128000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-245760' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+250' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
      },
    },
    // barracks
    {
      typeId: 2,
      levels: {
        1: {
          duration: '165s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 1, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 1400 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 1850 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-1400' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-1850' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+15' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        2: {
          duration: '600s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 2, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 2800 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 3700 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-2800' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-3700' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+30' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        3: {
          duration: '1200s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 3, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 5600 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 7400 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-5600' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-7400' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+45' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        4: {
          duration: '2400s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 4, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 11200 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 14800 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 1000 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-11200' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-14800' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-1000' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+70' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        5: {
          duration: '4800s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 5, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 19200 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 24000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 3000 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-19200' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-24000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-3000' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+85' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        6: {
          duration: '9600s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 6, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 38400 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 48000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 8000 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-38400' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-48000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-8000' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+100' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        7: {
          duration: '19200s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 7, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 76800 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 96000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 20000 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-76800' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-96000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-20000' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+135' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        8: {
          duration: '38400s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 8, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 153600 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 192000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 50000 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-153600' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-192000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-50000' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+150' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        9: {
          duration: '76800s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 9, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 307200 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 384000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 128000 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-307200' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-384000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-128000' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+165' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        10: {
          duration: '153600s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 10, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 614400 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 768000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 256000 },
                },
                {
                  type: 'has/item',
                  data: { itemTypeId: 1, amount: 1 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-614400' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-768000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-256000' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+210' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
      },
    },
    // scoutTower
    {
      typeId: 3,
      levels: {
        1: {
          duration: '450s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 1, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 400 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 1000 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-400' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-1000' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+15' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        2: {
          duration: '900s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 2, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 800 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 2000 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-800' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-2000' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+30' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        3: {
          duration: '1800s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 3, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 1600 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 4000 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-1600' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-4000' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+45' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        4: {
          duration: '3600s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 4, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 3200 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 8000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 500 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-3200' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-8000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-500' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+80' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        5: {
          duration: '7200s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 5, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 6400 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 16000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 1200 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-6400' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-16000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-1200' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+85' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        6: {
          duration: '14400s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 6, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 12800 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 32000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 4000 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-12800' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-32000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-4000' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+110' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        7: {
          duration: '28800s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 7, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 25600 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 64000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 12000 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-25600' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-64000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-12000' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+155' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        8: {
          duration: '57600s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 8, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 51200 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 128000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 24000 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-51200' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-128000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-24000' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+170' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        9: {
          duration: '115200s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 9, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 256000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 256000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 50200 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-256000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-256000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-50200' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+185' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
        10: {
          duration: '230400s',
          actions: {
            upgrading: {
              requirements: [
                {
                  type: 'has/building',
                  data: { buildingTypeId: 16, buildingLevel: 10, amount: 1 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 3, amount: 512000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 4, amount: 1536000 },
                },
                {
                  type: 'has/resources',
                  data: { resourceTypeId: 5, amount: 120400 },
                },
                {
                  type: 'has/item',
                  data: { itemTypeId: 1, amount: 1 },
                },
              ],
              effects: {
                start: [
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 3, amount: '-512000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 4, amount: '-1536000' },
                  },
                  {
                    type: 'modify/resources',
                    data: { resourceTypeId: 5, amount: '-120400' },
                  },
                ],
                finish: [{ type: 'modify/respect', data: { amount: '+250' } }],
              },
            },
            downgrading: {
              requirements: [],
              effects: {
                start: [],
                finish: [],
              },
            },
          },
        },
      },
    },
  ],
};
