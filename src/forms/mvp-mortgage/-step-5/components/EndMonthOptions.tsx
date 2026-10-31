// Project files
import SelectOption from "components/select-option/SelectOption";
import months from "../../data/months";

/**
 * Used in the employment end month ("Anställd till, månad")
 */
export default function EndMonthOptions() {
  return months.map(({ label, value }) => (
    <SelectOption key={value} value={value}>
      {label}
    </SelectOption>
  ));
}
