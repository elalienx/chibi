interface Props {
  value: string;
  min?: number;
  max?: number;
}

export default function limitNumberRange({ value, min, max }: Props): string {
  // Safeguards
  if (value === "") return value;

  const numericValue = Number(value);
  const isIncompleteDecimal = value === ".";

  if (isIncompleteDecimal || !Number.isFinite(numericValue)) return value;
  if (min !== undefined && numericValue < min) return String(min);
  if (max !== undefined && numericValue > max) return String(max);

  return value;
}
