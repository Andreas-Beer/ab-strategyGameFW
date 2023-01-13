type AmountCalculator = (a: number, b: number) => number;
type AmountOperator = '+' | '-' | '*' | '/';
export type Amount = `${AmountOperator}${number}${'%' | ''}`;

const operatorCalculatorMap: Record<AmountOperator, AmountCalculator> = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

const splitOperatorAndNumber = (
  amount: Amount,
): { operator: AmountOperator; number: number } => {
  const splittedAmount = amount.split(/(\+|-|\*|\/)/).filter(Boolean);
  const operator = splittedAmount[0] as AmountOperator;
  const number = Number(splittedAmount[1]);

  if (!(operator in operatorCalculatorMap)) {
    throw new Error(`can not parse the amount ${amount}`);
  }

  return { operator, number };
};

export function amountReducer(amount: Amount) {
  const { number, operator } = splitOperatorAndNumber(amount);
  const calculator = operatorCalculatorMap[operator];

  return function (lastAmount: number): number {
    return calculator(lastAmount, number);
  };
}
