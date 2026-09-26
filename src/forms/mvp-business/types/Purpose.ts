// Project files
import type purposes from "../data/purposes";

/** The reason an applicant choose to apply for loan. */
export type Purpose = (typeof purposes)[number]["value"];
