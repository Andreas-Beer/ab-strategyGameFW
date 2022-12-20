export type UnitTypeId = number;
export namespace UnitConfig {
  export type typeId = number;
  export type Stats = {
    damage: number;
    range: number;
    shield: number;
    capacity: number;
    life: number;
    speed: number;
    maintenance: number;
  };
}

export type UnitConfig = {
  typeId: UnitTypeId;
  stats: UnitConfig.Stats;
  duration: Duration;
  price: Price[];
  requirements: Requirement[];
  effects: EffectConfig[];
};
