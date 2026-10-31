// Project files
import SelectOption from "components/select-option/SelectOption";
import months from "../../data/months";

// Properties
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1; // getMonth() starts at 0

/**
 * Used in the employment start month ("Anställd sedan, månad")
 */
export default function StartMonthOptions(startYear: number) {
  const startMonths = startYear === currentYear ? months.filter(({ value }) => value <= currentMonth) : months;

  return startMonths.map(({ label, value }) => (
    <SelectOption key={value} value={value}>
      {label}
    </SelectOption>
  ));
}
