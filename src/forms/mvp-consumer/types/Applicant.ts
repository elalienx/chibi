/** The personal info asked in Step 3, once for the main applicant and once for the co-applicant. */
export default interface Applicant {
  children_under_21: number | undefined /** Undefined until answered, because 0 is a valid answer. */;
  civil_state: string;
  email: string;
  phone: string;
  ssn: string;
}
