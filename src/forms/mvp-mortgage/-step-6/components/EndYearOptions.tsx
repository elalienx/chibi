// Project files
import SelectOption from "components/select-option/SelectOption";
import employmentEndYears from "../../data/employmentEndYears";

/**
 * Used in the employment end date ("Anställd till")
 */
export default function EndYearOptions() {
  return employmentEndYears.map((year) => (
    <SelectOption key={year} value={year}>
      {year}
    </SelectOption>
  ));
}
