// Project files
import type { LoanPurpose } from "./LoanPurpose";

/** All the information gathered during the Business application form. */
export default interface Application {
  loan_amount: number;
  loan_period: number;
  email: string;
  phone: string;
  company_org_number: string;
  loan_purpose: LoanPurpose | undefined;
  last_year_turnover: number;
  has_existing_loans: boolean;
  loan_debt: number;
  is_guarantor: boolean;
}
