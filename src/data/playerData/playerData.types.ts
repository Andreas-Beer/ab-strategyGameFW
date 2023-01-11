import { BuildingsPlayerData } from '../../systems/buildings/buildings.interfaces';
import {
  BuildingData,
  BuildingSlots,
} from '../../systems/buildings/buildings.types';
import { ResourcesData } from '../../systems/resources/resources.types';
import { EffectData } from '../../types/effect.types';

export type stackData = Record<number, number>;
export type PlayerId = number;
export type TownId = number;

export type TownData = {
  buildParallelCapacity: number;
  id: TownId;
  name: string;
  location: [number, number];
  buildings: BuildingData[];
  units: stackData;
  resources: ResourcesData;
  buildingSlots: BuildingSlots;
};

export type PlayerData = {
  id: PlayerId;
  email: string;
  name: string;
  level: number;
  avatarId: number;
  groupId?: number;
  xp: number;
  prestige: number;
  items: stackData;
  resources: ResourcesData;
  effects: EffectData[];
  towns: TownData[];
  currentActiveTownId: TownId;
};
