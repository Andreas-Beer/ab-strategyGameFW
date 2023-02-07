type XMLAttr<T extends string> = `@_${T}`;

type BuildingKeys =
  | 'time'
  | 'money'
  | 'food'
  | 'junk'
  | 'stone'
  | 'energy'
  | 'population';

export type BuildingCostKeys = Exclude<BuildingKeys, 'population'>;
export type BuildingProdKeys = Exclude<BuildingKeys, 'time'>;
export type BuildingCapacityKeys = Exclude<BuildingKeys, 'money' | 'time'>;

export type BuildingLevelKeys =
  | 'level1'
  | 'level2'
  | 'level3'
  | 'level4'
  | 'level5'
  | 'level6'
  | 'level7'
  | 'level8'
  | 'level9'
  | 'level10';

export type BuildingLevelVal = {
  cost: Record<XMLAttr<BuildingCostKeys>, string>;
  prod: Record<XMLAttr<BuildingProdKeys>, string>;
  respect?: Record<XMLAttr<'value'>, string>;
  capacity?: Record<BuildingCapacityKeys, string>;
  requirements: {
    items: {
      item: Record<XMLAttr<'id' | 'amount'>, string>;
    };
    buildings: {
      building: Record<XMLAttr<'id' | 'level'>, string>;
    };
  };
};

export type ParsedXMLBuildings<T extends string> = {
  '@_type': T;
  building: ParsedXMLBuilding[];
};

export type ParsedXMLBuilding = {
  '@_id': string;
  '@_name': string;
  properties: Record<BuildingLevelKeys, BuildingLevelVal>;
  maxQuantity: Record<XMLAttr<'value'>, string>;
  downgradeLimit: Record<XMLAttr<'value'>, string>;
  buildable: Record<XMLAttr<'value'>, string>;
  mainCityOnly: Record<XMLAttr<'value'>, string>;
  showIngame: Record<XMLAttr<'value'>, string>;
  positionInMenu: Record<XMLAttr<'value'>, string>;
};

export type ParsedXMLBuildingsConfig = {
  Buildings: {
    freeSpeedup: Record<XMLAttr<'time'>, string>;
    town: ParsedXMLBuildings<'town'>;
    resource: ParsedXMLBuildings<'resource'>;
  };
};
