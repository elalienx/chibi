export const formatWithSpaces = (value: string | number | undefined | null): string => {
  // Safeguard
  if (value === undefined || value === null) return "";

  // Convert to string and remove non-digits
  const clean = String(value).replace(/\D/g, "");

  // Inject spaces every 3 digits
  return clean.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const stripSpaces = (value: string): string => {
  return value.replace(/\s/g, "");
};
