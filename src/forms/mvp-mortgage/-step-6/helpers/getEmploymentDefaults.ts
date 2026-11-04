// Project files
import initialApplication from "../../data/initialApplication";
import type Application from "../../types/Application";

/** Used when submitting Step 6. */
export default function getEmploymentDefaults(employmentType: string): Partial<Application> {
  const employmentEntries = Object.entries(initialApplication).filter(([key]) => key.startsWith("co_employment_"));
  const employmentReset = Object.fromEntries(employmentEntries);

  // Step 4 value, restored after the reset.
  return { ...employmentReset, co_employment_type: employmentType };
}
