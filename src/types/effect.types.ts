import { TownId } from '../data/playerData/playerData.types';
import { ResourceId } from '../systems/resources/resources.types';
import { ItemTypeId } from './item.types';
import { Duration } from './time.types';

export type AmountOperator = '+' | '-' | '*' | '/' | '';
export type Amount = number | `${AmountOperator}${number}${'%' | ''}`;

export type EffectConfig =
  | {
      type: `modify/resource/${ResourceId}`;
      amount: Amount;
      repeat?: Duration;
      expire?: Duration;
    }
  | { type: `modify/capacity/${ResourceId}`; amount: Amount }
  | { type: 'modify/xp'; amount: number }
  | {
      type: `townBuff/resource/${ResourceId}`;
      expire: Duration;
      amount: Amount;
    }
  | { type: 'townBuff/peace'; expire: Duration }
  | { type: 'buff/buildParallel'; expire: Duration }
  | { type: 'speedup/building'; amount: Duration }
  | { type: 'item/bundle'; items: { itemId: ItemTypeId; amount: number }[] };

export type EffectData = EffectConfig & { townId?: TownId };
