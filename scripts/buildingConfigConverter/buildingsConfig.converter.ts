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
} from '../../src/systems/buildings/buildings.types';

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { XMLParser } from 'fast-xml-parser';
import { Requirement2 } from '../../src/systems/requirements/requirements.types';
import { EffectConfig } from '../../src/types/effect.types';

const inputPath = join(__dirname, '../../data/config/buildingsConfig.xml');
const outputPath = join(__dirname, '../../data/config/buildingsConfig.json');

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

const convertRequirements = ([key, val]: [any, any]): Requirement2 | {} => {
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

const parseBuildingLevel = ([key, val]: [key: string, val: BuildingLevelVal]): [
  string,
  BuildingLevelConfig,
] => [
  key.replace('level', ''),
  {
    actions: {
      upgrading: {
        duration: `${+val.cost['@_time']}s`,
        requirements: [
          ...(val.requirements
            ? Object.entries(val.requirements).map(convertRequirements).flat()
            : []),
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
                        amount: `+${+v}`,
                        repeat: '1h',
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
        duration: `${+val.cost['@_time'] * downgradeDurationMultiplier}s`,
        effects: {
          start: [
            ...Object.entries(val.cost)
              .filter(([key, val]) => +val > 0 && resourceIdMap[key] > 0)
              .map(
                convertPriceIntoEffects(
                  'modify/resources',
                  '+',
                  downgradeRewardMultiplier,
                ),
              ),
          ],
          finish: [
            val.respect && {
              type: 'modify/xp',
              data: {
                amount: `-${val.respect?.['@_value']}`,
              },
            },
          ],
        },
      },
    },
  },
];

const parseBuilding = (buildingXML: ParsedXMLBuilding): any => ({
  typeId: Number(buildingXML['@_id']),
  levels: Object.fromEntries(
    Object.entries(buildingXML.properties).map(parseBuildingLevel),
  ),
});

const convertParsedBuildingsConfig = (
  parsedXMLConfig: ParsedXMLBuildingsConfig,
): any => ({
  buildingsBuildParallel: 1,
  buildings: [
    ...parsedXMLConfig.Buildings.town.building.map(parseBuilding),
    ...parsedXMLConfig.Buildings.resource.building.map(parseBuilding),
  ],
});

const convert = async (xmlFilePath: string) => {
  const parser = new XMLParser({
    ignoreAttributes: false,
  });

  const xmlString = (await readFile(xmlFilePath)).toString();
  const parsedXml = parser.parse(xmlString) as ParsedXMLBuildingsConfig;
  const configObj = convertParsedBuildingsConfig(parsedXml);

  writeFile(outputPath, JSON.stringify(configObj, null, 4)).catch((err) => {
    console.log('ERR', err);
  });
};

convert(inputPath);
