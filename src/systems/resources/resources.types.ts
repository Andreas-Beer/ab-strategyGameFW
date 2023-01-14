import { TownId } from '../../data/playerData/playerData.types';
import {
  AmountCalculator,
  CalculatorAmount,
} from '../../helpers/amountCalculator';

export type ResourceId = number;
export type ResourceLimits = { max?: number; min?: number };
export type ResourceData = { amount: number; min?: number; max?: number };
export type ResourcesData = Record<ResourceId, ResourceData>;

declare module '../../components/EffectEventBus' {
  interface EffectHandlerMap {
    'modify/resources': {
      resourceId: ResourceId;
      amount: CalculatorAmount;
    };
    'modify/capacity': {
      resourceId: ResourceId;
      amount: CalculatorAmount;
    };
  }
}
