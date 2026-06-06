// Project files
import type loanPurposes from "../data/loanPurposes";

/** The reason an applicant choose to apply for loan. */
export type LoanPurpose = (typeof loanPurposes)[number]["value"];
