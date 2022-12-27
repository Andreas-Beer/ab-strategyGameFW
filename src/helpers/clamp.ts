export function clamp(
  value: number,
  { min, max }: { min?: number; max?: number } = {},
) {
  const isDefined = (value?: number): value is number => {
    return typeof value !== 'undefined' && typeof value === 'number';
  };

  const isMaxDefined = isDefined(max);
  const isMinDefined = isDefined(min);

  if (isMaxDefined && isMinDefined) {
    return Math.min(max, Math.max(min, value));
  }

  if (isMaxDefined) {
    return Math.min(max, value);
  }

  if (isMinDefined) {
    return Math.max(min, value);
  }

  return value;
}
