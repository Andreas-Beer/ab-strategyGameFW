import { ResourceId } from '../systems/resources/resources.types';

export type Price = { resourceId: ResourceId; amount: number };
export type Prices = Price[];
