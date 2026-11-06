/** All the information gathered during the Consumer loan application form. */
export default interface Application {
  // Step 2: Co-applicant
  has_co_applicant: boolean /** Starts on "Nej", so it is always answered. */;
}
