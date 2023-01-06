import { Price } from '../../types/price.types';
import { Requirement } from '../requirements/requirements.types';
import { Duration } from '../../types/time.types';
import { EffectConfig } from '../../types/effect.types';

export type EventData<T extends string> = {
  [key in T]?: {
    effects?: EffectConfig[];
  };
};

export type BuildingLifecycleEvents = 'onFinish' | 'onDestroy';

export type BuildingTypeId = number;

export type BuildingTownPosition = number;

export type BuildingCityId = number;

export type BuildingsConfig = {
  buildingsBuildParallel: number;
  buildings: BuildingConfigData[];
};

export type BuildingLevelConfig = {
  price: Price[];
  requirements: Requirement[];
  duration: Duration;
  events: EventData<BuildingLifecycleEvents>;
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
  location: BuildingTownPosition;
  constructionProgress: number;
  content?: any;
};
