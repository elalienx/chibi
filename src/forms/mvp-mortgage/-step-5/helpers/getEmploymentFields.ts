// Properties
const withEmployer = [
  "permanent_employment",
  "self_employment",
  "temporary_employment",
  "substitute_employment",
  "probationary_employment",
  "hourly_employment",
];
const withEndDate = ["temporary_employment", "substitute_employment"];
const withPension = ["retirement", "early_retirement", "disability_retirement"];

/** Decides which fields of Step 5 to show based on the employment type selected in Step 3. */
export default function getEmploymentFields(employmentType: string) {
  const hasEmployer = withEmployer.includes(employmentType);
  const hasEndDate = withEndDate.includes(employmentType);
  const hasPension = withPension.includes(employmentType);
  const hasProfession = hasEmployer && employmentType !== "self_employment";
  const hasIncome = !hasPension;

  return { hasEmployer, hasEndDate, hasPension, hasProfession, hasIncome };
}
