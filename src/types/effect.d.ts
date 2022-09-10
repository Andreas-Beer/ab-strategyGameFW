type AmountOperator = '+' | '-' | '*' | '/' | '';
type Amount = number | `${AmountOperator}${number}${'%' | ''}`;

type EffectConfig =
  | {
      type: `modify/resource/${number}`;
      amount: Amount;
      repeat?: Duration;
    }
  | { type: `modify/capacity/${number}`; amount: Amount }
  | { type: 'modify/xp'; amount: number }
  | { type: `townBuff/resource/${number}`; expire: Duration; amount: Amount }
  | { type: 'townBuff/peace'; expire: Duration }
  | { type: 'buff/buildParallel'; expire: Duration }
  | { type: 'speedup/building'; amount: Duration }
  | { type: 'package/items'; items: { itemId: number; amount: number }[] };

type EffectData = { effectId: number; expire?: Duration };
