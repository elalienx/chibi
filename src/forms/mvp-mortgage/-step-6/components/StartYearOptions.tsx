// Project files
import SelectOption from "components/select-option/SelectOption";
import employmentStartYears from "../../data/employmentStartYears";

/**
 * Used in the employment start date ("Anställd sedan")
 */
export default function StartYearOptions() {
  return employmentStartYears.map((year) => (
    <SelectOption key={year} value={year}>
      {year}
    </SelectOption>
  ));
}
