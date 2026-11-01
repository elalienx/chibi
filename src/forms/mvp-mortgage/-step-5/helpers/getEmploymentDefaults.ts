// Project files
import initialApplication from "../../data/initialApplication";
import type Application from "../../types/Application";

/** Used when submitting Step 5. */
export default function getEmploymentDefaults(employmentType: string): Partial<Application> {
  const employmentEntries = Object.entries(initialApplication).filter(([key]) => key.startsWith("main_employment_"));
  const employmentReset = Object.fromEntries(employmentEntries);

  // Step 3 value, restored after the reset.
  return { ...employmentReset, main_employment_type: employmentType };
}
