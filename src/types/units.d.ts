namespace UnitConfig {
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

type UnitConfig = {
  id: number;
  stats: UnitConfig.Stats;
  duration: Duration;
  price: Price[];
  requirements: Requirement[];
  effects: Effect[];
};
