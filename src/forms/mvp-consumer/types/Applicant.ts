/** The personal info of one applicant, as saved by Step 3. Used for both the main applicant and the co-applicant. */
export default interface Applicant {
  children_under_21: number | undefined /** Undefined until answered, because 0 is a valid answer. */;
  civil_state: string;
  email: string;
  phone: string;
  ssn: string;
}
