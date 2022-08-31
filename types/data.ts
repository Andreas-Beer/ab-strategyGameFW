type TownData = {
  id: number;
  name: string;
  location: [number, number];
  buildings: BuildingData[];
  effects: EffectData[];
  units: Record<number, number>;
  resources: Record<number, number>;
  capacity: Record<number, number>;
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
  items: Record<number, number>;
  resources: Record<number, number>;
  effects: EffectData[];
  towns: TownData[];
};
