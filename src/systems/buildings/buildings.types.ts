import { EffectConfig } from '../../types/effect.types';
import { Price } from '../../types/price.types';
import { Requirement } from '../../types/requirement.types';
import { Duration } from '../../types/time.types';

export type BuildingTypeId = number;

export type BuildingCityPosition = number;

export type BuildingCityId = number;

export type BuildingsConfig = {
  buildingsBuildParallel: number;
  buildings: BuildingConfigData[];
};

export type BuildingLevelConfig = {
  level: number;
  price: Price[];
  requirements: Requirement[];
  duration: Duration;
  effects: EffectConfig[];
};

export type BuildingConfigData = {
  typeId: BuildingTypeId;
  levels: {
    [key: number]: BuildingLevelConfig;
  };
  controller?: { name: string; config?: any };
};

export type BuildingPlayerData = {
  id: number;
  typeId: BuildingTypeId;
  level: number;
  location: BuildingCityPosition;
  constructionProgress: number;
  content?: any;
};
