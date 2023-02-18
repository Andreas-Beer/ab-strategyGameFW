import { TownId } from '../../data/playerData/playerData.types';
import { CalculatorAmount } from '../../helpers/amountCalculator';

export type ResourceTypeId = number;
export type ResourceLimits = { max?: number; min?: number };
export type ResourceData = { amount: number; min?: number; max?: number };
export type ResourcesData = Record<ResourceTypeId, ResourceData>;

declare module '../../components/EffectEventBus' {
  interface EffectHandlerMap {
    'modify/resources': {
      resourceTypeId: ResourceTypeId;
      amount: CalculatorAmount;
    };
    'modify/capacity': {
      resourceTypeId: ResourceTypeId;
      amount: CalculatorAmount;
    };
  }
}
