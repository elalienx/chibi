// Project files
import type loanPurposeOptions from "../data/loanPurposeOptions";

/** The reason an applicant choose to apply for loan. */
export type LoanPurpose = (typeof loanPurposeOptions)[number]["value"];
