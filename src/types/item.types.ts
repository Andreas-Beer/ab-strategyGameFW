import { EffectConfig } from './effect.types';
import { Price } from './price.types';

export type ItemTypeId = number;

export type ItemConfig = {
  typeId: ItemTypeId;
  category: number;
  price: Price[];
  effects: EffectConfig[];

  // Feels not right here.
  chances?: Record<'gambling' | 'battle' | 'scavenging', number>;
  isUnusableInInventory?: boolean;
};
