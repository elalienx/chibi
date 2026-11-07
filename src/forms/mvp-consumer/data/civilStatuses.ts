/** A list of civil statuses. Used in the "Civilstatus" select of the applicant and co-applicant in Step 3. */
const civilStatuses = [
  { value: "single", label: "Ensamstående" },
  { value: "live_together", label: "Sambo" },
  { value: "married", label: "Gift" },
  { value: "divorced", label: "Skild" },
] as const;

export default civilStatuses;
