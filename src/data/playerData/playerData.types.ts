import { ResourceId } from '../../systems/resources/resource.types';
import { BuildingData } from '../../systems/buildings/building.types';
import { EffectData } from '../../types/effect.types';

export type ResourceData = Record<number, ResourceId>;
export type PlayerId = number;

export type TownData = {
  id: PlayerId;
  name: string;
  location: [number, number];
  buildings: BuildingData[];
  effects: EffectData[];
  units: ResourceData;
  resources: ResourceData;
  capacity: ResourceData;
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
  items: ResourceData;
  resources: ResourceData;
  effects: EffectData[];
  towns: TownData[];
};
