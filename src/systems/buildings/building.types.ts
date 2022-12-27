import { EffectConfig } from '../../types/effect.types';
import { Price } from '../../types/price.types';
import { Requirement } from '../../types/requirement.types';
import { Duration } from '../../types/time.types';

export type BuildingTypeId = number;

export type BuildingsConfig = {
  buildingsBuildParallel: number;
  buildings: BuildingConfig[];
};

export type BuildingLevelConfig = {
  price: Price[];
  requirements: Requirement[];
  duration: Duration;
  effects: EffectConfig[];
};

export type BuildingConfig = {
  typeId: BuildingTypeId;
  levels: {
    [key: number]: BuildingLevelConfig;
  };
  controller?: { name: string; config?: any };
};

export type BuildingData = {
  id: number;
  typeId: BuildingTypeId;
  level: number;
  location: number;
  constructionProgress: number;
  content?: any;
};
