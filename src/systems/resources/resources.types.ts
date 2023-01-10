export type ResourceId = number;

export type ResourceLimits = { max?: number; min?: number };

export type ResourceData = { amount: number; min?: number; max?: number };

export type ResourcesData = Record<ResourceId, ResourceData>;

declare module '../../components/EffectEventBus' {
  interface EffectHandlerMap {
    'modify/resources': {
      resourceId: number;
      amount: number;
    };
    'modify/capacity': {
      resourceId: number;
      amount: number;
    };
  }
}
