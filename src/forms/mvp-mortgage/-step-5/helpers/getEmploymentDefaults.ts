// Project files
import initialApplication from "../../data/initialApplication";
import type Application from "../../types/Application";

/** Used when submitting Step 5. */
export default function getEmploymentDefaults(employmentType: string): Partial<Application["main"]> {
  const employmentEntries = Object.entries(initialApplication.main).filter(([key]) => key.startsWith("employment_"));
  const employmentReset = Object.fromEntries(employmentEntries);

  // Step 3 value, restored after the reset.
  return { ...employmentReset, employment_type: employmentType };
}
