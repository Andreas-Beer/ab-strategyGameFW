export function clamp(
  amount: number,
  { min, max }: { min?: number; max?: number } = {},
) {
  const isDefined = (value?: number): value is number => {
    return typeof value !== 'undefined' && typeof value === 'number';
  };

  const isMaxDefined = isDefined(max);
  const isMinDefined = isDefined(min);

  if (!isMaxDefined && !isMinDefined) {
    return amount;
  }

  if (isMaxDefined && isMinDefined) {
    return Math.min(max, Math.max(min, amount));
  }

  if (isMaxDefined) {
    return Math.min(max, amount);
  }

  if (isMinDefined) {
    return Math.max(min, amount);
  }
}
