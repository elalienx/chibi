/** A list of amounts of children. Used in the "Barn under 21 år" select of the applicant and co-applicant in Step 3. */
const childrenUnder21 = [
  { value: "0", label: "Inga" },
  { value: "1", label: "1 barn" },
  { value: "2", label: "2 barn" },
  { value: "3", label: "3 barn" },
  { value: "4", label: "4 barn" },
  { value: "5", label: "5 eller mer" },
] as const;

export default childrenUnder21;
