// Project files
import months from "../../data/months";

/** Used in the employment start month ("Anställd sedan, månad") to hide future months of the current year. */
export default function getStartMonths(startYear: number) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // getMonth() starts at 0
  const monthsUntilToday = months.filter(({ value }) => value <= currentMonth);

  return startYear === currentYear ? monthsUntilToday : months;
}
