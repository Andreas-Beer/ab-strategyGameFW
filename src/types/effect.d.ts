type AmountOperator = '+' | '-' | '*' | '/' | '';
type Amount = number | `${AmountOperator}${number}${'%' | ''}`;

type EffectConfig =
  | {
      type: `modify/resource/${ResourceId}`;
      amount: Amount;
      repeat?: Duration;
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
  | { type: 'package/items'; items: { itemId: ItemTypeId; amount: number }[] };

type EffectData = { effectId: number; expire?: Duration };
