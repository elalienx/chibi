/** A list of employment types for the applicant and co-applicant. */
const employmentTypes = [
  { value: "permanent_employment", label: "Fast anställning / tillsvidare" },
  { value: "self_employment", label: "Egenföretagare" },
  { value: "temporary_employment", label: "Visstidsanställning / projekt" },
  { value: "substitute_employment", label: "Vikariat" },
  { value: "probationary_employment", label: "Provanställning" },
  { value: "hourly_employment", label: "Timanställning" },
  { value: "retirement", label: "Ålderspensionär" },
  { value: "early_retirement", label: "Förtidspensionär" },
  { value: "disability_retirement", label: "Sjukpensionär" },
  { value: "student", label: "Student" },
  { value: "no_employment", label: "Arbetslös" },
] as const;

export default employmentTypes;
