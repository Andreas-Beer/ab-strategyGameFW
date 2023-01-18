import { EffectConfig } from '../../types/effect.types';
import { Price } from '../../types/price.types';
import { Duration } from '../../types/time.types';
import { Requirement } from '../requirements/requirements.types';

export type EventData<T extends string> = {
  [key in T]?: {
    effects?: EffectConfig[];
  };
};

export type BuildingConstructionProcess = number;
export type BuildingLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type BuildingId = number;
export type BuildingLifecycleEvents = 'onFinish' | 'onDestroy' | 'onDowngrade';
export type BuildingTypeId = number;
export type BuildingTownPosition = number;
export type BuildingCityId = number;

export type BuildingsConfig = {
  buildingsBuildParallel: number;
  buildings: BuildingConfig[];
};

export type BuildingLevelConfig = {
  price: Price[];
  requirements: Requirement[];
  duration: Duration;
  events: EventData<BuildingLifecycleEvents>;
};

export type BuildingConfig = {
  typeId: BuildingTypeId;
  levels: {
    [key: number]: BuildingLevelConfig;
  };
  controller?: { name: string; config?: any };
};

export type BuildingSlots = BuildingSlot[];

export type BuildingSlot = {
  id: number;
  position: BuildingTownPosition;
  allowedBuildingTypes: BuildingTypeId[];
};

export type BuildingData = {
  id: BuildingId;
  typeId: BuildingTypeId;
  level: BuildingLevel;
  location: BuildingTownPosition;
  constructionProgress: BuildingConstructionProcess;
};
