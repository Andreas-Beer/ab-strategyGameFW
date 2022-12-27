import { BuildingConfig } from '../../systems/buildings/building.types';
import { ItemConfig } from '../../types/item.types';
import { UnitConfig } from '../../types/units.types';

export type ConfigDataId = number;

export type ConfigData = {
  buildings: BuildingConfig[];
  items: ItemConfig[];
  units: UnitConfig[];
};
