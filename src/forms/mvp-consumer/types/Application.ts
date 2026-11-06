/** All the information gathered during the Consumer loan application form. */
export default interface Application {
  // Step 2: Co-applicant
  has_co_applicant: boolean /** Starts on "Nej", so it is always answered. Decides if Step 3 shows the co-applicant fields. */;

  // Step 3: Main applicant personal info
  main_children_under_21: number | undefined /** Undefined until answered, because 0 is a valid answer. */;
  main_civil_state: string;
  main_email: string;
  main_phone: string;
  main_ssn: string;

  // Step 3: Co-applicant personal info
  co_children_under_21: number | undefined /** Undefined until answered, because 0 is a valid answer. */;
  co_civil_state: string;
  co_email: string;
  co_phone: string;
  co_ssn: string;
}
