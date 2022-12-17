type UnitTypeId = number;
namespace UnitConfig {
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

type UnitConfig = {
  typeId: UnitTypeId;
  stats: UnitConfig.Stats;
  duration: Duration;
  price: Price[];
  requirements: Requirement[];
  effects: Effect[];
};
