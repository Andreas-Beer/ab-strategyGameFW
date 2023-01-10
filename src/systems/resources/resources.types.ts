export type ResourceId = number;

export type ResourceLimits = { max?: number; min?: number };

export type ResourceData = { amount: number; min?: number; max?: number };

export type ResourcesData = Record<ResourceId, ResourceData>;

export type ModifyResourcesAmountPayload = {
  resourceId: number;
  amount: number;
};

export type ModifyResourceCapacityPayload = {
  resourceId: number;
  amount: number;
};

declare module '../../components/EffectEventBus' {
  interface EffectHandlerMap {
    'modify/resources': ModifyResourcesAmountPayload;
    'modify/capacity': ModifyResourceCapacityPayload;
  }
}
