// Project files
import initialApplication from "../../data/initialApplication";
import type Application from "../../types/Application";

/** Used when submitting Step 6. */
export default function getEmploymentDefaults(employmentType: string): Partial<Application["co"]> {
  const employmentEntries = Object.entries(initialApplication.co).filter(([key]) => key.startsWith("employment_"));
  const employmentReset = Object.fromEntries(employmentEntries);

  // Step 4 value, restored after the reset.
  return { ...employmentReset, employment_type: employmentType };
}
