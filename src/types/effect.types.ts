import { EffectHandlerMap } from '../components/EffectEventBus';
import { TownId } from '../data/playerData/playerData.types';
import { CalculatorAmount } from '../helpers/amountCalculator';
import { ResourceId } from '../systems/resources/resources.types';
import { ItemTypeId } from './item.types';
import { Duration } from './time.types';

type EffectModifiers = {
  expire?: Duration;
  repeat?: boolean;
};

type Effect<T extends keyof EffectHandlerMap, U extends EffectHandlerMap[T]> = {
  type: T;
  data: U & EffectModifiers;
};

export type EffectConfig =
  | Effect<
      'modify/resources',
      {
        amount: CalculatorAmount;
        resourceId: ResourceId;
      }
    >
  | Effect<
      'modify/capacity',
      {
        resourceId: ResourceId;
        amount: CalculatorAmount;
      }
    >
  | Effect<'modify/xp', { amount: number }>
  | Effect<
      'townBuff/resource',
      { resourceId: ResourceId; amount: CalculatorAmount }
    >
  | Effect<'townBuff/peace'>
  | Effect<'buff/buildParallel'>
  | Effect<'speedup/building'>
  | Effect<'item/bundle', { items: { itemId: ItemTypeId; amount: number }[] }>;

export type EffectData = EffectConfig & { townId?: TownId };
