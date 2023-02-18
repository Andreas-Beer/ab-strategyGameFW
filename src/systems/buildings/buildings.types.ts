import { EffectConfig } from '../../types/effect.types';
import { Duration } from '../../types/time.types';
import { Requirement } from '../requirements/requirements.types';

export type EventData<T extends string> = {
  [key in T]: {
    duration: Duration;
    requirements: Requirement[];
    effects?: Partial<Record<'start' | 'finish', EffectConfig[]>>;
  };
};

export type BuildingConstructionProcess = number;
export type BuildingLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export const isBuildingLevelGuard = (lvl: number): lvl is BuildingLevel => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(lvl);
};

export type BuildingId = number;
export type BuildingActions = 'upgrading' | 'downgrading';
export type BuildingTypeId = number;
export type BuildingTownPosition = number;
export type BuildingCityId = number;

export type BuildingsConfig = {
  buildingsBuildParallel: number;
  buildings: BuildingConfig[];
};

export type BuildingConfig = {
  typeId: BuildingTypeId;
  levels: {
    [key: number]: BuildingLevelConfig;
  };
  controller?: { name: string; config?: any };
};

export type BuildingLevelConfig = {
  actions: EventData<BuildingActions>;
};

export type BuildingSlots = BuildingSlot[];

export type BuildingSlot = {
  id: number;
  position: BuildingTownPosition;
  allowedBuildingTypes: BuildingTypeId[];
};

export type BuildingData = {
  id: BuildingId;
  buildingTypeId: BuildingTypeId;
  level: BuildingLevel;
  location: BuildingTownPosition;
  constructionProgress: BuildingConstructionProcess;
};
