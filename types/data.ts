type ResourceData = Record<number, number>;

type TownData = {
  id: number;
  name: string;
  location: [number, number];
  buildings: BuildingData[];
  effects: EffectData[];
  units: ResourceData;
  resources: ResourceData;
  capacity: ResourceData;
};

type PlayerData = {
  id: number;
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
