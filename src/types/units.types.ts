import { Requirement } from '../systems/requirements/requirements.types';
import { EffectConfig } from './effect.types';
import { Price } from './price.types';
import { Duration } from './time.types';

export type UnitTypeId = number;

export type UnitStats = {
  damage: number;
  range: number;
  shield: number;
  capacity: number;
  life: number;
  speed: number;
  maintenance: number;
};

export type UnitConfigs = UnitConfig[];

export type UnitConfig = {
  typeId: UnitTypeId;
  stats: UnitStats;
  duration: Duration;
  price: Price[];
  requirements: Requirement[];
  effects: EffectConfig[];
};
