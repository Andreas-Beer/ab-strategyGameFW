import { BuildingsConfig } from './building.types';
import { ItemConfig } from './item.types';
import { UnitConfig } from './units.types';

export type ConfigDataId = number;

export type ConfigData = {
  buildings: BuildingsConfig;
  items: ItemConfig[];
  units: UnitConfig[];
};
