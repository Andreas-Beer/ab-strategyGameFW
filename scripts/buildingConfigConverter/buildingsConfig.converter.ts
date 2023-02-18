// @ts-nocheck

import {
  BuildingLevelKeys,
  BuildingLevelVal,
  ParsedXMLBuilding,
  ParsedXMLBuildingsConfig,
} from './buildingParsedXmlConfig.type';

import {
  BuildingConfig,
  BuildingLevelConfig,
  BuildingsConfig,
  BuildingTypeId,
} from '../../src/systems/buildings/buildings.types';

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { XMLParser } from 'fast-xml-parser';
import { Requirement } from '../../src/systems/requirements/requirements.types';
import { EffectConfig } from '../../src/types/effect.types';

const inputPath = join(__dirname, '../../data/config/buildingsConfig.xml');
const outputPath = join(__dirname, '../../data/config/buildingsConfig.json');

const excludeTypeIds = [1, 6, 7, 8, 9, 11, 12, 14];
const notDowngradeAble = [16];

const downgradeRewardMultiplier = 0.5;
const downgradeDurationMultiplier = 0.5;
const resourceIdMap = {
  '@_time': -1,
  '@_money': 0,
  '@_food': 1,
  '@_junk': 2,
  '@_stone': 3,
  '@_energy': 4,
  '@_population': 5,
};

const convertPriceIntoEffects =
  (type: EffectConfig['type'], sign: '+' | '-', multiplier = 1) =>
  ([key, val]): EffectConfig => ({
    type,
    data: {
      resourceTypeId: `${resourceIdMap[key]}`,
      amount: `${sign}${val * multiplier}`,
    },
  });

const convertPriceIntoRequirement =
  () =>
  ([key, val]): Requirement => ({
    type: 'has/resources',
    data: {
      resourceTypeId: `${resourceIdMap[key]}`,
      amount: `${val}`,
    },
  });

const convertRequirements = ([key, val]: [any, any]): Requirement | {} => {
  switch (key) {
    case 'buildings':
      if (val.building instanceof Array) {
        return val.building.map((b) => ({
          type: `has/building`,
          data: {
            buildingTypeId: b['@_id'],
            buildingLevel: b['@_level'],
            amount: '1',
          },
        }));
      } else {
        return {
          type: `has/building`,
          data: {
            buildingTypeId: val.building['@_id'],
            buildingLevel: val.building['@_level'],
            amount: '1',
          },
        };
      }

    case 'items':
      return {
        type: `has/item`,
        data: { itemTypeId: val.item['@_id'], amount: val.item['@_amount'] },
      };

    default:
      return '';
  }
};

const parseBuildingLevel = (
  [key, val]: [key: string, val: BuildingLevelVal],
  buildingTypeId: BuildingTypeId,
): [string, BuildingLevelConfig] => [
  key.replace('level', ''),
  {
    actions: {
      upgrading: {
        duration: `${+val.cost['@_time']}s`,
        requirements: [
          ...(val.requirements
            ? Object.entries(val.requirements).map(convertRequirements).flat()
            : []),
          ...Object.entries(val.cost)
            .filter(([key, val]) => +val > 0 && resourceIdMap[key] > 0)
            .map(convertPriceIntoRequirement()),
        ],
        effects: {
          start: [
            ...Object.entries(val.cost)
              .filter(([key, val]) => +val > 0 && resourceIdMap[key] > 0)
              .map(convertPriceIntoEffects('modify/resources', '-')),
          ],
          finish: [
            val.respect && {
              type: 'modify/xp',
              data: {
                amount: `+${val.respect?.['@_value']}`,
              },
            },
            ...(val.prod &&
              Object.entries(val.prod)
                .filter(([, v]) => +v !== 0)
                .map(
                  ([k, v]) =>
                    ({
                      type: 'modify/resources',
                      data: {
                        resourceTypeId: resourceIdMap[k],
                        amount: `+${+v / 60}`,
                        repeat: '1min',
                      },
                    } as EffectConfig),
                )),
            ...((val.capacity &&
              Object.entries(val.capacity)
                .filter(([, v]) => +v !== 0)
                .map(
                  ([k, v]) =>
                    ({
                      type: 'modify/capacity',
                      data: {
                        resourceTypeId: resourceIdMap[k],
                        amount: `+${+v}`,
                      },
                    } as EffectConfig),
                )) ||
              []),
          ],
        },
      },
      downgrading: {
        requirements: [
          ...[
            notDowngradeAble.includes(buildingTypeId) && {
              type: 'theImpossible',
            },
          ],
        ].filter(Boolean),
        duration: notDowngradeAble.includes(buildingTypeId)
          ? '0ms'
          : `${+val.cost['@_time'] * downgradeDurationMultiplier}s`,
        effects: {
          start: [],
          finish: notDowngradeAble.includes(buildingTypeId)
            ? []
            : [
                ...Object.entries(val.cost)
                  .filter(([key, val]) => +val > 0 && resourceIdMap[key] > 0)
                  .map(
                    convertPriceIntoEffects(
                      'modify/resources',
                      '+',
                      downgradeRewardMultiplier,
                    ),
                  ),
                val.respect && {
                  type: 'modify/xp',
                  data: {
                    amount: `-${val.respect?.['@_value']}`,
                  },
                },
                ...(val.prod &&
                  Object.entries(val.prod)
                    .filter(([, v]) => +v !== 0)
                    .map(
                      ([k, v]) =>
                        ({
                          type: 'modify/resources',
                          data: {
                            resourceTypeId: resourceIdMap[k],
                            amount: `-${+v / 60}`,
                            repeat: '1min',
                          },
                        } as EffectConfig),
                    )),
                ...((val.capacity &&
                  Object.entries(val.capacity)
                    .filter(([, v]) => +v !== 0)
                    .map(
                      ([k, v]) =>
                        ({
                          type: 'modify/capacity',
                          data: {
                            resourceTypeId: resourceIdMap[k],
                            amount: `-${+v}`,
                          },
                        } as EffectConfig),
                    )) ||
                  []),
              ].filter(Boolean),
        },
      },
    },
  },
];

const parseBuilding = (buildingXML: ParsedXMLBuilding): any => {
  const typeId = Number(buildingXML['@_id']);

  if (excludeTypeIds.includes(typeId)) {
    return null;
  }

  const conf = {
    typeId,
    levels: Object.fromEntries(
      Object.entries(buildingXML.properties).map((l) =>
        parseBuildingLevel(l, typeId),
      ),
    ),
  };

  return conf;
};

const convertParsedBuildingsConfig = (
  parsedXMLConfig: ParsedXMLBuildingsConfig,
): any => ({
  buildingsBuildParallel: 1,
  buildings: [
    ...parsedXMLConfig.Buildings.town.building
      .map(parseBuilding)
      .filter(Boolean),
    ...parsedXMLConfig.Buildings.resource.building
      .map(parseBuilding)
      .filter(Boolean),
  ],
});

const convert = async (xmlFilePath: string) => {
  const parser = new XMLParser({
    ignoreAttributes: false,
  });

  const xmlString = (await readFile(xmlFilePath)).toString();
  const parsedXml = parser.parse(xmlString) as ParsedXMLBuildingsConfig;
  const configObj = convertParsedBuildingsConfig(parsedXml);

  writeFile(outputPath, JSON.stringify(configObj, null, 2)).catch((err) => {
    console.log('ERR', err);
  });
};

convert(inputPath);
