export type ResourceId = number;

export type ResourceLimits = { max?: number; min?: number };

export type ResourceData = { amount: number; min?: number; max?: number };

export type ResourcesData = Record<ResourceId, ResourceData>;
