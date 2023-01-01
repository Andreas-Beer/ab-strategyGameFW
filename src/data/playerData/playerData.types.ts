import {
  ResourcesData,
  ResourceId,
} from '../../systems/resources/resources.types';
import { BuildingPlayerData } from '../../systems/buildings/buildings.types';
import { EffectData } from '../../types/effect.types';

export type stackData = Record<number, number>;
export type PlayerId = number;
export type TownId = number;

export type TownData = {
  id: TownId;
  name: string;
  location: [number, number];
  buildings: BuildingPlayerData[];
  effects: EffectData[];
  units: stackData;
  resources: ResourcesData;
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
};
