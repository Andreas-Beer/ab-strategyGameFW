import { EffectConfig } from './effect.types';
import { Price } from './price.types';
import { Requirement } from './requirement.types';
import { Duration } from './time.types';

export type BuildingTypeId = number;

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
