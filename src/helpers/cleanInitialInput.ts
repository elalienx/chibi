export default function cleanInitialInput(values: object): object {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, typeof value === "number" ? String(value) : value]),
  );
}
