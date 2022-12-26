import { BuildingsConfig } from '../../types/building.types';
import { ItemConfig } from '../../types/item.types';
import { UnitConfig } from '../../types/units.types';

export type ConfigDataId = number;

export type ConfigData = {
  buildings: BuildingsConfig;
  items: ItemConfig[];
  units: UnitConfig[];
};
