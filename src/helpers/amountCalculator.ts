type Operator = '+' | '-' | '*' | '/';
type Calculator = (a: number, b: number) => number;

export type AmountCalculator = (a: number) => number;
export type CalculatorAmount = `${Operator}${number}${'%' | ''}`;

const operatorCalculatorMap: Record<Operator, Calculator> = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

const splitOperatorAndNumber = (
  amount: CalculatorAmount,
): { operator: Operator; number: number } => {
  const splittedAmount = amount.split(/(\d+)/).filter(Boolean);
  const operator = splittedAmount[0] as Operator;
  const number = Number(splittedAmount[1]);

  if (!(operator in operatorCalculatorMap)) {
    throw new Error(`can not parse the amount ${amount}`);
  }

  return { operator, number };
};

export function amountCalculator(amount: CalculatorAmount) {
  const { number, operator } = splitOperatorAndNumber(amount);
  const calculator = operatorCalculatorMap[operator];

  return function (lastAmount: number): number {
    return calculator(lastAmount, number);
  };
}
